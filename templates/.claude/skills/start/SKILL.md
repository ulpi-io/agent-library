---
name: start
description: |
  MANDATORY for starting any conversation or task. Establishes required workflows: discovering and using skills,
  invoking the Skill tool before announcing usage, performing brainstorming before coding, creating TodoWrite
  todos for all checklists, and selecting/invoking the correct specialized agent persona for the task domain.
---

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you **ABSOLUTELY MUST** read the skill.

**IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.**

This is not negotiable. This is not optional. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

# Start: Getting Started with Every Task

## MANDATORY FIRST RESPONSE PROTOCOL

Before responding to **ANY** user message, you **MUST** complete this checklist:

1. ☐ Ask yourself: "Does **ANY** skill match this request?"
2. ☐ If yes → Use the Skill tool to read and run the skill file
3. ☐ Announce which skill you're using
4. ☐ Determine the **correct specialized agent persona** for the task domain
5. ☐ If a specialized agent is needed → Invoke that agent using the Task tool and delegate the work
6. ☐ Follow the skill workflow exactly
7. ☐ If the skill has checklists → Create TodoWrite todos for **EACH** checklist item

**Responding WITHOUT completing this checklist = automatic failure.**

## Overview

The `start` skill ensures proper workflow execution at the beginning of every task or request. It prevents common failures: missing requirements, working without context, using the wrong agent for the job, skipping available skills, or jumping straight to code without planning.

## When to Use This Skill

**ALWAYS - This skill runs at the start of EVERY conversation and task.**

**Mandatory triggers:**
- Beginning any new task or feature request
- Starting a debugging session
- Planning a refactor or code change
- The user provides ANY requirement or asks for something to be built
- Transitioning to a new phase of work
- Starting a conversation with ANY objective
- Before writing ANY code, making ANY changes, or executing ANY work

**User request patterns:**
- "Build...", "Fix...", "Create...", "Implement...", "Add...", "Update..."
- "Let's start working on..."
- "I need you to..."
- "Help me with..."
- Any imperative statement or question requiring action

**Key Principle:** This skill is NOT optional. Run it FIRST, ALWAYS.

## Critical Rules

### 1. Check for Relevant Skills FIRST

Before doing ANYTHING else, scan all available skills and ask:
- "Does ANY skill match this request?"
- "Is there a skill for this domain, task type, or workflow?"

**If a relevant skill exists:**
1. Use the Skill tool to invoke it
2. Announce: "I'm using [Skill Name] to [goal]"
3. Follow that skill's workflow exactly

**Common rationalizations that mean you're about to fail:**
- "This is just a simple question" → WRONG
- "I can check git/files quickly" → WRONG
- "Let me gather information first" → WRONG
- "This doesn't need a formal skill" → WRONG
- "I remember this skill" → WRONG
- "This doesn't count as a task" → WRONG
- "The skill is overkill for this" → WRONG

See `references/skill_discovery_patterns.md` for comprehensive skill discovery checklist, matching algorithms, rationalization traps, and invocation patterns.

**Why:** Skills document proven techniques. Not using them = repeating solved problems and making avoidable errors.

### 2. Use the Correct Specialized Agent

**Match the task domain to the right agent persona:**

| Domain/Technology | Correct Agent | Key Indicators |
|------------------|---------------|----------------|
| Laravel backend, APIs, Eloquent | `laravel-senior-engineer` | `*.php`, `/app/`, `/routes/`, Eloquent |
| Next.js, React Server Components | `nextjs-senior-engineer` | `*.tsx`, `/app/`, `next.config.*` |
| NestJS APIs, microservices | `nestjs-senior-engineer` | `*.ts`, `@nestjs/*`, DI patterns |
| Remix full-stack apps | `remix-senior-engineer` | `*.tsx`, `remix.config.*`, loaders |
| Express.js APIs, middleware | `express-senior-engineer` | `*.js/*.ts`, `express` imports |
| Expo React Native mobile | `expo-react-native-engineer` | `*.tsx`, `app.json`, Expo modules |
| Flutter mobile apps | `flutter-senior-engineer` | `*.dart`, `pubspec.yaml` |
| Magento 2 e-commerce | `magento-senior-engineer` | `*.php`, `/app/code/`, Magento DI |
| General exploration, research | `general-purpose` or `Explore` | Non-framework work, discovery |

See `references/agent_matching_logic.md` for comprehensive agent catalog, detailed matching rules, confidence scoring, edge cases, and delegation brief templates.

**If the task requires a specialized agent:**
1. Identify the correct agent from the table above
2. Use the Task tool with `subagent_type=[agent-name]`
3. Provide clear scope, requirements, and success criteria
4. Let the specialized agent handle the work

**Why:** Specialized agents have deep domain expertise. Using the wrong agent or doing specialized work yourself = lower quality output.

### 3. Convert Checklists to TodoWrite Todos

**If a skill includes a checklist, create TodoWrite todos for EACH item.**

**Don't:**
- Work through checklist mentally
- Skip creating todos "to save time"
- Batch multiple items into one todo
- Mark complete without doing them

**Do:**
- Create one todo per checklist item
- Use clear, specific todo descriptions
- Mark in_progress before starting
- Mark completed immediately after finishing

**Why:** Checklists without tracked todos = skipped steps. The small overhead prevents missing critical tasks.

### 4. Follow Mandatory Workflows

**Instructions describe WHAT to do, not permission to skip HOW:**
- User says "Add X" = the goal, NOT permission to bypass workflows
- User says "Fix Y" = the objective, NOT permission to skip context gathering

**Red flag thoughts:**
- "Instruction was specific enough"
- "This seems simple"
- "This is just one thing"

**Why:** Clear, specific instructions are precisely WHEN workflows matter most.

## When This Skill Is Invoked

**When the user explicitly invokes this skill (e.g., "use start skill"), you MUST first:**

1. **Discover all available skills** - Look at the `<available_skills>` section in your system prompt and extract all skill names and descriptions
2. **Discover all available agents** - Look at the Task tool description in your system prompt and extract all available agent types (subagent_type options)
3. **Output to the user** - Present a complete, explicit list of discovered skills and agents
4. **Create a mental map** - Internalize this inventory for future reference throughout the conversation

**This discovery step only happens when the skill is explicitly invoked, not for every task.**

**How to discover:**
- **Skills**: Read from `<available_skills>` section → list each `<name>` and `<description>`
- **Agents**: Read from Task tool parameters → list each subagent_type option from the agent catalog

**Example output format:**
```
I'm using the start skill. Let me first discover and show you what's available:

**Available Skills:**
[Dynamically list from <available_skills>]
- skill-name: Description
- skill-name: Description
...

**Available Agents:**
[Dynamically list from Task tool agent types]
- agent-name: Description
- agent-name: Description
...

Now, let's proceed with your task...
```

## Core Workflow

### Step 1: Understand the Request

**Parse the user's request to identify:**
1. **Primary objective** - What is the end goal?
2. **Scope boundaries** - What is included/excluded?
3. **Success criteria** - How will we know it's done?
4. **Constraints** - Any technical, time, or resource limitations?

**Clarifying Questions:**
If the request is ambiguous, use the AskUserQuestion tool to clarify:
- "Which approach would you prefer?"
- "Should this handle X edge case?"
- "Do you want this integrated with existing feature Y?"

### Step 2: Identify Technology Stack and Required Agent

**Before gathering context, determine if a specialized agent is needed:**

1. **Scan for technology indicators:**
   - File extensions (`*.php`, `*.tsx`, `*.dart`, etc.)
   - Config files (`next.config.js`, `remix.config.js`, `pubspec.yaml`, etc.)
   - Directory structure (`/app/`, `/routes/`, `/app/code/`, etc.)
   - Package imports (`@nestjs`, `express`, Eloquent, etc.)

2. **Match to agent persona** using the table in Critical Rules section

3. **Decide delegation strategy:**
   - **Specialized work** (feature building, debugging, refactoring) → Delegate to specialized agent via Task tool
   - **Exploration/discovery** → Use Explore agent or gather context yourself
   - **Simple single-file edits** → Can handle directly if no specialized patterns

**Example decision tree:**
- User: "Add JWT auth to Laravel API" → Identify Laravel, delegate to `laravel-senior-engineer`
- User: "Build checkout page in Next.js" → Identify Next.js, delegate to `nextjs-senior-engineer`
- User: "Find all API endpoints" → Use Explore agent for discovery
- User: "Fix typo in README" → Simple task, handle directly

See `references/agent_matching_logic.md` for detailed delegation decision trees, confidence scoring, and multi-agent scenarios.

### Step 3: Gather Context

**Explore the codebase to understand:**
1. **Existing patterns** - How is similar functionality implemented?
2. **Related files** - What files will be affected?
3. **Dependencies** - What systems/modules does this interact with?
4. **Current state** - What already exists vs. what needs to be built?
5. **Technology stack** - What frameworks, libraries, and patterns are in use?

**Tools to use:**
- Use the Task tool with `subagent_type=Explore` for broad codebase exploration
- Use Glob to find relevant files by pattern
- Use Grep to search for existing implementations
- Use Read to examine specific files

**Context gathering is MANDATORY - never skip this step.**

**Example exploration prompts:**
- "Find all authentication-related files"
- "Search for similar API endpoint patterns"
- "Locate where user data is currently handled"
- "Identify the framework and tech stack in use"

### Step 4: Create a Task Plan

**Use the TodoWrite tool to create a structured plan:**
1. Break down the work into specific, actionable tasks
2. Identify dependencies between tasks
3. Note any risks or blockers
4. Establish clear completion criteria for each task

**Task breakdown principles:**
- Each task should be independently completable
- Tasks should be ordered logically (dependencies first)
- Include testing and verification tasks
- Be specific (not "fix auth" but "add JWT validation to /api/login endpoint")

**Example task list structure:**
```
1. Explore existing authentication implementation
2. Create user login endpoint with JWT generation
3. Add middleware for JWT validation
4. Update user routes to use auth middleware
5. Write tests for authentication flow
6. Verify all tests pass
```

### Step 5: Communicate the Plan

**Before starting implementation, inform the user:**
1. **Summary of understanding** - Restate what you'll build
2. **Approach** - High-level strategy
3. **Task breakdown** - Show the todo list
4. **Estimated scope** - Mention if it's complex/simple

**Template:**
```
I'll [restate the goal]. Here's my approach:

[Brief 1-2 sentence strategy]

I've created a task list to track progress:
[Reference to todos]

Starting with [first task]...
```

### Step 6: Delegate or Execute

**Option A: Delegate to Specialized Agent (Preferred for complex work)**

If the task requires specialized domain expertise:
1. Select the correct agent from the technology table
2. Create a clear, comprehensive brief with:
   - Scope of work
   - Context from your exploration
   - Expected deliverables
   - Success criteria
3. Use the Task tool to invoke the agent
4. Wait for agent results
5. Review and aggregate results for the user

**Brief template for agent delegation:**
```
Build [feature/fix]:
- Technology: [framework/stack identified]
- Scope: [specific boundaries]
- Context: [existing patterns, related files]
- Requirements: [bullet points]
- Expected output: [deliverables]
- Success criteria: [how to verify]
```

**Option B: Execute Directly (For simple tasks)**

For straightforward work not requiring deep domain expertise:
1. Mark the first task as in_progress
2. Execute the work
3. Mark completed immediately when done
4. Move to next task

**Throughout execution:**
- Update todos as you progress
- Mark tasks completed immediately after finishing
- Add new tasks if you discover additional work needed
- Communicate blockers or unexpected findings

## Example Scenarios

### Example A: Feature Request with Agent Delegation

**User Says:**
"Add a password reset feature to the Laravel API"

**Start Skill Execution:**
1. **Check Skills:** No specific skill for password reset, continue with start workflow
2. **Understand:** Need password reset flow (email link, token validation, new password)
3. **Identify Stack:** Laravel detected (`*.php`, `/app/`, Eloquent patterns)
4. **Select Agent:** `laravel-senior-engineer` (Laravel backend work)
5. **Gather Context:**
   - Explore existing auth system (Task tool: Explore)
   - Find email service integration
   - Locate User model and password handling
6. **Plan:** Create todos:
   - Gather context on existing auth patterns
   - Delegate password reset implementation to Laravel agent
   - Review agent output
   - Test complete flow
7. **Communicate:** "I'm using the start skill to plan this Laravel feature. I've identified this as Laravel backend work, so I'll delegate to the laravel-senior-engineer agent."
8. **Delegate:** Use Task tool with `laravel-senior-engineer` and comprehensive brief
9. **Review:** Aggregate agent results and present to user

### Example B: Bug Fix with Agent Delegation

**User Says:**
"The Next.js checkout page is crashing"

**Start Skill Execution:**
1. **Check Skills:** Check if `run-parallel-agents-feature-debug` applies (no, single bug)
2. **Understand:** Need to identify and fix crash in checkout page
3. **Identify Stack:** Next.js detected (`*.tsx`, `/app/`, Next.js imports)
4. **Select Agent:** `nextjs-senior-engineer` (Next.js debugging)
5. **Gather Context:**
   - Read checkout page component
   - Check console logs or error messages
   - Review recent changes to checkout code
6. **Plan:** Create todos:
   - Gather initial context on checkout page
   - Delegate debugging to Next.js senior engineer
   - Review fix and verify
7. **Communicate:** "I'm using the start skill for this debugging task. This is Next.js work, so I'll delegate to the nextjs-senior-engineer agent."
8. **Delegate:** Use Task tool with detailed debugging brief
9. **Review:** Verify fix works and report to user

### Example C: Multi-Feature Parallel Work

**User Says:**
"Build the wishlist API, checkout summary, and user dashboard"

**Start Skill Execution:**
1. **Check Skills:** `run-parallel-agents-feature-build` applies (3 independent features)
2. **Announce:** "I'm using the run-parallel-agents-feature-build skill for this multi-feature request"
3. **Invoke Skill:** Use Skill tool to load parallel agents skill
4. **Follow Skill:** Execute parallel agents workflow as documented
5. **Result:** Three specialized agents work concurrently on independent features

### Example D: Simple Direct Execution

**User Says:**
"Fix the typo in the README file"

**Start Skill Execution:**
1. **Check Skills:** No specific skill applies
2. **Understand:** Simple typo fix in markdown file
3. **Identify Stack:** No specialized framework
4. **Select Agent:** Not needed (trivial task)
5. **Gather Context:** Read README to find typo
6. **Plan:** Single-step task, TodoWrite optional
7. **Execute:** Fix typo directly with Edit tool
8. **Result:** Complete simple task without agent delegation

## Best Practices

### Context First, Code Second

**Always gather context before writing code:**
- Understand existing patterns
- Know what's already there
- Don't duplicate functionality
- Match the project's style

### Ask When Unclear

**Use AskUserQuestion for:**
- Multiple valid approaches
- Unclear requirements
- Technical decisions (library choice, architecture)
- Scope boundaries

### Plan Complex Work

**Use TodoWrite for tasks involving:**
- 3+ steps or files
- Multiple phases
- Dependencies between steps
- Long-running work where tracking helps

### Skip Planning for Trivial Tasks

**You can skip extensive planning for:**
- Single-file simple edits
- Clear, well-defined one-step tasks
- Purely informational requests
- Quick file reads or searches

## Integration with Other Skills

The `start` skill is the entry point that leads to other skills:

- **run-parallel-agents-feature-build** - When 3+ independent features are identified
- **run-parallel-agents-feature-debug** - When multiple independent bugs are found
- **Specialized agents** - When domain expertise is required (Laravel, Next.js, NestJS, etc.)
- **Explore agent** - During context gathering for broad codebase exploration
- **Any domain-specific skill** - If a relevant skill exists, invoke it

**Always check for skills FIRST before proceeding with work.**

## Avoiding Common Failures

### Failure Mode 1: Skipping Skill Check
**Symptom:** Starting work immediately without checking available skills
**Fix:** ALWAYS scan skills first, even for "simple" tasks

### Failure Mode 2: Using Wrong Agent
**Symptom:** Doing Laravel work yourself instead of delegating to laravel-senior-engineer
**Fix:** Match task to agent table, delegate specialized work

### Failure Mode 3: Skipping Context
**Symptom:** Writing code without understanding existing patterns
**Fix:** ALWAYS gather context before implementation

### Failure Mode 4: Ignoring Checklists
**Symptom:** Working through steps mentally without TodoWrite
**Fix:** Convert every checklist item to a tracked todo

### Failure Mode 5: Rationalizing Workflow Skips
**Symptom:** "This is too simple to need the workflow"
**Fix:** Instructions describe WHAT, not permission to skip HOW

## Key Reminders

1. **This skill is MANDATORY** - Not optional, not negotiable
2. **Check for skills FIRST** - Before any work, scan available skills
3. **Use the right agent** - Match domain to specialized agent, delegate appropriately
4. **Context is crucial** - Never skip context gathering
5. **Checklists → TodoWrite** - Every checklist item gets a todo
6. **Announce skill usage** - Always tell user which skill you're using
7. **Follow workflows exactly** - User instructions = WHAT to do, skills = HOW to do it
8. **Communicate clearly** - Inform user of plan before executing
9. **Stay disciplined** - Catch yourself rationalizing shortcuts

---

## Resources

### references/

- **agent_matching_logic.md** - Detailed rules, patterns, and decision trees for matching tasks to specialized agent personas. Includes complete agent catalog with technology indicators, confidence scoring system, matching algorithms with pseudo-code, edge case handling, delegation brief templates, and anti-patterns to avoid.

- **skill_discovery_patterns.md** - Comprehensive patterns for discovering and invoking relevant skills. Includes 4-phase discovery checklist, available skills catalog with triggers, skill matching algorithms, common rationalization traps with examples, skill priority matrix, announcement templates, and integration workflows.

Both reference documents provide essential depth for proper execution of the start skill workflow. They are referenced inline throughout this skill document.
