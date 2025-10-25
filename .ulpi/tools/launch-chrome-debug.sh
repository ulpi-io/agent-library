#!/bin/bash

# Launch Chrome with remote debugging enabled for MCP server integration
# This allows AI agents to control and interact with Chrome via DevTools Protocol

# Get the port from .mcp.json
MCP_JSON_PATH="$(dirname "$0")/../../.mcp.json"
PORT=$(grep -o 'localhost:[0-9]*' "$MCP_JSON_PATH" | head -1 | cut -d':' -f2)

# Default to 9222 if port not found
if [ -z "$PORT" ]; then
  PORT=9222
  echo "⚠ Could not read port from .mcp.json, using default: $PORT"
fi

echo "Launching Chrome with remote debugging on port $PORT..."

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=$PORT \
  --user-data-dir="$(mktemp -d /tmp/chrome-debug-XXXXXX)" \
  --no-first-run \
  --no-default-browser-check &

echo ""
echo "✓ Chrome launched successfully!"
echo ""
echo "Remote debugging available at: http://localhost:$PORT"
echo "Chrome DevTools Protocol is now accessible to MCP servers"
echo ""
echo "To use with ULPI or Claude Code:"
echo "  - Ensure .mcp.json includes chrome-devtools configuration"
echo "  - Chrome will run in a temporary profile"
echo "  - Close Chrome or press Ctrl+C to stop"
echo ""
