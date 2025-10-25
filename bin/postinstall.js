#!/usr/bin/env node

const chalk = require('chalk');

console.log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
console.log(chalk.blue.bold('║') + '  🎉 ULPI Agent Library installed successfully!        ' + chalk.blue.bold('║'));
console.log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

console.log(chalk.cyan('📚 Quick Start:\n'));
console.log('   1. Navigate to your project directory:');
console.log('      ' + chalk.white('cd /path/to/your/project\n'));

console.log('   2. Run the installer:');
console.log('      ' + chalk.green('ulpi-agent-library\n'));

console.log(chalk.cyan('💡 The installer will:\n'));
console.log('   • Prompt you to select your framework');
console.log('   • Ask which editors to configure');
console.log('   • Download agent configurations');
console.log('   • Set up MCP servers (Context7 & Chrome DevTools)\n');

console.log(chalk.cyan('📖 Documentation:\n'));
console.log('   ' + chalk.blue('https://github.com/ulpi-io/agent-library\n'));

console.log(chalk.cyan('❓ Need help?\n'));
console.log('   Run: ' + chalk.white('ulpi-agent-library --help\n'));

console.log(chalk.gray('Powered by ULPI · https://ulpi.io\n'));
