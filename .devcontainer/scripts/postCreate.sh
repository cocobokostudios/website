#!/bin/usr/env bash
# This script is run as the postCreateCommand as configured in  the devcontainer.json file.

# Update NPM
echo "Updating NPM..."
npm install -g npm-check-updates
npm install -g npm@latest

# Setup and fetch Git LFS and content
echo "Installing Git LFS and pulling content..."
git lfs install
git lfs pull
git lfs checkout

# Install Azure Static Web Apps CLI
echo "Installing Azure Static Web Apps CLI..."
npm install -g @azure/static-web-apps-cli

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Install Playwright browsers and dependencies
echo "Installing Playwright..."
npx playwright install --with-deps

# Build the project
echo "Building the project..."
npm run build

# Print completion message
echo "Post-creation setup completed successfully."

