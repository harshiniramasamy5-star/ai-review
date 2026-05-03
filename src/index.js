#!/usr/bin/env node

import { execSync } from "child_process";
import chalk from "chalk";
import ora from "ora";
import { program } from "commander";

const SYSTEM_PROMPT = `You are a senior engineer doing a code review. Given a git diff, identify real issues.

For each issue use this EXACT format, nothing else:

ISSUE: <filename>:<line>
SEVERITY: <critical|warning|suggestion>
PROBLEM: <what is wrong>
FIX: <what to do instead>
---

After ALL issues, add:
SUMMARY: <2-3 sentence take>
SCORE: <1-10>

Rules: each issue must end with ---. Do not merge issues. Do not skip the --- separator.`;

function getDiff(target) {
  try {
    if (target === "staged") return execSync("git diff --cached", { encoding: "utf-8" });
    return execSync("git diff " + target, { encoding: "utf-8" });
  } catch {
    console.error(chalk.red("✗ Not inside a git repo"));
    process.exit(1);
  }
}

function severityBadge(severity) {
  switch (severity) {
    case "critical":   return chalk.bgRed.white.bold;
    case "warning":    return chalk.bgYellow.black.bold;
    case "suggestion": return chalk.bgBlue.white.bold;
    default:           return chalk.bgGray.white;
  }
}

function renderReview(raw) {
  const HR = chalk.dim("─".repeat(62));
  console.log("\n" + HR);
  console.log(chalk.bold("  ai-review"));
  console.log(HR + "\n");

  const counts = { critical: 0, warning: 0, suggestion: 0 };
  let summary = null;
  let score = null;
  let issueFound = false;

  // extract summary and score first
  const summaryMatch = raw.match(/SUMMARY:\s*(.+?)(?=SCORE:|$)/s);
  const scoreMatch   = raw.match(/SCORE:\s*(\d+)/);
  if (summaryMatch) summary = summaryMatch[1].trim();
  if (scoreMatch)   score   = parseInt(scoreMatch[1]);

  // extract each issue block between --- markers
  const issueBlocks = raw.split("---").map(b => b.trim()).filter(b =>
    b.includes("ISSUE:") && b.includes("SEVERITY:") && b.includes("PROBLEM:")
  );

  for (const block of issueBlocks) {
    const loc      = block.match(/ISSUE:\s*(.+)/)?.[1]?.trim();
    const severity = block.match(/SEVERITY:\s*(.+)/)?.[1]?.trim().toLowerCase();
    const problem  = block.match(/PROBLEM:\s*(.+)/)?.[1]?.trim();
    const fix      = block.match(/FIX:\s*(.+)/)?.[1]?.trim();

    if (loc && severity && problem) {
      issueFound = true;
      if (counts[severity] !== undefined) counts[severity]++;
      const badge = severityBadge(severity)(" " + severity.toUpperCase() + " ");
      console.log("  " + badge + " " + chalk.dim(loc));
      console.log("  " + problem);
      if (fix) console.log("  " + chalk.green("→") + " " + chalk.dim(fix));
      console.log();
    }
  }

  if (!issueFound) console.log(chalk.green("  ✓ Nothing to flag\n"));

  console.log(HR);
  if (summary) console.log("\n  " + chalk.dim(summary) + "\n");

  if (score) {
    const color = score >= 8 ? chalk.green : score >= 5 ? chalk.yellow : chalk.red;
    const bar = color("█".repeat(score)) + chalk.dim("░".repeat(10 - score));
    console.log("  " + bar + "  " + color.bold(score + "/10") + "\n");
  }

  const parts = [
    counts.critical   ? chalk.red.bold(counts.critical + " critical")       : null,
    counts.warning    ? chalk.yellow.bold(counts.warning + " warnings")     : null,
    counts.suggestion ? chalk.blue.bold(counts.suggestion + " suggestions") : null,
  ].filter(Boolean);

  console.log("  " + (parts.length ? parts.join(chalk.dim("  ·  ")) : chalk.green("✓ clean")));
  console.log("\n" + HR + "\n");
}

async function run(diff) {
  if (!diff.trim()) { console.log(chalk.dim("Nothing to review.")); process.exit(0); }

  const key = process.env.GROQ_API_KEY;
  if (!key) { console.error(chalk.red("✗ Set GROQ_API_KEY")); process.exit(1); }

  const spinner = ora(chalk.dim("scanning " + diff.split("\n").length + " lines...")).start();

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1024,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: "Review this diff:\n```diff\n" + diff + "\n```" },
        ],
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || res.statusText);
    spinner.stop();
    renderReview(data.choices[0].message.content);
  } catch (err) {
    spinner.stop();
    console.error(chalk.red("✗ " + err.message));
    process.exit(1);
  }
}

program.name("ai-review").description("AI code review for your git diffs").version("1.0.0");
program.command("staged").description("review staged changes").action(() => run(getDiff("staged")));
program.command("diff [base]").description("review working tree vs base").action((base = "HEAD") => run(getDiff(base)));
program.parse();
