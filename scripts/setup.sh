#!/bin/bash
# Quick setup script for PR-CYBR Map Agent

set -e

echo "🚀 Setting up PR-CYBR Map Agent..."
echo ""

# Check Node.js version
echo "Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌ Node.js 20 or higher required. Current version: $(node -v)"
  echo "Please install Node.js 20+ from https://nodejs.org/"
  exit 1
fi
echo "✓ Node.js version: $(node -v)"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install
echo "✓ Dependencies installed"

# Run validation
echo ""
echo "Running validation checks..."

echo "  → Validating specs..."
npm run validate:specs
echo "  ✓ Specs valid"

echo "  → Running linter..."
npm run lint
echo "  ✓ Linting passed"

echo "  → Running tests..."
npm test
echo "  ✓ Tests passed"

# Test agent
echo ""
echo "Testing agent..."
node src/agent/index.js --status > /dev/null
echo "✓ Agent operational"

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Setup complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Quick commands:"
echo "  npm start              - Start the agent"
echo "  npm test               - Run tests"
echo "  npm run lint           - Check code style"
echo "  npm run validate:specs - Validate specifications"
echo ""
echo "Development workflow:"
echo "  1. Update specs in specs/"
echo "  2. Write tests in tests/"
echo "  3. Implement in src/"
echo "  4. Push to dev branch"
echo ""
echo "Pipeline: dev → qa → staging → production → main"
echo ""
echo "📚 Documentation:"
echo "  README.md           - Overview and quick start"
echo "  CONTRIBUTING.md     - Contribution guidelines"
echo "  docs/DEVELOPMENT.md - Development guide"
echo "  docs/ARCHITECTURE.md - System architecture"
echo ""
echo "Ready to start developing! 🎉"
