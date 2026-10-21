#!/usr/bin/env bash
# Resilient tunnel daemon for Quanverse public preview
PORT="${1:-5175}"
SUBDOMAIN="${2:-quanverse-edtech}"

echo "[TUNNEL] Initializing public tunnel on port ${PORT} with subdomain ${SUBDOMAIN}..."

while true; do
  echo "[TUNNEL] Launching localtunnel at $(date)..."
  npx localtunnel --port "$PORT" --subdomain "$SUBDOMAIN"
  EXIT_CODE=$?
  echo "[TUNNEL] Process exited with code ${EXIT_CODE}. Restarting in 2s..."
  sleep 2
done
