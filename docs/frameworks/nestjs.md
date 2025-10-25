# NestJS

Professional AI agent configurations for NestJS development across multiple editors.

## Overview

NestJS agents provide comprehensive guidance for enterprise TypeScript development including:
- TypeScript enterprise patterns and decorators
- Dependency injection and IoC container
- Bull/BullMQ queue integration
- Microservices architecture patterns
- GraphQL and REST API development
- Testing with Jest and E2E testing

## Available Agents

### Amazon Q Developer
**File:** `.amazonq/rules/nestjs.rule.md`

Automatically applies NestJS coding standards and best practices. Rules are discovered automatically when placed in `.amazonq/rules/` directory.

**Official Website:** [Amazon Q Developer](https://aws.amazon.com/q/developer/)

### Cursor
**File:** `.cursor/agents/nestjs/AGENTS.md`

Provides context-aware assistance when working in NestJS directories. Automatically applies when working in the `nestjs/` directory or can be manually invoked with `@AGENTS` reference.

**Official Website:** [Cursor](https://cursor.sh/)

### Claude Code
**File:** `.claude/agents/engineering/nestjs-senior-engineer.md`

Specialized NestJS guidance for Claude Code users. Manually loaded based on project context.

**Official Website:** [Claude Code](https://claude.ai/code)

### ULPI
**File:** `.ulpi/agents/engineering/nestjs-senior-engineer.yaml`

YAML-based structured agent configuration for ULPI-compatible systems.

**Official Website:** [ULPI](https://ulpi.io)

### GitHub Codex
**File:** `.codex/nestjs.md`

Automatically copied to `AGENTS.md` in project root during installation. GitHub Codex discovers and applies it automatically.

**Official Website:** [GitHub Codex](https://github.com/features/copilot)

## Installation

### Quick Install
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --framework nestjs
```

### Specific Editor
```bash
# Install only for ULPI
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors ulpi --framework nestjs
```

## Key Features

### TypeScript Enterprise Patterns
- Decorator-based architecture
- Strong typing and interfaces
- Type-safe dependency injection
- Advanced TypeScript features

### Dependency Injection
- Constructor-based injection
- Provider patterns (class, value, factory)
- Custom providers and scopes
- Module organization

### Queue Integration
- Bull/BullMQ queue processors
- Job scheduling and cron jobs
- Queue event handling
- Rate limiting and concurrency

### Microservices
- Message-based communication
- gRPC and TCP transports
- Event-driven architecture
- Service discovery and health checks

## Usage Tips

1. **Start with the setup script** - Automatically configures all editors
2. **Follow NestJS architecture** - Agents enforce NestJS patterns and conventions
3. **Leverage decorators** - Use NestJS decorators for clean, declarative code
4. **Use MCP servers** - Context7 and Chrome DevTools enhance capabilities

## Related Documentation

- [Amazon Q Editor Guide](../editors/amazonq.md)
- [Cursor Editor Guide](../editors/cursor.md)
- [Claude Code Editor Guide](../editors/claude.md)
- [ULPI Editor Guide](../editors/ulpi.md)
- [GitHub Codex Editor Guide](../editors/codex.md)
