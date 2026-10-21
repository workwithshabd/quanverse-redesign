#!/usr/bin/env bash
# Resilient Reverse SSH Tunnel Daemon via Pinggy (port 443)
PORT="${1:-5175}"

echo "[PINGGY-SSH] Starting reverse SSH tunnel on port ${PORT}..."

while true; do
  echo "[PINGGY-SSH] Connecting to a.pinggy.io on port 443 at $(date)..."
  ssh -o StrictHostKeyChecking=no \
      -o UserKnownHostsFile=/dev/null \
      -o ServerAliveInterval=30 \
      -o ServerAliveCountMax=3 \
      -p 443 \
      -T \
      -R 80:localhost:"$PORT" \
      a.pinggy.io
  
  EXIT_CODE=$?
  echo "[PINGGY-SSH] Exited with code ${EXIT_CODE}. Reconnecting in 3s..."
  sleep 3
done
