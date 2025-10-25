# Flutter

Professional AI agent configurations for Flutter development across multiple editors.

## Overview

Flutter agents provide comprehensive guidance for multi-platform development including:
- Dart language patterns and best practices
- Widget architecture and composition
- State management (Provider, Riverpod, Bloc)
- Multi-platform development (iOS, Android, Web, Desktop)
- Material Design and Cupertino widgets
- Performance optimization and testing

## Available Agents

### Amazon Q Developer
**File:** `.amazonq/rules/flutter.rule.md`

Automatically applies Flutter coding standards and best practices. Rules are discovered automatically when placed in `.amazonq/rules/` directory.

**Official Website:** [Amazon Q Developer](https://aws.amazon.com/q/developer/)

### Cursor
**File:** `.cursor/agents/flutter/AGENTS.md`

Provides context-aware assistance when working in Flutter directories. Automatically applies when working in the `flutter/` directory or can be manually invoked with `@AGENTS` reference.

**Official Website:** [Cursor](https://cursor.sh/)

### Claude Code
**File:** `.claude/agents/engineering/flutter-senior-engineer.md`

Specialized Flutter guidance for Claude Code users. Manually loaded based on project context.

**Official Website:** [Claude Code](https://claude.ai/code)

### ULPI
**File:** `.ulpi/agents/engineering/flutter-senior-engineer.yaml`

YAML-based structured agent configuration for ULPI-compatible systems.

**Official Website:** [ULPI](https://ulpi.io)

### GitHub Codex
**File:** `.codex/flutter.md`

Automatically copied to `AGENTS.md` in project root during installation. GitHub Codex discovers and applies it automatically.

**Official Website:** [GitHub Codex](https://github.com/features/copilot)

## Installation

### Quick Install
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --framework flutter
```

### Specific Editor
```bash
# Install multiple editors
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors ulpi,cursor --framework flutter
```

## Key Features

### Dart Language Patterns
- Sound null safety
- Extension methods and mixins
- Async/await and Futures
- Stream programming

### Widget Architecture
- StatelessWidget and StatefulWidget
- Widget composition over inheritance
- BuildContext and widget tree
- Custom widget development

### State Management
- Provider for dependency injection
- Riverpod for modern state management
- Bloc pattern for complex state
- setState for simple local state

### Multi-Platform Support
- Single codebase for all platforms
- Platform-specific implementations
- Adaptive widgets for iOS/Android
- Desktop and web optimizations

## Usage Tips

1. **Start with the setup script** - Automatically configures all editors
2. **Follow Flutter conventions** - Agents enforce Flutter and Dart best practices
3. **Choose appropriate state management** - Based on app complexity
4. **Use MCP servers** - Context7 and Chrome DevTools enhance capabilities

## Related Documentation

- [Amazon Q Editor Guide](../editors/amazonq.md)
- [Cursor Editor Guide](../editors/cursor.md)
- [Claude Code Editor Guide](../editors/claude.md)
- [ULPI Editor Guide](../editors/ulpi.md)
- [GitHub Codex Editor Guide](../editors/codex.md)
