const inquirer = require('inquirer');

const FRAMEWORKS = {
  laravel: { name: 'Laravel 12.x', description: 'Multi-database, queues, Horizon' },
  express: { name: 'Express.js', description: 'REST API and middleware patterns' },
  nestjs: { name: 'NestJS', description: 'TypeScript enterprise Node.js framework' },
  nextjs: { name: 'Next.js 14/15', description: 'App Router, Server Components' },
  'expo-react-native': { name: 'Expo React Native', description: 'Cross-platform mobile' },
  flutter: { name: 'Flutter', description: 'Cross-platform with Dart' },
  magento: { name: 'Magento 2', description: 'E-commerce platform' }
};

const EDITORS = {
  ulpi: { name: 'ULPI', description: 'YAML-based structured agents' },
  cursor: { name: 'Cursor', description: 'Hierarchical AGENTS.md files' },
  amazonq: { name: 'Amazon Q', description: 'Project-local .rule.md files' },
  claude: { name: 'Claude Code', description: 'Markdown agent files' },
  codex: { name: 'GitHub Codex', description: 'Root AGENTS.md format' }
};

async function promptFramework() {
  const choices = Object.entries(FRAMEWORKS).map(([key, value]) => ({
    name: `${value.name} - ${value.description}`,
    value: key
  }));

  const { framework } = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Which framework/stack are you using?',
      choices
    }
  ]);

  return framework;
}

async function promptEditors() {
  const choices = Object.entries(EDITORS).map(([key, value]) => ({
    name: `${value.name} - ${value.description}`,
    value: key,
    checked: true
  }));

  const { editors } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'editors',
      message: 'Which editors do you want to install? (Space to select, Enter to confirm)',
      choices,
      validate: (answer) => {
        if (answer.length < 1) {
          return 'You must choose at least one editor.';
        }
        return true;
      }
    }
  ]);

  return editors;
}

async function confirmInstallation(config) {
  console.log('\n📦 Installation Summary:');
  console.log('━'.repeat(50));
  console.log(`Framework:  ${FRAMEWORKS[config.framework].name}`);
  console.log(`Editors:    ${config.editors.map(e => EDITORS[e].name).join(', ')}`);
  console.log(`Target:     ${config.target}`);
  console.log(`Port:       ${config.port}`);
  console.log('━'.repeat(50));

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Proceed with installation?',
      default: true
    }
  ]);

  return confirm;
}

module.exports = {
  promptFramework,
  promptEditors,
  confirmInstallation,
  FRAMEWORKS,
  EDITORS
};
