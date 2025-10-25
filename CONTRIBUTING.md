# Contributing to PR-CYBR Map Agent

Thank you for your interest in contributing to the PR-CYBR Map Agent! This project follows spec-driven development using the Spec-Kit framework.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/PRCyberMapAgent.git
   cd PRCyberMapAgent
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a branch from dev**
   ```bash
   git checkout dev
   git checkout -b feature/your-feature-name
   ```

## Development Process

### 1. Spec-Driven Development

All changes start with specifications:

1. **Review or Update Specs**
   - Check `specs/map-agent.spec.md` for existing requirements
   - Create new spec sections for new features
   - Update specs for changes to existing features
   - Ensure alignment with `.speckit/constitution.md`

2. **Validate Specs**
   ```bash
   npm run validate:specs
   ```

### 2. Implementation

1. **Write Tests First** (TDD approach recommended)
   ```bash
   # Create test file in tests/unit/ or tests/integration/
   # Run tests (they should fail initially)
   npm test
   ```

2. **Implement the Feature**
   - Follow existing code patterns
   - Keep changes minimal and focused
   - Add inline documentation for complex logic
   - Follow ESLint rules

3. **Ensure Tests Pass**
   ```bash
   npm test
   npm run lint
   ```

### 3. Quality Checks

Before submitting, ensure:

```bash
# Linting passes
npm run lint

# All tests pass
npm test

# Specs are valid
npm run validate:specs

# Agent runs correctly
node src/agent/index.js --status
```

## Code Style

### JavaScript

- Use ES modules (`import`/`export`)
- Follow ESLint configuration (`.eslintrc.json`)
- Use 2-space indentation
- Single quotes for strings (unless escaping needed)
- Semicolons required
- No trailing whitespace

Example:
```javascript
import { something } from './module.js';

function doWork() {
  const result = something();
  return result;
}

export { doWork };
```

### Documentation

- Update README.md for user-facing changes
- Update docs/ARCHITECTURE.md for architectural changes
- Add JSDoc comments for public APIs
- Keep specs up to date

Example:
```javascript
/**
 * Process threat data for visualization
 * @param {Array} data - Array of threat data objects
 * @returns {Object} Processing result with timestamp
 */
async processThreatData(data) {
  // implementation
}
```

## Testing Guidelines

### Unit Tests

- Test individual functions/methods
- Mock external dependencies
- Use descriptive test names
- Group related tests with `describe`

```javascript
describe('MapAgent', () => {
  describe('processThreatData', () => {
    it('should process valid threat data', () => {
      // test implementation
    });
  });
});
```

### Integration Tests

- Test component interactions
- Test pipeline configurations
- Verify file structures
- Test CLI commands

```javascript
describe('Pipeline Configuration', () => {
  it('should have all required workflow files', () => {
    // verification
  });
});
```

## Commit Guidelines

### Commit Messages

Follow the conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Build process or auxiliary tool changes

Example:
```
feat(agent): add real-time threat data processing

Implement real-time processing of threat data with WebSocket support.
Includes validation, transformation, and error handling.

Closes #123
```

### Commit Best Practices

- Keep commits focused on a single concern
- Write clear, descriptive messages
- Reference related issues
- Include co-authors when pair programming

## Pull Request Process

### 1. Target the Dev Branch

All PRs should target the `dev` branch:

```bash
git checkout dev
git checkout -b feature/your-feature
# make changes
git push origin feature/your-feature
```

### 2. PR Description

Include:
- **What**: What changes were made
- **Why**: Why these changes were needed
- **How**: How the changes were implemented
- **Testing**: How the changes were tested
- **Specs**: Link to related specifications

Template:
```markdown
## Description
Brief description of changes

## Related Specs
- [Map Agent Spec](specs/map-agent.spec.md#section)

## Changes Made
- Item 1
- Item 2

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Linting passes
- [ ] Manual testing completed

## Checklist
- [ ] Specs updated
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Code follows style guide
```

### 3. Review Process

1. Automated checks must pass:
   - Linting
   - Tests
   - Spec validation
   - Security scanning

2. Code review by maintainers
3. Address review feedback
4. Approval required before merge

### 4. After Merge

- Changes automatically flow through pipeline
- Dev → QA → Staging → Production → Main
- Monitor GitHub Actions for progression
- Address any pipeline failures

## CI/CD Pipeline

### Pipeline Stages

1. **Dev**: Initial testing and validation
2. **QA**: Integration and security testing
3. **Staging**: Pre-production validation
4. **Production**: Live deployment
5. **Main**: Release archive

### Quality Gates

Each stage has automated quality gates:

- **Linting**: ESLint for code style
- **Testing**: Unit and integration tests
- **Security**: CodeQL, npm audit, Trivy
- **Validation**: Spec validation
- **Building**: Docker container builds

### Monitoring

Watch your changes progress:
1. GitHub Actions tab shows all workflows
2. Each workflow displays job status
3. Logs available for debugging
4. Notifications on failures

## Reporting Issues

### Bug Reports

Include:
- **Description**: What happened vs. what should happen
- **Reproduction**: Steps to reproduce
- **Environment**: Node version, OS, etc.
- **Logs**: Relevant error messages or logs
- **Specs**: Which specs are affected

### Feature Requests

Include:
- **Use Case**: Why is this needed
- **Proposed Spec**: Suggested specification
- **Alternatives**: Other approaches considered
- **Impact**: Who benefits and how

## Development Environment

### Required Tools

- Node.js 20+
- npm (comes with Node.js)
- Git
- Docker (optional, for container testing)

### Recommended Tools

- VS Code with ESLint extension
- GitHub CLI (`gh`)
- Docker Desktop

### Setup

```bash
# Clone repository
git clone https://github.com/PR-CYBR/PRCyberMapAgent.git
cd PRCyberMapAgent

# Install dependencies
npm install

# Run tests to verify setup
npm test

# Start development
npm run dev
```

## Security

### Reporting Vulnerabilities

- **DO NOT** open public issues for security vulnerabilities
- Create a private security advisory on GitHub or contact the maintainers directly
- Include detailed description and reproduction steps
- Allow time for response before public disclosure

### Security Best Practices

- Never commit secrets or credentials
- Use environment variables for sensitive data
- Run security scans locally: `npm audit`
- Keep dependencies updated
- Follow principle of least privilege

## Questions?

- Review documentation in `docs/`
- Check existing issues and PRs
- Read specifications in `specs/`
- Ask in GitHub Discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Code of Conduct

Be respectful, inclusive, and professional. We're all here to build something great together.

---

**Thank you for contributing to PR-CYBR Map Agent!** 🚀
