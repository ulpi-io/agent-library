#!/bin/bash

# AI Agents Setup Script
# https://github.com/ulpi-io/agent-library
#
# Professional installer for AI agent configurations
# Usage: bash setup.sh [options]
#
# Options:
#   --target DIR          Target directory (default: current directory)
#   --port PORT           Chrome debug port (default: 9222)
#   --editors EDITORS     Editors to install: all, ulpi, cursor, amazonq, claude, codex
#   --framework FRAMEWORK Framework to use: laravel, nextjs, nodejs, react-native, magento
#   --dry-run             Show what would be installed without actually installing
#   --help                Show this help message

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Default values
TARGET_DIR="."
CHROME_PORT="9222"
EDITORS="all"
FRAMEWORK=""
DRY_RUN=false
REPO_URL="https://raw.githubusercontent.com/ulpi-io/agent-library/main"

# Parse command line arguments
show_help() {
    cat << EOF
AI Agents Setup Script
https://github.com/ulpi-io/agent-library

Professional installer for AI agent configurations supporting ULPI, Cursor, Amazon Q, Claude Code, and Codex.

USAGE:
    bash setup.sh [OPTIONS]

OPTIONS:
    --target DIR          Target directory (default: current directory)
    --port PORT           Chrome debug port (default: 9222)
    --editors EDITORS     Editors to install (default: all)
                         Options: all, ulpi, cursor, amazonq, claude, codex
                         Use comma-separated list for multiple: ulpi,cursor
    --framework FRAMEWORK Framework/stack to use (default: interactive prompt)
                         Options: laravel, nextjs, nodejs, react-native, magento
    --dry-run            Show what would be installed without installing
    --help               Show this help message

EXAMPLES:
    # Interactive installation (will prompt for framework)
    bash setup.sh

    # Install only Cursor with Laravel framework
    bash setup.sh --editors cursor --framework laravel

    # Install ULPI and Codex for Next.js
    bash setup.sh --editors ulpi,codex --framework nextjs

    # Preview what would be installed
    bash setup.sh --editors amazonq --framework nodejs --dry-run

    # Remote installation with curl
    curl -fsSL https://raw.githubusercontent.com/ulpi-io/agent-library/main/.ulpi/tools/setup.sh | bash -s -- --editors cursor --framework laravel

SUPPORTED EDITORS:
    ulpi      - ULPI AI agent system
    cursor    - Cursor AI editor
    amazonq   - Amazon Q Developer
    claude    - Claude Code
    codex     - GitHub Codex / AGENTS.md format
    all       - Install all editors (default)

SUPPORTED FRAMEWORKS:
    laravel       - Laravel 12.x (PHP, MySQL, Redis, DynamoDB, Horizon)
    express       - Express.js (Node.js, REST API, middleware patterns)
    nestjs        - NestJS (TypeScript, enterprise Node.js framework)
    nextjs        - Next.js (React, TypeScript)
    expo-react-native - Expo React Native (iOS, Android, web)
    flutter       - Flutter (Dart, iOS, Android, web, desktop)
    magento       - Magento 2 e-commerce

🤖 Generated with https://ulpi.io
EOF
    exit 0
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --target)
            TARGET_DIR="$2"
            shift 2
            ;;
        --port)
            CHROME_PORT="$2"
            shift 2
            ;;
        --editors)
            EDITORS="$2"
            shift 2
            ;;
        --framework)
            FRAMEWORK="$2"
            shift 2
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --help|-h)
            show_help
            ;;
        *)
            echo -e "${RED}✗${NC} Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Parse editor selections
INSTALL_ULPI=false
INSTALL_CURSOR=false
INSTALL_AMAZONQ=false
INSTALL_CLAUDE=false
INSTALL_CODEX=false

if [ "$EDITORS" = "all" ]; then
    INSTALL_ULPI=true
    INSTALL_CURSOR=true
    INSTALL_AMAZONQ=true
    INSTALL_CLAUDE=true
    INSTALL_CODEX=true
else
    IFS=',' read -ra EDITOR_ARRAY <<< "$EDITORS"
    for editor in "${EDITOR_ARRAY[@]}"; do
        editor=$(echo "$editor" | xargs) # Trim whitespace
        case "$editor" in
            ulpi)
                INSTALL_ULPI=true
                ;;
            cursor)
                INSTALL_CURSOR=true
                ;;
            amazonq)
                INSTALL_AMAZONQ=true
                ;;
            claude)
                INSTALL_CLAUDE=true
                ;;
            codex)
                INSTALL_CODEX=true
                ;;
            *)
                echo -e "${RED}✗${NC} Unknown editor: $editor"
                echo "Valid options: ulpi, cursor, amazonq, claude, codex, all"
                exit 1
                ;;
        esac
    done
fi

# Validate at least one editor is selected
if [ "$INSTALL_ULPI" = false ] && [ "$INSTALL_CURSOR" = false ] && [ "$INSTALL_AMAZONQ" = false ] && [ "$INSTALL_CLAUDE" = false ] && [ "$INSTALL_CODEX" = false ]; then
    echo -e "${RED}✗${NC} No editors selected. Please specify at least one editor."
    echo "Use --help for usage information"
    exit 1
fi

# Helper functions
print_header() {
    echo -e "\n${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║${NC}  $(printf "%-57s" "$1")${BLUE}║${NC}"
    echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}\n"
}

print_section() {
    echo -e "\n${CYAN}▶ $1${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

print_warning() {
    echo -e "${MAGENTA}⚠${NC} $1"
}

# Framework selection if not provided
if [ -z "$FRAMEWORK" ]; then
    clear
    print_header "Framework Selection"

    echo -e "${CYAN}Which framework/stack are you using?${NC}\n"
    echo -e "  ${GREEN}1${NC}) Laravel       - Laravel 12.x with multi-database, queues, Horizon"
    echo -e "  ${GREEN}2${NC}) Express       - Express.js with REST API and middleware patterns"
    echo -e "  ${GREEN}3${NC}) NestJS        - NestJS TypeScript enterprise Node.js framework"
    echo -e "  ${GREEN}4${NC}) Next.js       - Next.js with React and TypeScript"
    echo -e "  ${GREEN}5${NC}) Expo React Native - Cross-platform mobile with Expo"
    echo -e "  ${GREEN}6${NC}) Flutter       - Cross-platform with Dart and Flutter SDK"
    echo -e "  ${GREEN}7${NC}) Magento       - Magento 2 e-commerce"
    echo ""

    read -p "$(echo -e ${CYAN}Enter your choice [1-7]:${NC} )" choice

    case $choice in
        1)
            FRAMEWORK="laravel"
            ;;
        2)
            FRAMEWORK="express"
            ;;
        3)
            FRAMEWORK="nestjs"
            ;;
        4)
            FRAMEWORK="nextjs"
            ;;
        5)
            FRAMEWORK="expo-react-native"
            ;;
        6)
            FRAMEWORK="flutter"
            ;;
        7)
            FRAMEWORK="magento"
            ;;
        *)
            echo -e "${RED}✗${NC} Invalid choice. Defaulting to Laravel."
            FRAMEWORK="laravel"
            ;;
    esac
    echo ""
fi

# Validate framework
case "$FRAMEWORK" in
    laravel|express|nestjs|nextjs|nodejs|expo-react-native|react-native|flutter|magento)
        # Valid framework (map react-native alias to expo-react-native)
        if [ "$FRAMEWORK" = "react-native" ]; then
            FRAMEWORK="expo-react-native"
        fi
        ;;
    *)
        echo -e "${RED}✗${NC} Unknown framework: $FRAMEWORK"
        echo "Valid options: laravel, express, nestjs, nextjs, expo-react-native, flutter, magento"
        exit 1
        ;;
esac

# Define files to download for each editor based on framework
declare -A FILES_TO_DOWNLOAD

# Always download Chrome launch script (needed for all MCP servers)
FILES_TO_DOWNLOAD[".ulpi/tools/launch-chrome-debug.sh"]="Chrome debug launcher script"

# Map framework to agent file paths
if [ "$FRAMEWORK" = "laravel" ]; then
    if [ "$INSTALL_ULPI" = true ]; then
        FILES_TO_DOWNLOAD[".ulpi/agents/engineering/laravel-senior-engineer.yaml"]="ULPI Laravel agent configuration"
    fi

    if [ "$INSTALL_CURSOR" = true ]; then
        FILES_TO_DOWNLOAD[".cursor/agents/AGENTS.md"]="Cursor global agent instructions"
        FILES_TO_DOWNLOAD[".cursor/agents/laravel/AGENTS.md"]="Cursor Laravel agent"
    fi

    if [ "$INSTALL_AMAZONQ" = true ]; then
        FILES_TO_DOWNLOAD[".amazonq/rules/laravel.rule.md"]="Amazon Q Laravel development rule"
    fi

    if [ "$INSTALL_CLAUDE" = true ]; then
        FILES_TO_DOWNLOAD[".claude/agents/engineering/laravel-senior-engineer.md"]="Claude Code Laravel agent"
    fi

    if [ "$INSTALL_CODEX" = true ]; then
        FILES_TO_DOWNLOAD[".codex/laravel.md"]="Codex Laravel agent (source file)"
    fi
elif [ "$FRAMEWORK" = "express" ]; then
    if [ "$INSTALL_ULPI" = true ]; then
        FILES_TO_DOWNLOAD[".ulpi/agents/engineering/express-senior-engineer.yaml"]="ULPI Express agent configuration"
    fi

    if [ "$INSTALL_CURSOR" = true ]; then
        FILES_TO_DOWNLOAD[".cursor/agents/AGENTS.md"]="Cursor global agent instructions"
        FILES_TO_DOWNLOAD[".cursor/agents/express/AGENTS.md"]="Cursor Express agent"
    fi

    if [ "$INSTALL_AMAZONQ" = true ]; then
        FILES_TO_DOWNLOAD[".amazonq/rules/express.rule.md"]="Amazon Q Express development rule"
    fi

    if [ "$INSTALL_CLAUDE" = true ]; then
        FILES_TO_DOWNLOAD[".claude/agents/engineering/express-senior-engineer.md"]="Claude Code Express agent"
    fi

    if [ "$INSTALL_CODEX" = true ]; then
        FILES_TO_DOWNLOAD[".codex/express.md"]="Codex Express agent (source file)"
    fi
elif [ "$FRAMEWORK" = "nestjs" ]; then
    if [ "$INSTALL_ULPI" = true ]; then
        FILES_TO_DOWNLOAD[".ulpi/agents/engineering/nestjs-senior-engineer.yaml"]="ULPI NestJS agent configuration"
    fi

    if [ "$INSTALL_CURSOR" = true ]; then
        FILES_TO_DOWNLOAD[".cursor/agents/AGENTS.md"]="Cursor global agent instructions"
        FILES_TO_DOWNLOAD[".cursor/agents/nestjs/AGENTS.md"]="Cursor NestJS agent"
    fi

    if [ "$INSTALL_AMAZONQ" = true ]; then
        FILES_TO_DOWNLOAD[".amazonq/rules/nestjs.rule.md"]="Amazon Q NestJS development rule"
    fi

    if [ "$INSTALL_CLAUDE" = true ]; then
        FILES_TO_DOWNLOAD[".claude/agents/engineering/nestjs-senior-engineer.md"]="Claude Code NestJS agent"
    fi

    if [ "$INSTALL_CODEX" = true ]; then
        FILES_TO_DOWNLOAD[".codex/nestjs.md"]="Codex NestJS agent (source file)"
    fi
elif [ "$FRAMEWORK" = "nextjs" ]; then
    if [ "$INSTALL_ULPI" = true ]; then
        FILES_TO_DOWNLOAD[".ulpi/agents/engineering/nextjs-senior-engineer.yaml"]="ULPI Next.js agent configuration"
    fi

    if [ "$INSTALL_CURSOR" = true ]; then
        FILES_TO_DOWNLOAD[".cursor/agents/AGENTS.md"]="Cursor global agent instructions"
        FILES_TO_DOWNLOAD[".cursor/agents/nextjs/AGENTS.md"]="Cursor Next.js agent"
    fi

    if [ "$INSTALL_AMAZONQ" = true ]; then
        FILES_TO_DOWNLOAD[".amazonq/rules/nextjs.rule.md"]="Amazon Q Next.js development rule"
    fi

    if [ "$INSTALL_CLAUDE" = true ]; then
        FILES_TO_DOWNLOAD[".claude/agents/engineering/nextjs-senior-engineer.md"]="Claude Code Next.js agent"
    fi

    if [ "$INSTALL_CODEX" = true ]; then
        FILES_TO_DOWNLOAD[".codex/nextjs.md"]="Codex Next.js agent (source file)"
    fi
elif [ "$FRAMEWORK" = "expo-react-native" ]; then
    if [ "$INSTALL_ULPI" = true ]; then
        FILES_TO_DOWNLOAD[".ulpi/agents/engineering/expo-react-native-senior-engineer.yaml"]="ULPI Expo React Native agent configuration"
    fi

    if [ "$INSTALL_CURSOR" = true ]; then
        FILES_TO_DOWNLOAD[".cursor/agents/AGENTS.md"]="Cursor global agent instructions"
        FILES_TO_DOWNLOAD[".cursor/agents/expo-react-native/AGENTS.md"]="Cursor Expo React Native agent"
    fi

    if [ "$INSTALL_AMAZONQ" = true ]; then
        FILES_TO_DOWNLOAD[".amazonq/rules/expo-react-native.rule.md"]="Amazon Q Expo React Native development rule"
    fi

    if [ "$INSTALL_CLAUDE" = true ]; then
        FILES_TO_DOWNLOAD[".claude/agents/engineering/expo-react-native-senior-engineer.md"]="Claude Code Expo React Native agent"
    fi

    if [ "$INSTALL_CODEX" = true ]; then
        FILES_TO_DOWNLOAD[".codex/expo-react-native.md"]="Codex Expo React Native agent (source file)"
    fi
elif [ "$FRAMEWORK" = "flutter" ]; then
    if [ "$INSTALL_ULPI" = true ]; then
        FILES_TO_DOWNLOAD[".ulpi/agents/engineering/flutter-senior-engineer.yaml"]="ULPI Flutter agent configuration"
    fi

    if [ "$INSTALL_CURSOR" = true ]; then
        FILES_TO_DOWNLOAD[".cursor/agents/AGENTS.md"]="Cursor global agent instructions"
        FILES_TO_DOWNLOAD[".cursor/agents/flutter/AGENTS.md"]="Cursor Flutter agent"
    fi

    if [ "$INSTALL_AMAZONQ" = true ]; then
        FILES_TO_DOWNLOAD[".amazonq/rules/flutter.rule.md"]="Amazon Q Flutter development rule"
    fi

    if [ "$INSTALL_CLAUDE" = true ]; then
        FILES_TO_DOWNLOAD[".claude/agents/engineering/flutter-senior-engineer.md"]="Claude Code Flutter agent"
    fi

    if [ "$INSTALL_CODEX" = true ]; then
        FILES_TO_DOWNLOAD[".codex/flutter.md"]="Codex Flutter agent (source file)"
    fi
elif [ "$FRAMEWORK" = "magento" ]; then
    if [ "$INSTALL_ULPI" = true ]; then
        FILES_TO_DOWNLOAD[".ulpi/agents/engineering/magento-senior-engineer.yaml"]="ULPI Magento agent configuration"
    fi

    if [ "$INSTALL_CURSOR" = true ]; then
        FILES_TO_DOWNLOAD[".cursor/agents/AGENTS.md"]="Cursor global agent instructions"
        FILES_TO_DOWNLOAD[".cursor/agents/magento/AGENTS.md"]="Cursor Magento agent"
    fi

    if [ "$INSTALL_AMAZONQ" = true ]; then
        FILES_TO_DOWNLOAD[".amazonq/rules/magento.rule.md"]="Amazon Q Magento development rule"
    fi

    if [ "$INSTALL_CLAUDE" = true ]; then
        FILES_TO_DOWNLOAD[".claude/agents/engineering/magento-senior-engineer.md"]="Claude Code Magento agent"
    fi

    if [ "$INSTALL_CODEX" = true ]; then
        FILES_TO_DOWNLOAD[".codex/magento.md"]="Codex Magento agent (source file)"
    fi
fi

# Always download README if not exists
if [ ! -f "$TARGET_DIR/README.md" ]; then
    FILES_TO_DOWNLOAD["README.md"]="Project documentation"
fi

# Start setup
clear
print_header "AI Agents Configuration Setup"

echo -e "${CYAN}Configuration:${NC}"
echo -e "  Target directory:  ${GREEN}$TARGET_DIR${NC}"
echo -e "  Framework:         ${GREEN}$FRAMEWORK${NC}"
echo -e "  Chrome debug port: ${GREEN}$CHROME_PORT${NC}"
echo -e "  Dry run:           ${GREEN}$DRY_RUN${NC}"
echo ""

echo -e "${CYAN}Editors to install:${NC}"
[ "$INSTALL_ULPI" = true ] && echo -e "  ${GREEN}✓${NC} ULPI"
[ "$INSTALL_CURSOR" = true ] && echo -e "  ${GREEN}✓${NC} Cursor"
[ "$INSTALL_AMAZONQ" = true ] && echo -e "  ${GREEN}✓${NC} Amazon Q"
[ "$INSTALL_CLAUDE" = true ] && echo -e "  ${GREEN}✓${NC} Claude Code"
[ "$INSTALL_CODEX" = true ] && echo -e "  ${GREEN}✓${NC} Codex"
echo ""

# Show what will be downloaded
print_section "Files to download (${#FILES_TO_DOWNLOAD[@]} files)"
for file in "${!FILES_TO_DOWNLOAD[@]}"; do
    echo -e "  ${BLUE}→${NC} $file"
    echo -e "    ${NC}${FILES_TO_DOWNLOAD[$file]}${NC}"
done
echo ""

if [ "$DRY_RUN" = true ]; then
    print_warning "DRY RUN MODE - No files will be downloaded or modified"
    echo ""
    exit 0
fi

# Confirm before proceeding
read -p "$(echo -e ${YELLOW}Proceed with installation? [Y/n]:${NC} )" -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]] && [[ ! -z $REPLY ]]; then
    echo -e "${RED}✗${NC} Installation cancelled"
    exit 0
fi

# Create target directory if needed
if [ ! -d "$TARGET_DIR" ]; then
    mkdir -p "$TARGET_DIR"
    print_success "Created directory: $TARGET_DIR"
fi

cd "$TARGET_DIR"

# Function to download file from repo
download_file() {
    local source_path=$1
    local target_path=$2
    local description=$3
    local url="$REPO_URL/$source_path"

    mkdir -p "$(dirname "$target_path")"

    echo -ne "  ${BLUE}→${NC} Downloading $description..."

    if command -v curl &> /dev/null; then
        if curl -fsSL "$url" -o "$target_path" 2>/dev/null; then
            echo -e "\r${GREEN}  ✓${NC} Downloaded $description"
            return 0
        fi
    elif command -v wget &> /dev/null; then
        if wget -q "$url" -O "$target_path" 2>/dev/null; then
            echo -e "\r${GREEN}  ✓${NC} Downloaded $description"
            return 0
        fi
    else
        echo -e "\r${RED}  ✗${NC} Neither curl nor wget found"
        exit 1
    fi

    echo -e "\r${RED}  ✗${NC} Failed to download $description"
    return 1
}

# Download files
print_section "Downloading Files"

DOWNLOAD_COUNT=0
DOWNLOAD_TOTAL=${#FILES_TO_DOWNLOAD[@]}

for file in "${!FILES_TO_DOWNLOAD[@]}"; do
    if download_file "$file" "$file" "${FILES_TO_DOWNLOAD[$file]}"; then
        ((DOWNLOAD_COUNT++))

        # Make scripts executable
        if [[ "$file" == *.sh ]]; then
            chmod +x "$file"
        fi
    fi
done

echo ""
print_success "Downloaded $DOWNLOAD_COUNT/$DOWNLOAD_TOTAL files successfully"

# Copy Codex agent to project root as AGENTS.md
if [ "$INSTALL_CODEX" = true ]; then
    print_section "Setting up Codex AGENTS.md"

    if [ -f ".codex/${FRAMEWORK}.md" ]; then
        cp ".codex/${FRAMEWORK}.md" "AGENTS.md"
        print_success "Created AGENTS.md from ${FRAMEWORK} agent"
    else
        print_error "Could not find .codex/${FRAMEWORK}.md"
    fi
fi

# Create .mcp.json
print_section "Configuring MCP Servers"

cat > .mcp.json <<EOF
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:$CHROME_PORT"]
    }
  }
}
EOF

print_success "Created .mcp.json (context7, chrome-devtools)"

# Update global Amazon Q MCP configuration
if [ "$INSTALL_AMAZONQ" = true ]; then
    print_section "Configuring Amazon Q Global MCP"

    AMAZONQ_MCP_DIR="$HOME/.aws/amazonq"
    AMAZONQ_MCP_FILE="$AMAZONQ_MCP_DIR/mcp.json"

    mkdir -p "$AMAZONQ_MCP_DIR"

    if [ -f "$AMAZONQ_MCP_FILE" ]; then
        if grep -q "context7" "$AMAZONQ_MCP_FILE" && grep -q "chrome-devtools" "$AMAZONQ_MCP_FILE"; then
            print_info "MCP servers already configured in $AMAZONQ_MCP_FILE"
        else
            print_warning "Backing up existing config to mcp.json.backup"
            cp "$AMAZONQ_MCP_FILE" "$AMAZONQ_MCP_FILE.backup"

            cat > "$AMAZONQ_MCP_FILE" <<EOF
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:$CHROME_PORT"]
    }
  }
}
EOF
            print_success "Updated $AMAZONQ_MCP_FILE"
        fi
    else
        cat > "$AMAZONQ_MCP_FILE" <<EOF
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:$CHROME_PORT"]
    }
  }
}
EOF
        print_success "Created $AMAZONQ_MCP_FILE"
    fi
fi

# Update global Codex MCP configuration
if [ "$INSTALL_CODEX" = true ]; then
    print_section "Configuring Codex Global MCP"

    CODEX_CONFIG_DIR="$HOME/.codex"
    CODEX_CONFIG_FILE="$CODEX_CONFIG_DIR/config.toml"

    mkdir -p "$CODEX_CONFIG_DIR"

    # Check if config file exists
    if [ -f "$CODEX_CONFIG_FILE" ]; then
        # Check if MCP servers already exist
        CONTEXT7_EXISTS=$(grep -c "\[mcp_servers.context7\]" "$CODEX_CONFIG_FILE" || true)
        CHROME_EXISTS=$(grep -c "\[mcp_servers.chrome-devtools\]" "$CODEX_CONFIG_FILE" || true)

        if [ "$CONTEXT7_EXISTS" -gt 0 ] && [ "$CHROME_EXISTS" -gt 0 ]; then
            print_info "MCP servers already configured in $CODEX_CONFIG_FILE"
        else
            # Append missing MCP servers
            if [ "$CONTEXT7_EXISTS" -eq 0 ]; then
                cat >> "$CODEX_CONFIG_FILE" <<EOF

[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
EOF
                print_success "Added context7 MCP server to $CODEX_CONFIG_FILE"
            fi

            if [ "$CHROME_EXISTS" -eq 0 ]; then
                cat >> "$CODEX_CONFIG_FILE" <<EOF

[mcp_servers.chrome-devtools]
command = "npx"
args = ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:$CHROME_PORT"]
EOF
                print_success "Added chrome-devtools MCP server to $CODEX_CONFIG_FILE"
            fi
        fi
    else
        # Create new config file with MCP servers
        cat > "$CODEX_CONFIG_FILE" <<EOF
# Codex Configuration
# https://github.com/openai/codex

[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]

[mcp_servers.chrome-devtools]
command = "npx"
args = ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:$CHROME_PORT"]
EOF
        print_success "Created $CODEX_CONFIG_FILE with MCP servers"
    fi
fi

# Update global Claude Code MCP configuration
if [ "$INSTALL_CLAUDE" = true ]; then
    print_section "Configuring Claude Code Global MCP"

    CLAUDE_MCP_DIR="$HOME/.claude"
    CLAUDE_MCP_FILE="$CLAUDE_MCP_DIR/mcp.json"

    mkdir -p "$CLAUDE_MCP_DIR"

    if [ -f "$CLAUDE_MCP_FILE" ]; then
        if grep -q "context7" "$CLAUDE_MCP_FILE" && grep -q "chrome-devtools" "$CLAUDE_MCP_FILE"; then
            print_info "MCP servers already configured in $CLAUDE_MCP_FILE"
        else
            print_warning "Backing up existing config to mcp.json.backup"
            cp "$CLAUDE_MCP_FILE" "$CLAUDE_MCP_FILE.backup"

            cat > "$CLAUDE_MCP_FILE" <<EOF
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:$CHROME_PORT"]
    }
  }
}
EOF
            print_success "Updated $CLAUDE_MCP_FILE"
        fi
    else
        cat > "$CLAUDE_MCP_FILE" <<EOF
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:$CHROME_PORT"]
    }
  }
}
EOF
        print_success "Created $CLAUDE_MCP_FILE"
    fi
fi

# Update global Cursor MCP configuration
if [ "$INSTALL_CURSOR" = true ]; then
    print_section "Configuring Cursor Global MCP"

    CURSOR_MCP_DIR="$HOME/.cursor"
    CURSOR_MCP_FILE="$CURSOR_MCP_DIR/mcp.json"

    mkdir -p "$CURSOR_MCP_DIR"

    if [ -f "$CURSOR_MCP_FILE" ]; then
        if grep -q "context7" "$CURSOR_MCP_FILE" && grep -q "chrome-devtools" "$CURSOR_MCP_FILE"; then
            print_info "MCP servers already configured in $CURSOR_MCP_FILE"
        else
            print_warning "Backing up existing config to mcp.json.backup"
            cp "$CURSOR_MCP_FILE" "$CURSOR_MCP_FILE.backup"

            cat > "$CURSOR_MCP_FILE" <<EOF
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:$CHROME_PORT"]
    }
  }
}
EOF
            print_success "Updated $CURSOR_MCP_FILE"
        fi
    else
        cat > "$CURSOR_MCP_FILE" <<EOF
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:$CHROME_PORT"]
    }
  }
}
EOF
        print_success "Created $CURSOR_MCP_FILE"
    fi
fi

# Create ULPI MCP configuration in project
if [ "$INSTALL_ULPI" = true ]; then
    print_section "Configuring ULPI MCP"

    ULPI_MCP_DIR=".ulpi"
    ULPI_MCP_FILE="$ULPI_MCP_DIR/mcp.json"

    mkdir -p "$ULPI_MCP_DIR"

    cat > "$ULPI_MCP_FILE" <<EOF
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:$CHROME_PORT"]
    }
  }
}
EOF
    print_success "Created $ULPI_MCP_FILE"
fi

# Final summary
print_header "Installation Complete!"

echo -e "${GREEN}✓${NC} Successfully installed AI agent configurations for ${GREEN}${FRAMEWORK}${NC}\n"

echo -e "${CYAN}📁 Installed editors:${NC}"
[ "$INSTALL_ULPI" = true ] && echo -e "   ${GREEN}✓${NC} ULPI          → .ulpi/"
[ "$INSTALL_CURSOR" = true ] && echo -e "   ${GREEN}✓${NC} Cursor        → .cursor/"
[ "$INSTALL_AMAZONQ" = true ] && echo -e "   ${GREEN}✓${NC} Amazon Q      → .amazonq/"
[ "$INSTALL_CLAUDE" = true ] && echo -e "   ${GREEN}✓${NC} Claude Code   → .claude/"
[ "$INSTALL_CODEX" = true ] && echo -e "   ${GREEN}✓${NC} Codex         → AGENTS.md (project root)"
echo ""

echo -e "${CYAN}🔧 MCP Servers:${NC}"
echo -e "   ${GREEN}✓${NC} context7         (Enhanced context management)"
echo -e "   ${GREEN}✓${NC} chrome-devtools  (Browser automation on port $CHROME_PORT)"
echo ""

if [ "$INSTALL_AMAZONQ" = true ] || [ "$INSTALL_CODEX" = true ] || [ "$INSTALL_CLAUDE" = true ] || [ "$INSTALL_CURSOR" = true ] || [ "$INSTALL_ULPI" = true ]; then
    echo -e "${CYAN}🌍 Global Configuration:${NC}"
    [ "$INSTALL_AMAZONQ" = true ] && echo -e "   ${GREEN}✓${NC} ~/.aws/amazonq/mcp.json updated"
    [ "$INSTALL_CLAUDE" = true ] && echo -e "   ${GREEN}✓${NC} ~/.claude/mcp.json updated"
    [ "$INSTALL_CURSOR" = true ] && echo -e "   ${GREEN}✓${NC} ~/.cursor/mcp.json updated"
    [ "$INSTALL_CODEX" = true ] && echo -e "   ${GREEN}✓${NC} ~/.codex/config.toml updated"
    [ "$INSTALL_ULPI" = true ] && echo -e "   ${GREEN}✓${NC} .ulpi/mcp.json created"
    echo ""
fi

echo -e "${CYAN}🚀 Next Steps:${NC}\n"

echo -e "1. ${YELLOW}Launch Chrome with remote debugging (required for MCP servers):${NC}"
echo -e "   ./.ulpi/tools/launch-chrome-debug.sh\n"

echo -e "2. ${YELLOW}Start using your AI tools:${NC}"
[ "$INSTALL_ULPI" = true ] && echo -e "   • ULPI:      Use .ulpi/agents/ configurations"
[ "$INSTALL_AMAZONQ" = true ] && echo -e "   • Amazon Q:  Rules auto-apply from .amazonq/rules/"
[ "$INSTALL_CURSOR" = true ] && echo -e "   • Cursor:    Agents auto-apply in directories"
[ "$INSTALL_CLAUDE" = true ] && echo -e "   • Claude:    Use .claude/agents/ configurations"
[ "$INSTALL_CODEX" = true ] && echo -e "   • Codex:     AGENTS.md in project root (auto-discovered)"
echo ""

echo -e "3. ${YELLOW}Customize for your project:${NC}"
echo -e "   • Edit .mcp.json to change port (currently: $CHROME_PORT)"
echo -e "   • Modify agent configurations for your specific needs"
echo ""

print_success "Happy coding with AI assistance! 🤖"
echo ""
echo -e "${CYAN}Repository:${NC} https://github.com/ulpi-io/agent-library"
echo -e "${CYAN}Powered by:${NC} https://ulpi.io"
echo ""
