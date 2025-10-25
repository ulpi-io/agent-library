# Express.js

Professional AI agent configurations for Express.js development across multiple editors.

## Overview

Express.js agents provide comprehensive guidance for Node.js REST API development including:
- REST API design patterns and best practices
- Middleware architecture and custom middleware
- Error handling and logging strategies
- Route organization and controller patterns
- Security best practices (helmet, CORS, rate limiting)
- Testing with Jest and Supertest

## Available Agents

### Amazon Q Developer
**File:** `.amazonq/rules/express.rule.md`

Automatically applies Express.js coding standards and best practices. Rules are discovered automatically when placed in `.amazonq/rules/` directory.

**Official Website:** [Amazon Q Developer](https://aws.amazon.com/q/developer/)

### Cursor
**File:** `.cursor/agents/express/AGENTS.md`

Provides context-aware assistance when working in Express.js directories. Automatically applies when working in the `express/` directory or can be manually invoked with `@AGENTS` reference.

**Official Website:** [Cursor](https://cursor.sh/)

### Claude Code
**File:** `.claude/agents/engineering/express-senior-engineer.md`

Specialized Express.js guidance for Claude Code users. Manually loaded based on project context.

**Official Website:** [Claude Code](https://claude.ai/code)

### ULPI
**File:** `.ulpi/agents/engineering/express-senior-engineer.yaml`

YAML-based structured agent configuration for ULPI-compatible systems.

**Official Website:** [ULPI](https://ulpi.io)

### GitHub Codex
**File:** `.codex/express.md`

Automatically copied to `AGENTS.md` in project root during installation. GitHub Codex discovers and applies it automatically.

**Official Website:** [GitHub Codex](https://github.com/features/copilot)

## Installation

### Quick Install
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --framework express
```

### Specific Editor
```bash
# Install only for Claude Code
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors claude --framework express
```

## Key Features

### REST API Patterns
- RESTful resource design
- HTTP method conventions (GET, POST, PUT, DELETE, PATCH)
- Status code usage and response formatting
- API versioning strategies

### Middleware Architecture
- Custom middleware development
- Middleware ordering and execution flow
- Error handling middleware
- Request validation and sanitization

### Error Handling
- Centralized error handling
- Custom error classes
- Async error handling with try-catch
- Error logging and monitoring

### Route Organization
- Router-based modularization
- Controller pattern implementation
- Route parameter validation
- Route grouping and prefixing

## Usage Tips

1. **Start with the setup script** - Automatically configures all editors
2. **Follow Express conventions** - Agents enforce Express.js best practices
3. **Leverage middleware patterns** - Proper middleware ordering and error handling
4. **Use MCP servers** - Context7 and Chrome DevTools enhance capabilities

## Related Documentation

- [Amazon Q Editor Guide](../editors/amazonq.md)
- [Cursor Editor Guide](../editors/cursor.md)
- [Claude Code Editor Guide](../editors/claude.md)
- [ULPI Editor Guide](../editors/ulpi.md)
- [GitHub Codex Editor Guide](../editors/codex.md)
