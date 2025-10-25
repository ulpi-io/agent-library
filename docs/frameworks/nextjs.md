# Next.js 14/15

Professional AI agent configurations for Next.js development across multiple editors.

## Overview

Next.js agents provide comprehensive guidance for modern React development including:
- App Router architecture and file conventions
- Server Components and Client Components
- Server Actions and data mutations
- React 19 features and patterns
- TypeScript integration and type safety
- Performance optimization and caching strategies

## Available Agents

### Amazon Q Developer
**File:** `.amazonq/rules/nextjs.rule.md`

Automatically applies Next.js coding standards and best practices. Rules are discovered automatically when placed in `.amazonq/rules/` directory.

**Official Website:** [Amazon Q Developer](https://aws.amazon.com/q/developer/)

### Cursor
**File:** `.cursor/agents/nextjs/AGENTS.md`

Provides context-aware assistance when working in Next.js directories. Automatically applies when working in the `nextjs/` directory or can be manually invoked with `@AGENTS` reference.

**Official Website:** [Cursor](https://cursor.sh/)

### Claude Code
**File:** `.claude/agents/engineering/nextjs-senior-engineer.md`

Specialized Next.js guidance for Claude Code users. Manually loaded based on project context.

**Official Website:** [Claude Code](https://claude.ai/code)

### ULPI
**File:** `.ulpi/agents/engineering/nextjs-senior-engineer.yaml`

YAML-based structured agent configuration for ULPI-compatible systems.

**Official Website:** [ULPI](https://ulpi.io)

### GitHub Codex
**File:** `.codex/nextjs.md`

Automatically copied to `AGENTS.md` in project root during installation. GitHub Codex discovers and applies it automatically.

**Official Website:** [GitHub Codex](https://github.com/features/copilot)

## Installation

### Quick Install
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --framework nextjs
```

### Specific Editor
```bash
# Install only for Cursor
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors cursor --framework nextjs
```

## Key Features

### App Router Architecture
- File-based routing conventions
- Layout and template patterns
- Route groups and parallel routes
- Dynamic routes and catch-all segments

### Server Components
- Server-first rendering approach
- Data fetching in Server Components
- Streaming and Suspense boundaries
- Client Component boundaries with 'use client'

### Server Actions
- Form submissions and mutations
- Progressive enhancement
- Type-safe server actions with TypeScript
- Error handling and validation

### React 19 Features
- Enhanced hooks (useFormStatus, useOptimistic)
- Improved Suspense boundaries
- Automatic batching
- Transition APIs

## Usage Tips

1. **Start with the setup script** - Automatically configures all editors
2. **Follow App Router conventions** - Agents enforce Next.js 14/15 patterns
3. **Optimize performance** - Server Components by default, Client Components when needed
4. **Use MCP servers** - Context7 and Chrome DevTools enhance capabilities

## Related Documentation

- [Amazon Q Editor Guide](../editors/amazonq.md)
- [Cursor Editor Guide](../editors/cursor.md)
- [Claude Code Editor Guide](../editors/claude.md)
- [ULPI Editor Guide](../editors/ulpi.md)
- [GitHub Codex Editor Guide](../editors/codex.md)
