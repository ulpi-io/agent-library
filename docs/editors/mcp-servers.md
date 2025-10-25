# MCP Servers

Model Context Protocol (MCP) servers extend AI editor capabilities with specialized tools and services.

## Overview

This project includes two MCP servers that enhance AI capabilities:

1. **Context7** - Enhanced documentation and context management
2. **Chrome DevTools** - Browser automation and debugging

## Context7

**Official Website:** [Context7 MCP](https://github.com/upstash/context7-mcp)

### What It Does
Context7 provides up-to-date documentation lookup and context management for modern frameworks and libraries. It helps AI editors:
- Access latest framework documentation
- Understand API changes and updates
- Provide accurate code examples
- Reference best practices from official docs

### Configuration
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

### Supported Editors
- ✅ Amazon Q Developer (`~/.aws/amazonq/mcp.json`)
- ✅ Cursor (`~/.cursor/mcp.json`)
- ✅ Claude Code (`~/.claude/mcp.json`)
- ✅ ULPI (`.ulpi/mcp.json` in project)
- ✅ GitHub Codex (`~/.codex/config.toml`)

## Chrome DevTools

**Official Website:** [Chrome DevTools MCP](https://github.com/anthropics/chrome-devtools-mcp)

### What It Does
Chrome DevTools MCP allows AI editors to control and interact with Chrome browser via the DevTools Protocol. Capabilities include:
- Navigate to URLs and interact with pages
- Click elements, fill forms, upload files
- Take screenshots and snapshots
- Execute JavaScript in browser context
- Inspect network requests and console logs
- Test web applications end-to-end

### Setup

#### 1. Launch Chrome with Remote Debugging

**macOS:**
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9222 \
  --user-data-dir="$(mktemp -d /tmp/chrome-debug-XXXXXX)" \
  --no-first-run \
  --no-default-browser-check
```

**Linux:**
```bash
google-chrome \
  --remote-debugging-port=9222 \
  --user-data-dir="$(mktemp -d /tmp/chrome-debug-XXXXXX)" \
  --no-first-run \
  --no-default-browser-check
```

**Windows:**
```powershell
"C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --remote-debugging-port=9222 `
  --user-data-dir="%TEMP%\chrome-debug" `
  --no-first-run `
  --no-default-browser-check
```

**Explanation:**
- `--remote-debugging-port=9222` - Enables Chrome DevTools Protocol on port 9222
- `--user-data-dir` - Uses a temporary profile directory
- `--no-first-run` - Skips first-run wizards
- `--no-default-browser-check` - Skips default browser check

#### 2. Use Launch Script (Recommended)

The repository includes a helper script:

```bash
./.ulpi/tools/launch-chrome-debug.sh
```

The script automatically:
- Reads the port from `.mcp.json` (defaults to 9222)
- Launches Chrome with remote debugging enabled
- Uses a temporary profile directory
- Provides helpful status messages

### Configuration

**JSON Format** (Amazon Q, Cursor, Claude Code, ULPI):
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:9222"]
    }
  }
}
```

**TOML Format** (GitHub Codex):
```toml
[mcp_servers.chrome-devtools]
command = "npx"
args = ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:9222"]
```

### Supported Editors
- ✅ Amazon Q Developer (`~/.aws/amazonq/mcp.json`)
- ✅ Cursor (`~/.cursor/mcp.json`)
- ✅ Claude Code (`~/.claude/mcp.json`)
- ✅ ULPI (`.ulpi/mcp.json` in project)
- ✅ GitHub Codex (`~/.codex/config.toml`)

### Custom Port

To use a different port (e.g., 9000):

1. Launch Chrome with custom port:
```bash
--remote-debugging-port=9000
```

2. Update MCP configuration:
```json
"args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:9000"]
```

3. Or use setup script:
```bash
bash .ulpi/tools/setup.sh --port 9000
```

## Installation

### Automatic Setup
The setup script automatically configures both MCP servers for your selected editors:

```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | bash
```

### Manual Setup

#### Amazon Q Developer
Create or edit `~/.aws/amazonq/mcp.json`:
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:9222"]
    }
  }
}
```

#### Cursor
Create or edit `~/.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:9222"]
    }
  }
}
```

#### Claude Code
Create or edit `~/.claude/mcp.json`:
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:9222"]
    }
  }
}
```

#### ULPI
Create `.ulpi/mcp.json` in your project:
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:9222"]
    }
  }
}
```

#### GitHub Codex
Create or edit `~/.codex/config.toml`:
```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]

[mcp_servers.chrome-devtools]
command = "npx"
args = ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:9222"]
```

## Usage Examples

### Context7 Examples
- "Show me the latest Next.js App Router documentation"
- "What's the best way to handle authentication in Laravel 12?"
- "Explain React Server Components"

### Chrome DevTools Examples
- "Open example.com and take a screenshot"
- "Navigate to the login page and fill in the form"
- "Click the submit button and verify the response"
- "Run this E2E test scenario"
- "Check for console errors on the page"

## Troubleshooting

### Chrome DevTools Connection Issues

**Problem:** MCP server can't connect to Chrome

**Solutions:**
1. Verify Chrome is running with remote debugging:
   ```bash
   curl http://localhost:9222/json/version
   ```

2. Check the port matches in both Chrome launch and MCP config

3. Ensure no firewall is blocking port 9222

4. Try restarting Chrome with the debug flags

### Context7 Issues

**Problem:** Documentation not loading

**Solutions:**
1. Verify internet connection
2. Check npx can install packages
3. Try clearing npm cache: `npm cache clean --force`

## Related Documentation

- [Amazon Q Editor Guide](./amazonq.md)
- [Cursor Editor Guide](./cursor.md)
- [Claude Code Editor Guide](./claude.md)
- [ULPI Editor Guide](./ulpi.md)
- [GitHub Codex Editor Guide](./codex.md)
