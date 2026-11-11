#!/usr/bin/env bash
set -e

echo "=== Building production bundle for GitHub Pages ==="
pnpm run build

WORKTREE_DIR=$(mktemp -d -t gh-pages-XXXXXX)
rm -rf "$WORKTREE_DIR"

echo "Setting up temporary worktree for gh-pages..."
git worktree add -B gh-pages "$WORKTREE_DIR"
rm -rf "$WORKTREE_DIR"/*
cp -r dist/* "$WORKTREE_DIR"/
touch "$WORKTREE_DIR"/.nojekyll
cp "$WORKTREE_DIR"/index.html "$WORKTREE_DIR"/404.html

cd "$WORKTREE_DIR"
git add -A
if git diff --staged --quiet; then
  echo "No changes to deploy."
else
  git commit -m "deploy: update GitHub Pages build [$(date -u +'%Y-%m-%d %H:%M:%S UTC')]"
  git push -f origin gh-pages
  echo "Successfully deployed to gh-pages branch!"
fi

cd - > /dev/null
git worktree remove "$WORKTREE_DIR" --force
echo "Deployment complete! Live site: https://elsesourav.github.io/es-react-components/"
