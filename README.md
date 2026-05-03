# 🤖 AI Review

AI Review is a CLI-based security scanner built with Node.js that analyzes JavaScript files and detects common security vulnerabilities in code using AI-powered review capabilities through the Groq API.

The tool provides developer-friendly warnings, severity levels, and actionable suggestions to improve application security before deployment.

---

## 🚀 Features

* Detects hardcoded passwords
* Detects unsafe `eval()` usage
* Detects insecure HTTP password transmission
* Flags deprecated or insecure modules
* AI-powered code review using Groq API
* Clean terminal-based review output
* Severity-based issue reporting

---

## 🛠️ Tech Stack

* Node.js
* JavaScript
* Groq API
* CLI Development

---

## 📂 Project Structure

```bash id="bxu5dk"
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

```bash id="tk6dlt"
git clone https://github.com/harshiniramasamy5-star/ai-review.git
```

Move into the project directory:

```bash id="mf0eqh"
cd ai-review
```

Install dependencies:

```bash id="9j6v7w"
npm install
```

---

## 🔑 Setup Groq API Key

Create a `.env` file in the root directory and add your Groq API key:

```env
GROQ_API_KEY=your_api_key_here
```

Get your API key from:

https://console.groq.com/keys

---

## ▶️ Usage

Run the AI review scanner:

```bash id="w86n8d"
node src/index.js test.js
```

Example output:

```bash id="77hh4n"
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

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Harshini Ramasamy

GitHub: https://github.com/harshiniramasamy5-star
