# Contributing to WordWizard

Thank you for your interest in contributing! 🎉

WordWizard is an open-source word and character counter built with React + Vite + TailwindCSS. We welcome contributions of all sizes, from documentation improvements to new features or bug fixes.

---

## Contribution Guidelines

- **Check Issues First:** Before contributing, make sure an issue already exists for the task.  
- **Create an Issue if Needed:** If no related issue exists, create one first before making any changes.  
- **Get Assigned:** Wait to be assigned to the issue before starting work. Unassigned PRs will be **closed**.  
- **Follow Templates:** All issues and PRs **must use** the provided templates in the `CONTRIBUTING.md` file.  
- **No Random PRs:** Avoid submitting PRs that don’t relate to an open, assigned issue.  
- **Commit Messages:** Use clear and descriptive commit messages.  
- **Collaboration:** Be respectful, helpful, and maintain a positive attitude.  
- **Avoid Spam:** Spammy or irrelevant PRs and issues will be marked invalid and may lead to a ban.  
- **Review Before PR:** Double-check your code and ensure it follows project structure and linting rules before opening a PR.

---

## 📝 Issue Template

```
### 🐞 Issue Description

<!-- A clear and concise description of what the bug or issue is. -->
Example: When I click the "Submit" button, the page does not respond and no data is saved.

---

### ✅ Expected Behavior

<!-- Describe what you expected to happen. -->
Example: After clicking "Submit", the form should save the data and redirect to the confirmation page.

---

### ⚙️ Steps To Reproduce

<!-- Steps to reproduce the issue. -->
1. Go to the target page or feature
2. Perform the action
3. Observe the error or unexpected result

---

### 📸 Screenshots

<!-- Add screenshots, error logs, or console output if it helps illustrate the issue. -->
Example:

### 🧠 Additional Context

<!-- Add any other context or information about the problem here. -->
Example: This issue appeared after the recent code refactor.
```

---

## 🧩 Local Setup for Contributions

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

## ⚠️ Keep Your Branch Updated

Before submitting a Pull Request (PR), make sure your branch is up to date with the main repository:

```bash
    # Add upstream remote if not already added
    git remote add upstream https://github.com/palchhinparihar/WordWizard.git
    
    # Fetch latest changes from upstream main
    git fetch upstream
    
    # Update your local main branch
    git checkout main
    git merge upstream/main
    
    # Switch to your feature branch and merge main
    git checkout <your-branch-name>
    git merge main
```

### Resolve merge conflicts (if any)

- Conflicts will appear in your editor with <<<<<<, ======, >>>>>> markers.
- Decide which changes to keep:
  - Current Change → your branch’s changes
  - Incoming Change → main branch changes
  - Accept Both if needed
- Mark conflicts as resolved:

    ```bash
    git add .
    git commit -m "Merged main into <your-branch-name> and resolved conflicts"
    ```

- Push your updated branch:

    ```bash
    git push origin <your-branch-name>
    ```

Then go to the main repository and click **"Compare & Pull"** to create your PR.

## ⚡ Pull Request Template

```
### 📝 Description

<!-- A clear and concise description of what this PR does. -->
Example: This PR fixes a validation bug in the form submission logic.

Fixes #<issue_number> (if applicable)

---

### 🔍 Type of Change

<!-- Please check the relevant options. -->
<!-- Put x between [] -->
- [ ] 🐞 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 🧹 Code refactor (cleanup or optimization)
- [ ] 🧪 Tests added/updated
- [ ] 📝 Documentation update

---

### 🧪 How Has This Been Tested?

<!-- Describe the tests that you ran to verify your changes. -->

Steps:

1. Run the application
2. Perform the relevant action or API call
3. Confirm the expected result occurs

### 📸 Screenshots / Demo (if applicable)

<!-- Add screenshots, GIFs, or short video links showing your changes in action. -->

---

### 🧠 Checklist

<!-- Put x between [] -->
- [ ] My code follows the project's coding style and conventions
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated related documentation (if applicable)
- [ ] My changes generate no new warnings or errors
- [ ] I have linked related issue numbers (if any)
- [ ] All tests pass successfully

---

### 💬 Additional Notes

<!-- Add any other information for reviewers or maintainers. -->
Example: This update prepares the base for future UI enhancements.
```
---

## 🎉 Thank You for Contributing!

Thank you for taking the time to contribute to WordWizard! Your efforts help make this project better for everyone.

- Every contribution, no matter how small, is appreciated.

- If you have any questions or need help while contributing, join our discord comunity:
[WordWizard](https://discord.com/channels/707751027973161132/1429359535218233466)

- Stay respectful, have fun, and happy coding! 💻✨
