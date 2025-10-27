# Skill Discovery Patterns Reference

This document provides comprehensive patterns for discovering, evaluating, and invoking relevant skills during the start workflow. It helps ensure no applicable skill is missed.

---

## Core Principle

**IF A SKILL EXISTS FOR YOUR TASK, YOU MUST USE IT.**

This is not optional. This is not negotiable. Missing an applicable skill = workflow failure.

---

## Skill Discovery Checklist

Before ANY task execution, complete this mental checklist:

### Phase 1: Immediate Skill Scan

```
☐ What is the user requesting?
☐ Is there a skill name that matches this request?
☐ Are there any keywords in the request that match skill domains?
☐ Have I seen a similar request before that used a skill?
```

### Phase 2: Domain Analysis

```
☐ What domain does this task fall into?
  ├─ Parallel work? → Check for parallel agents skills
  ├─ Framework-specific? → Check for framework skills
  ├─ Testing? → Check for testing skills
  ├─ Documentation? → Check for doc generation skills
  ├─ Code review? → Check for review skills
  └─ Design/architecture? → Check for design skills

☐ Does my available skills list contain this domain?
```

### Phase 3: Task Type Analysis

```
☐ What type of task is this?
  ├─ Building multiple features → run-parallel-agents-feature-build
  ├─ Debugging multiple issues → run-parallel-agents-feature-debug
  ├─ Exploration/discovery → Explore agent
  ├─ Starting any work → start skill (currently active)
  └─ Other specialized work → Check other skills
```

### Phase 4: Rationalization Check

```
☐ Am I thinking any of these rationalizations?
  ├─ "This is too simple for a skill" → WRONG
  ├─ "I can do this quickly without a skill" → WRONG
  ├─ "The skill is overkill" → WRONG
  ├─ "Let me just gather info first" → WRONG
  └─ "I remember the skill content" → WRONG

If YES to any → STOP. Use the skill.
```

---

## Available Skills Catalog

### Current Skills (Based on Available Agent Descriptions)

#### 1. start
**Domain:** Workflow management, task initialization
**Triggers:**
- ANY conversation start
- ANY new task
- Before ANY code writing
- Before ANY implementation

**Indicators:**
- Literally everything (this skill is universal)

**Pattern Match:**
- User says ANYTHING that requires action

**Confidence:** 100% (always applicable at conversation start)

---

#### 2. run-parallel-agents-feature-build
**Domain:** Parallel feature development
**Triggers:**
- "Build X, Y, and Z"
- "Implement multiple features"
- "Create several independent modules"
- "Split this work"
- "Run in parallel"

**Indicators:**
- 3+ independent features/tasks mentioned
- No shared state between tasks
- Can be understood independently
- No execution dependencies

**Pattern Match:**
- User lists multiple features
- Task list has 3+ unrelated items
- Request includes multiple unrelated scopes

**Confidence:**
- High: 3+ clearly independent tasks
- Medium: Multiple tasks but unclear if independent
- Low: Tasks might have dependencies

**Example Triggers:**
```
✅ "Build wishlist API, checkout page, and user dashboard"
✅ "Implement authentication, payment processing, and email notifications"
✅ "Create product catalog, shopping cart, and order history"
❌ "Build checkout flow" (single integrated feature)
❌ "Fix the authentication system" (likely has shared root cause)
```

---

#### 3. run-parallel-agents-feature-debug
**Domain:** Parallel debugging
**Triggers:**
- "Fix these failing tests"
- "Debug these errors"
- "Multiple bugs to fix"
- "Several issues in different subsystems"

**Indicators:**
- 3+ unrelated bugs/failures
- Different error messages/patterns
- Isolated to different modules
- No shared root cause

**Pattern Match:**
- Multiple test failures across frameworks
- Bugs in independent subsystems
- Different error types (not cascading failures)

**Confidence:**
- High: 3+ clearly independent bugs
- Medium: Multiple bugs but might be related
- Low: Might be single root cause

**Example Triggers:**
```
✅ "Laravel test fails (factory issue), Next.js test fails (mock data), NestJS test fails (timeout)"
✅ "Cart calculation bug, User auth bug, Email sending bug"
❌ "All tests failing after migration" (likely single root cause)
❌ "API and frontend both broken" (might be cascading)
```

---

### Specialized Agent Skills (Indirect)

These aren't separate skills but agent personas invoked via Task tool:

#### laravel-senior-engineer
**Triggers:** Laravel backend work
**Indicators:** `*.php`, `/app/`, Eloquent, migrations

#### nextjs-senior-engineer
**Triggers:** Next.js frontend work
**Indicators:** `*.tsx`, `/app/`, Server Components, Server Actions

#### nestjs-senior-engineer
**Triggers:** NestJS backend work
**Indicators:** `*.ts`, `@nestjs/*`, DI patterns

#### remix-senior-engineer
**Triggers:** Remix full-stack work
**Indicators:** `remix.config.*`, loaders/actions

#### express-senior-engineer
**Triggers:** Express.js backend work
**Indicators:** `express` imports, middleware

#### expo-react-native-senior-engineer
**Triggers:** Expo mobile work
**Indicators:** `app.json`, Expo modules

#### flutter-senior-engineer
**Triggers:** Flutter mobile work
**Indicators:** `*.dart`, `pubspec.yaml`

#### magento-senior-engineer
**Triggers:** Magento e-commerce work
**Indicators:** `/app/code/`, `module.xml`

#### general-purpose
**Triggers:** Non-framework work, exploration
**Indicators:** No specific framework detected

#### Explore (subagent)
**Triggers:** Codebase exploration, discovery
**Indicators:** "Find...", "Search...", "Locate...", "Explore..."

---

## Skill Matching Algorithm

### Algorithm: Should I Use a Skill?

```python
def should_use_skill(user_request, current_skills):
    # Phase 1: Universal skills (always check)
    if is_conversation_start() or is_new_task():
        return ("start", "MANDATORY")

    # Phase 2: Parallel work detection
    independent_tasks = count_independent_tasks(user_request)
    if independent_tasks >= 3:
        if contains_debugging_keywords(user_request):
            return ("run-parallel-agents-feature-debug", "HIGH")
        if contains_feature_building_keywords(user_request):
            return ("run-parallel-agents-feature-build", "HIGH")

    # Phase 3: Domain-specific skills
    for skill in current_skills:
        if matches_domain(user_request, skill):
            return (skill.name, "HIGH")

    # Phase 4: Check for exploration
    if is_exploration_task(user_request):
        return ("Explore agent", "MEDIUM")

    # No specific skill found, but start skill already ran
    return (None, "NONE")

def count_independent_tasks(request):
    # Count distinct, unrelated features/tasks
    # Look for conjunctions: "and", commas, numbered lists
    tasks = []
    if ", and " in request or " and " in request:
        tasks = request.split(" and ")
    elif "," in request:
        tasks = request.split(",")
    elif numbered_list_detected(request):
        tasks = extract_numbered_items(request)

    # Filter for independence
    independent = [t for t in tasks if not depends_on_others(t, tasks)]
    return len(independent)

def contains_debugging_keywords(request):
    keywords = ["fix", "debug", "failing", "error", "bug", "broken", "test fails"]
    return any(kw in request.lower() for kw in keywords)

def contains_feature_building_keywords(request):
    keywords = ["build", "create", "implement", "add", "develop"]
    return any(kw in request.lower() for kw in keywords)

def is_exploration_task(request):
    keywords = ["find", "search", "locate", "explore", "discover", "identify"]
    return any(kw in request.lower() for kw in keywords)
```

---

## Skill Invocation Patterns

### Pattern 1: Direct Skill Name Match

**User Request:** "Run parallel agents to build these features"

**Detection:**
- User explicitly mentions "parallel agents"
- Clear indication of which skill to use

**Action:**
1. Announce: "I'm using the run-parallel-agents-feature-build skill"
2. Use Skill tool to invoke the skill
3. Follow skill workflow exactly

---

### Pattern 2: Keyword Match

**User Request:** "Build user auth, payment API, and email notifications"

**Detection:**
- 3 independent features listed
- "Build" indicates feature work (not debugging)
- Matches `run-parallel-agents-feature-build` triggers

**Action:**
1. Recognize pattern: "This matches the parallel agents feature build skill"
2. Announce: "I've identified 3 independent features. I'm using the run-parallel-agents-feature-build skill"
3. Use Skill tool to invoke
4. Follow skill workflow

---

### Pattern 3: Domain Match

**User Request:** "Fix the cart calculation, auth middleware, and email sending - all different issues"

**Detection:**
- 3 different bugs mentioned
- User clarifies "all different issues" (independent)
- Matches `run-parallel-agents-feature-debug` triggers

**Action:**
1. Recognize pattern: "Multiple independent bugs - matches parallel debugging skill"
2. Announce: "I'm using the run-parallel-agents-feature-debug skill for these independent bugs"
3. Use Skill tool to invoke
4. Follow skill workflow

---

### Pattern 4: Universal Match (start)

**User Request:** ANY task at conversation start

**Detection:**
- New conversation OR new task
- `start` skill is always applicable

**Action:**
1. Immediately invoke `start` skill (you're reading this, so you already did!)
2. Follow `start` workflow
3. Check for other applicable skills within the start workflow

---

## Common Rationalization Traps

### Trap 1: "This is Too Simple"

**Thought:** "The user just wants me to build one API endpoint. I don't need a skill for that."

**Reality:** Even single tasks should go through start workflow and potentially delegate to specialized agent.

**Correct Action:** Use start skill, identify framework, delegate to appropriate agent.

---

### Trap 2: "Let Me Explore First"

**Thought:** "Let me just search the codebase to understand it better before using a skill."

**Reality:** Exploration IS part of the start skill workflow. If doing broad exploration, should use Explore agent.

**Correct Action:** Use start skill, which guides you through exploration phase properly.

---

### Trap 3: "I Remember the Skill"

**Thought:** "I've used the parallel agents skill before. I know what to do, no need to re-read it."

**Reality:** Skills may have been updated. Always invoke the Skill tool to get latest version.

**Correct Action:** Always use Skill tool to invoke, even if you remember the content.

---

### Trap 4: "The Skill Is Overkill"

**Thought:** "Sure, there are 3 features, but they're simple. Parallel agents is overkill."

**Reality:** If the skill criteria match, you MUST use it. Simplicity doesn't exempt you.

**Correct Action:** Use the skill. Let the skill workflow determine if delegation is appropriate.

---

### Trap 5: "This Doesn't Count as a Task"

**Thought:** "The user just asked a question. No skill needed."

**Reality:** If the question requires research, codebase exploration, or analysis, a skill might apply.

**Correct Action:** Check if Explore agent or other research-focused skills apply.

---

## Skill Priority Matrix

When multiple skills might apply, use this priority:

### Priority 1: Universal Skills (Always First)
- `start` skill → ALWAYS at conversation/task start

### Priority 2: Parallel Work Skills (If Applicable)
- `run-parallel-agents-feature-build` → If 3+ independent features
- `run-parallel-agents-feature-debug` → If 3+ independent bugs

### Priority 3: Domain-Specific Skills (If Applicable)
- Framework-specific work → Delegate to appropriate agent
- Specialized workflows → Use specialized skills

### Priority 4: General Execution (Fallback)
- Simple tasks → Direct execution (after start workflow)
- Exploration → Explore agent

---

## Skill Announcement Template

Always announce skill usage to the user:

```
"I'm using the [SKILL NAME] to [GOAL]."
```

**Examples:**
- "I'm using the start skill to plan this task."
- "I'm using the run-parallel-agents-feature-build skill to build these three independent features concurrently."
- "I'm using the run-parallel-agents-feature-debug skill to debug these unrelated issues in parallel."

**Why Announce:**
- Transparency for user
- Confirms you're following workflows
- Helps user understand process

---

## Red Flags: You're About to Skip a Skill

If you catch yourself thinking ANY of these, STOP:

❌ "This is just a quick question" → Check if Explore/research applies
❌ "Let me gather info first" → That's part of start skill workflow
❌ "This is too simple" → Simplicity doesn't exempt workflow
❌ "I can do this faster without a skill" → Speed without quality = failure
❌ "The skill won't help here" → Not your decision, check it anyway
❌ "I'll use the skill if it gets complex" → Too late, should check upfront
❌ "This doesn't fit any skill exactly" → Check anyway, might partially match
❌ "I don't want to bother the user" → Skills IMPROVE user experience

**If you think ANY red flag → Immediately scan skills again.**

---

## Skill Discovery Workflow

### Workflow: Discovering Applicable Skills

```
1. Read user request
   ↓
2. Mental skill scan
   ├─ Does ANY skill name match keywords?
   ├─ Does ANY skill domain match task domain?
   ├─ Does ANY skill trigger pattern match?
   └─ Am I rationalizing skipping a skill?
   ↓
3. If YES to any above
   ├─ Use Skill tool to invoke skill
   ├─ Announce skill usage
   ├─ Follow skill workflow exactly
   └─ Exit with skill results
   ↓
4. If NO skills match
   ├─ Proceed with start workflow
   ├─ Identify appropriate agent (if specialized work)
   ├─ Delegate or execute
   └─ Complete task
```

---

## Testing Your Skill Detection

### Self-Test Questions

Before proceeding with ANY task, ask yourself:

1. **Have I scanned ALL available skills?**
   - [ ] Yes, I mentally reviewed the full skills list
   - [ ] No → Go review skills list now

2. **Have I checked for keyword matches?**
   - [ ] Yes, I checked user request against skill triggers
   - [ ] No → Go check triggers now

3. **Have I checked for domain matches?**
   - [ ] Yes, I identified task domain and matched to skills
   - [ ] No → Identify domain now

4. **Am I rationalizing skipping a skill?**
   - [ ] No, I'm not rationalizing
   - [ ] Yes → Stop rationalizing, use the skill

5. **Have I announced skill usage (if applicable)?**
   - [ ] Yes, I announced which skill I'm using
   - [ ] No applicable skill found
   - [ ] No → Announce now

---

## Skill Matching Confidence Levels

### High Confidence (90-100%): USE THE SKILL
- Clear keyword match
- Domain perfectly aligns
- Trigger pattern matches exactly
- User explicitly mentions skill

**Action:** Immediately use Skill tool to invoke

### Medium Confidence (60-89%): USE THE SKILL
- Partial keyword match
- Domain mostly aligns
- Trigger pattern loosely matches

**Action:** Use Skill tool to invoke, mention assumption to user

### Low Confidence (30-59%): INVESTIGATE
- Weak indicators
- Might be applicable
- Could go either way

**Action:** Re-read skill description, check if it applies, use if it does

### Very Low (<30%): SKIP (but verify)
- No clear match
- Different domain

**Action:** Double-check you're not rationalizing, then skip

---

## Integration with Start Skill

The start skill includes skill discovery as a mandatory step:

### Start Skill Integration Points

**Within Start Workflow:**
```
Step 0 (Before Step 1): Check for Other Applicable Skills
├─ Scan available skills
├─ Check if any apply to current task
├─ If yes → Exit start skill, invoke that skill instead
└─ If no → Continue with start workflow
```

**Example Flow:**
```
User: "Build API endpoints for users, products, and orders"

Start skill begins:
├─ Step 0: Check for other skills
│  ├─ Scan available skills
│  ├─ Detect: 3 independent features
│  ├─ Match: run-parallel-agents-feature-build
│  └─ Decision: Exit start, invoke parallel agents skill
└─ Invoke parallel agents skill
   └─ Follow parallel agents workflow
```

---

## Edge Cases

### Edge Case 1: Skill Applies Mid-Task

**Scenario:** Started a task, discovered it's actually 3 independent subtasks

**Action:**
1. Stop current approach
2. Announce: "I've identified this should use the [SKILL] skill"
3. Invoke skill
4. Restart with skill workflow

---

### Edge Case 2: Multiple Skills Apply

**Scenario:** Both parallel agents AND specialized framework skill apply

**Action:**
1. Use higher priority skill (parallel agents in this case)
2. Within that skill, delegate to specialized agents as needed
3. Skills can nest/compose

---

### Edge Case 3: Unclear If Skill Applies

**Scenario:** Can't determine if tasks are independent enough for parallel agents

**Action:**
1. Use AskUserQuestion to clarify
2. Ask: "Are these features independent, or do they share state/dependencies?"
3. Based on answer, decide skill applicability

---

## Summary

### Key Principles

1. **Always check for skills FIRST** - Before any work
2. **If even 1% chance a skill applies** - Read and use it
3. **Catch rationalizations** - Common traps that lead to skipping skills
4. **Announce usage** - Always tell user which skill you're using
5. **Follow exactly** - Don't deviate from skill workflows
6. **No exceptions** - If skill matches criteria, you MUST use it

### Skill Discovery Checklist (Memorize This)

```
☐ Scanned all available skills
☐ Checked for keyword matches
☐ Checked for domain matches
☐ Checked for trigger pattern matches
☐ Verified I'm not rationalizing skipping
☐ If skill applies → Announced and invoked
☐ Following skill workflow exactly
```

### Remember

**The existence of a skill for your task means that task has been solved before. Not using the skill = reinventing the wheel = wasting time = lower quality = failure.**

**Always. Check. For. Skills. First.**
