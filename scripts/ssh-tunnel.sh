#!/usr/bin/env bash
# Persistent Reverse SSH Tunnel Daemon via localhost.run
PORT="${1:-5175}"

echo "[SSH-TUNNEL] Starting reverse SSH tunnel on port ${PORT}..."

while true; do
  echo "[SSH-TUNNEL] Connecting to localhost.run at $(date)..."
  ssh -o StrictHostKeyChecking=no \
      -o UserKnownHostsFile=/dev/null \
      -o ServerAliveInterval=20 \
      -o ServerAliveCountMax=3 \
      -o ExitOnForwardFailure=yes \
      -R 80:localhost:"$PORT" \
      nokey@localhost.run
  
  EXIT_CODE=$?
  echo "[SSH-TUNNEL] Disconnected with code ${EXIT_CODE}. Reconnecting in 3s..."
  sleep 3
done
