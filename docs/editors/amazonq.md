# Amazon Q Developer

Professional AI agent configurations for Amazon Q Developer across multiple frameworks.

**Official Website:** [Amazon Q Developer](https://aws.amazon.com/q/developer/)

## Overview

Amazon Q Developer is AWS's AI-powered coding assistant that helps developers build applications faster and more securely. It provides real-time code suggestions, security scanning, and best practice recommendations.

## How It Works

Amazon Q uses project-local **rules** (`.rule.md` files) that automatically apply coding standards and best practices to your project.

### Key Features
- **Automatic Application** - Rules in `.amazonq/rules/` directory are automatically discovered and applied
- **Context-Aware** - Understands your project structure and framework
- **Security First** - Built-in security scanning and vulnerability detection
- **AWS Integration** - Deep integration with AWS services and best practices

## Supported Frameworks

| Framework | Rule File | Description |
|-----------|-----------|-------------|
| [Laravel 12.x](../frameworks/laravel.md) | `.amazonq/rules/laravel.rule.md` | Multi-database, queues, Horizon, service layers |
| [Express.js](../frameworks/express.md) | `.amazonq/rules/express.rule.md` | REST APIs, middleware, error handling |
| [NestJS](../frameworks/nestjs.md) | `.amazonq/rules/nestjs.rule.md` | TypeScript enterprise, DI, Bull queues |
| [Next.js 14/15](../frameworks/nextjs.md) | `.amazonq/rules/nextjs.rule.md` | App Router, Server Components, Server Actions |
| [Expo React Native](../frameworks/expo-react-native.md) | `.amazonq/rules/expo-react-native.rule.md` | Cross-platform mobile, native modules |
| [Flutter](../frameworks/flutter.md) | `.amazonq/rules/flutter.rule.md` | Dart patterns, widget architecture |
| [Magento 2](../frameworks/magento.md) | `.amazonq/rules/magento.rule.md` | E-commerce, DI, plugins, multi-store |

## Installation

### Quick Install All Frameworks
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors amazonq
```

### Install Specific Framework
```bash
# Laravel
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors amazonq --framework laravel

# Next.js
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors amazonq --framework nextjs
```

## Configuration

### Project-Local Configuration
Rules are automatically applied from `.amazonq/rules/` in your project directory.

### Global MCP Configuration
For enhanced capabilities, configure MCP servers in `~/.aws/amazonq/mcp.json`:

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

1. **Place rules in `.amazonq/rules/`** - They're automatically discovered
2. **Use Markdown format** - Rules use `.rule.md` extension
3. **Framework-specific rules** - Each framework has tailored coding standards
4. **Combine with MCP servers** - Enhanced context and browser automation

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
