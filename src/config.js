const fs = require('fs');
const path = require('path');
const os = require('os');
const chalk = require('chalk');

function createMcpConfig(port) {
  return {
    mcpServers: {
      context7: {
        command: 'npx',
        args: ['-y', '@upstash/context7-mcp']
      },
      'chrome-devtools': {
        command: 'npx',
        args: ['-y', 'chrome-devtools-mcp@latest', '-u', `http://localhost:${port}`]
      }
    }
  };
}

function createProjectMcpConfig(targetDir, port) {
  const mcpPath = path.join(targetDir, '.mcp.json');
  const config = createMcpConfig(port);

  fs.writeFileSync(mcpPath, JSON.stringify(config, null, 2));
  console.log(chalk.green(`✓ Created ${mcpPath}`));
}

function createUlpiMcpConfig(targetDir, port) {
  const mcpPath = path.join(targetDir, '.ulpi', 'mcp.json');
  const config = createMcpConfig(port);

  const dir = path.dirname(mcpPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(mcpPath, JSON.stringify(config, null, 2));
  console.log(chalk.green(`✓ Created ${mcpPath}`));
}

function updateGlobalConfig(configPath, config) {
  const dir = path.dirname(configPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(configPath)) {
    const existing = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Check if already configured
    if (existing.mcpServers?.context7 && existing.mcpServers?.['chrome-devtools']) {
      console.log(chalk.yellow(`ℹ MCP servers already configured in ${configPath}`));
      return false;
    }

    // Backup existing
    fs.writeFileSync(`${configPath}.backup`, JSON.stringify(existing, null, 2));
    console.log(chalk.yellow(`⚠ Backed up existing config to ${configPath}.backup`));
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(chalk.green(`✓ Updated ${configPath}`));
  return true;
}

function updateGlobalTomlConfig(configPath, port) {
  const dir = path.dirname(configPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const tomlContent = `
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]

[mcp_servers.chrome-devtools]
command = "npx"
args = ["-y", "chrome-devtools-mcp@latest", "-u", "http://localhost:${port}"]
`;

  if (fs.existsSync(configPath)) {
    const existing = fs.readFileSync(configPath, 'utf8');

    // Check if already configured
    if (existing.includes('mcp_servers.context7') && existing.includes('mcp_servers.chrome-devtools')) {
      console.log(chalk.yellow(`ℹ MCP servers already configured in ${configPath}`));
      return false;
    }

    // Append to existing
    fs.appendFileSync(configPath, tomlContent);
    console.log(chalk.green(`✓ Updated ${configPath}`));
    return true;
  }

  // Create new file
  fs.writeFileSync(configPath, `# Codex Configuration\n${tomlContent}`);
  console.log(chalk.green(`✓ Created ${configPath}`));
  return true;
}

function setupMcpServers(editors, targetDir, port) {
  console.log('\n⚙️  Configuring MCP servers...');

  // Always create project .mcp.json
  createProjectMcpConfig(targetDir, port);

  // Create ULPI-specific config if ULPI is installed
  if (editors.includes('ulpi')) {
    createUlpiMcpConfig(targetDir, port);
  }

  const homeDir = os.homedir();
  const config = createMcpConfig(port);

  // Amazon Q
  if (editors.includes('amazonq')) {
    const configPath = path.join(homeDir, '.aws', 'amazonq', 'mcp.json');
    updateGlobalConfig(configPath, config);
  }

  // Cursor
  if (editors.includes('cursor')) {
    const configPath = path.join(homeDir, '.cursor', 'mcp.json');
    updateGlobalConfig(configPath, config);
  }

  // Claude Code
  if (editors.includes('claude')) {
    const configPath = path.join(homeDir, '.claude', 'mcp.json');
    updateGlobalConfig(configPath, config);
  }

  // Codex (TOML format)
  if (editors.includes('codex')) {
    const configPath = path.join(homeDir, '.codex', 'config.toml');
    updateGlobalTomlConfig(configPath, port);
  }
}

module.exports = {
  setupMcpServers,
  createMcpConfig
};
