#!/bin/usr/env bash
# This script is run as the postCreateCommand as configured in  the devcontainer.json file.

# Update NPM
npm install -g npm-check-updates
npm install -g npm@latest

# Install Tools
npm install -g @azure/static-web-apps-cli