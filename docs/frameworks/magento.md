# Magento 2

Professional AI agent configurations for Magento 2 development across multiple editors.

## Overview

Magento 2 agents provide comprehensive guidance for e-commerce development including:
- E-commerce architecture and patterns
- Dependency injection and object manager
- Plugin system and interceptors
- Multi-store and multi-website architecture
- EAV (Entity-Attribute-Value) model
- Custom module development and extensions

## Available Agents

### Amazon Q Developer
**File:** `.amazonq/rules/magento.rule.md`

Automatically applies Magento 2 coding standards and best practices. Rules are discovered automatically when placed in `.amazonq/rules/` directory.

**Official Website:** [Amazon Q Developer](https://aws.amazon.com/q/developer/)

### Cursor
**File:** `.cursor/agents/magento/AGENTS.md`

Provides context-aware assistance when working in Magento directories. Automatically applies when working in the `magento/` directory or can be manually invoked with `@AGENTS` reference.

**Official Website:** [Cursor](https://cursor.sh/)

### Claude Code
**File:** `.claude/agents/engineering/magento-senior-engineer.md`

Specialized Magento 2 guidance for Claude Code users. Manually loaded based on project context.

**Official Website:** [Claude Code](https://claude.ai/code)

### ULPI
**File:** `.ulpi/agents/engineering/magento-senior-engineer.yaml`

YAML-based structured agent configuration for ULPI-compatible systems.

**Official Website:** [ULPI](https://ulpi.io)

### GitHub Codex
**File:** `.codex/magento.md`

Automatically copied to `AGENTS.md` in project root during installation. GitHub Codex discovers and applies it automatically.

**Official Website:** [GitHub Codex](https://github.com/features/copilot)

## Installation

### Quick Install
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --framework magento
```

### Specific Editor
```bash
# Install only for Codex
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors codex --framework magento
```

## Key Features

### E-Commerce Architecture
- Catalog management and product types
- Shopping cart and checkout flow
- Order management and fulfillment
- Payment and shipping integrations

### Dependency Injection
- Constructor injection with di.xml
- Virtual types and type configuration
- Plugin system for extensibility
- Proxy and factory patterns

### Plugin System
- Before, after, and around plugins
- Plugin sorting and priority
- Interceptor patterns
- Event observers vs plugins

### Multi-Store Architecture
- Website, store, and store view hierarchy
- Scope-based configuration
- URL rewrites and routing
- Localization and translations

## Usage Tips

1. **Start with the setup script** - Automatically configures all editors
2. **Follow Magento standards** - Agents enforce Magento 2 coding standards
3. **Use dependency injection** - Avoid using ObjectManager directly
4. **Use MCP servers** - Context7 and Chrome DevTools enhance capabilities

## Related Documentation

- [Amazon Q Editor Guide](../editors/amazonq.md)
- [Cursor Editor Guide](../editors/cursor.md)
- [Claude Code Editor Guide](../editors/claude.md)
- [ULPI Editor Guide](../editors/ulpi.md)
- [GitHub Codex Editor Guide](../editors/codex.md)
