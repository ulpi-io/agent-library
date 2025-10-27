const chalk = require('chalk');

/**
 * Show contextual next steps based on what was installed
 */
function showNextSteps(config) {
  const { editors, framework, agents, claudeSkills } = config;

  console.log(chalk.cyan('\n🚀 Quick Start:\n'));

  // Editor-specific guidance
  if (editors.includes('claude')) {
    showClaudeNextSteps(framework, agents, claudeSkills);
  }

  if (editors.includes('cursor')) {
    showCursorNextSteps(framework);
  }

  if (editors.includes('codex')) {
    showCodexNextSteps(framework);
  }

  if (editors.includes('amazonq')) {
    showAmazonQNextSteps(framework);
  }

  // DevOps-specific guidance
  if (agents.includes('devops-docker')) {
    showDockerNextSteps();
  }

  if (agents.includes('devops-aws')) {
    showAWSNextSteps();
  }

  // General resources
  console.log(chalk.cyan('\n📚 Resources:\n'));
  console.log('   Documentation: ' + chalk.blue('https://github.com/ulpi-io/agent-library'));
  console.log('   Report issues:  ' + chalk.blue('https://github.com/ulpi-io/agent-library/issues'));
  console.log('   Powered by:     ' + chalk.blue('https://ulpi.io'));
  console.log();
}

function showClaudeNextSteps(framework, agents, skills) {
  console.log(chalk.yellow('For Claude Code:\n'));
  console.log('   1. Open Claude Code in this directory');
  console.log(`   2. ${chalk.cyan('IMPORTANT:')} Say ${chalk.gray('"use start skill"')} to discover available skills and agents`);
  console.log(`   3. Say ${chalk.gray('"use update-claude-md-after-install skill"')} to customize CLAUDE.md for your project`);
  console.log(`   4. Edit ${chalk.gray('CLAUDE.md')} to add project-specific conventions and commands`);
  console.log(`   5. Ask: ${chalk.gray('"Review my code for ' + framework + ' best practices"')}`);

  if (agents.length > 1) {
    console.log(`   6. You have ${agents.length} specialized agents available`);
  }

  console.log();
}

function showCursorNextSteps(framework) {
  console.log(chalk.yellow('For Cursor:\n'));
  console.log('   1. Open Cursor');
  console.log('   2. Agents will auto-apply in their directories');
  console.log(`   3. The ${framework} agent provides framework-specific expertise`);
  console.log();
}

function showCodexNextSteps(framework) {
  console.log(chalk.yellow('For GitHub Codex:\n'));
  console.log('   1. AGENTS.md has been created in your project root');
  console.log('   2. GitHub Codex will auto-discover it');
  console.log(`   3. Ask about ${framework}-specific patterns`);
  console.log();
}

function showAmazonQNextSteps(framework) {
  console.log(chalk.yellow('For Amazon Q:\n'));
  console.log('   1. Rules are in .amazonq/rules/');
  console.log('   2. Amazon Q will auto-apply them');
  console.log(`   3. Get ${framework} best practices automatically`);
  console.log();
}

function showDockerNextSteps() {
  console.log(chalk.yellow('For Docker Development:\n'));
  console.log('   1. Launch Chrome with debugging:');
  console.log('      ' + chalk.gray('./.ulpi/tools/launch-chrome-debug.sh'));
  console.log('   2. Ask agent: ' + chalk.gray('"Create a production Dockerfile"'));
  console.log('   3. Get help with: ' + chalk.gray('Docker Compose, multi-stage builds, CI/CD'));
  console.log();
}

function showAWSNextSteps() {
  console.log(chalk.yellow('For AWS Deployment:\n'));
  console.log('   1. Ask agent about: ' + chalk.gray('CDK, CloudFormation, Terraform'));
  console.log('   2. Get help with: ' + chalk.gray('Lambda, ECS, infrastructure as code'));
  console.log('   3. Best practices for: ' + chalk.gray('Security, cost optimization, monitoring'));
  console.log();
}

/**
 * Show tips for adding more agents later
 */
function showAddMoreTip() {
  console.log(chalk.gray('\n💡 Tip: You can add more agents anytime by running this command again\n'));
}

/**
 * Show success message with installation summary
 */
function showSuccessSummary(config) {
  const { framework, editors, agents } = config;

  console.log(chalk.green.bold('\n╔═══════════════════════════════════════════════════════════╗'));
  console.log(chalk.green.bold('║') + '  Installation Complete! 🎉                             ' + chalk.green.bold('║'));
  console.log(chalk.green.bold('╚═══════════════════════════════════════════════════════════╝\n'));

  console.log(chalk.cyan(`Your ${getFrameworkName(framework)} project now has:\n`));

  agents.forEach(agent => {
    console.log('   ✓ ' + chalk.white(getAgentDisplayName(agent)));
  });

  if (config.claudeSkills && config.claudeSkills.length > 0) {
    console.log(`   ✓ ${config.claudeSkills.length} Claude skills`);
  }

  console.log();
}

function getFrameworkName(framework) {
  const names = {
    laravel: 'Laravel',
    express: 'Express.js',
    nestjs: 'NestJS',
    nextjs: 'Next.js',
    remix: 'Remix',
    'expo-react-native': 'Expo React Native',
    flutter: 'Flutter',
    magento: 'Magento 2',
    'devops-docker': 'Docker',
    'devops-aws': 'AWS'
  };
  return names[framework] || framework;
}

function getAgentDisplayName(agent) {
  const names = {
    laravel: 'Laravel Senior Engineer',
    express: 'Express.js Senior Engineer',
    nestjs: 'NestJS Senior Engineer',
    nextjs: 'Next.js Senior Engineer',
    remix: 'Remix Senior Engineer',
    'expo-react-native': 'Expo React Native Senior Engineer',
    flutter: 'Flutter Senior Engineer',
    magento: 'Magento 2 Senior Engineer',
    'devops-docker': 'DevOps Docker Engineer',
    'devops-aws': 'DevOps AWS Engineer'
  };
  return names[agent] || agent;
}

module.exports = {
  showNextSteps,
  showAddMoreTip,
  showSuccessSummary
};
