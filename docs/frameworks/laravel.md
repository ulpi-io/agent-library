# Laravel 12.x

Professional AI agent configurations for Laravel 12.x development across multiple editors.

## Overview

Laravel agents provide comprehensive guidance for modern Laravel development including:
- Multi-database architectures (MySQL, Redis, DynamoDB)
- Queue systems with Laravel Horizon
- Service layer patterns and dependency injection
- API development with FormRequests and Resources
- Security protocols and testing requirements
- Production-ready patterns and best practices

## Available Agents

### Amazon Q Developer
**File:** `.amazonq/rules/laravel.rule.md`

Automatically applies Laravel coding standards and best practices. Rules are discovered automatically when placed in `.amazonq/rules/` directory.

### Cursor
**File:** `.cursor/agents/laravel/AGENTS.md`

Provides context-aware assistance when working in Laravel directories. Automatically applies when working in the `laravel/` directory or can be manually invoked with `@AGENTS` reference.

### Claude Code
**File:** `.claude/agents/engineering/laravel-senior-engineer.md`

Specialized Laravel guidance for Claude Code users. Manually loaded based on project context.

### ULPI
**File:** `.ulpi/agents/engineering/laravel-senior-engineer.yaml`

YAML-based structured agent configuration for ULPI-compatible systems.

### GitHub Codex
**File:** `.codex/laravel.md`

Automatically copied to `AGENTS.md` in project root during installation. GitHub Codex discovers and applies it automatically.

## Installation

### Quick Install
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --framework laravel
```

### Specific Editor
```bash
# Install only for Cursor
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors cursor --framework laravel
```

## Key Features

### Multi-Database Support
- MySQL for relational data
- Redis for caching and session storage
- DynamoDB for NoSQL requirements
- Proper connection management and query optimization

### Queue Architecture
- Laravel Horizon for queue monitoring
- Job design patterns and failure handling
- Rate limiting and retry strategies
- Background processing best practices

### Service Layer Patterns
- Dependency injection with type-hinted constructors
- Single Responsibility Principle
- Interface-based design
- Repository pattern for data access

### API Development
- FormRequest validation
- API Resource transformations
- RESTful design patterns
- Error handling and response formatting

## Usage Tips

1. **Start with the setup script** - Automatically configures all editors
2. **Use appropriate editor** - Each editor has different activation methods
3. **Follow Laravel conventions** - Agents enforce Laravel best practices
4. **Leverage MCP servers** - Context7 and Chrome DevTools enhance capabilities

## Related Documentation

- [Amazon Q Editor Guide](../editors/amazonq.md)
- [Cursor Editor Guide](../editors/cursor.md)
- [Claude Code Editor Guide](../editors/claude.md)
- [ULPI Editor Guide](../editors/ulpi.md)
- [GitHub Codex Editor Guide](../editors/codex.md)
