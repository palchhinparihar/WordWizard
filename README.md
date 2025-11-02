# WordWizard 🧙‍♂️

**A powerful text manipulation tool built with React and Vite for the modern web.**

### **🎉 WOCS**: We are excited to be a part of Code Social!

---

[![Live Demo](https://img.shields.io/website?url=https%3A%2F%2Fwordwizard-texteditor.netlify.app&up_color=brightgreen&up_message=online&down_message=offline&label=Live%20Demo)](https://wordwizard-texteditor.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Stars](https://img.shields.io/github/stars/palchhinparihar/WordWizard)](https://github.com/palchhinparihar/WordWizard/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/palchhinparihar/WordWizard)](https://github.com/palchhinparihar/WordWizard/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/palchhinparihar/WordWizard)](https://github.com/palchhinparihar/WordWizard/issues)

**[Live Demo](https://wordwizard-texteditor.netlify.app) • [Report Bug](https://github.com/palchhinparihar/WordWizard/issues) • [Request Feature](https://github.com/palchhinparihar/WordWizard/issues)**

---

## 📋 Table of Contents

- [WordWizard 🧙‍♂️](#wordwizard)
  - [📋 Table of Contents](#-table-of-contents)
  - [🎯 About](#-about)
  - [⭐ Key Features](#-key-features)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)
    - [Available Scripts](#available-scripts)
  - [📂 Project Structure](#-project-structure)
  - [🤝 Contributing](#-contributing)
  - [👥 Contributors](#-contributors)
  - [⚖️ License](#️-license)
  - [📞 Contact](#-contact)
    - [Project Lead](#project-lead)
    - [Project Links](#project-links)

---

## 🎯 About

> **WordWizard** is a modern, feature-rich text manipulation tool that empowers users to efficiently analyze and transform text content. Built with performance and user experience in mind, it provides a comprehensive suite of text processing features with an intuitive interface.

| Why WordWizard?        | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| 🚀 **Lightning Fast**  | Built with React + Vite for optimal performance.     |
| 🎨 **Customizable**    | Multiple themes and appearance options.              |
| 📱 **Responsive**      | Works seamlessly across all devices.                 |
| 🔐 **Privacy-Focused** | All text processing happens locally in your browser. |

---

## ⭐ Key Features

| Category                 | Feature                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **✍️ Text Manipulation** | • Case conversion (UPPERCASE, lowercase) • Smart space management • Real-time text analysis • One-click copy to clipboard    |
| **📊 Analysis Tools**    | • Detailed word & character counts • Character frequency analysis • Reading time estimation • Text complexity metrics        |
| **🎨 User Experience**   | • Dark/Light mode with multiple themes • Instant results with no page reloads • Auto-save functionality • Smooth transitions |

---

## 🛠️ Tech Stack

| Category             | Technologies                                 |
| -------------------- | -------------------------------------------- |
| **Core**             | `React 18`, `Vite`                           |
| **UI Components**    | `Tailwind CSS`, `CSS Modules`                |
| **State Management** | `React Context API`                          |
| **Dev Tools**        | `ESLint`, `Prettier`, `Husky`, `lint-staged` |
| **Testing**          | `Jest`, `React Testing Library`              |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v16` or higher
- **npm**: `v7` or higher

### Installation Steps

0. **Forking the Repository:**
    
    If you’d like to contribute to WordWizard, start by creating your own copy of the repository.
    Go to the WordWizard GitHub repository:
    https://github.com/palchhinparihar/WordWizard

    Click on the “Fork” button (top-right corner of the page).
    This creates a personal copy of the repository under your GitHub account.


1. **Clone your forked repository:**

   ```bash
   git clone https://github.com/palchhinparihar/WordWizard.git
   cd WordWizard
   ```

2. **Add the upstream remote (original repo)**

   ```bash
   git remote add upstream https://github.com/palchhinparihar/WordWizard.git
   ```

3. **Sync your fork with the main repo:**

   ```bash
   git pull upstream main
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Add .env file:**

    Rename the provided .env-example file to .env and ensure it contains the following line:
    ```env
    VITE_LANUGAGETOOL_API_URL=https://api.languagetool.org/v2/check
    ```

    >Note: Never commit your personal .env file to GitHub. It should remain local for security reasons.


4. **Create a New Branch**

    Before making any changes, create a new branch for your contribution:
    ```bash
    git checkout -b <your-branch-name>
    ```


    Use a descriptive branch name, such as:

    -`fix/navbar-animation`

    -`feature/add-dark-mode-toggle`

    -`docs/update-readme`

5. **Start the development server:**

    ```bash
    npm run dev
    ```

### Available Scripts

- `npm run dev`: Start development server.
- `npm run build`: Create a production build.
- `npm run test`: Run the test suite.
- `npm run lint`: Lint the codebase.

---

## 📂 Project Structure

```text
wordwizard/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, fonts, etc.
│   ├── components/          # React components
│   │   ├── About.jsx
│   │   ├── Alert.jsx
│   │   ├── BackToTopButton.jsx
│   │   ├── DialogBox.jsx
│   │   ├── Dropdown.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── MobileMenu.jsx
│   │   ├── SummaryCard.jsx
│   │   ├── TextForm.jsx
│   │   ├── Toolbar.jsx
│   │   └── Welcome.jsx
│   ├── data/                # Static data
│   │   ├── accordionItems.js
│   │   ├── navbarContent.js
│   │   ├── textUtils.js
│   │   └── themes.js
│   ├── i18n/               # Internationalization
│   │   ├── en.json
│   │   ├── hi.json
│   │   └── index.jsx
│   ├── App.jsx             # Main App component
│   ├── index.css           # Main App style
│   ├── main.jsx            # Entry point
│   └── utils.js            # Utility functions
├── .env-example            # Environment variables
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
└── vite.config.js          # Vite configuration
````

---

## 🤝 Contributing

We welcome contributions! Please see our **[Contributing Guide](CONTRIBUTING.md)** for more details on how to get started.

---

## 👥 Contributors

Thanks to these wonderful people who have contributed to WordWizard:

[![Contributors](https://contrib.rocks/image?repo=palchhinparihar/WordWizard)](https://github.com/palchhinparihar/WordWizard/graphs/contributors)

---

## ⚖️ License

This project is licensed under the MIT License. See the **[LICENSE](LICENSE)** file for details.

---

## 📞 Contact

Any doubt? Send [here](palchhinparihar@gmail.com)

### Project Lead

Palchhin 
[![GitHub](https://img.shields.io/badge/GitHub-%40palchhinparihar-blue?logo=github)](https://github.com/palchhinparihar)

### Project Links

- [GitHub Repository](https://github.com/palchhinparihar/WordWizard)
- [Report Issues](https://github.com/palchhinparihar/WordWizard/issues)
- [Live Demo](https://wordwizard-texteditor.netlify.app)

---

Made with ❤️ by the WordWizard Team
