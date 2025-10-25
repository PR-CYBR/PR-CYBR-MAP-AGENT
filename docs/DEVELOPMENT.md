# PR-CYBR Map Agent Development Guide

## Working with the Spec-Kit Framework

This project follows spec-driven development using the Spec-Kit framework. All features and changes should start with specifications.

### Development Workflow

1. **Start with Specs**
   - Review existing specs in `specs/` directory
   - Update or create new specs before coding
   - Ensure specs align with constitution in `.speckit/constitution.md`
   - Run `npm run validate:specs` to validate changes

2. **Implement Changes**
   - Code should follow the specifications
   - Keep changes minimal and focused
   - Follow existing code patterns
   - Add appropriate tests

3. **Test Locally**
   ```bash
   npm run lint        # Check code style
   npm test            # Run all tests
   npm run validate:specs  # Validate specifications
   ```

4. **Commit to Dev Branch**
   - Push changes to `dev` branch
   - CI/CD pipeline automatically triggers
   - Monitor GitHub Actions for results

5. **Pipeline Progression**
   - Dev → QA → Staging → Production → Main
   - Each stage has automated quality gates
   - Failures block progression
   - Successes auto-promote to next stage

### Pipeline Stages

#### Dev Branch
- **Triggers**: Push or PR to dev
- **Quality Gates**: Linting, unit tests, spec validation, Docker build
- **Success**: Auto-promotes to QA

#### QA Branch
- **Triggers**: Auto-promotion from dev
- **Quality Gates**: Integration tests, security scanning, container scanning
- **Success**: Auto-promotes to staging

#### Staging Branch
- **Triggers**: Auto-promotion from QA
- **Quality Gates**: Smoke tests, performance tests, staging deployment
- **Success**: Auto-promotes to production

#### Production Branch
- **Triggers**: Auto-promotion from staging
- **Quality Gates**: Production deployment, health checks, verification
- **Success**: Merges to main with release tag

### Directory Structure

```
.
├── .github/
│   └── workflows/          # CI/CD workflows
├── .speckit/
│   └── constitution.md     # Core principles
├── docs/
│   └── ARCHITECTURE.md     # System architecture
├── specs/
│   └── *.spec.md           # Feature specifications
├── src/
│   └── agent/              # Agent implementation
├── tests/
│   ├── unit/               # Unit tests
│   └── integration/        # Integration tests
├── scripts/
│   └── validate-specs.js   # Spec validation
└── templates/              # Agent templates
```

### Writing Specifications

Specifications should include:

1. **Overview**: High-level description
2. **User Stories**: As a [role], I want [feature] so that [benefit]
3. **Functional Requirements**: Specific capabilities
4. **Non-Functional Requirements**: Performance, security, etc.
5. **Acceptance Criteria**: Testable conditions for completion
6. **Implementation Plan**: Phases and milestones

Example:
```markdown
## User Story
As a security analyst, I want automated threat visualization
so that I can quickly identify emerging patterns.

## Functional Requirements
- FR1: Display threats on interactive map
- FR2: Update in real-time with <500ms latency
- FR3: Support historical data queries

## Acceptance Criteria
- [ ] Map loads in <2 seconds
- [ ] Real-time updates functional
- [ ] 1000+ concurrent users supported
```

### Agent Implementation

The map agent (`src/agent/index.js`) provides:

- **Monitoring**: Watches for repository and data changes
- **Processing**: Transforms threat data for visualization
- **Orchestration**: Manages pipeline workflows
- **Status Reporting**: Provides health and metrics

Key methods:
```javascript
await agent.initialize()        // Setup and configuration
await agent.monitor()           // Start monitoring loop
await agent.processThreatData() // Process threat data
agent.getStatus()               // Get current status
```

### Testing

#### Unit Tests
Test individual components in isolation:
```javascript
// tests/unit/agent.test.js
describe('MapAgent', () => {
  it('should initialize correctly', () => {
    const agent = new MapAgent();
    assert.ok(agent);
  });
});
```

#### Integration Tests
Test component interactions and pipeline:
```javascript
// tests/integration/pipeline.test.js
describe('Pipeline Configuration', () => {
  it('should have all workflow files', () => {
    // Verify workflow files exist
  });
});
```

### Docker

Build and test locally:
```bash
docker build -t prcyber-map-agent .
docker run --rm prcyber-map-agent --version
docker run --rm prcyber-map-agent --status
```

### Troubleshooting

#### Tests Failing
```bash
# Run specific test file
node --test tests/unit/agent.test.js

# Run with verbose output
node --test --test-reporter=spec tests/**/*.test.js
```

#### Linting Errors
```bash
# Auto-fix most issues
npm run lint:fix

# Check specific files
npx eslint src/agent/index.js
```

#### Spec Validation Errors
```bash
# Run validation
npm run validate:specs

# Check spec files manually
cat specs/map-agent.spec.md
```

#### Pipeline Failures
1. Check GitHub Actions tab in repository
2. Review workflow logs for specific job
3. Fix issues locally and push to dev
4. Pipeline will re-run automatically

### Best Practices

1. **Spec First**: Always update specs before code
2. **Small Changes**: Keep commits focused and minimal
3. **Test Coverage**: Maintain high test coverage
4. **Security**: Run security scans locally when possible
5. **Documentation**: Update docs with code changes
6. **Code Style**: Follow ESLint rules consistently
7. **Git Messages**: Write clear, descriptive commit messages

### Common Tasks

#### Add New Feature
1. Update `specs/map-agent.spec.md`
2. Run `npm run validate:specs`
3. Implement in `src/agent/`
4. Add tests in `tests/`
5. Update documentation
6. Push to `dev` branch

#### Fix Bug
1. Add failing test
2. Fix the bug
3. Verify test passes
4. Update specs if needed
5. Push to `dev` branch

#### Update Dependencies
1. Update `package.json`
2. Run `npm install`
3. Run `npm audit`
4. Run tests
5. Update Docker if needed
6. Push to `dev` branch

### Getting Help

- Review specifications in `specs/`
- Check architecture in `docs/ARCHITECTURE.md`
- Read constitution in `.speckit/constitution.md`
- Examine existing code patterns
- Review GitHub Actions workflow logs

### Contributing

All contributions should:
- Start with a specification
- Include appropriate tests
- Pass all quality gates
- Follow code style guidelines
- Update documentation
- Be submitted to `dev` branch

The autonomous system will handle progression through QA, staging, and production.
