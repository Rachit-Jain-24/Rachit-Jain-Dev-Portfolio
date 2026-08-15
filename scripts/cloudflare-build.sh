#!/bin/bash
# Cloudflare Pages build script - bypasses frozen lockfile
set -e

# Remove lockfile to force rebuild
rm -f bun.lock
rm -f package-lock.json

# Install with npm
npm install

# Build
npm run build

echo "Build complete!"
