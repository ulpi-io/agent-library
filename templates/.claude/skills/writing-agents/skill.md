---
name: writing-agents
description: Use when creating new agent configurations, editing existing agents, or syncing agents between Claude Code and ULPI formats. Ensures agents follow proper structure with concise examples and consistent formatting across both systems.
---

# Writing Agents: Creating Effective Agent Configurations

## Overview

**Writing agents is about creating specialized expert configurations that delegate complex tasks.**

An **agent** is a specialized Claude instance with domain expertise, specific tools, and consistent behavioral patterns. Agents allow you to delegate complex, multi-step tasks to experts while you continue working.

**Core principle:** Agents should have concise, descriptive examples without code blocks. Use bullet-point implementation steps that maintain clarity while staying token-efficient.

## What is an Agent?

An **agent** is a specialized configuration of Claude with:
- **Domain expertise**: Laravel, Next.js, Express.js, NestJS, etc.
- **Specific tools**: Read, Write, Edit, Bash, Grep, Glob, Task, etc.
- **Behavioral rules**: Always/Never guidelines
- **Example patterns**: Concise descriptions of how to implement features

**Agents are:** Specialized experts for complex tasks, domain-focused configurations

**Agents are NOT:** General-purpose assistants, code generators without context

## When to Create an Agent

**Create when:**
- Framework/technology needs dedicated expert
- Patterns are repeatable across projects
- Complex multi-step workflows benefit from delegation
- Domain knowledge is extensive

**Don't create for:**
- Technologies well-covered by existing agents
- One-off project-specific patterns
- Simple tasks that don't need delegation

## Agent File Formats

Agents exist in two formats that must stay synchronized:

### ULPI Format (.ulpi/agents/engineering/*.yaml)

```yaml
agent:
  name: framework-senior-engineer
  version: 1.0.0
  description: Expert {Framework} developer specializing in...

  expertise:
    - Primary skill
    - Secondary skill

  rules:
    always:
      - Use TodoWrite tool to track tasks
      - Use {Logger} for ALL logging

    never:
      - Use console.log in production code

  examples:
    - task: Feature description
      input: User requirement
      output: |
        Component 1 (path/to/file.ext):
        - Step 1: Action description
        - Step 2: Action description
      language: language
```

### Claude Code Format (.claude/agents/*.md)

```markdown
---
name: framework-senior-engineer
version: 1.0.0
description: Expert {Framework} developer specializing in...
---

# {Framework} Senior Engineer

## Expertise

- Primary skill
- Secondary skill

## Rules

### Always

- Use TodoWrite tool to track tasks
- Use {Logger} for ALL logging

### Never

- Use console.log in production code

## Examples

### Example 1: Feature Title

**Task**: Feature description

**Input**: User requirement

**Output**:
Component 1 (path/to/file.ext):
- Step 1: Action description
- Step 2: Action description

**Language**: language
```

## Example Structure: Concise Without Code

Examples should describe **what to do** using bullet points, not show **code blocks**.

### Good Example (Concise, Descriptive)

```markdown
### Example 1: Create queue job with Bull

**Task**: Process image uploads with max 5 concurrent jobs, timeout 10 min, retry 3 times

**Input**: Process image uploads with max 5 concurrent jobs, timeout 10 min, retry 3 times

**Output**:
Queue setup (queues/imageQueue.js):
- Import Bull from 'bull' package
- Create new Queue instance with name 'image-processing' and Redis connection config
- Configure queue events: on('completed'), on('failed'), on('progress')
- Export queue instance

Processor (processors/imageProcessor.js):
- Import imageQueue from queues
- Call queue.process() with concurrency 5 and async handler function
- Handler accepts job parameter with data property
- Use job.progress() to report progress percentage
- Throw errors for retry logic activation
- Return result data on success

Job Producer (services/imageService.js):
- Import imageQueue from queues
- Method addImageProcessingJob(imageUrl, userId)
- Call queue.add() with job data object
- Configure job options: attempts 3, timeout 600000ms (10 min)
- Set backoff strategy: type 'exponential', delay 2000ms
- Return job instance with id

**Language**: javascript
```

### Bad Example (Code Blocks - Too Verbose)

```markdown
### Example 1: Create queue job with Bull

**Task**: Process image uploads with max 5 concurrent jobs, timeout 10 min, retry 3 times

**Output**:
\`\`\`javascript
Queue setup (queues/imageQueue.js):
- const Queue = require('bull')
- const imageQueue = new Queue('image-processing', { redis: { host: 'localhost', port: 6379 } })
- Configure queue events: on('completed'), on('failed'), on('progress')

Processor (processors/imageProcessor.js):
- imageQueue.process(5, async (job) => { /* processing logic */ })
- Set concurrency to 5 concurrent jobs
- Use job.progress() to report progress
- Throw errors for retry logic
- Return result data

Job Producer (services/imageService.js):
- await imageQueue.add({ imageUrl, userId }, { attempts: 3, timeout: 600000, backoff: { type: 'exponential', delay 2000 } })
\`\`\`
```

**Why bad:** Contains code blocks that make examples verbose. Agents don't need to see code - they need to understand the implementation steps.

## Agent Creation Workflow

### 1. Choose Framework/Technology

Identify the framework or technology domain:
- Web frameworks: Laravel, Next.js, Express.js, NestJS, Remix, etc.
- Mobile: Expo React Native, Flutter
- E-commerce: Magento

### 2. Define Agent Metadata

**Name**: `framework-senior-engineer` format
- Use lowercase with hyphens
- End with `-senior-engineer`

**Version**: Semantic versioning (1.0.0)

**Description**: One-sentence summary of expertise
- Format: "Expert {Framework} developer specializing in {key features}"
- Include main technologies and patterns
- Keep under 200 characters

### 3. List Expertise Areas

3-6 bullet points covering:
- Core framework features
- State management/data patterns
- API/routing patterns
- Testing approaches
- Production concerns

### 4. Define Always/Never Rules

**Always rules:**
- TodoWrite for task tracking (required for all agents)
- Logging library specific to framework
- Framework-specific best practices

**Never rules:**
- Anti-patterns to avoid
- Practices that conflict with framework conventions

### 5. Create Examples (Concise Format)

**Guidelines:**
- **8-10 examples** covering different patterns
- **No code blocks** - use descriptive bullet points
- **Clear structure**: Component/file → steps → details
- **Specify language** at the end

**Example topics to cover:**
1. Queue/background jobs
2. Logging setup
3. Validation
4. Service layer patterns
5. Error handling
6. Authentication
7. Database setup
8. Testing

### 6. Sync Between Formats

**CRITICAL:** Both ULPI (.yaml) and Claude Code (.md) must match.

After creating/editing:
1. Update ULPI YAML version
2. Update Claude Code MD version
3. Verify examples match in both files
4. Test agent in both systems

## Format Conversion Guide

### YAML to Markdown

```yaml
# ULPI YAML
agent:
  rules:
    always:
      - Use TodoWrite tool
```

Converts to:

```markdown
# Claude Code Markdown
### Always

- Use TodoWrite tool
```

### Example Conversion

**ULPI YAML:**
```yaml
examples:
  - task: Create queue job
    input: Process uploads
    output: |
      Queue setup:
      - Import Bull
      - Create Queue instance
    language: javascript
```

**Claude Code Markdown:**
```markdown
### Example 1: Create queue job

**Task**: Create queue job

**Input**: Process uploads

**Output**:
Queue setup:
- Import Bull
- Create Queue instance

**Language**: javascript
```

## Verification Checklist

Before deploying an agent configuration:

**Structure:**
- [ ] YAML frontmatter has name, version, description
- [ ] Expertise section has 3-6 items
- [ ] Always rules include TodoWrite
- [ ] Never rules have at least 1 item
- [ ] Has 8-10 examples

**Examples:**
- [ ] No code blocks (only descriptive bullet points)
- [ ] Each example has Task, Input, Output, Language
- [ ] Output is organized by file/component
- [ ] Steps are clear and actionable
- [ ] Language tag matches technology

**Synchronization:**
- [ ] ULPI YAML and Claude Code MD versions match
- [ ] Description is identical in both formats
- [ ] All examples present in both formats
- [ ] Always/Never rules match exactly

**Quality:**
- [ ] Examples are concise (no unnecessary verbosity)
- [ ] Domain expertise is clear
- [ ] Tools list is complete and accurate
- [ ] No framework-specific jargon without context

## Common Mistakes

### ❌ Code Blocks in Examples

**Bad:**
```markdown
**Output**:
\`\`\`javascript
const queue = new Bull('jobs')
queue.process(async (job) => { ... })
\`\`\`
```

**Good:**
```markdown
**Output**:
Queue setup:
- Import Bull from 'bull' package
- Create Queue instance with name 'jobs'
- Call queue.process() with async handler
```

### ❌ Inconsistent Formats

Having different examples in ULPI vs Claude Code format.

**Fix:** Always update both files together.

### ❌ Missing TodoWrite Rule

Every agent must have: "Use TodoWrite tool to track tasks"

### ❌ Verbose Descriptions

**Bad:** "An experienced senior-level developer who specializes in..."

**Good:** "Expert Next.js developer specializing in App Router and Server Actions"

### ❌ Too Few Examples

Minimum 8 examples to cover common patterns.

## Example Agent Structure Reference

See these agents for reference:
- **Express**: `.claude/agents/express-senior-engineer.md`
- **NestJS**: `.claude/agents/nestjs-senior-engineer.md`
- **Laravel**: `.claude/agents/laravel-senior-engineer.md`
- **Next.js**: `.claude/agents/nextjs-senior-engineer.md`

All follow the concise, no-code-blocks example pattern.

## Key Reminders

1. **No code blocks in examples** - Use descriptive steps
2. **Sync ULPI and Claude Code formats** - Keep them identical
3. **TodoWrite in always rules** - Required for all agents
4. **8-10 examples minimum** - Cover major patterns
5. **Concise descriptions** - Under 200 characters
6. **Semantic versioning** - Update version on changes
7. **Framework-specific logging** - Specify logger library
8. **Clear file structure** - Organize by component/file
9. **Language tags** - Always specify language
10. **Test both formats** - Verify agent works in ULPI and Claude Code

---

## Resources

For detailed guidance on agent structure patterns, refer to existing agents in:
- `.claude/agents/` - Claude Code format examples
- `.ulpi/agents/engineering/` - ULPI format examples

Both directories contain production-ready agents following the concise example pattern.
