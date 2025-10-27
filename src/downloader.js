const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const ora = require('ora');

const REPO_URL = 'https://raw.githubusercontent.com/ulpi-io/agent-library/main';

/**
 * Download a single file from map entry
 */
async function downloadFileFromMap(mapEntry, targetDir) {
  const url = `${REPO_URL}/${mapEntry.source}`;
  const fullPath = path.join(targetDir, mapEntry.destination);

  // Create directory if it doesn't exist
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${mapEntry.source}: ${response.statusText}`);
  }

  const content = await response.text();
  fs.writeFileSync(fullPath, content);

  // Make shell scripts executable
  if (mapEntry.source.endsWith('.sh')) {
    fs.chmodSync(fullPath, '755');
  }

  return fullPath;
}

/**
 * Download files from map entries
 */
async function downloadFilesFromMap(mapEntries, targetDir, dryRun = false) {
  if (dryRun) {
    console.log('\n🔍 Dry Run - Files that would be downloaded:');
    mapEntries.forEach(entry => console.log(`  📄 ${entry.destination}`));
    return { total: mapEntries.length, downloaded: 0, failed: 0 };
  }

  console.log(`\n📥 Downloading ${mapEntries.length} files...`);

  let downloaded = 0;
  const failed = [];

  for (const entry of mapEntries) {
    const spinner = ora(`Downloading ${entry.destination}`).start();

    try {
      await downloadFileFromMap(entry, targetDir);
      spinner.succeed(`Downloaded ${entry.destination}`);
      downloaded++;
    } catch (error) {
      spinner.fail(`Failed to download ${entry.destination}`);
      failed.push({ file: entry.destination, error: error.message });
    }
  }

  if (failed.length > 0) {
    console.log('\n⚠️  Some files failed to download:');
    failed.forEach(({ file, error }) => {
      console.log(`  ❌ ${file}: ${error}`);
    });
  }

  return { total: mapEntries.length, downloaded, failed: failed.length };
}

/**
 * Download CLAUDE.md files from map
 */
async function downloadCLAUDEmdFromMap(claudeMdFiles, targetDir) {
  if (!claudeMdFiles || claudeMdFiles.length === 0) {
    return false;
  }

  let downloaded = false;

  for (const file of claudeMdFiles) {
    try {
      await downloadFileFromMap(file, targetDir);
      downloaded = true;
    } catch (error) {
      // File doesn't exist, skip
    }
  }

  return downloaded;
}

/**
 * Copy Codex agent to root AGENTS.md
 */
function copyCodexAgent(framework, targetDir) {
  const sourceFile = path.join(targetDir, `.codex/${framework}.md`);
  const targetFile = path.join(targetDir, 'AGENTS.md');

  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetFile);
    return true;
  }
  return false;
}

/**
 * Copy Claude skills from map
 */
async function copyClaudeSkillsFromMap(selectedSkills, allSkills, targetDir) {
  let success = 0;
  let failed = 0;

  const targetSkillsDir = path.join(targetDir, '.claude', 'skills');

  // Create target skills directory
  if (!fs.existsSync(targetSkillsDir)) {
    fs.mkdirSync(targetSkillsDir, { recursive: true });
  }

  for (const skillKey of selectedSkills) {
    // Find skill in map
    const skill = allSkills.find(s => s.key === skillKey);
    if (!skill) {
      failed++;
      continue;
    }

    try {
      // Download skill folder recursively
      const targetSkillDir = path.join(targetDir, skill.destination);
      await downloadFolderFromGitHub(skill.source, targetSkillDir);
      success++;
    } catch (error) {
      console.error(`Failed to copy skill ${skillKey}:`, error.message);
      failed++;
    }
  }

  return { success, failed };
}

/**
 * Download entire folder from GitHub recursively
 */
async function downloadFolderFromGitHub(sourceFolder, targetFolder) {
  const apiUrl = `https://api.github.com/repos/ulpi-io/agent-library/contents/${sourceFolder}`;

  const response = await fetch(apiUrl, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'ulpi-agent-library'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch folder contents: ${response.statusText}`);
  }

  const contents = await response.json();

  // Create target folder
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  for (const item of contents) {
    if (item.type === 'file') {
      // Download file
      const fileResponse = await fetch(item.download_url);
      if (fileResponse.ok) {
        const content = await fileResponse.text();
        const targetPath = path.join(targetFolder, item.name);
        fs.writeFileSync(targetPath, content);
      }
    } else if (item.type === 'dir') {
      // Recursively download subdirectory
      const subTargetFolder = path.join(targetFolder, item.name);
      await downloadFolderFromGitHub(item.path, subTargetFolder);
    }
  }
}

module.exports = {
  downloadFileFromMap,
  downloadFilesFromMap,
  downloadCLAUDEmdFromMap,
  copyCodexAgent,
  copyClaudeSkillsFromMap
};
