const inquirer = require('inquirer');
const chalk = require('chalk');
const { getAdditionalAgents, getCategoryInfo } = require('./categories');
const { getAvailableEditors, getAvailableFrameworks, getClaudeSkills } = require('./mapper');

// Framework metadata for display purposes
const FRAMEWORK_META = {
  laravel: { name: 'Laravel 12.x', description: 'Multi-database, queues, Horizon' },
  express: { name: 'Express.js', description: 'REST API and middleware patterns' },
  nestjs: { name: 'NestJS', description: 'TypeScript enterprise Node.js framework' },
  nextjs: { name: 'Next.js 14/15', description: 'App Router, Server Components' },
  remix: { name: 'Remix', description: 'Full-stack web framework with nested routes' },
  'expo-react-native': { name: 'Expo React Native', description: 'Cross-platform mobile' },
  flutter: { name: 'Flutter', description: 'Cross-platform with Dart' },
  magento: { name: 'Magento 2', description: 'E-commerce platform' },
  'devops-docker': { name: 'DevOps Docker', description: 'Containerization, Docker Compose, orchestration' },
  'devops-aws': { name: 'DevOps AWS', description: 'Cloud architecture, IaC, serverless, CI/CD' }
};

// Editor metadata for display purposes
const EDITOR_META = {
  ulpi: { name: 'ULPI', description: 'YAML-based structured agents' },
  cursor: { name: 'Cursor', description: 'Hierarchical AGENTS.md files' },
  amazonq: { name: 'Amazon Q', description: 'Project-local .rule.md files' },
  claude: { name: 'Claude Code', description: 'Markdown agent files' },
  codex: { name: 'GitHub Codex', description: 'Root AGENTS.md format' }
};

async function promptEditorSelection(map) {
  const editors = getAvailableEditors(map);
  const choices = editors.map(key => ({
    name: `${EDITOR_META[key].name} - ${EDITOR_META[key].description}`,
    value: key
  }));

  const { selectedEditors } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedEditors',
      message: chalk.cyan('\nStep 1/7: Editor Selection') + '\n────────────────────────\n\n? Which AI coding tool(s) will you use? (space to select)',
      choices,
      validate: (answer) => {
        if (answer.length < 1) {
          return 'You must choose at least one editor.';
        }
        return true;
      }
    }
  ]);

  return selectedEditors;
}

async function promptFramework(map) {
  const frameworks = getAvailableFrameworks(map);
  const choices = frameworks.map(key => ({
    name: `${FRAMEWORK_META[key].name} - ${FRAMEWORK_META[key].description}`,
    value: key
  }));

  const { framework } = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: chalk.cyan('\nStep 2/7: Framework Selection') + '\n─────────────────────────\n\n? What are you building?',
      choices
    }
  ]);

  return framework;
}

async function promptAdditionalAgents() {
  const additionalCategories = getAdditionalAgents();

  // Build choices from all non-development categories
  const choices = [];
  Object.entries(additionalCategories).forEach(([categoryKey, category]) => {
    // Add separator for each category
    choices.push(new inquirer.Separator(`\n${category.name} - ${category.description}`));

    // Add agents from this category
    Object.entries(category.agents).forEach(([agentKey, agentDesc]) => {
      choices.push({
        name: `  ${agentDesc}`,
        value: agentKey,
        checked: false
      });
    });
  });

  const { agents } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'agents',
      message: chalk.cyan('\nStep 3/7: Additional Agents') + '\n────────────────────────\n\n? Want to add specialized agents? (optional, space to select)',
      choices
    }
  ]);

  return agents;
}

async function promptEditors() {
  const choices = Object.entries(EDITOR_META).map(([key, value]) => ({
    name: `${value.name} - ${value.description}`,
    value: key,
    checked: true
  }));

  const { editors } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'editors',
      message: '\nWhich editors do you want to install?',
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

async function promptClaudeSkills(map) {
  // Get skills from map
  const claudeSkills = getClaudeSkills(map);

  // If no skills found, return empty array
  if (claudeSkills.length === 0) {
    console.log(chalk.yellow('  No Claude skills found, skipping...'));
    return [];
  }

  const choices = claudeSkills.map(skill => ({
    name: `${skill.name} - ${skill.description}`,
    value: skill.key,
    checked: true
  }));

  const { skills } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'skills',
      message: chalk.cyan('\nStep 4/7: Claude Skills') + '\n─────────────────────\n\n? Which Claude skills do you want to install?',
      choices,
      validate: (answer) => {
        if (answer.length < 1) {
          return 'You must choose at least one skill.';
        }
        return true;
      }
    }
  ]);

  return skills;
}

async function enhancedConfirmation(config) {
  console.log(chalk.cyan('\nStep 5/7: Review & Confirm') + '\n───────────────────────────\n');
  console.log('\n📦 Installation Summary:');
  console.log('━'.repeat(50));
  console.log(`Framework:  ${FRAMEWORK_META[config.framework].name}`);
  console.log(`Editors:    ${config.editors.map(e => EDITOR_META[e].name).join(', ')}`);
  if (config.claudeSkills && config.claudeSkills.length > 0) {
    const skillNames = config.claudeSkills.map(key => {
      const skill = config.map.files['claude-skills'].find(s => s.key === key);
      return skill ? skill.name : key;
    });
    console.log(`Skills:     ${skillNames.join(', ')}`);
  }
  console.log(`Target:     ${config.target}`);
  console.log(`Port:       ${config.port}`);
  console.log('━'.repeat(50));

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: '\n? Proceed with installation?',
      default: true
    }
  ]);

  return confirm;
}

async function confirmInstallation(config) {
  console.log('\n📦 Installation Summary:');
  console.log('━'.repeat(50));
  console.log(`Framework:  ${FRAMEWORK_META[config.framework].name}`);
  console.log(`Editors:    ${config.editors.map(e => EDITOR_META[e].name).join(', ')}`);
  if (config.claudeSkills && config.claudeSkills.length > 0) {
    const skillNames = config.claudeSkills.map(key => {
      const skill = config.map.files['claude-skills'].find(s => s.key === key);
      return skill ? skill.name : key;
    });
    console.log(`Skills:     ${skillNames.join(', ')}`);
  }
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
  promptEditorSelection,
  promptFramework,
  promptAdditionalAgents,
  promptEditors,
  promptClaudeSkills,
  enhancedConfirmation,
  confirmInstallation,
  FRAMEWORK_META,
  EDITOR_META
};
