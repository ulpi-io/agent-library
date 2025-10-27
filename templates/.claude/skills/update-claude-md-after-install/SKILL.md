---
name: update-claude-md-after-install
description: Use when user has just installed framework agents and CLAUDE.md contains generic examples - systematically discovers actual project patterns (custom commands, architecture decisions, team conventions) and updates CLAUDE.md and imported files with real project-specific information
---

# Update CLAUDE.md After Installation

## Overview

After installing framework agents, CLAUDE.md and its imported files contain generic placeholder examples. This skill guides you to systematically discover the actual project patterns and update these files with real, project-specific information.

**Core principle:** Discover, don't assume. Analyze the codebase to find actual patterns instead of keeping generic examples.

## When to Use

Use this skill when:
- **Initial install:** User just installed agents and CLAUDE.md has generic examples
- **Project start:** Beginning work on a project for the first time
- **Key milestones:** After major architecture changes, new custom commands added, team conventions updated
- **Periodic refresh:** User asks to "update docs" or "sync CLAUDE.md with project"
- **Discovery gaps:** CLAUDE.md outdated or missing new project patterns

**Symptoms:**
- CLAUDE.md has comments like "customize for your project"
- project-commands.md shows `app:sync-users` but project has different commands
- architecture.md describes patterns the project doesn't use
- conventions.md has generic git workflow but project uses different process
- New features added but not documented in CLAUDE.md
- Team asks "is the CLAUDE.md file current?"

## Discovery Modes

### Full Discovery (Initial Install)
Run all discovery steps to build complete project documentation from generic templates.

### Incremental Update (Periodic Refresh)
Focus on what changed:
1. Check for new custom commands added since last update
2. Scan for architecture changes (new queues, services, patterns)
3. Review for updated team conventions

### Targeted Update (Specific Change)
User says "I just added multi-tenancy" or "we have new deployment scripts":
1. Discover only the mentioned area
2. Update relevant section
3. Verify no conflicts with existing documentation

## Discovery Process

Follow these steps systematically. Use TodoWrite to track progress.

### Step 1: Announce and Plan

```markdown
I'm using the **update-claude-md-after-install** skill to discover your actual project patterns.

I'll systematically analyze:
1. Custom artisan commands
2. Architecture patterns
3. Team conventions

This ensures CLAUDE.md matches your real project.
```

### Step 2: Discover Custom Commands

**What to look for:**
- Custom artisan commands in `app/Console/Commands/`
- Deployment scripts (`deploy.sh`, `rollback.sh`, etc.)
- Package.json scripts
- Custom bash/python scripts in project root or `bin/`

**How to discover:**

```bash
# Find custom artisan commands
find app/Console/Commands -name "*.php" -type f

# Check for deployment scripts
ls -la *.sh 2>/dev/null || echo "No shell scripts"

# Check package.json scripts
cat package.json | grep -A 20 "\"scripts\""
```

**What to extract:**
- Command signature (e.g., `php artisan app:command-name`, `npm run custom-task`, `yarn workspace:sync`)
- Description from docblock, comments, or help text
- When it's used (schedule, manual, deployment)

**Update:** Replace generic examples in `.claude/claude-md-refs/project-commands.md` with discovered commands.

### Step 3: Discover Architecture Patterns

**What to look for:**
- Multi-tenancy: Search for `TenantScope`, `tenant_id`, subdomain resolution
- Event-driven: Check `app/Events/`, `app/Listeners/`, event service providers
- API versioning: Look in `routes/api.php` for `/v1/`, `/v2/` patterns
- Queue configuration: Check `config/horizon.php` or `config/queue.php`
- Auth strategy: Look for Sanctum, Passport, Fortify usage in `composer.json` and config

**How to discover:**

```bash
# Check for multi-tenancy
grep -r "TenantScope" app/ --include="*.php"
grep -r "tenant_id" database/migrations/ --include="*.php"

# Check for events
ls -la app/Events/ app/Listeners/ 2>/dev/null

# Check API versioning
grep "api/v" routes/api.php

# Check queue config
cat config/horizon.php 2>/dev/null || cat config/queue.php
```

**What to extract:**
- Actual patterns used (not generic possibilities)
- Specific configuration values (queue names, worker counts, retry strategies)
- Technology choices (which packages, which drivers)

**Update:** Replace generic architecture descriptions in `.claude/claude-md-refs/architecture.md` with discovered patterns.

### Step 4: Discover Team Conventions

**What to look for:**
- Git workflow in `.github/PULL_REQUEST_TEMPLATE.md` or `CONTRIBUTING.md`
- CI/CD configuration in `.github/workflows/` for test requirements
- Code review standards in documentation
- Testing requirements (coverage thresholds in `phpunit.xml` or CI config)
- Deployment procedures in README or docs/

**How to discover:**

```bash
# Check for PR template
cat .github/PULL_REQUEST_TEMPLATE.md 2>/dev/null

# Check CI workflow
ls -la .github/workflows/*.yml 2>/dev/null

# Check for CONTRIBUTING
cat CONTRIBUTING.md 2>/dev/null

# Check phpunit config for coverage
grep "coverage" phpunit.xml 2>/dev/null
```

**What to extract:**
- Approval requirements (how many reviewers)
- Testing standards (coverage %, required test types)
- Git branch naming conventions
- Deployment process specifics

**Update:** Replace generic conventions in `.claude/claude-md-refs/conventions.md` with discovered standards.

### Step 5: Update BOTH Root CLAUDE.md AND All Imported Files

**First, discover ALL imported files:**

Read root CLAUDE.md and find all `@` imports. Common pattern:
```markdown
@.claude/claude-md-refs/project-commands.md
@.claude/claude-md-refs/architecture.md
@.claude/claude-md-refs/conventions.md
```

But projects may have additional imports like:
```markdown
@.claude/claude-md-refs/deployment-guide.md
@.claude/claude-md-refs/testing-strategy.md
@.claude/project-specific-rules.md
```

**Extract ALL import paths:** Scan CLAUDE.md for lines starting with `@` - these are all the files you need to update.

**Update TWO sets of files:**

#### A. Root CLAUDE.md (Framework-Specific Sections)

Update these sections in root `CLAUDE.md` to match the actual project:

- **Project Commands** section - Add actual project-specific commands
- **Code Style** section - Update if project uses different standards
- **File Organization** - Match actual project structure
- Any framework sections that differ from defaults

#### B. ALL Imported Files (Dynamically Discovered)

For EACH file found via `@` imports:

1. **Read the imported file** to understand its purpose
2. **Discover relevant patterns** based on file content/name
3. **Update with actual project information**
4. **Verify updates** by reading the file again

Common imported files:
```
.claude/claude-md-refs/
├── project-commands.md - Custom commands, deployment scripts
├── architecture.md - Multi-tenancy, queues, API design decisions
├── conventions.md - Git workflow, code review, testing standards
└── [any other @imported files found in CLAUDE.md]
```

**CRITICAL:** Update ALL files (root CLAUDE.md + every @imported file) so complete documentation matches the actual project.

**Before updating:**
1. Read root CLAUDE.md
2. Extract ALL `@import` paths (lines starting with `@`)
3. Read each imported file to understand its purpose
4. Identify sections with generic examples in root and all imported files
5. Have discovered information for all files

**Update strategy:**
- **Root CLAUDE.md**: Replace generic framework examples with project-specific ones
- **Imported files**: Replace ALL generic examples with discovered patterns
- **Keep**: Framework best practices and structure
- **Remove**: Sections describing patterns the project doesn't use

**After updating:**
1. Read root CLAUDE.md to verify updates
2. Read EVERY imported file (from `@` paths) to verify updates
3. Verify ALL @imports still resolve correctly
4. Confirm no generic placeholders remain in ANY file (root or imported)

### Step 6: Verification Checklist

Before completing, verify:

**Root CLAUDE.md:**
- [ ] Project Commands section has actual commands, not just generic examples
- [ ] Code Style matches project (if different from framework defaults)
- [ ] File Organization reflects actual project structure
- [ ] All framework sections match how project actually uses the framework

**All Imported Files (discovered via @ imports):**
- [ ] Extracted all @import paths from root CLAUDE.md
- [ ] Read every imported file to understand its purpose
- [ ] Updated every imported file with discovered project patterns
- [ ] Typical files to update:
  - [ ] project-commands.md: All custom commands, deployment scripts
  - [ ] architecture.md: Actual architecture patterns, queue config
  - [ ] conventions.md: Team conventions, PR approvals, coverage
  - [ ] [any additional imported files found]

**Both Root and All Imported Files:**
- [ ] No generic placeholders like "customize for your project" remain in ANY file
- [ ] ALL @imports in root CLAUDE.md resolve correctly
- [ ] ALL files (root + every imported file) use real project examples
- [ ] Complete documentation across all files matches actual project

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Keeping generic examples | Replace with discovered real examples |
| Asking user instead of discovering | Analyze codebase first, ask only for clarification |
| Superficial updates (just project name) | Do thorough discovery of actual patterns |
| Only updating root CLAUDE.md | Update root CLAUDE.md AND ALL @imported files |
| Only updating known imported files | Discover ALL @import paths dynamically, update every file |
| Missing some imported files | Extract ALL lines starting with @ from CLAUDE.md |
| Not verifying updates work | Read ALL files after updating to confirm |
| Skipping discovery under time pressure | Discovery takes 2-3 minutes, prevents incorrect documentation |

## What If Discovery Finds Nothing?

If discovery doesn't find project-specific patterns:

1. **For commands:** Keep generic examples but add comment: "No custom commands found. Add your commands here as you create them."

2. **For architecture:** Keep generic examples and add note: "These are common patterns for this framework. Update as your architecture evolves."

3. **For conventions:** Ask user: "I didn't find team conventions in .github/ or CONTRIBUTING.md. Do you have documented standards elsewhere?"

**Don't leave incorrect information.** Better to keep generic examples with a note than to document patterns that don't exist.

## Example: Updating project-commands.md

**Laravel Project Example:**

Before (generic):
```markdown
## Custom Artisan Commands
- `php artisan app:sync-users` - Sync users from external service
- `php artisan app:generate-reports` - Generate monthly reports
```

After discovery finds: `app/Console/Commands/ImportOrdersCommand.php` and `app/Console/Commands/SendDailySummaryCommand.php`

After (updated):
```markdown
## Custom Artisan Commands
- `php artisan app:import-orders {source}` - Import orders from external platform (Shopify, WooCommerce)
- `php artisan app:send-daily-summary` - Send daily summary emails to admin users (runs at 8am via scheduler)
```

**Express/Node.js Project Example:**

Before (generic):
```markdown
## Custom NPM Scripts
- `npm run sync:data` - Sync data from external service
- `npm run generate:reports` - Generate monthly reports
```

After discovery finds scripts in `package.json` and files in `src/scripts/`

After (updated):
```markdown
## Custom NPM Scripts
- `npm run import:orders -- --source=shopify` - Import orders from Shopify API
- `npm run email:daily-summary` - Send daily summary emails (runs via cron at 8am)
```

Notice:
- Generic examples replaced with actual commands
- Real descriptions from command docblocks
- Usage context added (what it does, when it runs)

## Resisting Time Pressure and Shortcuts

### If user says "I'm in a hurry, just quickly update it":

**Response:**
```
I understand you're in a hurry. However, thorough discovery takes only 2-3 minutes and ensures
your CLAUDE.md has accurate information. Incorrect documentation causes confusion later.

I'll work efficiently: discover commands → architecture → conventions → update files.

This prevents having to redo it when generic examples cause problems.
```

**Then proceed with full discovery process.** Don't skip steps.

### Common Rationalizations to Reject

| Rationalization | Reality |
|-----------------|---------|
| "Just update the obvious parts" | Discovery finds non-obvious patterns. Do full scan. |
| "I'll tell you what to update" | Codebase is source of truth. Discover first, ask for clarification. |
| "User seems busy, don't bother them" | Users WANT accurate docs. 2-3 minutes now saves hours later. |
| "Generic examples are fine as templates" | Generic examples confuse and cause errors. Replace with real patterns. |
| "I can skip the imported files" | Imported files are loaded by Claude. Update ALL files. |
| "Just update project-commands.md" | Architecture and conventions matter too. Update all three minimum. |
| "I'll just update what I find" | Extract ALL @imports first. Update every discovered file. |

**All of these mean: Do full discovery, update ALL files (root + all imports).**

### Red Flags - STOP and Start Over

If you catch yourself doing any of these, STOP:
- ❌ Updating only root CLAUDE.md without checking for imports
- ❌ Keeping generic examples because "they're close enough"
- ❌ Asking user what to update instead of discovering
- ❌ Skipping grep/find commands to save time
- ❌ Not reading imported files to verify updates
- ❌ Missing @imported files because you didn't extract all @ lines

**If you see ANY red flag: Stop, announce you're using this skill properly, start discovery from Step 1.**

## Integration with Other Skills

This skill works after:
- Installing agents via the installer
- CLAUDE.md has been copied to project root
- claude-md-refs/ folder exists with template files

This skill prepares for:
- Using Claude Code with accurate project context
- Agents having real examples instead of placeholders
- Future developers understanding actual project patterns

## Key Reminders

1. **Announce skill usage** - "I'm using update-claude-md-after-install skill"
2. **Discover ALL imports dynamically** - Extract ALL @ lines from CLAUDE.md first
3. **Discover, don't assume** - Grep/find actual patterns, don't ask user
4. **Update BOTH root and ALL imports** - Root CLAUDE.md + every @imported file
5. **Replace, don't append** - Replace generic examples with real discovered ones
6. **Verify ALL files** - Read root and every imported file after updating
7. **No shortcuts under pressure** - 2-3 minutes prevents hours of confusion
8. **Ask only for clarification** - After discovery, not instead of discovery
9. **Document what exists** - Don't document patterns the project doesn't use
10. **Use TodoWrite** - Track discovery and update progress

## Quick Workflow Summary

```
1. Announce: "Using update-claude-md-after-install skill"
2. Discover imports: grep "^@" CLAUDE.md
3. Discover commands: find app/Console/Commands/
4. Discover architecture: grep tenant_id, check config/
5. Discover conventions: check .github/, CONTRIBUTING.md
6. Update root CLAUDE.md: Replace framework section examples
7. Update ALL imported files: Replace ALL generic content
8. Verify: Read root + ALL imports, confirm no generic placeholders
9. Complete: Announce updates finished
```

---

*This skill ensures CLAUDE.md and ALL imported files match the actual project, not generic templates.*
