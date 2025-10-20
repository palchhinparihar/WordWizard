# WordWizard 🧙‍♂️ [![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://wordwizard-texteditor.netlify.app) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> A powerful text manipulation tool built with React and Vite for the modern web

[Live Demo](https://wordwizard-texteditor.netlify.app) | [Report Bug](https://github.com/adamstosho/WordWizard/issues) | [Request Feature](https://github.com/adamstosho/WordWizard/issues)

## 📋 Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [Performance](#performance)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

## 🎯 About

**WordWizard** is a modern, feature-rich text manipulation tool that empowers users to efficiently analyze and transform text content. Built with performance and user experience in mind, it provides a comprehensive suite of text processing features with an intuitive interface.

### Why WordWizard?

- 🚀 **Lightning Fast**: Built with React + Vite for optimal performance
- 🎨 **Customizable**: Multiple themes and appearance options
- 📱 **Responsive**: Works seamlessly across all devices
- 🔐 **Privacy-Focused**: All text processing happens locally in the browser

## ⭐ Key Features

### Text Manipulation
- 🔠 Case conversion (UPPERCASE, lowercase, Title Case)
- 🧹 Smart space management and formatting
- 📝 Real-time text analysis
- 📋 One-click copy to clipboard

### Analysis Tools
- 📊 Detailed word count statistics
- 🔍 Character frequency analysis
- ⏱️ Reading time estimation
- � Text complexity metrics

### User Experience
- 🌗 Dark/Light mode with smooth transitions
- 🎨 Multiple theme options (Dark Green, Brown, Purple)
- ⚡ Instant results with no page reloads
- 💾 Auto-save functionality

## 🛠️ Tech Stack

### Core Technologies
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **UI Components**: Bootstrap 5
- **State Management**: React Context API
- **Styling**: CSS Modules + Tailwind CSS

### Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **Git Hooks**: Husky + lint-staged

## � Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/adamstosho/WordWizard.git
cd WordWizard
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables
```bash
cp .env.example .env
```

Add the following to your `.env` file:
```env
VITE_LANUGAGETOOL_API_URL=https://api.languagetool.org/v2/check
```
> Note: The LanguageTool API is rate-limited to 20 requests per minute per IP address.

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run test` - Run test suite
- `npm run lint` - Lint code
- `npm run format` - Format code

## 📖 Usage Guide

### Basic Operations

1. **Text Input**: Paste or type your text in the main editor
2. **Case Conversion**: Use the toolbar buttons to transform text case
3. **Space Management**: Click 'Remove Extra Spaces' for clean formatting
4. **Copy Results**: Use the copy button to save results to clipboard

### Advanced Features

- **Theme Customization**: Access theme menu via settings icon
- **Statistics Panel**: View detailed text analytics in the sidebar
- **Keyboard Shortcuts**: Use Ctrl/Cmd + key combinations for quick actions

## 📂 Project Structure

```
wordwizard/
├── public/                # Static assets
├── src/
│   ├── assets/           # Images and other assets
│   ├── components/       # React components
│   │   ├── About.jsx
│   │   ├── Alert.jsx
│   │   ├── DialogBox.jsx
│   │   ├── Navbar.jsx
│   │   ├── TextForm.jsx
│   │   └── Welcome.jsx
│   ├── data/            # Static data and configurations
│   │   ├── accordionItems.js
│   │   └── textUtils.js
│   ├── App.css          # App-specific styles
│   ├── App.jsx          # Main App component
│   ├── index.css        # Global styles
│   ├── main.jsx         # Entry point
│   └── utils.js         # Utility functions
├── .env                 # Environment variables
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Hacktoberfest 2025 🎃

We're participating in Hacktoberfest 2025! Look for issues tagged with:
- `good-first-issue`
- `hacktoberfest`
- `help-wanted`

## 📦 Deployment

WordWizard is deployed on Netlify with continuous deployment from the main branch.

### Deployment Configuration

```yml
build:
  command: npm run build
  publish: dist
  environment:
    NODE_VERSION: 16
```

## 📊 Performance

- Lighthouse Score: 98/100
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Bundle Size: < 100KB (gzipped)

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Advanced text analysis features
- [ ] Collaborative editing
- [ ] PWA support
- [ ] Custom theme creator

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- GitHub: [@palchhinparihar](https://github.com/palchhinparihar)
- Project Link: [https://github.com/palchhinparihar/WordWizard](https://github.com/palchhinparihar/WordWizard)

---

<p align="center">Made with ❤️ by the WordWizard Team</p>
