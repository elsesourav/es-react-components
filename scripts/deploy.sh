#!/usr/bin/env bash
set -e

echo "=== Building production bundle for components.elsesourav.com ==="
pnpm run build

WORKTREE_DIR=$(mktemp -d -t gh-pages-XXXXXX)
rm -rf "$WORKTREE_DIR"

echo "Setting up temporary worktree for gh-pages..."
git worktree add -B gh-pages "$WORKTREE_DIR"
rm -rf "$WORKTREE_DIR"/*
cp -r dist/* "$WORKTREE_DIR"/
touch "$WORKTREE_DIR"/.nojekyll
cp "$WORKTREE_DIR"/index.html "$WORKTREE_DIR"/404.html

# Ensure CNAME is copied
if [ -f "public/CNAME" ]; then
  cp public/CNAME "$WORKTREE_DIR"/CNAME
fi

cd "$WORKTREE_DIR"
git add -A
if git diff --staged --quiet; then
  echo "No changes to deploy."
else
  git commit -m "deploy: update components.elsesourav.com build [$(date -u +'%Y-%m-%d %H:%M:%S UTC')]"
  git push -f origin gh-pages
  echo "Successfully deployed to gh-pages branch!"
fi

cd - > /dev/null
git worktree remove "$WORKTREE_DIR" --force
echo ""
echo "=== Deployment Succeeded! ==="
echo "Primary Custom Domain: https://components.elsesourav.com/"
echo "Fallback GitHub Pages: https://elsesourav.github.io/es-react-components/"
