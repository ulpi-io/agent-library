---
name: run-parallel-agents-feature-build
description: Automatically orchestrate multiple specialized agents working in parallel when building independent features, modules, or performing separate investigations. Use when the task list contains 3+ unrelated features/tasks that don't share state, don't have execution dependencies, and can be understood independently. Match each feature to the right expert agent (Laravel, Next.js, React, Node, NestJS, Remix, Express, Expo, Flutter, Magento) and run them concurrently to maximize development speed.
---

# Run Parallel Agents Feature Build

## Overview

Automatically detect opportunities for parallel execution and orchestrate multiple specialized agents working concurrently on independent features, modules, or investigations. Match each task to the appropriate domain expert and coordinate their work to deliver faster results without sacrificing quality.

## When to Use This Skill

Use this skill automatically when:

**Task List Indicators:**
- The task list contains 3 or more independent tasks or phases
- Receiving a large plan with multiple unrelated features
- Tasks are clearly scoped and don't overlap
- Each task can be understood without context from others
- No shared state or cross-dependencies between tasks

**User Triggers:**
- "Build in parallel"
- "Split this work across agents"
- "Use multiple agents for this"
- "Speed this up with parallel execution"

**Common Scenarios:**
- Building independent features or endpoints (e.g., wishlist API, checkout flow, user dashboard)
- Implementing multiple UI components or microservices simultaneously
- Generating documentation or schema files for several modules
- Analyzing multiple code files for specific issues
- Debugging failures in isolated subsystems
- Processing multiple data files or resources

## When NOT to Use This Skill

Do NOT use parallel agents when:

**Dependencies Exist:**
- Tasks have sequential dependencies (Task B needs Task A's output)
- Shared state, data, or ownership between tasks
- The sequence of execution affects the outcome
- Agents would interfere with each other's work

**Problem Not Decomposed:**
- The problem isn't yet broken into independent units
- Need to understand full system state first
- Related failures where fixing one might fix others
- Careful coordination or debugging across layers is required

**Single Cohesive Task:**
- Working on a single integrated feature
- Refactoring that touches multiple interconnected parts
- Tasks that require constant communication between components

## Core Workflow

### Step 1: Analyze the Task List or Request

Examine the current task list or user request to identify:
1. **Number of independent work streams** - Are there 3+ separate features/tasks?
2. **Dependencies** - Can each task be completed without waiting for others?
3. **Shared state** - Do tasks modify the same files or data structures?
4. **Scope clarity** - Is each task clearly defined with known requirements?

If all conditions for parallelization are met, proceed to Step 2.

### Step 2: Match Features to Specialized Agents

For each independent task, determine the best agent type based on:

**Technology Stack Detection:**
- **Laravel backend** → `laravel-senior-engineer`
- **Next.js frontend or full-stack** → `nextjs-senior-engineer`
- **React UI components or design system** → `nextjs-senior-engineer` (or use context to infer if pure React)
- **NestJS APIs or microservices** → `nestjs-senior-engineer`
- **Remix applications** → `remix-senior-engineer`
- **Express.js APIs** → `express-senior-engineer`
- **Expo React Native mobile** → `expo-react-native-senior-engineer`
- **Flutter mobile apps** → `flutter-senior-engineer`
- **Magento e-commerce** → `magento-senior-engineer`
- **General tasks (exploration, research)** → `general-purpose`

**File Pattern Analysis:**
```
*.php + /app/ + /routes/ → Laravel
*.tsx + /app/ or /pages/ → Next.js
*.ts + nest-cli.json → NestJS
*.ts + remix.config.js → Remix
*.ts + express imports → Express
*.tsx + app.json (Expo) → Expo
*.dart + pubspec.yaml → Flutter
*.php + /app/code/ (Magento structure) → Magento
```

### Step 3: Prepare Agent Briefs

For each agent, create a clear, focused brief containing:

**Required Elements:**
1. **Scope of work** - Exactly what to build/analyze/fix
2. **Expected output** - What deliverables to produce
3. **Context** - Relevant file paths, existing patterns, constraints
4. **Success criteria** - How to verify completion

**Brief Template:**
```
Build [feature name]:
- Scope: [specific feature boundaries]
- Files: [relevant paths or patterns]
- Requirements: [bullet points]
- Output: [expected deliverables]
- Patterns: [existing code patterns to follow]
```

### Step 4: Launch Agents in Parallel

Execute all agents simultaneously using a **single message with multiple Task tool calls**:

```
Use the Task tool to launch multiple agents in parallel:
- Agent 1: [brief for first feature]
- Agent 2: [brief for second feature]
- Agent 3: [brief for third feature]
```

**Critical Requirements:**
- Send ALL Task tool calls in ONE message
- Do NOT wait for agents to complete before launching others
- Each agent gets its complete brief upfront
- No placeholder values - all parameters must be complete

### Step 5: Monitor and Aggregate Results

After agents complete:
1. **Collect outputs** from each agent
2. **Verify deliverables** match expected outputs
3. **Check for conflicts** (e.g., overlapping file changes)
4. **Merge results** into a coherent summary
5. **Report to user** with consolidated findings

**Aggregation Template:**
```
Parallel execution complete. Results:

**[Feature 1]** (via [agent-type])
- Status: [completed/blocked/partial]
- Delivered: [summary]
- Files modified: [list]

**[Feature 2]** (via [agent-type])
- Status: [completed/blocked/partial]
- Delivered: [summary]
- Files modified: [list]

**Overall:** [X/Y features completed, any conflicts, next steps]
```

## Example Scenarios

### Example A: Feature Build

**User Says:**
"Build the wishlist API, checkout summary, and user dashboard in parallel."

**Execution:**
1. **Detect** three separate feature scopes
2. **Match agents:**
   - Wishlist API → `laravel-senior-engineer` (backend)
   - Checkout summary → `nextjs-senior-engineer` (frontend)
   - User dashboard → `nextjs-senior-engineer` (frontend/UI)
3. **Launch** all three in a single message with Task tool
4. **Aggregate** results into merged summary

**Output:**
```
Built 3 features in parallel:
- Wishlist API: Complete (app/Http/Controllers/WishlistController.php, routes/api.php)
- Checkout summary: Complete (app/checkout/summary/page.tsx)
- User dashboard: Complete (app/dashboard/page.tsx)
```

### Example B: Debug Parallel Subsystems

**User Says:**
"Run parallel agents to debug these failing tests."

**Execution:**
1. **Cluster failures** by subsystem:
   - Laravel backend tests
   - Next.js frontend tests
   - Node.js API tests
2. **Spawn agents:**
   - `laravel-senior-engineer` for Laravel failures
   - `nextjs-senior-engineer` for Next.js failures
   - `express-senior-engineer` for Node API failures
3. **Let each diagnose and fix** independently
4. **Gather results**, merge patches, re-run tests
5. **Output** consolidated fix report

### Example C: Code Analysis

**User Says:**
"Analyze these 5 code files in parallel for performance bottlenecks."

**Execution:**
1. **Split files** across appropriate agents based on file type
2. **Run analysis** concurrently (each agent gets 1-2 files)
3. **Merge findings** into summarized report with:
   - File-by-file breakdown
   - Common patterns across files
   - Prioritized recommendations

## Agent Type Reference

Quick reference for matching tasks to agents:

| Agent Type | Best For | Key Indicators |
|------------|----------|----------------|
| `laravel-senior-engineer` | Laravel backends, APIs, Eloquent models | `*.php`, `/app/`, Eloquent, Artisan |
| `nextjs-senior-engineer` | Next.js apps, React Server Components, App Router | `*.tsx`, `/app/`, `/pages/`, `next.config.*` |
| `nestjs-senior-engineer` | NestJS APIs, microservices, DI architecture | `*.ts`, `@nestjs/*`, `nest-cli.json` |
| `remix-senior-engineer` | Remix full-stack apps, loaders, actions | `*.tsx`, `remix.config.*`, loaders/actions |
| `express-senior-engineer` | Express.js APIs, middleware, REST endpoints | `*.js/*.ts`, `express` imports |
| `expo-react-native-senior-engineer` | Expo mobile apps, cross-platform | `*.tsx`, `app.json`, Expo modules |
| `flutter-senior-engineer` | Flutter mobile apps, widgets, state mgmt | `*.dart`, `pubspec.yaml`, Flutter widgets |
| `magento-senior-engineer` | Magento 2 e-commerce, modules | `*.php`, `/app/code/`, Magento DI |
| `general-purpose` | Exploration, research, general tasks | Non-framework-specific work |

See `references/agent_matching_logic.md` for detailed matching rules and edge cases.

## Best Practices

### Scoping Tasks Effectively

**Good Task Scopes:**
- "Build user authentication endpoint with JWT"
- "Create product listing page with filters"
- "Implement cart total calculation service"

**Poor Task Scopes:**
- "Build the entire checkout flow" (too broad, likely has dependencies)
- "Fix the app" (undefined, not decomposed)
- "Refactor database layer" (touches too many interconnected parts)

### Handling Conflicts

If agents modify overlapping files:
1. **Review changes** from each agent
2. **Identify conflicts** (same lines modified)
3. **Merge intelligently** or ask user for guidance
4. **Re-test** affected areas

### Communication Pattern

Always inform the user BEFORE launching parallel agents:
```
I've identified 3 independent features that can be built in parallel:
1. [Feature 1] - using [agent-type]
2. [Feature 2] - using [agent-type]
3. [Feature 3] - using [agent-type]

Launching agents now...
```

### Failure Handling

If an agent fails or gets blocked:
- Continue with successful agents
- Report partial results
- Provide clear next steps for blocked work
- Don't retry automatically without user input

## Resources

### references/

- **agent_matching_logic.md** - Detailed rules for matching features to agent types, edge cases, and technology detection patterns

This skill does not require scripts or assets - it orchestrates existing Claude Code agent capabilities.
