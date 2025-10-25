#!/bin/bash
# Branch creation helper script
# Creates the branch structure needed for the CI/CD pipeline

set -e

echo "Creating branch structure for PR-CYBR Map Agent pipeline..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "Error: Must be run from repository root"
  exit 1
fi

# Current branch
CURRENT=$(git branch --show-current)
echo "Current branch: $CURRENT"

# Create branches if they don't exist
BRANCHES=("dev" "qa" "staging" "production" "main")

for branch in "${BRANCHES[@]}"; do
  if git show-ref --verify --quiet "refs/heads/$branch"; then
    echo "✓ Branch '$branch' already exists"
  else
    echo "Creating branch '$branch'..."
    git branch "$branch"
    echo "✓ Created branch '$branch'"
  fi
done

echo ""
echo "Branch structure created successfully!"
echo ""
echo "Pipeline flow: dev → qa → staging → production → main"
echo ""
echo "Next steps:"
echo "1. Push all branches to remote: git push origin --all"
echo "2. Set up branch protection rules on GitHub"
echo "3. Configure GitHub environments (staging, production)"
echo "4. Start development on 'dev' branch"
echo ""
echo "To switch to dev branch: git checkout dev"
