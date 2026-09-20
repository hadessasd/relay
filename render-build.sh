#!/usr/bin/env bash
# Render build command: bash render-build.sh
set -euo pipefail
export NITRO_PRESET="${NITRO_PRESET:-node-server}"
export NPM_CONFIG_PRODUCTION=false
export NODE_ENV="${NODE_ENV:-production}"

if [[ -f package-lock.json ]]; then
  npm ci --include=dev
else
  npm install --include=dev
fi

npm run build
