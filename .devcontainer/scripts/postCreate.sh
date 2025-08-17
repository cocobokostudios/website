
#!/usr/bin/env bash
# This script is run as the postCreateCommand as configured in the devcontainer.json file.
set -euo pipefail

has_cmd() { command -v "$1" >/dev/null 2>&1; }

# --- Git LFS bootstrap ---
echo "[postCreate] Git LFS bootstrap"

if ! has_cmd git; then
  echo "git not found; please install it in your Dockerfile/image." >&2
  exit 1
fi

# 1) Ensure git-lfs is available (best-effort install for common bases)
if ! has_cmd git-lfs && ! git lfs version >/dev/null 2>&1; then
  echo "[postCreate] Installing git-lfs..."
  if has_cmd apt-get; then
    sudo apt-get update -y && sudo apt-get install -y git-lfs
  elif has_cmd apk; then
    sudo apk add --no-cache git-lfs
  elif has_cmd yum; then
    sudo yum install -y git-lfs
  else
    echo "No known package manager found; please add git-lfs in your Dockerfile." >&2
  fi
fi

# 2) Make sure smudge filter runs (download real bytes, not pointers)
unset GIT_LFS_SKIP_SMUDGE || true
git lfs install --force || true

# 3) Prevent EOL normalization from corrupting binaries
# (Keep consistent for all contributors in the container)
git config core.autocrlf false
git config core.eol lf

# 4) Ensure .gitattributes marks image types as binary and LFS-tracked
# Append rules only if they’re missing. Create file if absent.
if [ ! -f .gitattributes ]; then
  touch .gitattributes
fi
for ext in png jpg jpeg webp gif; do
  if ! grep -qE "^\*\.$ext\s+.*-text" .gitattributes; then
    echo "*.$ext filter=lfs diff=lfs merge=lfs -text" >> .gitattributes
    git add .gitattributes || true
  fi
done

# 5) Fix empty/malformed LFS URL config if present (common cause of broken pulls)
repo_url="$(git config --get remote.origin.url || true)"
if [ -n "$repo_url" ]; then
  current_lfs_url="$(git config -f .lfsconfig --get lfs.url || true)"
  if [ -z "$current_lfs_url" ] || [[ "$current_lfs_url" =~ ^\"\"$ ]]; then
    git config -f .lfsconfig lfs.url "${repo_url}/info/lfs"
    git add .lfsconfig || true
  fi
fi

# 6) Fetch LFS objects and materialize them in the working tree
# Use --all to avoid missing objects referenced by the current branch history
( git lfs fetch --all || git lfs fetch ) || true
( git lfs checkout ) || true

# 7) (Optional) Keep formatters/agents away from binaries to avoid accidental rewrites
if [ ! -f .prettierignore ]; then
  cat > .prettierignore <<'EOF'
public/**/*.png
public/**/*.jpg
public/**/*.jpeg
public/**/*.webp
public/**/*.gif
**/*.png
**/*.jpg
**/*.jpeg
**/*.webp
**/*.gif
EOF
fi

# --- Tooling and project setup ---

# Update NPM
echo "Updating NPM..."
npm install -g npm-check-updates
npm install -g npm@latest

# Install Azure Static Web Apps CLI
echo "Installing Azure Static Web Apps CLI..."
npm install -g @azure/static-web-apps-cli

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Print completion message
echo "Post-creation setup completed successfully."

