<div align="center">
  <img src="https://ulpi.io/images/logo.svg" alt="ULPI Logo" width="200"/>

  # Agent Library

  **Professional AI Agent Configurations for Multiple Editors**

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Powered by ULPI](https://img.shields.io/badge/Powered%20by-ULPI-blue)](https://ulpi.io)

</div>

---

This repository contains production-ready AI agent configurations for various development frameworks and tools. Supports ULPI, Cursor, Amazon Q, Claude Code, and GitHub Codex.

## Quick Start

### One-Command Installation

Professional installer that downloads only the files you need. Choose which editors to install:

**Interactive Installation** (Recommended - will prompt for framework):
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | bash
```

**Install ALL editors** (default):
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | bash
```

**Install specific editor with framework**:
```bash
# Cursor with Laravel
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors cursor --framework laravel
```

```bash
# Claude Code with Next.js
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors claude --framework nextjs
```

```bash
# Amazon Q with NestJS
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors amazonq --framework nestjs
```

**Install multiple editors**:
```bash
# ULPI and Codex for Expo React Native
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors ulpi,codex --framework expo-react-native
```

**Custom directory**:
```bash
# Install Amazon Q in specific directory
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --target /my/project --editors amazonq --framework magento
```

**Custom Chrome debug port**:
```bash
# Install with custom Chrome port
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --port 9000 --editors claude --framework express
```

**Preview installation** (dry-run):
```bash
# Preview what will be installed without installing
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors cursor --framework flutter --dry-run
```

**Options:**
- `--target DIR` - Target directory (default: current directory)
- `--port PORT` - Chrome debug port (default: 9222)
- `--editors EDITORS` - Editors to install (default: all)
  - `all` - Install all editors (ULPI, Cursor, Amazon Q, Claude Code, Codex)
  - `ulpi` - ULPI AI agent system
  - `cursor` - Cursor AI editor
  - `amazonq` - Amazon Q Developer
  - `claude` - Claude Code
  - `codex` - GitHub Codex (AGENTS.md format)
  - `ulpi,cursor` - Multiple editors (comma-separated)
- `--framework FRAMEWORK` - Framework/stack to use (default: interactive prompt)
  - `laravel` - Laravel 12.x with multi-database, queues, Horizon
  - `express` - Express.js with REST API and middleware patterns
  - `nestjs` - NestJS TypeScript enterprise framework with Bull/BullMQ queues
  - `nextjs` - Next.js 14/15 with App Router, Server Components, Server Actions
  - `expo-react-native` - Expo React Native for cross-platform mobile apps
  - `flutter` - Flutter with Dart for multi-platform development
  - `magento` - Magento 2 e-commerce with dependency injection and plugins
- `--dry-run` - Preview what will be installed without installing
- `--help` - Show help message

**Features:**
- ✅ **Framework selection** - Interactive or CLI-based framework/stack selection
- ✅ **Selective downloads** - Only downloads files for selected editors and framework
- ✅ **Interactive confirmation** - Shows what will be installed before proceeding
- ✅ **Progress tracking** - Real-time download progress
- ✅ **Dry-run mode** - Preview installation without making changes
- ✅ **Smart configuration** - Updates global Amazon Q config only if needed
- ✅ **Professional UI** - Clear, colorful output with progress indicators
- ✅ **Error handling** - Validates inputs and handles failures gracefully

### Manual Installation

Clone the repository and copy the configurations you need:

```bash
git clone https://github.com/ulpi-io/agent-library.git
cd agent-library

# Copy all configurations to your project
cp -r .amazonq /path/to/your/project/
cp -r .cursor /path/to/your/project/
cp -r .claude /path/to/your/project/
cp -r .ulpi /path/to/your/project/
cp .mcp.json /path/to/your/project/
```

## Structure

```
.
├── .amazonq/
│   └── rules/
│       └── laravel.rule.md        # Laravel development rule for Amazon Q
├── .cursor/
│   └── agents/
│       ├── AGENTS.md              # Global Cursor agent instructions
│       └── laravel/
│           └── AGENTS.md          # Laravel Senior Engineer agent for Cursor
├── .claude/
│   └── agents/
│       └── engineering/
│           └── laravel-senior-engineer.md  # Claude Code agent
├── .codex/
│   └── laravel.md                 # Codex Laravel agent (copied to project root as AGENTS.md)
├── .ulpi/
│   ├── agents/
│   │   └── engineering/
│   │       └── laravel-senior-engineer.yaml  # ULPI agent configuration
│   └── tools/
│       ├── launch-chrome-debug.sh # Chrome debugging launch script
│       └── setup.sh               # One-command setup script
└── .mcp.json                      # MCP server configurations
```

## MCP Servers

This project uses Model Context Protocol (MCP) servers to extend AI capabilities:

### Context7
Provides enhanced context management capabilities.

### Chrome DevTools
Allows ULPI and Claude Code to control and interact with Chrome browser via the DevTools Protocol.

#### Setup Chrome DevTools MCP

**1. Launch Chrome with Remote Debugging**

Before using the Chrome DevTools MCP server, you need to launch Chrome with remote debugging enabled:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9222 \
  --user-data-dir="$(mktemp -d /tmp/chrome-debug-XXXXXX)" \
  --no-first-run \
  --no-default-browser-check
```

**Explanation:**
- `--remote-debugging-port=9222`: Enables Chrome DevTools Protocol on port 9222
- `--user-data-dir="$(mktemp -d /tmp/chrome-debug-XXXXXX)"`: Uses a temporary profile directory
- `--no-first-run`: Skips first-run wizards
- `--no-default-browser-check`: Skips default browser check

**2. MCP Configuration**

The Chrome DevTools MCP server is already configured in `.mcp.json`:

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

**3. Usage**

Once Chrome is running with remote debugging and the MCP server is configured, ULPI and Claude Code can:
- Navigate to URLs
- Click elements
- Fill forms
- Take screenshots
- Execute JavaScript
- Inspect page content
- And more browser automation tasks

**Quick Start Script**

Use the included script to launch Chrome for debugging:

```bash
./.ulpi/tools/launch-chrome-debug.sh
```

The script automatically:
- Reads the port from `.mcp.json` (defaults to 9222)
- Launches Chrome with remote debugging enabled
- Uses a temporary profile directory
- Provides helpful status messages

The script is already executable and ready to use.

## Amazon Q Developer Rules

### Laravel Rule

The Laravel development rule (`.amazonq/rules/laravel.rule.md`) provides comprehensive coding standards for Laravel 12.x development:

- Multi-database architectures (MySQL, Redis, DynamoDB)
- Queue systems with Laravel Horizon
- Service layer patterns and dependency injection
- API development with FormRequests and Resources
- Security protocols and testing requirements
- Production-ready patterns and best practices

**Usage in Amazon Q:**
- Place rules in `.amazonq/rules/` directory
- Rules automatically apply to your project
- Supports both project-local and global configurations
- Use Markdown format with `.rule.md` extension

**Global Configuration:**
For global MCP server configuration, create `~/.aws/amazonq/mcp.json`:

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

## Cursor Agents

### Laravel Agent

The Laravel Senior Engineer agent (`.cursor/agents/laravel/AGENTS.md`) provides expert guidance for Laravel 12.x development, including:

- Multi-database architectures (MySQL, Redis, DynamoDB)
- Queue systems with Laravel Horizon
- Service layer patterns
- API development with FormRequests and Resources
- Production-ready patterns and best practices

**Usage in Cursor:**
- Automatically applies when working in the `laravel/` directory
- Manually invoke with `@AGENTS` reference
- Combines hierarchically with parent directory instructions

## ULPI Agents

Located in `.ulpi/agents/engineering/`, these YAML-based agent configurations work with ULPI-compatible systems.

### Tools

The `.ulpi/tools/` directory contains utility scripts:
- `setup.sh` - One-command installation script for setting up all AI agent configurations
- `launch-chrome-debug.sh` - Launch Chrome with remote debugging for MCP integration

## Claude Code Agents

Located in `.claude/agents/engineering/`, these agents provide specialized guidance for Claude Code users.

## GitHub Codex Agents

### AGENTS.md Format

GitHub Codex uses the `AGENTS.md` file in the project root to provide AI assistance. The setup script automatically copies the appropriate framework agent to your project root as `AGENTS.md`.

**Available Framework Agents:**
- `.codex/laravel.md` - Laravel 12.x agent with multi-database, queues, Horizon, and production patterns

**Usage with Codex:**
- The `AGENTS.md` file is automatically discovered in the project root
- Provides comprehensive framework-specific guidance
- Includes code examples, best practices, and production patterns
- Automatically applies when using GitHub Codex

**How it works:**
1. Run the setup script with `--editors codex --framework laravel`
2. The installer downloads `.codex/laravel.md` from the repository
3. The file is automatically copied to `AGENTS.md` in your project root
4. GitHub Codex discovers and uses the `AGENTS.md` file

### MCP Server Configuration

When installing Codex support, the setup script automatically configures MCP servers in the global Codex configuration file.

**Configuration File:** `~/.codex/config.toml`

The installer adds two MCP servers:

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]

[mcp_servers.chrome-devtools]
command = "npx"
args = ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:9222"]
```

**Features:**
- Automatically creates `~/.codex/config.toml` if it doesn't exist
- Safely appends MCP servers if the file already exists
- Preserves existing Codex configuration (model providers, etc.)
- Only adds servers that don't already exist

---

## License

MIT
