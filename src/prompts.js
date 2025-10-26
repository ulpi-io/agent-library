const inquirer = require('inquirer');

const FRAMEWORKS = {
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

const EDITORS = {
  ulpi: { name: 'ULPI', description: 'YAML-based structured agents' },
  cursor: { name: 'Cursor', description: 'Hierarchical AGENTS.md files' },
  amazonq: { name: 'Amazon Q', description: 'Project-local .rule.md files' },
  claude: { name: 'Claude Code', description: 'Markdown agent files' },
  codex: { name: 'GitHub Codex', description: 'Root AGENTS.md format' }
};

const CLAUDE_SKILLS = {
  'writing-agents': { name: 'Writing Agents', description: 'Create and sync agent configurations' },
  'writing-tools': { name: 'Writing Tools', description: 'Create effective skills with TDD methodology' },
  'start': { name: 'Start', description: 'Skill discovery and usage workflows' },
  'run-parallel-agents-feature-build': { name: 'Parallel Agents (Build)', description: 'Build independent features in parallel' },
  'run-parallel-agents-feature-debug': { name: 'Parallel Agents (Debug)', description: 'Debug independent issues in parallel' }
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

async function promptClaudeSkills() {
  const choices = Object.entries(CLAUDE_SKILLS).map(([key, value]) => ({
    name: `${value.name} - ${value.description}`,
    value: key,
    checked: true
  }));

  const { skills } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'skills',
      message: '\nWhich Claude skills do you want to install?',
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

async function confirmInstallation(config) {
  console.log('\n📦 Installation Summary:');
  console.log('━'.repeat(50));
  console.log(`Framework:  ${FRAMEWORKS[config.framework].name}`);
  console.log(`Editors:    ${config.editors.map(e => EDITORS[e].name).join(', ')}`);
  if (config.claudeSkills && config.claudeSkills.length > 0) {
    console.log(`Skills:     ${config.claudeSkills.map(s => CLAUDE_SKILLS[s].name).join(', ')}`);
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
  promptFramework,
  promptEditors,
  promptClaudeSkills,
  confirmInstallation,
  FRAMEWORKS,
  EDITORS,
  CLAUDE_SKILLS
};
