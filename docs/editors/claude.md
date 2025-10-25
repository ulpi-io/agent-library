# Claude Code

Professional AI agent configurations for Claude Code across multiple frameworks.

**Official Website:** [Claude Code](https://claude.ai/code)

## Overview

Claude Code is Anthropic's official CLI for Claude, providing an interactive command-line interface for software engineering tasks. It offers powerful code understanding, generation, and refactoring capabilities with multi-file context awareness.

## How It Works

Claude Code uses agent files in `.claude/agents/engineering/` to provide specialized framework guidance. Agents are manually loaded based on project context and provide comprehensive, production-ready patterns.

### Key Features
- **Deep Context Understanding** - Analyzes multiple files and understands complex codebases
- **Production-Ready Patterns** - Enforces best practices and enterprise standards
- **Interactive Workflow** - Conversational interface for code tasks
- **MCP Integration** - Enhanced capabilities through Model Context Protocol servers

## Supported Frameworks

| Framework | Agent File | Description |
|-----------|-----------|-------------|
| [Laravel 12.x](../frameworks/laravel.md) | `.claude/agents/engineering/laravel-senior-engineer.md` | Multi-database, queues, Horizon, service layers |
| [Express.js](../frameworks/express.md) | `.claude/agents/engineering/express-senior-engineer.md` | REST APIs, middleware, error handling |
| [NestJS](../frameworks/nestjs.md) | `.claude/agents/engineering/nestjs-senior-engineer.md` | TypeScript enterprise, DI, Bull queues |
| [Next.js 14/15](../frameworks/nextjs.md) | `.claude/agents/engineering/nextjs-senior-engineer.md` | App Router, Server Components, Server Actions |
| [Remix](../frameworks/remix.md) | `.claude/agents/engineering/remix-senior-engineer.md` | Full-stack, nested routes, progressive enhancement |
| [Expo React Native](../frameworks/expo-react-native.md) | `.claude/agents/engineering/expo-react-native-senior-engineer.md` | Cross-platform mobile, native modules |
| [Flutter](../frameworks/flutter.md) | `.claude/agents/engineering/flutter-senior-engineer.md` | Dart patterns, widget architecture |
| [Magento 2](../frameworks/magento.md) | `.claude/agents/engineering/magento-senior-engineer.md` | E-commerce, DI, plugins, multi-store |

## Installation

### Quick Install All Frameworks
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors claude
```

### Install Specific Framework
```bash
# NestJS
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors claude --framework nestjs

# Magento
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors claude --framework magento
```

## Configuration

### Agent Management
Agents are stored in `.claude/agents/engineering/` and are manually loaded based on:
- Project context and framework detection
- Explicit user requests
- Task requirements

### Global MCP Configuration
For enhanced capabilities, configure MCP servers in `~/.claude/mcp.json`:

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

## Usage Tips

1. **Start Claude Code in project directory** - Ensures proper context awareness
2. **Reference framework** - Mention your framework for appropriate agent guidance
3. **Leverage MCP servers** - Use Context7 for documentation and Chrome DevTools for testing
4. **Interactive refinement** - Iterate on code with conversational feedback

## MCP Servers

### Context7
Provides up-to-date documentation lookup and context management for modern frameworks and libraries.

### Chrome DevTools
Enables browser automation, testing, and debugging capabilities through Chrome DevTools Protocol. Claude Code can control Chrome directly for E2E testing and debugging.

[Learn more about MCP servers](./mcp-servers.md)

## Related Documentation

- [Installation Guide](../../README.md#quick-start)
- [MCP Servers Setup](./mcp-servers.md)
- [Framework Guides](../frameworks/)
