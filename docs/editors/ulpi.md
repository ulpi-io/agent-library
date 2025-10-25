# ULPI

Professional AI agent configurations for ULPI across multiple frameworks.

**Official Website:** [ULPI](https://ulpi.io)

## Overview

ULPI is a powerful AI agent platform that uses structured YAML-based configurations for defining intelligent agents. It provides advanced agent orchestration, task automation, and workflow management capabilities.

## How It Works

ULPI uses **YAML-based agent configurations** in `.ulpi/agents/engineering/` for structured AI agent definitions. These configurations include metadata, role definitions, capabilities, and constraints.

### Key Features
- **Structured Configuration** - YAML format for clear agent definitions
- **Agent Orchestration** - Coordinate multiple agents for complex tasks
- **Workflow Automation** - Define automated workflows and processes
- **MCP Integration** - Enhanced capabilities through Model Context Protocol servers

## Supported Frameworks

| Framework | Agent File | Description |
|-----------|-----------|-------------|
| [Laravel 12.x](../frameworks/laravel.md) | `.ulpi/agents/engineering/laravel-senior-engineer.yaml` | Multi-database, queues, Horizon, service layers |
| [Express.js](../frameworks/express.md) | `.ulpi/agents/engineering/express-senior-engineer.yaml` | REST APIs, middleware, error handling |
| [NestJS](../frameworks/nestjs.md) | `.ulpi/agents/engineering/nestjs-senior-engineer.yaml` | TypeScript enterprise, DI, Bull queues |
| [Next.js 14/15](../frameworks/nextjs.md) | `.ulpi/agents/engineering/nextjs-senior-engineer.yaml` | App Router, Server Components, Server Actions |
| [Remix](../frameworks/remix.md) | `.ulpi/agents/engineering/remix-senior-engineer.yaml` | Full-stack, nested routes, progressive enhancement |
| [Expo React Native](../frameworks/expo-react-native.md) | `.ulpi/agents/engineering/expo-react-native-senior-engineer.yaml` | Cross-platform mobile, native modules |
| [Flutter](../frameworks/flutter.md) | `.ulpi/agents/engineering/flutter-senior-engineer.yaml` | Dart patterns, widget architecture |
| [Magento 2](../frameworks/magento.md) | `.ulpi/agents/engineering/magento-senior-engineer.yaml` | E-commerce, DI, plugins, multi-store |

## Installation

### Quick Install All Frameworks
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors ulpi
```

### Install Specific Framework
```bash
# Laravel
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors ulpi --framework laravel

# Expo React Native
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors ulpi --framework expo-react-native
```

## Configuration

### YAML Agent Format
ULPI agents are defined in YAML with structured fields:
- **Metadata** - Agent name, version, description
- **Role** - Agent's primary function and expertise
- **Capabilities** - What the agent can do
- **Constraints** - Rules and limitations
- **Examples** - Sample interactions and outputs

### Project MCP Configuration
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

## Utility Scripts

The `.ulpi/tools/` directory contains helpful scripts:

### setup.sh
One-command installation script for all AI agent configurations.

```bash
# Interactive installation
bash .ulpi/tools/setup.sh

# Specific framework and editors
bash .ulpi/tools/setup.sh --framework nextjs --editors ulpi,cursor
```

### launch-chrome-debug.sh
Launch Chrome with remote debugging for MCP integration.

```bash
bash .ulpi/tools/launch-chrome-debug.sh
```

Automatically:
- Reads port from `.mcp.json` (defaults to 9222)
- Launches Chrome with remote debugging enabled
- Uses temporary profile directory
- Provides helpful status messages

## Usage Tips

1. **Use YAML structure** - Leverage structured agent definitions
2. **Combine multiple agents** - Orchestrate agents for complex workflows
3. **Customize configurations** - Adapt agents to your specific needs
4. **Leverage utility scripts** - Use provided tools for easier setup

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
