#!/usr/bin/env node

const { program } = require('commander');
const { run } = require('../src/index');
const packageJson = require('../package.json');

program
  .name('ulpi-agent-library')
  .description('Professional AI agent configurations for multiple editors and frameworks')
  .version(packageJson.version)
  .option('-t, --target <dir>', 'target directory', process.cwd())
  .option('-p, --port <number>', 'Chrome debug port', '9222')
  .option('-e, --editors <editors>', 'editors to install (comma-separated): all, ulpi, cursor, amazonq, claude, codex')
  .option('-f, --framework <framework>', 'framework: laravel, express, nestjs, nextjs, remix, expo-react-native, flutter, magento')
  .option('--dry-run', 'preview without installing')
  .action(async (options) => {
    try {
      await run(options);
    } catch (error) {
      console.error('\n❌ Error:', error.message);
      process.exit(1);
    }
  });

program.parse();
