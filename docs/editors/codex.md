# GitHub Codex

Professional AI agent configurations for GitHub Codex across multiple frameworks.

**Official Website:** [GitHub Copilot](https://github.com/features/copilot)

## Overview

GitHub Codex (part of GitHub Copilot) provides AI-powered code completion and assistance directly in your workflow. It learns from your codebase and provides contextual suggestions based on your project structure and patterns.

## How It Works

GitHub Codex uses the **AGENTS.md** file in your project root to provide AI assistance. The setup script automatically copies the framework-specific agent to `AGENTS.md` for automatic discovery.

### Key Features
- **Automatic Discovery** - Finds `AGENTS.md` in project root
- **Context-Aware** - Understands your entire codebase
- **Framework-Specific** - Tailored guidance for each framework
- **Code Examples** - Includes patterns and production-ready examples

## Supported Frameworks

| Framework | Source File | Description |
|-----------|------------|-------------|
| [Laravel 12.x](../frameworks/laravel.md) | `.codex/laravel.md` | Multi-database, queues, Horizon, service layers |
| [Express.js](../frameworks/express.md) | `.codex/express.md` | REST APIs, middleware, error handling |
| [NestJS](../frameworks/nestjs.md) | `.codex/nestjs.md` | TypeScript enterprise, DI, Bull queues |
| [Next.js 14/15](../frameworks/nextjs.md) | `.codex/nextjs.md` | App Router, Server Components, Server Actions |
| [Expo React Native](../frameworks/expo-react-native.md) | `.codex/expo-react-native.md` | Cross-platform mobile, native modules |
| [Flutter](../frameworks/flutter.md) | `.codex/flutter.md` | Dart patterns, widget architecture |
| [Magento 2](../frameworks/magento.md) | `.codex/magento.md` | E-commerce, DI, plugins, multi-store |

## Installation

### Quick Install All Frameworks
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors codex
```

### Install Specific Framework
```bash
# Next.js
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors codex --framework nextjs

# Flutter
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors codex --framework flutter
```

## Configuration

### Installation Flow
1. Run setup script with `--editors codex --framework <framework>`
2. Installer downloads `.codex/<framework>.md` from repository
3. File is automatically copied to `AGENTS.md` in project root
4. GitHub Codex discovers and uses the agent configuration

### AGENTS.md File
Place `AGENTS.md` in your project root:
```
your-project/
├── AGENTS.md          ← GitHub Codex reads this
├── src/
├── package.json
└── ...
```

### Global MCP Configuration
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

## Usage Tips

1. **Keep AGENTS.md in project root** - GitHub Codex automatically discovers it
2. **One framework per project** - Each project should have one AGENTS.md file
3. **Update when switching frameworks** - Re-run setup script for different framework
4. **Leverage MCP servers** - Enhanced documentation and browser automation

## MCP Servers

### Context7
Provides enhanced documentation lookup and context management for modern frameworks.

### Chrome DevTools
Enables browser automation, testing, and debugging capabilities through Chrome DevTools Protocol.

[Learn more about MCP servers](./mcp-servers.md)

## Related Documentation

- [Installation Guide](../../README.md#quick-start)
- [MCP Servers Setup](./mcp-servers.md)
- [Framework Guides](../frameworks/)
