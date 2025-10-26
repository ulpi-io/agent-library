const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const ora = require('ora');

const REPO_URL = 'https://raw.githubusercontent.com/ulpi-io/agent-library/main';

const FILE_MAP = {
  laravel: {
    ulpi: ['.ulpi/agents/engineering/laravel-senior-engineer.yaml'],
    cursor: ['.cursor/agents/AGENTS.md', '.cursor/agents/laravel/AGENTS.md'],
    amazonq: ['.amazonq/rules/laravel.rule.md'],
    claude: ['.claude/agents/laravel-senior-engineer.md'],
    codex: ['.codex/laravel.md']
  },
  express: {
    ulpi: ['.ulpi/agents/engineering/express-senior-engineer.yaml'],
    cursor: ['.cursor/agents/AGENTS.md', '.cursor/agents/express/AGENTS.md'],
    amazonq: ['.amazonq/rules/express.rule.md'],
    claude: ['.claude/agents/express-senior-engineer.md'],
    codex: ['.codex/express.md']
  },
  nestjs: {
    ulpi: ['.ulpi/agents/engineering/nestjs-senior-engineer.yaml'],
    cursor: ['.cursor/agents/AGENTS.md', '.cursor/agents/nestjs/AGENTS.md'],
    amazonq: ['.amazonq/rules/nestjs.rule.md'],
    claude: ['.claude/agents/nestjs-senior-engineer.md'],
    codex: ['.codex/nestjs.md']
  },
  nextjs: {
    ulpi: ['.ulpi/agents/engineering/nextjs-senior-engineer.yaml'],
    cursor: ['.cursor/agents/AGENTS.md', '.cursor/agents/nextjs/AGENTS.md'],
    amazonq: ['.amazonq/rules/nextjs.rule.md'],
    claude: ['.claude/agents/nextjs-senior-engineer.md'],
    codex: ['.codex/nextjs.md']
  },
  remix: {
    ulpi: ['.ulpi/agents/engineering/remix-senior-engineer.yaml'],
    cursor: ['.cursor/agents/AGENTS.md', '.cursor/agents/remix/AGENTS.md'],
    amazonq: ['.amazonq/rules/remix.rule.md'],
    claude: ['.claude/agents/remix-senior-engineer.md'],
    codex: ['.codex/remix.md']
  },
  'expo-react-native': {
    ulpi: ['.ulpi/agents/engineering/expo-react-native-senior-engineer.yaml'],
    cursor: ['.cursor/agents/AGENTS.md', '.cursor/agents/expo-react-native/AGENTS.md'],
    amazonq: ['.amazonq/rules/expo-react-native.rule.md'],
    claude: ['.claude/agents/expo-react-native-senior-engineer.md'],
    codex: ['.codex/expo-react-native.md']
  },
  flutter: {
    ulpi: ['.ulpi/agents/engineering/flutter-senior-engineer.yaml'],
    cursor: ['.cursor/agents/AGENTS.md', '.cursor/agents/flutter/AGENTS.md'],
    amazonq: ['.amazonq/rules/flutter.rule.md'],
    claude: ['.claude/agents/flutter-senior-engineer.md'],
    codex: ['.codex/flutter.md']
  },
  magento: {
    ulpi: ['.ulpi/agents/engineering/magento-senior-engineer.yaml'],
    cursor: ['.cursor/agents/AGENTS.md', '.cursor/agents/magento/AGENTS.md'],
    amazonq: ['.amazonq/rules/magento.rule.md'],
    claude: ['.claude/agents/magento-senior-engineer.md'],
    codex: ['.codex/magento.md']
  }
};

function getFilesToDownload(framework, editors) {
  const files = new Set();

  // Always download Chrome launch script
  files.add('.ulpi/tools/launch-chrome-debug.sh');

  // Add framework-specific files for each editor
  editors.forEach(editor => {
    const editorFiles = FILE_MAP[framework]?.[editor] || [];
    editorFiles.forEach(file => files.add(file));
  });

  return Array.from(files);
}

async function downloadFile(filePath, targetDir) {
  const url = `${REPO_URL}/${filePath}`;
  const fullPath = path.join(targetDir, filePath);

  // Create directory if it doesn't exist
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${filePath}: ${response.statusText}`);
  }

  const content = await response.text();
  fs.writeFileSync(fullPath, content);

  // Make shell scripts executable
  if (filePath.endsWith('.sh')) {
    fs.chmodSync(fullPath, '755');
  }

  return fullPath;
}

async function downloadFiles(framework, editors, targetDir, dryRun = false) {
  const files = getFilesToDownload(framework, editors);

  if (dryRun) {
    console.log('\n🔍 Dry Run - Files that would be downloaded:');
    files.forEach(file => console.log(`  📄 ${file}`));
    return { total: files.length, downloaded: 0 };
  }

  console.log(`\n📥 Downloading ${files.length} files...`);

  let downloaded = 0;
  const failed = [];

  for (const file of files) {
    const spinner = ora(`Downloading ${file}`).start();

    try {
      await downloadFile(file, targetDir);
      spinner.succeed(`Downloaded ${file}`);
      downloaded++;
    } catch (error) {
      spinner.fail(`Failed to download ${file}`);
      failed.push({ file, error: error.message });
    }
  }

  if (failed.length > 0) {
    console.log('\n⚠️  Some files failed to download:');
    failed.forEach(({ file, error }) => {
      console.log(`  ❌ ${file}: ${error}`);
    });
  }

  return { total: files.length, downloaded, failed: failed.length };
}

function copyCodexAgent(framework, targetDir) {
  const sourceFile = path.join(targetDir, `.codex/${framework}.md`);
  const targetFile = path.join(targetDir, 'AGENTS.md');

  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetFile);
    return true;
  }
  return false;
}

module.exports = {
  downloadFiles,
  getFilesToDownload,
  copyCodexAgent
};
