const chalk = require('chalk');
const { promptFramework, promptEditors, confirmInstallation, FRAMEWORKS } = require('./prompts');
const { downloadFiles, copyCodexAgent } = require('./downloader');
const { setupMcpServers } = require('./config');

async function run(options) {
  console.log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
  console.log(chalk.blue.bold('║') + '  ULPI Agent Library Installer                         ' + chalk.blue.bold('║'));
  console.log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

  // Show welcome message if in interactive mode
  if (!options.framework && !options.editors) {
    console.log(chalk.cyan('👋 Welcome! This installer will help you set up AI agent'));
    console.log(chalk.cyan('   configurations for your project.\n'));
    console.log(chalk.gray('   📚 Documentation: https://github.com/ulpi-io/agent-library'));
    console.log(chalk.gray('   💪 Powered by: https://ulpi.io\n'));
  }

  // Get configuration
  let { framework, editors, target, port, dryRun } = options;

  // Interactive prompts if not provided
  if (!framework) {
    framework = await promptFramework();
  }

  // Parse editors
  if (!editors || editors === 'all') {
    if (!editors) {
      editors = await promptEditors();
    } else {
      editors = ['ulpi', 'cursor', 'amazonq', 'claude', 'codex'];
    }
  } else if (typeof editors === 'string') {
    editors = editors.split(',').map(e => e.trim());
  }

  // Validate framework
  if (!FRAMEWORKS[framework]) {
    throw new Error(`Invalid framework: ${framework}`);
  }

  // Validate editors
  const validEditors = ['ulpi', 'cursor', 'amazonq', 'claude', 'codex'];
  editors.forEach(editor => {
    if (!validEditors.includes(editor)) {
      throw new Error(`Invalid editor: ${editor}`);
    }
  });

  const config = {
    framework,
    editors,
    target,
    port: port || '9222',
    dryRun
  };

  // Confirm installation
  const confirmed = await confirmInstallation(config);

  if (!confirmed) {
    console.log(chalk.yellow('\n✖ Installation cancelled\n'));
    return;
  }

  // Download files
  const result = await downloadFiles(framework, editors, target, dryRun);

  if (dryRun) {
    console.log(chalk.green(`\n✓ Dry run complete. Would have downloaded ${result.total} files.\n`));
    return;
  }

  // Copy Codex agent if needed
  if (editors.includes('codex')) {
    console.log('\n📝 Setting up Codex AGENTS.md...');
    if (copyCodexAgent(framework, target)) {
      console.log(chalk.green(`✓ Created AGENTS.md from ${framework} agent`));
    } else {
      console.log(chalk.red(`✗ Could not find .codex/${framework}.md`));
    }
  }

  // Setup MCP servers
  if (!dryRun) {
    setupMcpServers(editors, target, config.port);
  }

  // Success summary
  console.log(chalk.green.bold('\n╔═══════════════════════════════════════════════════════════╗'));
  console.log(chalk.green.bold('║') + '  Installation Complete! 🎉                             ' + chalk.green.bold('║'));
  console.log(chalk.green.bold('╚═══════════════════════════════════════════════════════════╝\n'));

  console.log(chalk.cyan('📊 Summary:'));
  console.log(`   Framework:     ${FRAMEWORKS[framework].name}`);
  console.log(`   Editors:       ${editors.length} installed`);
  console.log(`   Files:         ${result.downloaded}/${result.total} downloaded`);
  if (result.failed > 0) {
    console.log(chalk.red(`   Failed:        ${result.failed} files`));
  }

  // Next steps
  console.log(chalk.cyan('\n🚀 Next Steps:\n'));
  console.log('1. ' + chalk.yellow('Launch Chrome with remote debugging:'));
  console.log('   ' + chalk.gray(`./.ulpi/tools/launch-chrome-debug.sh\n`));

  console.log('2. ' + chalk.yellow('Start using your AI tools:'));
  if (editors.includes('ulpi')) {
    console.log('   • ' + chalk.white('ULPI:      ') + 'Use .ulpi/agents/ configurations');
  }
  if (editors.includes('amazonq')) {
    console.log('   • ' + chalk.white('Amazon Q:  ') + 'Rules auto-apply from .amazonq/rules/');
  }
  if (editors.includes('cursor')) {
    console.log('   • ' + chalk.white('Cursor:    ') + 'Agents auto-apply in directories');
  }
  if (editors.includes('claude')) {
    console.log('   • ' + chalk.white('Claude:    ') + 'Use .claude/agents/ configurations');
  }
  if (editors.includes('codex')) {
    console.log('   • ' + chalk.white('Codex:     ') + 'AGENTS.md in project root (auto-discovered)');
  }

  console.log(chalk.cyan('\n📚 Documentation:'));
  console.log('   ' + chalk.blue('https://github.com/ulpi-io/agent-library'));

  console.log(chalk.cyan('\n💪 Powered by:'));
  console.log('   ' + chalk.blue('https://ulpi.io\n'));
}

module.exports = { run };
