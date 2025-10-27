const chalk = require('chalk');
const {
  promptEditorSelection,
  promptFramework,
  promptAdditionalAgents,
  promptEditors,
  promptClaudeSkills,
  enhancedConfirmation,
  confirmInstallation,
  FRAMEWORK_META,
  EDITOR_META
} = require('./prompts');
const {
  downloadFilesFromMap,
  downloadCLAUDEmdFromMap,
  copyCodexAgent,
  copyClaudeSkillsFromMap
} = require('./downloader');
const { setupMcpServers } = require('./config');
const { getPrimaryAgent } = require('./categories');
const { showNextSteps, showSuccessSummary } = require('./nextSteps');
const {
  fetchMapFromGitHub,
  getFilesForFrameworkAndEditors,
  getClaudeMdFiles,
  getClaudeSkills
} = require('./mapper');

async function run(options) {
  console.log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
  console.log(chalk.blue.bold('║') + '  ULPI Agent Library Installer                         ' + chalk.blue.bold('║'));
  console.log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

  // Get configuration
  let { framework, editors, target, port, dryRun, yes } = options;

  // Fetch map from GitHub first
  console.log(chalk.cyan('📡 Fetching installation map from GitHub...'));
  const map = await fetchMapFromGitHub();
  console.log(chalk.green('✓ Map loaded successfully\n'));

  // Determine if we're in new interactive mode (no CLI flags) or legacy mode
  const isInteractiveMode = !options.framework && !options.editors;

  if (isInteractiveMode) {
    // New 7-step wizard flow
    console.log(chalk.cyan('👋 Welcome! Let\'s set up AI agents for your project.\n'));
    console.log(chalk.gray('   📚 Documentation: https://github.com/ulpi-io/agent-library'));
    console.log(chalk.gray('   💪 Powered by: https://ulpi.io\n'));

    // Step 1: Editor Selection
    editors = await promptEditorSelection(map);

    // Step 2: Framework Selection
    framework = await promptFramework(map);

    // Step 3: Additional Agents (optional)
    const additionalAgents = await promptAdditionalAgents();

    // Build agents list: primary framework agent + additional agents
    const agents = [getPrimaryAgent(framework), ...additionalAgents];

    // Step 4: Claude Skills (if Claude selected)
    let claudeSkills = [];
    if (editors.includes('claude')) {
      claudeSkills = await promptClaudeSkills(map);
    }

    // Step 5: Review & Confirm
    const config = {
      framework,
      editors,
      agents,
      claudeSkills,
      target: target || process.cwd(),
      port: port || '9222',
      dryRun,
      map
    };

    const confirmed = await enhancedConfirmation(config);

    if (!confirmed) {
      console.log(chalk.yellow('\n✖ Installation cancelled\n'));
      return;
    }

    // Step 6: Install (happens below)
    console.log(chalk.cyan('\nStep 6/7: Installing') + '\n─────────────────\n');

    // Continue to installation with the config
    await performInstallation(config);

    // Step 7: Next Steps
    console.log(chalk.cyan('\nStep 7/7: Next Steps') + '\n────────────────────\n');
    showSuccessSummary(config);
    showNextSteps(config);

  } else {
    // Legacy CLI flag mode (backward compatibility)
    if (!options.framework && !options.editors) {
      console.log(chalk.cyan('👋 Welcome! This installer will help you set up AI agent'));
      console.log(chalk.cyan('   configurations for your project.\n'));
      console.log(chalk.gray('   📚 Documentation: https://github.com/ulpi-io/agent-library'));
      console.log(chalk.gray('   💪 Powered by: https://ulpi.io\n'));
    }

    // Interactive prompts if not provided
    if (!framework) {
      framework = await promptFramework(map);
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

    // Prompt for Claude skills if Claude is selected (only if not dry-run)
    let claudeSkills = [];
    if (editors.includes('claude') && !dryRun) {
      claudeSkills = await promptClaudeSkills(map);
    }

    // Legacy agents list (just framework agent)
    const agents = [framework];

    // Validate framework
    if (!FRAMEWORK_META[framework]) {
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
      agents,
      claudeSkills,
      target: target || process.cwd(),
      port: port || '9222',
      dryRun,
      map
    };

    // Confirm installation (unless --yes flag is provided)
    let confirmed = yes;
    if (!yes) {
      confirmed = await confirmInstallation(config);
    }

    if (!confirmed) {
      console.log(chalk.yellow('\n✖ Installation cancelled\n'));
      return;
    }

    // Continue to installation
    await performInstallation(config);

    // Legacy next steps
    showLegacyNextSteps(config);
  }
}

/**
 * Performs the actual installation (Step 6)
 */
async function performInstallation(config) {
  const { framework, editors, agents, claudeSkills, target, dryRun, map } = config;

  // Download files for all agents
  let totalDownloaded = 0;
  let totalFiles = 0;
  let totalFailed = 0;

  for (const agent of agents) {
    const filesToDownload = getFilesForFrameworkAndEditors(map, agent, editors);
    const result = await downloadFilesFromMap(filesToDownload, target, dryRun);
    totalDownloaded += result.downloaded;
    totalFiles += result.total;
    totalFailed += result.failed;
  }

  if (dryRun) {
    console.log(chalk.green(`\n✓ Dry run complete. Would have downloaded ${totalFiles} files.\n`));
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

  // Copy Claude skills if needed
  if (editors.includes('claude') && claudeSkills.length > 0) {
    console.log('\n🔧 Installing Claude skills...');
    const allSkills = getClaudeSkills(map);
    const skillsResult = await copyClaudeSkillsFromMap(claudeSkills, allSkills, target);
    if (skillsResult.success > 0) {
      console.log(chalk.green(`✓ Installed ${skillsResult.success}/${claudeSkills.length} skills`));
    }
    if (skillsResult.failed > 0) {
      console.log(chalk.red(`✗ Failed to install ${skillsResult.failed} skills`));
    }
  }

  // Download CLAUDE.md project memory if needed
  if (editors.includes('claude')) {
    console.log('\n📝 Setting up CLAUDE.md project memory...');
    const claudeMdFiles = getClaudeMdFiles(map, framework);
    const claudeMdDownloaded = await downloadCLAUDEmdFromMap(claudeMdFiles, target);
    if (claudeMdDownloaded) {
      console.log(chalk.green('✓ Created CLAUDE.md and reference files'));
    } else {
      console.log(chalk.gray('  (CLAUDE.md not available for this framework yet)'));
    }
  }

  // Setup MCP servers
  if (!dryRun) {
    setupMcpServers(editors, target, config.port);
  }
}

/**
 * Legacy next steps display (for backward compatibility)
 */
function showLegacyNextSteps(config) {
  const { framework, editors } = config;

  console.log(chalk.green.bold('\n╔═══════════════════════════════════════════════════════════╗'));
  console.log(chalk.green.bold('║') + '  Installation Complete! 🎉                             ' + chalk.green.bold('║'));
  console.log(chalk.green.bold('╚═══════════════════════════════════════════════════════════╝\n'));

  console.log(chalk.cyan('📊 Summary:'));
  console.log(`   Framework:     ${FRAMEWORK_META[framework].name}`);
  console.log(`   Editors:       ${editors.length} installed`);

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
