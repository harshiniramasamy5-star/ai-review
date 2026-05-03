# 🤖 AI Review

AI Review is a CLI-based security scanner built with Node.js that analyzes JavaScript files and detects common security vulnerabilities in code. The tool provides developer-friendly warnings, severity levels, and suggestions to improve application security before deployment.

---

## 🚀 Features

* Detects hardcoded passwords
* Detects unsafe `eval()` usage
* Detects insecure HTTP password transmission
* Flags deprecated or insecure modules
* Clean terminal-based review output
* Severity-based issue reporting

---

## 🛠️ Tech Stack

* Node.js
* JavaScript
* CLI Development

---

## 📂 Project Structure

```bash
ai-review/
│
├── src/              # Main CLI logic
├── test.js           # Sample vulnerable file
├── package.json
├── package-lock.json
└── .gitignore
```

---

## ⚡ Installation

Clone the repository:

```bash
git clone https://github.com/harshiniramasamy5-star/ai-review.git
```

Move into the project directory:

```bash
cd ai-review
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Usage

Run the AI review scanner:

```bash
node src/index.js test.js
```

Example output:

```bash
CRITICAL  ai-review/test.js:1
The code is storing a password in plain text, which is a significant security risk.

→ The password should be stored securely, such as using environment variables or a secrets manager.
```

---

## 🔐 Vulnerabilities Currently Detected

* Plain text password storage
* Deprecated MySQL module usage
* Unsafe `eval()` execution
* Password transmission over HTTP

---

## 📈 Future Improvements

* AI-generated code fix suggestions
* Support for multiple programming languages
* GitHub Actions integration
* VS Code extension
* Export reports in JSON/HTML format

---



## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Harshini Ramasamy

GitHub: https://github.com/harshiniramasamy5-star
