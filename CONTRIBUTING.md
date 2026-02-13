# Contributing to DevDojo Backend

First off, thank you for considering contributing to DevDojo Backend! It's people like you that make DevDojo such a great tool.

## 🎯 Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain the behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the JavaScript/Node.js styleguide
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## 🛠️ Development Process

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Setup environment**: Copy `.env.sample` to `.env` and fill in values
4. **Run migrations**: `npx prisma migrate dev`
5. **Start dev server**: `npm run dev`

### Project Structure

```
BACKEND/
├── src/
│   ├── controllers/    # Request handlers
│   ├── routes/         # API routes
│   ├── middleware/     # Express middlewares
│   ├── utils/          # Helper functions
│   └── libs/           # Service integrations
├── prisma/            # Database schema & migrations
└── tests/             # Test files
```

## 📝 Coding Style

### JavaScript Style Guide

* Use ES6+ features
* Use `const` and `let`, never `var`
* Use async/await instead of callbacks
* Use descriptive variable names
* Add comments for complex logic
* Keep functions small and focused

### Example

```javascript
// Good
const getUserById = async (userId) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    throw new ApiError(500, 'Failed to fetch user');
  }
};

// Bad
function getUser(id) {
  db.user.findUnique({ where: { id: id } }, function(err, user) {
    if (err) throw err;
    return user;
  });
}
```

## 🧪 Testing

* Write tests for all new features
* Ensure all tests pass before submitting PR
* Aim for high test coverage

```bash
npm test
npm run test:coverage
```

## 📋 Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### Examples

```
feat: Add user profile endpoint
fix: Resolve JWT token expiration issue
docs: Update API documentation
refactor: Simplify authentication logic
test: Add tests for submission controller
```

## 🔀 Git Workflow

1. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   ```bash
   git add .
   git commit -m "feat: Add amazing feature"
   ```

3. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

4. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

## 📦 Release Process

Maintainers will handle releases following semantic versioning:

* **MAJOR** version for incompatible API changes
* **MINOR** version for new backwards-compatible functionality
* **PATCH** version for backwards-compatible bug fixes

## 🤝 Community

* Join our [Discord](https://discord.com/users/raj.dev_) for discussions
* Follow [@raj_dev_X](https://x.com/raj_dev_X) on X for updates
* Check out [Nishant's Peerlist](https://peerlist.io/Nishant_dev)

## 📧 Contact

* **Maintainer**: Nishant Gaurav
* **Email**: codewithevilxd@gmail.com
* **GitHub**: [@CodewithEvilxd](https://github.com/CodewithEvilxd)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to DevDojo! 🥋✨
