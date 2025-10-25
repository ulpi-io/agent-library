# Remix

Professional AI agent configurations for Remix development across multiple editors.

## Overview

Remix agents provide comprehensive guidance for full-stack web development including:
- Nested routing and data loading
- Progressive enhancement patterns
- Server-side rendering and streaming
- Form actions and mutations
- TypeScript integration and type safety
- Performance optimization with resource routes

## Available Agents

### Amazon Q Developer
**File:** `.amazonq/rules/remix.rule.md`

Automatically applies Remix coding standards and best practices. Rules are discovered automatically when placed in `.amazonq/rules/` directory.

**Official Website:** [Amazon Q Developer](https://aws.amazon.com/q/developer/)

### Cursor
**File:** `.cursor/agents/remix/AGENTS.md`

Provides context-aware assistance when working in Remix directories. Automatically applies when working in the `remix/` directory or can be manually invoked with `@AGENTS` reference.

**Official Website:** [Cursor](https://cursor.sh/)

### Claude Code
**File:** `.claude/agents/engineering/remix-senior-engineer.md`

Specialized Remix guidance for Claude Code users. Manually loaded based on project context.

**Official Website:** [Claude Code](https://claude.ai/code)

### ULPI
**File:** `.ulpi/agents/engineering/remix-senior-engineer.yaml`

YAML-based structured agent configuration for ULPI-compatible systems.

**Official Website:** [ULPI](https://ulpi.io)

### GitHub Codex
**File:** `.codex/remix.md`

Automatically copied to `AGENTS.md` in project root during installation. GitHub Codex discovers and applies it automatically.

**Official Website:** [GitHub Codex](https://github.com/features/copilot)

## Installation

### Quick Install
```bash
npm install -g @ulpi/agent-library
cd /path/to/your/project
ulpi-agent-library --framework remix
```

### Specific Editor
```bash
# Install only for Cursor
ulpi-agent-library --framework remix --editors cursor
```

## Key Features

### Nested Routing
- File-based routing conventions
- Layout routes and index routes
- Pathless layout routes
- Dynamic segments and splat routes

### Data Loading
- Loader functions for server-side data fetching
- Parallel data loading with nested routes
- Deferred data for streaming
- Client-side data hydration

### Form Actions
- Progressive enhancement with form actions
- Server-side mutations
- Optimistic UI updates
- Error handling and validation

### Performance Optimization
- Resource routes for assets
- Route prefetching
- HTTP caching strategies
- Streaming and suspense

## Usage Tips

1. **Start with the installer** - Automatically configures all editors
2. **Follow Remix conventions** - Agents enforce best practices
3. **Embrace progressive enhancement** - Forms work without JavaScript
4. **Use MCP servers** - Context7 and Chrome DevTools enhance capabilities

## Related Documentation

- [Amazon Q Editor Guide](../editors/amazonq.md)
- [Cursor Editor Guide](../editors/cursor.md)
- [Claude Code Editor Guide](../editors/claude.md)
- [ULPI Editor Guide](../editors/ulpi.md)
- [GitHub Codex Editor Guide](../editors/codex.md)
