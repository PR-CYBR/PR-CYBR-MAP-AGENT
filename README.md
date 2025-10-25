# PR-CYBR Map Agent

Autonomous agent to update and manage the PR-CYBR Map, orchestrating dynamic cyber threat data visualization and CI/CD pipelines across dev→qa→staging→prod branches using Spec-Kit.

## Overview

The PR-CYBR Map Agent is a spec-driven autonomous system that manages cyber threat visualization and orchestrates a complete CI/CD pipeline. Built on the Spec-Kit framework, it enables self-updating functionality while maintaining human editability and oversight.

## Features

- 🤖 **Autonomous Operation**: Self-managing pipeline with intelligent error handling
- 🔄 **Multi-Stage Pipeline**: Dev → QA → Staging → Production → Main
- ✅ **Quality Gates**: Automated linting, testing, and security scanning
- 🐳 **Containerized**: Docker-based deployment for consistency
- 📊 **Spec-Driven**: All features originate from validated specifications
- 🔒 **Security First**: Automated vulnerability scanning and secure practices

## Quick Start

### Prerequisites

- Node.js 20 or higher
- Docker (for containerization)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/PR-CYBR/PRCyberMapAgent.git
cd PRCyberMapAgent

# Install dependencies
npm install

# Run the agent
npm start
```

### Development

```bash
# Run in development mode with auto-reload
npm run dev

# Run tests
npm test

# Run integration tests
npm run test:integration

# Lint code
npm run lint

# Validate specifications
npm run validate:specs
```

## Architecture

The system follows a multi-stage CI/CD pipeline:

```
dev → qa → staging → production → main
 ↓      ↓       ↓          ↓        ↓
Lint  Integ   Smoke     Deploy   Release
Test  Scan    Perf      Verify    Tag
Build Check   Test      Health   Archive
```

For detailed architecture documentation, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Pipeline Stages

### 1. Dev Branch
- Code enters via `dev` branch
- Automated linting and unit testing
- Specification validation
- Docker image building
- Auto-promotion to QA on success

### 2. QA Branch
- Integration testing
- Security scanning (CodeQL, npm audit, Trivy)
- Container vulnerability checks
- Auto-promotion to staging on success

### 3. Staging Branch
- Pre-production deployment
- Smoke tests
- Performance validation
- Auto-promotion to production on success

### 4. Production Branch
- Live deployment
- Health verification
- Monitoring activation
- Auto-merge to main on success

### 5. Main Branch
- Release archive
- Tagged releases
- Complete audit trail

## Spec-Kit Structure

```
.speckit/
  └── constitution.md       # Core principles and constraints

specs/
  └── map-agent.spec.md     # Agent specifications

.github/workflows/
  ├── dev-ci.yml            # Dev branch CI/CD
  ├── qa-ci.yml             # QA branch CI/CD
  ├── staging-ci.yml        # Staging branch CI/CD
  └── production-deploy.yml # Production deployment

src/agent/
  └── index.js              # Main agent implementation

tests/
  ├── unit/                 # Unit tests
  └── integration/          # Integration tests
```

## Configuration

### Environment Variables

The agent can be configured using environment variables:

- `NODE_ENV`: Environment (development, production)
- `LOG_LEVEL`: Logging level (debug, info, warn, error)

### Workflows

GitHub Actions workflows are configured in `.github/workflows/`. Each stage has its own workflow with appropriate quality gates.

## Testing

### Unit Tests

```bash
npm test
```

### Integration Tests

```bash
npm run test:integration
```

### Manual Testing

```bash
# Check agent version
node src/agent/index.js --version

# View agent status
node src/agent/index.js --status

# Run agent once (no monitoring)
node src/agent/index.js --once
```

## Docker

### Build Container

```bash
docker build -t prcyber-map-agent .
```

### Run Container

```bash
docker run -d --name map-agent prcyber-map-agent
```

### Test Container

```bash
docker run --rm prcyber-map-agent --version
```

## Contributing

1. Fork the repository
2. Create a feature branch from `dev`
3. Make your changes following the spec-driven approach
4. Ensure all tests pass
5. Submit a pull request to `dev` branch

All contributions should:
- Start with a specification
- Include appropriate tests
- Pass linting and security checks
- Follow existing code style

## Security

Security is a top priority. The system includes:

- Automated vulnerability scanning
- Container security checks
- Code analysis with CodeQL
- Regular dependency updates
- Secure secret management

Report security issues to: security@pr-cybr.com

## License

MIT License - see LICENSE file for details

## Documentation

- [Architecture](docs/ARCHITECTURE.md) - System architecture and design
- [Constitution](.speckit/constitution.md) - Core principles and constraints
- [Specification](specs/map-agent.spec.md) - Detailed specifications

## Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Review existing documentation
- Check the spec files for requirements

## Roadmap

- [ ] Phase 1: Foundation (Week 1) ✅
  - [x] Repository structure
  - [x] GitHub Actions workflows
  - [x] Basic testing and linting
  - [x] Branch protection rules

- [ ] Phase 2: Core Pipeline (Week 2)
  - [ ] Enhanced integration tests
  - [ ] Advanced security scanning
  - [ ] Automated deployment scripts
  - [ ] Monitoring integration

- [ ] Phase 3: Agent Logic (Week 3)
  - [ ] Autonomous monitoring
  - [ ] Error handling and retries
  - [ ] Notification system
  - [ ] Operational dashboard

- [ ] Phase 4: Map Integration (Week 4)
  - [ ] Web frontend development
  - [ ] Threat data source integration
  - [ ] Real-time update system
  - [ ] Production deployment

---

**Built with [Spec-Kit](https://speckit.org/) - Spec-Driven Development Framework**
