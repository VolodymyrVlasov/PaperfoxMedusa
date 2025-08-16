#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/deploy/apps/medusa-paperfox"

cd "$APP_DIR"

echo "[1/5] Git pull"
git fetch origin main
git reset --hard origin/main

echo "[2/5] Install deps"
npm ci --omit=dev

echo "[3/5] Build"
npm run build

echo "[4/5] PM2 reload"
pm2 startOrReload ./infra/pm2/ecosystem.config.cjs
pm2 save

echo "[5/5] (Optional) Nginx test+reload if configs changed"
sudo nginx -t && sudo systemctl reload nginx || true

echo "Done."
