# Cursor

Professional AI agent configurations for Cursor across multiple frameworks.

**Official Website:** [Cursor](https://cursor.sh/)

## Overview

Cursor is the AI-first code editor that's designed from the ground up for pair programming with AI. It provides intelligent code completion, chat-based assistance, and context-aware suggestions.

## How It Works

Cursor uses hierarchical **AGENTS.md** files that provide context-aware AI assistance based on your current directory location.

### Key Features
- **Hierarchical Agents** - Combines global + directory-specific instructions
- **Automatic Application** - Agents apply when working in their respective directories
- **Manual Invocation** - Use `@AGENTS` reference in chat to explicitly invoke agents
- **Context-Aware** - Understands your codebase structure and patterns

## Supported Frameworks

| Framework | Agent File | Description |
|-----------|-----------|-------------|
| **Global** | `.cursor/agents/AGENTS.md` | Base instructions for all directories |
| [Laravel 12.x](../frameworks/laravel.md) | `.cursor/agents/laravel/AGENTS.md` | Multi-database, queues, Horizon, service layers |
| [Express.js](../frameworks/express.md) | `.cursor/agents/express/AGENTS.md` | REST APIs, middleware, error handling |
| [NestJS](../frameworks/nestjs.md) | `.cursor/agents/nestjs/AGENTS.md` | TypeScript enterprise, DI, Bull queues |
| [Next.js 14/15](../frameworks/nextjs.md) | `.cursor/agents/nextjs/AGENTS.md` | App Router, Server Components, Server Actions |
| [Remix](../frameworks/remix.md) | `.cursor/agents/remix/AGENTS.md` | Full-stack, nested routes, progressive enhancement |
| [Expo React Native](../frameworks/expo-react-native.md) | `.cursor/agents/expo-react-native/AGENTS.md` | Cross-platform mobile, native modules |
| [Flutter](../frameworks/flutter.md) | `.cursor/agents/flutter/AGENTS.md` | Dart patterns, widget architecture |
| [Magento 2](../frameworks/magento.md) | `.cursor/agents/magento/AGENTS.md` | E-commerce, DI, plugins, multi-store |

## Installation

### Quick Install All Frameworks
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors cursor
```

### Install Specific Framework
```bash
# Express
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors cursor --framework express

# Flutter
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors cursor --framework flutter
```

## Configuration

### Hierarchical Agent System
Cursor combines multiple agent files hierarchically:
1. Global agent (`.cursor/agents/AGENTS.md`)
2. Directory-specific agent (e.g., `.cursor/agents/laravel/AGENTS.md`)

When you work in a framework directory, both the global and framework-specific agents apply.

### Global MCP Configuration
For enhanced capabilities, configure MCP servers in `~/.cursor/mcp.json`:

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

1. **Automatic activation** - Work in framework directories for automatic agent application
2. **Use `@AGENTS` in chat** - Explicitly reference agents in your conversations
3. **Hierarchical context** - Leverage both global and framework-specific guidance
4. **Combine with MCP servers** - Enhanced documentation lookup and browser automation

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
