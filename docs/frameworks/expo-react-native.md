# Expo React Native

Professional AI agent configurations for Expo React Native development across multiple editors.

## Overview

Expo React Native agents provide comprehensive guidance for cross-platform mobile development including:
- Cross-platform mobile development (iOS, Android, Web)
- Expo SDK features and native modules
- EAS Build and EAS Update integration
- Navigation patterns with React Navigation
- State management and data fetching
- Native features and device APIs

## Available Agents

### Amazon Q Developer
**File:** `.amazonq/rules/expo-react-native.rule.md`

Automatically applies Expo React Native coding standards and best practices. Rules are discovered automatically when placed in `.amazonq/rules/` directory.

**Official Website:** [Amazon Q Developer](https://aws.amazon.com/q/developer/)

### Cursor
**File:** `.cursor/agents/expo-react-native/AGENTS.md`

Provides context-aware assistance when working in Expo React Native directories. Automatically applies when working in the `expo-react-native/` directory or can be manually invoked with `@AGENTS` reference.

**Official Website:** [Cursor](https://cursor.sh/)

### Claude Code
**File:** `.claude/agents/engineering/expo-react-native-senior-engineer.md`

Specialized Expo React Native guidance for Claude Code users. Manually loaded based on project context.

**Official Website:** [Claude Code](https://claude.ai/code)

### ULPI
**File:** `.ulpi/agents/engineering/expo-react-native-senior-engineer.yaml`

YAML-based structured agent configuration for ULPI-compatible systems.

**Official Website:** [ULPI](https://ulpi.io)

### GitHub Codex
**File:** `.codex/expo-react-native.md`

Automatically copied to `AGENTS.md` in project root during installation. GitHub Codex discovers and applies it automatically.

**Official Website:** [GitHub Codex](https://github.com/features/copilot)

## Installation

### Quick Install
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --framework expo-react-native
```

### Specific Editor
```bash
# Install only for Amazon Q
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors amazonq --framework expo-react-native
```

## Key Features

### Cross-Platform Development
- Single codebase for iOS, Android, and Web
- Platform-specific code with Platform API
- Responsive design for different screen sizes
- Platform-specific styling

### Expo SDK Integration
- Camera, location, notifications
- File system and storage
- Authentication and biometrics
- Media library and image picker

### EAS Services
- EAS Build for cloud builds
- EAS Update for OTA updates
- EAS Submit for app store submissions
- Development builds and testing

### Navigation Patterns
- Stack, tab, and drawer navigation
- Deep linking and URL handling
- Type-safe navigation with TypeScript
- Authentication flows

## Usage Tips

1. **Start with the setup script** - Automatically configures all editors
2. **Follow Expo conventions** - Agents enforce Expo best practices
3. **Use managed workflow** - Leverage Expo's managed workflow when possible
4. **Use MCP servers** - Context7 and Chrome DevTools enhance capabilities

## Related Documentation

- [Amazon Q Editor Guide](../editors/amazonq.md)
- [Cursor Editor Guide](../editors/cursor.md)
- [Claude Code Editor Guide](../editors/claude.md)
- [ULPI Editor Guide](../editors/ulpi.md)
- [GitHub Codex Editor Guide](../editors/codex.md)
