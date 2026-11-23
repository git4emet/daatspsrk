#!/bin/sh
# Revive the Da'at Spark preview. Idempotent.
cd /workspace || exit 1
if curl -sf -o /dev/null --max-time 1 http://127.0.0.1:8080/; then
  exit 0
fi
npm run dev > /tmp/daat-dev.log 2>&1 &
exit 0
