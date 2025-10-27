const fetch = require('node-fetch');

const MAP_URL = 'https://raw.githubusercontent.com/ulpi-io/agent-library/main/templates/map.json';

/**
 * Fetch map.json from GitHub
 */
async function fetchMapFromGitHub() {
  try {
    const response = await fetch(MAP_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch map.json: ${response.statusText}`);
    }
    const map = await response.json();
    return map;
  } catch (error) {
    throw new Error(`Could not load installation map: ${error.message}`);
  }
}

/**
 * Get available editors from map
 */
function getAvailableEditors(map) {
  return map.editors || [];
}

/**
 * Get available frameworks from map
 */
function getAvailableFrameworks(map) {
  return map.frameworks || [];
}

/**
 * Get Claude skills from map
 */
function getClaudeSkills(map) {
  return map.files['claude-skills'] || [];
}

/**
 * Get files to download for a specific framework and editors
 */
function getFilesForFrameworkAndEditors(map, framework, editors) {
  const filesToDownload = [];

  // Add tool files (Chrome debug script) if needed
  if (map.files.tools) {
    map.files.tools.forEach(tool => {
      if (tool.editors.includes('all') || editors.some(e => tool.editors.includes(e))) {
        filesToDownload.push(tool);
      }
    });
  }

  // Add agent files for each selected editor
  editors.forEach(editor => {
    const editorAgents = map.files.agents[editor];
    if (editorAgents && editorAgents[framework]) {
      const agentFiles = editorAgents[framework];

      // Handle arrays (cursor has multiple files) or single objects
      if (Array.isArray(agentFiles)) {
        filesToDownload.push(...agentFiles);
      } else {
        filesToDownload.push(agentFiles);
      }
    }
  });

  return filesToDownload;
}

/**
 * Get CLAUDE.md files for a framework
 */
function getClaudeMdFiles(map, framework) {
  const claudeMd = map.files['claude-md'][framework];
  if (!claudeMd) {
    return null;
  }

  const files = [];

  // Add main CLAUDE.md file
  if (claudeMd.main) {
    files.push(claudeMd.main);
  }

  // Add reference files
  if (claudeMd.refs && claudeMd.refs.length > 0) {
    files.push(...claudeMd.refs);
  }

  return files.length > 0 ? files : null;
}

module.exports = {
  fetchMapFromGitHub,
  getAvailableEditors,
  getAvailableFrameworks,
  getClaudeSkills,
  getFilesForFrameworkAndEditors,
  getClaudeMdFiles
};
