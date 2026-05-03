# 🤖 AI Review

AI Review is an AI-powered CLI tool that reviews Git diffs and detects security vulnerabilities in JavaScript code using the Groq API and Llama 3.3 70B.

It scans staged changes or diffs from your Git repository and generates developer-friendly security reports with severity levels, explanations, and suggested fixes directly in the terminal.

---

# ✨ Features

* 🔍 Reviews staged Git changes
* 🚨 Detects critical security vulnerabilities
* 🤖 AI-powered analysis using Groq + Llama 3.3 70B
* 🎨 Clean terminal UI with severity indicators
* ⚡ Fast CLI workflow for developers
* 📋 Actionable remediation suggestions

---

# 🛠️ Tech Stack

* Node.js
* JavaScript
* Groq API
* Llama 3.3 70B Versatile
* Commander.js
* Chalk
* Ora

---

# 📂 Project Structure

```bash id="t9vr0t"
ai-review/
│
├── src/
│   └── index.js        # Main CLI logic
│
├── test.js             # Sample vulnerable file
├── package.json
├── package-lock.json
└── .gitignore
```

---

# ⚡ Installation

Clone the repository:

```bash id="s9m19i"
git clone https://github.com/harshiniramasamy5-star/ai-review.git
```

Move into the project folder:

```bash id="zv0kq8"
cd ai-review
```

Install dependencies:

```bash id="1e1nki"
npm install
```

---

# 🔑 Setup API Key

Export your Groq API key:

```bash id="lgm6wq"
export GROQ_API_KEY=your_api_key_here
```

Or create a `.env` file:

```env id="7uwi4u"
GROQ_API_KEY=your_api_key_here
```

Get your API key from:

https://console.groq.com/keys

---

# ▶️ Usage

## Review staged Git changes

```bash id="wk5fq5"
node src/index.js staged
```

## Review current diff against HEAD

```bash id="9r3x2k"
node src/index.js diff
```

## Review against another branch/commit

```bash id="h4tyu8"
node src/index.js diff main
```

---

# 📸 Example Output

```bash id="z3qih2"
──────────────────────────────────────────────────────────────
  ai-review
──────────────────────────────────────────────────────────────

 CRITICAL  ai-review/test.js:3
 The code is using eval() with user input, which is a significant security risk.

 → The code should use a safer way to handle user input.

──────────────────────────────────────────────────────────────

 █░░░░░░░░░  1/10

 4 critical
```

---

# 🔐 Vulnerabilities Detected

Currently detects issues such as:

* Hardcoded passwords
* Unsafe `eval()` usage
* Plaintext HTTP requests
* Deprecated/insecure modules
* Sensitive token exposure
* Insecure authentication patterns

---

# 🚀 Future Improvements

* Support for multiple programming languages
* AI-generated automatic fixes
* GitHub Actions integration
* VS Code extension
* HTML/JSON report export
* Custom security rule configuration

---



# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Harshini Ramasamy

GitHub: https://github.com/harshiniramasamy5-star
