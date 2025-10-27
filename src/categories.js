const AGENT_CATEGORIES = {
  development: {
    name: 'Development Agents',
    description: 'Framework-specific development expertise',
    agents: {
      laravel: 'Laravel 12.x - Multi-database, queues, Horizon',
      express: 'Express.js - REST API and middleware patterns',
      nestjs: 'NestJS - TypeScript enterprise Node.js framework',
      nextjs: 'Next.js 14/15 - App Router, Server Components',
      remix: 'Remix - Full-stack web framework with nested routes',
      'expo-react-native': 'Expo React Native - Cross-platform mobile',
      flutter: 'Flutter - Cross-platform with Dart',
      magento: 'Magento 2 - E-commerce platform'
    }
  },
  infrastructure: {
    name: 'Infrastructure & DevOps',
    description: 'Deployment, containers, cloud platforms',
    agents: {
      'devops-docker': 'DevOps Docker - Containerization, Docker Compose, orchestration',
      'devops-aws': 'DevOps AWS - Cloud architecture, IaC, serverless, CI/CD'
    }
  },
  collaboration: {
    name: 'Team Collaboration',
    description: 'Code review, planning, documentation',
    agents: {
      // Placeholder for future agents
      // 'code-reviewer': 'Code Reviewer - PR reviews, best practices, mentoring',
      // 'product-manager': 'Product Manager - Feature planning, user stories, roadmaps',
      // 'tech-writer': 'Tech Writer - Documentation, API docs, guides'
    }
  }
};

/**
 * Get all agents in a specific category
 */
function getAgentsByCategory(category) {
  return AGENT_CATEGORIES[category]?.agents || {};
}

/**
 * Get all available categories
 */
function getAllCategories() {
  return Object.keys(AGENT_CATEGORIES);
}

/**
 * Get category information
 */
function getCategoryInfo(category) {
  return {
    name: AGENT_CATEGORIES[category]?.name || category,
    description: AGENT_CATEGORIES[category]?.description || ''
  };
}

/**
 * Get the primary (framework) agent for a given framework
 */
function getPrimaryAgent(framework) {
  // The primary agent is always the framework agent
  return framework;
}

/**
 * Get all non-development agents (for "additional agents" selection)
 */
function getAdditionalAgents() {
  const additional = {};

  Object.keys(AGENT_CATEGORIES).forEach(category => {
    if (category !== 'development') {
      additional[category] = AGENT_CATEGORIES[category];
    }
  });

  return additional;
}

/**
 * Check if an agent exists in any category
 */
function isValidAgent(agentKey) {
  for (const category of Object.keys(AGENT_CATEGORIES)) {
    if (agentKey in AGENT_CATEGORIES[category].agents) {
      return true;
    }
  }
  return false;
}

/**
 * Get human-readable name for an agent
 */
function getAgentName(agentKey) {
  for (const category of Object.keys(AGENT_CATEGORIES)) {
    if (agentKey in AGENT_CATEGORIES[category].agents) {
      return AGENT_CATEGORIES[category].agents[agentKey];
    }
  }
  return agentKey;
}

/**
 * Get agent's category
 */
function getAgentCategory(agentKey) {
  for (const category of Object.keys(AGENT_CATEGORIES)) {
    if (agentKey in AGENT_CATEGORIES[category].agents) {
      return category;
    }
  }
  return null;
}

module.exports = {
  AGENT_CATEGORIES,
  getAgentsByCategory,
  getAllCategories,
  getCategoryInfo,
  getPrimaryAgent,
  getAdditionalAgents,
  isValidAgent,
  getAgentName,
  getAgentCategory
};
