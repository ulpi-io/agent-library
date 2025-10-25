<div align="center">
  <img src="media/ulpi-icon-512x512.png" alt="ULPI Logo" width="200"/>

  # Agent Library

  **Professional AI Agent Configurations for Multiple Editors**

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Powered by ULPI](https://img.shields.io/badge/Powered%20by-ULPI-blue)](https://ulpi.io)

</div>

---

Production-ready AI agent configurations for **5 editors** × **7 frameworks** = **35 specialized agents**.

Supports: [ULPI](https://ulpi.io) · [Cursor](https://cursor.sh/) · [Amazon Q](https://aws.amazon.com/q/developer/) · [Claude Code](https://claude.ai/code) · [GitHub Codex](https://github.com/features/copilot)

## Documentation

### 📚 Editor Guides
- [Amazon Q Developer](docs/editors/amazonq.md)
- [Cursor](docs/editors/cursor.md)
- [Claude Code](docs/editors/claude.md)
- [ULPI](docs/editors/ulpi.md)
- [GitHub Codex](docs/editors/codex.md)
- [MCP Servers Setup](docs/editors/mcp-servers.md)

### 🚀 Framework Guides
- [Laravel 12.x](docs/frameworks/laravel.md)
- [Express.js](docs/frameworks/express.md)
- [NestJS](docs/frameworks/nestjs.md)
- [Next.js 14/15](docs/frameworks/nextjs.md)
- [Expo React Native](docs/frameworks/expo-react-native.md)
- [Flutter](docs/frameworks/flutter.md)
- [Magento 2](docs/frameworks/magento.md)

## Quick Start

### One-Command Installation

Professional installer that downloads only the files you need. Choose which editors to install:

**Interactive Installation** (Recommended - will prompt for framework):

> **Note:** macOS users need Bash 4.0+. Install with `brew install bash`, then use `/opt/homebrew/bin/bash` (Apple Silicon) or `/usr/local/bin/bash` (Intel) instead of `bash` in the commands below.

```bash
# Linux or modern Bash:
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | bash

# macOS with Homebrew (Apple Silicon):
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | /opt/homebrew/bin/bash

# macOS with Homebrew (Intel):
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | /usr/local/bin/bash
```

**Install ALL editors** (default):
```bash
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | bash
```

**Install specific editor with framework**:
```bash
# Cursor with Laravel
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors cursor --framework laravel
```

```bash
# Claude Code with Next.js
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors claude --framework nextjs
```

```bash
# Amazon Q with NestJS
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors amazonq --framework nestjs
```

**Install multiple editors**:
```bash
# ULPI and Codex for Expo React Native
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors ulpi,codex --framework expo-react-native
```

**Custom directory**:
```bash
# Install Amazon Q in specific directory
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --target /my/project --editors amazonq --framework magento
```

**Custom Chrome debug port**:
```bash
# Install with custom Chrome port
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --port 9000 --editors claude --framework express
```

**Preview installation** (dry-run):
```bash
# Preview what will be installed without installing
curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | \
  bash -s -- --editors cursor --framework flutter --dry-run
```

**Common Options:**
- `--editors` - `all`, `ulpi`, `cursor`, `amazonq`, `claude`, `codex` (comma-separated)
- `--framework` - `laravel`, `express`, `nestjs`, `nextjs`, `expo-react-native`, `flutter`, `magento`
- `--target DIR` - Installation directory (default: current)
- `--port PORT` - Chrome debug port (default: 9222)
- `--dry-run` - Preview without installing
- `--help` - Show full help

**Features:** Interactive selection · Selective downloads · Progress tracking · Dry-run mode · Smart config · Error handling

### Manual Installation

Clone the repository and copy the configurations you need:

```bash
git clone https://github.com/ulpi-io/agent-library.git
cd agent-library

# Copy all configurations to your project
cp -r .amazonq /path/to/your/project/
cp -r .cursor /path/to/your/project/
cp -r .claude /path/to/your/project/
cp -r .ulpi /path/to/your/project/
cp .mcp.json /path/to/your/project/
```

## Structure

```
.
├── .amazonq/
│   └── rules/
│       └── laravel.rule.md        # Laravel development rule for Amazon Q
├── .cursor/
│   └── agents/
│       ├── AGENTS.md              # Global Cursor agent instructions
│       └── laravel/
│           └── AGENTS.md          # Laravel Senior Engineer agent for Cursor
├── .claude/
│   └── agents/
│       └── engineering/
│           └── laravel-senior-engineer.md  # Claude Code agent
├── .codex/
│   └── laravel.md                 # Codex Laravel agent (copied to project root as AGENTS.md)
├── .ulpi/
│   ├── agents/
│   │   └── engineering/
│   │       └── laravel-senior-engineer.yaml  # ULPI agent configuration
│   └── tools/
│       ├── launch-chrome-debug.sh # Chrome debugging launch script
│       └── setup.sh               # One-command setup script
└── .mcp.json                      # MCP server configurations
```

## Features

### 🎯 Comprehensive Coverage
- **35 Agent Configurations** - 5 editors × 7 frameworks
- **Full Compatibility** - Every framework works with every editor
- **Production-Ready** - Enterprise patterns and best practices
- **MCP Integration** - Enhanced capabilities via Context7 and Chrome DevTools

### 📦 Supported Editors
- **[ULPI](docs/editors/ulpi.md)** - YAML-based structured agents
- **[Cursor](docs/editors/cursor.md)** - Hierarchical AGENTS.md files
- **[Amazon Q](docs/editors/amazonq.md)** - Project-local .rule.md files
- **[Claude Code](docs/editors/claude.md)** - Markdown agent files
- **[GitHub Codex](docs/editors/codex.md)** - Root AGENTS.md format

### 🚀 Supported Frameworks
- **[Laravel 12.x](docs/frameworks/laravel.md)** - Multi-database, Queues, Horizon
- **[Express.js](docs/frameworks/express.md)** - REST APIs, Middleware
- **[NestJS](docs/frameworks/nestjs.md)** - TypeScript, DI, Bull Queues
- **[Next.js 14/15](docs/frameworks/nextjs.md)** - App Router, Server Components
- **[Expo React Native](docs/frameworks/expo-react-native.md)** - Cross-platform Mobile
- **[Flutter](docs/frameworks/flutter.md)** - Dart, Multi-platform
- **[Magento 2](docs/frameworks/magento.md)** - E-commerce, DI, Plugins

## MCP Servers

Extend AI capabilities with Model Context Protocol servers. **[Full Setup Guide →](docs/editors/mcp-servers.md)**

### Context7
Enhanced documentation lookup and context management for modern frameworks.

### Chrome DevTools
Browser automation, testing, and debugging via Chrome DevTools Protocol.

**Quick Start:**
```bash
# Launch Chrome with remote debugging
./.ulpi/tools/launch-chrome-debug.sh

# Or manually (macOS)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9222 \
  --user-data-dir="$(mktemp -d)"
```

The setup script automatically configures MCP servers for all editors.

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting pull requests.

## Support

- **Documentation:** Browse [editor guides](docs/editors/) and [framework guides](docs/frameworks/)
- **Issues:** Report bugs or request features on [GitHub Issues](https://github.com/ulpi-io/agent-library/issues)
- **Website:** Visit [ulpi.io](https://ulpi.io) for more information

---

## License

MIT
