<div align="center">
  <img src="media/ulpi-icon-512x512.png" alt="ULPI Logo" width="200"/>

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

## Agents Overview

This repository provides **35 production-ready AI agent configurations** across 5 editors and 7 frameworks.

### Framework × Editor Compatibility Matrix

| Framework | ULPI | Cursor | Amazon Q | Claude Code | Codex |
|-----------|------|--------|----------|-------------|-------|
| **Laravel 12.x** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Express.js** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **NestJS** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Next.js 14/15** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Expo React Native** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Flutter** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Magento 2** | ✅ | ✅ | ✅ | ✅ | ✅ |

### Supported Frameworks

| Framework | Key Features |
|-----------|-------------|
| **Laravel 12.x** | Multi-database (MySQL, Redis, DynamoDB), Queues, Horizon, Service layer patterns, API Resources |
| **Express.js** | REST API patterns, Middleware architecture, Error handling, Route organization |
| **NestJS** | TypeScript enterprise patterns, Dependency injection, Bull/BullMQ queues, Microservices |
| **Next.js 14/15** | App Router, Server Components, Server Actions, React 19, TypeScript |
| **Expo React Native** | Cross-platform mobile (iOS/Android/Web), Native modules, EAS Build/Update |
| **Flutter** | Dart, Multi-platform (iOS/Android/Web/Desktop), Widget architecture, State management |
| **Magento 2** | E-commerce, Dependency injection, Plugin system, Multi-store architecture |

## MCP Servers

This project uses Model Context Protocol (MCP) servers to extend AI capabilities:

### Context7
Provides enhanced context management and documentation lookup capabilities for modern frameworks and libraries.

### Chrome DevTools
Allows ULPI and Claude Code to control and interact with Chrome browser via the DevTools Protocol for browser automation, testing, and debugging.

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

## Amazon Q Developer

Amazon Q uses project-local rules (`.rule.md` files) that automatically apply coding standards and best practices.

### Available Framework Rules

| Framework | File | Description |
|-----------|------|-------------|
| **Laravel 12.x** | `.amazonq/rules/laravel.rule.md` | Multi-database, queues, Horizon, service layers, API patterns |
| **Express.js** | `.amazonq/rules/express.rule.md` | REST APIs, middleware patterns, error handling, routing |
| **NestJS** | `.amazonq/rules/nestjs.rule.md` | TypeScript enterprise, DI, Bull queues, microservices |
| **Next.js 14/15** | `.amazonq/rules/nextjs.rule.md` | App Router, Server Components, Server Actions, React 19 |
| **Expo React Native** | `.amazonq/rules/expo-react-native.rule.md` | Cross-platform mobile, native modules, EAS integration |
| **Flutter** | `.amazonq/rules/flutter.rule.md` | Dart patterns, widget architecture, state management |
| **Magento 2** | `.amazonq/rules/magento.rule.md` | E-commerce patterns, DI, plugins, multi-store |

### Usage

**Automatic Application:**
- Rules in `.amazonq/rules/` automatically apply to your project
- No manual activation required
- Supports both project-local and global configurations

**Global MCP Configuration:**

Create `~/.aws/amazonq/mcp.json` for global MCP server access:

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

The setup script automatically configures this for you.

## Cursor

Cursor uses hierarchical `AGENTS.md` files that provide context-aware AI assistance based on your current directory.

### Available Framework Agents

| Framework | File | Description |
|-----------|------|-------------|
| **Global** | `.cursor/agents/AGENTS.md` | Base instructions for all directories |
| **Laravel 12.x** | `.cursor/agents/laravel/AGENTS.md` | Multi-database, queues, Horizon, service layers |
| **Express.js** | `.cursor/agents/express/AGENTS.md` | REST APIs, middleware, error handling patterns |
| **NestJS** | `.cursor/agents/nestjs/AGENTS.md` | TypeScript enterprise, DI, Bull queues |
| **Next.js 14/15** | `.cursor/agents/nextjs/AGENTS.md` | App Router, Server Components, Server Actions |
| **Expo React Native** | `.cursor/agents/expo-react-native/AGENTS.md` | Cross-platform mobile, native modules |
| **Flutter** | `.cursor/agents/flutter/AGENTS.md` | Dart patterns, widget architecture |
| **Magento 2** | `.cursor/agents/magento/AGENTS.md` | E-commerce, DI, plugins, multi-store |

### Usage

**Automatic Application:**
- Agents automatically apply when working in their respective directories
- Hierarchical: combines global + directory-specific instructions
- Manually invoke with `@AGENTS` reference in chat

**Global MCP Configuration:**

Create `~/.cursor/mcp.json` for global MCP server access:

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

The setup script automatically configures this for you.

## Claude Code

Claude Code uses agent files in `.claude/agents/engineering/` to provide specialized framework guidance.

### Available Framework Agents

| Framework | File | Description |
|-----------|------|-------------|
| **Laravel 12.x** | `.claude/agents/engineering/laravel-senior-engineer.md` | Multi-database, queues, Horizon, service layers |
| **Express.js** | `.claude/agents/engineering/express-senior-engineer.md` | REST APIs, middleware, error handling |
| **NestJS** | `.claude/agents/engineering/nestjs-senior-engineer.md` | TypeScript enterprise, DI, Bull queues |
| **Next.js 14/15** | `.claude/agents/engineering/nextjs-senior-engineer.md` | App Router, Server Components, Server Actions |
| **Expo React Native** | `.claude/agents/engineering/expo-react-native-senior-engineer.md` | Cross-platform mobile, native modules |
| **Flutter** | `.claude/agents/engineering/flutter-senior-engineer.md` | Dart patterns, widget architecture |
| **Magento 2** | `.claude/agents/engineering/magento-senior-engineer.md` | E-commerce, DI, plugins, multi-store |

### Usage

**Manual Invocation:**
- Agents are manually loaded based on project context
- Provide comprehensive framework-specific guidance
- Include best practices, patterns, and production standards

**Global MCP Configuration:**

Create `~/.claude/mcp.json` for global MCP server access:

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

The setup script automatically configures this for you.

## ULPI

ULPI uses YAML-based agent configurations in `.ulpi/agents/engineering/` for structured AI agent definitions.

### Available Framework Agents

| Framework | File | Description |
|-----------|------|-------------|
| **Laravel 12.x** | `.ulpi/agents/engineering/laravel-senior-engineer.yaml` | Multi-database, queues, Horizon, service layers |
| **Express.js** | `.ulpi/agents/engineering/express-senior-engineer.yaml` | REST APIs, middleware, error handling |
| **NestJS** | `.ulpi/agents/engineering/nestjs-senior-engineer.yaml` | TypeScript enterprise, DI, Bull queues |
| **Next.js 14/15** | `.ulpi/agents/engineering/nextjs-senior-engineer.yaml` | App Router, Server Components, Server Actions |
| **Expo React Native** | `.ulpi/agents/engineering/expo-react-native-senior-engineer.yaml` | Cross-platform mobile, native modules |
| **Flutter** | `.ulpi/agents/engineering/flutter-senior-engineer.yaml` | Dart patterns, widget architecture |
| **Magento 2** | `.ulpi/agents/engineering/magento-senior-engineer.yaml` | E-commerce, DI, plugins, multi-store |

### Usage

**YAML Configuration Format:**
- Structured agent definitions with metadata
- Compatible with ULPI-based systems
- Includes role definitions, capabilities, and constraints

**Project MCP Configuration:**

The setup script creates `.ulpi/mcp.json` in your project:

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

### Tools

The `.ulpi/tools/` directory contains utility scripts:
- `setup.sh` - One-command installation script for all AI agent configurations
- `launch-chrome-debug.sh` - Launch Chrome with remote debugging for MCP integration

## GitHub Codex

GitHub Codex uses the `AGENTS.md` file in your project root for AI assistance. The setup script automatically copies the framework-specific agent to `AGENTS.md`.

### Available Framework Agents

| Framework | Source File | Description |
|-----------|------------|-------------|
| **Laravel 12.x** | `.codex/laravel.md` | Multi-database, queues, Horizon, service layers |
| **Express.js** | `.codex/express.md` | REST APIs, middleware, error handling |
| **NestJS** | `.codex/nestjs.md` | TypeScript enterprise, DI, Bull queues |
| **Next.js 14/15** | `.codex/nextjs.md` | App Router, Server Components, Server Actions |
| **Expo React Native** | `.codex/expo-react-native.md` | Cross-platform mobile, native modules |
| **Flutter** | `.codex/flutter.md` | Dart patterns, widget architecture |
| **Magento 2** | `.codex/magento.md` | E-commerce, DI, plugins, multi-store |

### Usage

**Automatic Discovery:**
- Place `AGENTS.md` in your project root
- GitHub Codex automatically discovers and applies it
- Provides comprehensive framework-specific guidance
- Includes code examples, best practices, and production patterns

**Installation Flow:**
1. Run setup: `bash setup.sh --editors codex --framework <framework>`
2. Installer downloads `.codex/<framework>.md` from repository
3. File is automatically copied to `AGENTS.md` in project root
4. GitHub Codex discovers and uses the agent configuration

**Global MCP Configuration:**

The setup script configures MCP servers in `~/.codex/config.toml`:

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]

[mcp_servers.chrome-devtools]
command = "npx"
args = ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:9222"]
```

**Features:**
- Automatically creates `~/.codex/config.toml` if needed
- Safely appends MCP servers without overwriting existing config
- Preserves model providers and other settings
- Only adds missing servers

---

## License

MIT
