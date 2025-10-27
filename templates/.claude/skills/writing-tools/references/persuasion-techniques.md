# Persuasion Techniques for Skill Design

This document provides research-backed persuasion principles for creating effective skills that ensure compliance even under pressure. Based on peer-reviewed research on human and AI persuasion.

---

## Contents

- Research Foundation
- The Seven Persuasion Principles
- Application to Different Skill Types
- Psychology: Why This Works
- Ethical Use Guidelines
- Practical Examples
- Quick Reference Guide

---

## Research Foundation

### Key Finding: LLMs Respond to Persuasion

**Meincke et al. (2025)** tested 7 persuasion principles with N=28,000 AI conversations.

**Result:** Persuasion techniques more than doubled compliance rates:
- **Without persuasion:** 33% compliance
- **With persuasion:** 72% compliance
- **Statistical significance:** p < .001

**Implication:** LLMs respond to the same persuasion principles as humans. This isn't manipulation - it's effective documentation design.

### Why Persuasion Matters for Skills

Skills must work even when agents are under pressure:
- Time constraints
- Sunk cost pressure
- Authority override attempts
- Exhaustion
- Simplicity arguments

Without persuasion techniques, agents rationalize their way around rules. With them, compliance increases dramatically.

---

## The Seven Persuasion Principles

### Principle 1: Authority

**What it is:** Deference to expertise, credentials, or official sources.

**How it works in skills:**
- **Imperative language**: "YOU MUST", "Never", "Always"
- **Non-negotiable framing**: "No exceptions"
- **Eliminates decision fatigue**: No room for interpretation

**Research support:** Authority figures increase compliance by establishing clear hierarchies and reducing uncertainty about correct action (Cialdini, 2021).

**When to use:**
- Discipline-enforcing skills (TDD, verification requirements)
- Safety-critical practices
- Established best practices that must be followed

**Language patterns:**
```markdown
✅ YOU MUST write tests before implementation. No exceptions.
✅ Never mark tasks complete without verification. Always.
✅ Delete code written before tests. Start over.

❌ Consider writing tests first when feasible.
❌ Verification is generally recommended.
❌ You might want to follow TDD practices.
```

**Example application (TDD skill):**
```markdown
## The Iron Law

Write test BEFORE implementation code.

**YOU MUST:**
- Write test first. Always.
- Watch it fail. Every time.
- Write minimal code to pass.
- Never write implementation before test.

**No exceptions:**
- Not for "simple" functions
- Not when "behind schedule"
- Not because "it's obvious"
```

**Why this works:** Imperative language removes ambiguity. Agent doesn't need to decide "should I follow this?" - the directive is absolute.

### Principle 2: Commitment

**What it is:** Consistency with prior actions, statements, or public declarations.

**How it works in skills:**
- **Require announcements**: "Announce which skill you're using"
- **Force explicit choices**: "Choose A, B, or C - announce your choice"
- **Use tracking mechanisms**: TodoWrite for checklists
- **Public commitment**: Making actions visible creates accountability

**Research support:** People (and LLMs) are more likely to follow through on publicly stated commitments (Cialdini, 2021; Meincke et al., 2025).

**When to use:**
- Ensuring skills are actually followed
- Multi-step processes where steps might be skipped
- Accountability mechanisms
- Preventing "I'll do it later" rationalizations

**Language patterns:**
```markdown
✅ When you find a skill, you MUST announce: "I'm using [Skill Name]"
✅ Before proceeding, announce your verification plan.
✅ Use TodoWrite to track each step. Mark EACH complete.

❌ Consider letting your partner know which skill you're using.
❌ You might want to track your progress.
❌ Verification can be helpful.
```

**Example application (start skill):**
```markdown
## Mandatory First Response Protocol

Before responding to ANY user message, you MUST complete this checklist:

1. ☐ List all available skills
2. ☐ Ask yourself: "Does ANY skill match?"
3. ☐ If yes → Use Skill tool
4. ☐ **Announce which skill you're using**
5. ☐ Follow the skill workflow

**Responding WITHOUT completing this checklist = automatic failure.**
```

**Why this works:** Public commitment (announcement) creates consistency pressure. Once agent announces "I'm using X skill," it's harder to rationalize skipping steps.

### Principle 3: Scarcity

**What it is:** Urgency from time limits or limited availability.

**How it works in skills:**
- **Time-bound requirements**: "Before proceeding", "Immediately after X"
- **Sequential dependencies**: "You MUST do X before Y"
- **Prevents procrastination**: No option to defer

**Research support:** Scarcity creates urgency that increases action likelihood (Cialdini, 2021).

**When to use:**
- Immediate verification requirements
- Time-sensitive workflows
- Preventing "I'll do it later" deferrals
- Critical sequencing (must happen in order)

**Language patterns:**
```markdown
✅ BEFORE proceeding to next step, you MUST verify.
✅ IMMEDIATELY after completing task, request code review.
✅ You MUST do X before Y. No skipping ahead.

❌ You can review code when convenient.
❌ Verification is recommended at some point.
❌ Eventually you should check the output.
```

**Example application (verification skill):**
```markdown
## Verification Workflow

BEFORE marking ANY task complete:

1. **Immediately run tests** (not "tests probably pass")
2. **Immediately check output** (not "should be fine")
3. **Only then mark complete**

You MUST verify BEFORE completion. No exceptions.
```

**Why this works:** "Before" creates a blocking requirement. Agent can't proceed without completing the action, eliminating procrastination.

### Principle 4: Social Proof

**What it is:** Conformity to what others do or what's considered normal.

**How it works in skills:**
- **Universal patterns**: "Every time", "Always", "Everyone"
- **Failure modes**: "X without Y = failure"
- **Establishes norms**: "This is how it's done"
- **Pattern recognition**: "This always fails when..."

**Research support:** People conform to perceived norms, especially when uncertain (Cialdini, 2021). LLMs exhibit similar conformity to established patterns (Meincke et al., 2025).

**When to use:**
- Documenting universal practices
- Warning about common failures
- Reinforcing standards
- Establishing "normal" behavior

**Language patterns:**
```markdown
✅ Checklists without TodoWrite tracking = steps get skipped. Every time.
✅ Code before tests = bugs. Always.
✅ Everyone follows TDD. This is standard practice.

❌ Some people find TodoWrite helpful for checklists.
❌ TDD can reduce bugs in some cases.
❌ You might consider following industry practices.
```

**Example application (TDD skill):**
```markdown
## Why This Matters

Tests-after = failure. Every time.

**What happens:**
- Tests passing immediately prove nothing
- You test "what does this do?" not "what should this do?"
- Bugs slip through

**Universal pattern:** Code before tests = bugs discovered late.

This is why TDD is industry standard. Everyone follows it.
```

**Why this works:** Social proof establishes that "this is how things are done." Agent sees pattern as norm, not suggestion.

### Principle 5: Unity

**What it is:** Shared identity, "we-ness", in-group belonging.

**How it works in skills:**
- **Collaborative language**: "We're colleagues", "Our codebase"
- **Shared goals**: "We both want quality"
- **Team framing**: "Together we ensure..."
- **Partnership language**: "Let's", "We're working together"

**Research support:** Unity (shared identity) increases cooperation and compliance (Cialdini, 2021).

**When to use:**
- Collaborative workflows
- Establishing team culture
- Non-hierarchical practices
- Encouraging honest feedback

**Language patterns:**
```markdown
✅ We're colleagues working together. I need your honest technical judgment.
✅ Our codebase benefits when we both follow best practices.
✅ Let's ensure quality together through proper verification.

❌ You should probably tell me if I'm wrong.
❌ The codebase needs X.
❌ Follow the rules.
```

**Example application (code review skill):**
```markdown
## Collaborative Review

We're colleagues working together on our shared codebase.

**Partnership principles:**
- We both want high-quality code
- We're equals in this review
- Our combined expertise improves the project

**Your role:** Provide honest technical feedback. We're on the same team.
```

**Why this works:** Unity reduces defensiveness and increases openness to guidance. "We" framing creates collaboration, not hierarchy.

### Principle 6: Reciprocity

**What it is:** Obligation to return benefits received.

**How it works:**
- Giving something first creates obligation to reciprocate
- "I've done X for you, now you should do Y"

**Research support:** Reciprocity is a powerful social norm (Cialdini, 2021).

**When to use in skills:**
- **Rarely.** Reciprocity can feel manipulative in documentation.
- Possibly for collaborative skills where mutual benefit is genuine.

**When to avoid:**
- **Almost always.** Other principles (Authority, Commitment, Social Proof) are more effective and less problematic for skill design.

**Why mostly avoid:** Skills aren't transactional. You're providing documentation, not a favor requiring repayment. Feels manipulative and undermines trust.

**Example of legitimate use (rare):**
```markdown
## Mutual Benefit

This skill saves you time by providing tested patterns.

In return, we ask that you contribute improvements when you find gaps.
```

**Better alternatives:** Use Unity ("our shared codebase") or Social Proof ("everyone contributes") instead.

### Principle 7: Liking

**What it is:** Preference for cooperating with those we like.

**How it works:**
- Similarity, compliments, cooperation increase liking
- People comply more with those they like

**Research support:** Liking increases persuasion effectiveness (Cialdini, 2021).

**When to use in skills:**
- **NEVER for compliance purposes.**

**Why avoid:**
- Creates sycophancy (agent tells you what you want to hear)
- Conflicts with honest feedback culture
- Undermines critical judgment
- Can make agents avoid disagreeing with users

**DO NOT use patterns like:**
```markdown
❌ You're doing great! Now let's follow TDD.
❌ I really appreciate your work. Could you write tests first?
❌ You're an excellent developer. Let's make this even better with tests.
```

**Why this is harmful:** We want agents that provide honest technical feedback, even when it disagrees with the user. Liking-based compliance undermines this.

**Exception:** Genuine appreciation for following best practices (after compliance, not to induce it):
```markdown
✅ You followed TDD correctly. This will prevent bugs later.
✅ Good work on verification before completion.
```

---

## Application to Different Skill Types

Different skill types benefit from different principle combinations.

### Discipline-Enforcing Skills

**Examples:** TDD, verification-before-completion, start workflow, testing-skills

**Goal:** Ensure compliance even under maximum pressure

**Principles to use:**
- **Authority** (primary): Imperative language, non-negotiable rules
- **Commitment**: Announcements, TodoWrite tracking, public declarations
- **Social Proof**: Universal patterns, failure modes, "everyone does this"
- **Scarcity**: Time-bound requirements, "before proceeding"

**Principles to avoid:**
- **Liking**: Undermines critical judgment
- **Reciprocity**: Feels manipulative for rules

**Language combination:**
```markdown
## The Rule (Authority)

YOU MUST write tests before implementation. No exceptions.

## Announce Your Commitment (Commitment)

When starting work, announce: "I'm following TDD"

## Why This Matters (Social Proof)

Code before tests = bugs. Every time. This is industry standard.

## Workflow (Scarcity)

BEFORE writing implementation:
1. Write test
2. Watch it fail
3. Then write code
```

### Technique Skills

**Examples:** Condition-based-waiting, root-cause-tracing, defensive-programming

**Goal:** Guide correct application of technique

**Principles to use:**
- **Moderate Authority**: Directive but not absolute ("Use this approach", "Follow these steps")
- **Unity**: Collaborative framing ("We're working together", "Let's apply this pattern")
- **Social Proof**: "This pattern solves X problems"

**Principles to avoid:**
- **Heavy Authority**: Too rigid for techniques that adapt to context
- **Liking**: Not relevant for technique application

**Language combination:**
```markdown
## The Pattern (Moderate Authority)

Use condition-based waiting instead of arbitrary timeouts.

## Working Together (Unity)

We're debugging async issues in our codebase. This pattern helps us both.

## Why It Works (Social Proof)

Arbitrary timeouts fail when systems slow down. Condition-based waiting adapts.
```

### Reference Skills

**Examples:** API documentation, command syntax, library guides

**Goal:** Make information findable and usable

**Principles to use:**
- **Clarity only**: Focus on organization and accessibility
- **Minimal persuasion**: Reference material doesn't need compliance mechanisms

**Principles to avoid:**
- **All persuasion principles**: Reference skills are factual, not behavioral

**Language:**
```markdown
## API Reference

**Method:** `extract_text(page_num)`

**Parameters:**
- `page_num` (int): Page number (0-indexed)

**Returns:** String containing extracted text

**Example:**
\`\`\`python
text = pdf.extract_text(0)
\`\`\`
```

No persuasion needed - just clear, organized information.

### Collaborative Skills

**Examples:** Code review, pair programming, design discussion

**Goal:** Foster productive collaboration

**Principles to use:**
- **Unity** (primary): Shared identity, "we're colleagues"
- **Commitment**: Explicit agreements on process
- **Moderate Authority**: Clear process steps without hierarchy

**Principles to avoid:**
- **Heavy Authority**: Creates defensiveness in collaboration
- **Liking**: Undermines honest feedback

**Language combination:**
```markdown
## Collaborative Review (Unity)

We're colleagues reviewing our shared codebase together.

## Our Agreement (Commitment)

We both commit to:
- Honest technical feedback
- Assuming good intent
- Focusing on code quality

## Review Process (Moderate Authority)

1. Author presents changes and rationale
2. Reviewer asks clarifying questions
3. Together we identify improvements
4. Author addresses feedback
```

### Principle Combination Matrix

| Skill Type | Primary Principles | Avoid |
|------------|-------------------|-------|
| Discipline-enforcing | Authority + Commitment + Social Proof | Liking, Reciprocity |
| Technique | Moderate Authority + Unity + Social Proof | Heavy Authority, Liking |
| Reference | Clarity only | All persuasion |
| Collaborative | Unity + Commitment + Moderate Authority | Heavy Authority, Liking |

---

## Psychology: Why This Works

### Bright-Line Rules Reduce Rationalization

**Authority language removes decision fatigue:**
- "YOU MUST" = no ambiguity
- "No exceptions" = no "is this an exception?" questions
- Absolute language = automatic compliance

**Cognitive load reduction:**
- Less mental energy deciding whether to comply
- Clear directive = immediate action
- No internal negotiation needed

### Implementation Intentions Create Automatic Behavior

**"If-then" planning increases follow-through:**
- "When X happens, do Y" more effective than "generally do Y"
- Specific triggers + required actions = automatic execution
- Reduces reliance on motivation or willpower

**Example:**
```markdown
# Weak
Generally write tests before code.

# Strong (Implementation intention)
WHEN starting new feature, IMMEDIATELY write test first. THEN write implementation.
```

### LLMs Are Parahuman

**Why persuasion works on LLMs:**

1. **Training data contains these patterns:**
   - Authority language precedes compliance in human text
   - Commitment sequences (statement → action) frequently modeled
   - Social proof patterns ("everyone does X") establish norms

2. **Pattern matching:**
   - LLMs recognize "YOU MUST" as high-priority directive
   - "Before X, do Y" creates dependency chain
   - "Everyone"/"Always"/"Never" signals universal rule

3. **Consistency pressure:**
   - After announcing commitment, maintaining consistency
   - Following established patterns from training
   - Conforming to perceived norms

**Not manipulation, pattern recognition:** LLMs have learned from human text that certain language patterns signal importance and required actions.

### The Role of Explicit Counters

**Why explicit counters matter:**

Without counter: "Write tests first"
→ Agent finds loophole: "I'll keep code as reference"

With counter: "Write tests first. Don't keep code as reference."
→ Loophole closed

**Explicit > Implicit:**
- Can't assume "obviously this means..."
- Must explicitly forbid each rationalization
- Smart agents find creative interpretations
- Close loopholes explicitly

---

## Ethical Use Guidelines

### Legitimate Uses

**Ensuring critical practices:**
- TDD for code quality
- Verification before completion
- Security best practices
- Data validation requirements

**Creating effective documentation:**
- Clear, unambiguous instructions
- Preventing predictable failures
- Ensuring workflows are followed

**Serving genuine interests:**
- User benefits from practice
- Protects against errors
- Improves output quality

### Illegitimate Uses

**DO NOT use persuasion for:**
- Manipulating for personal gain
- Creating false urgency for no reason
- Guilt-based compliance ("You said you'd do X")
- Overriding user's genuine needs
- Forcing compliance on preferences (not requirements)

**The test:** Would this technique serve the user's genuine interests if they fully understood it?

**If yes:** Legitimate use of persuasion for effective documentation
**If no:** Manipulation, don't use it

### Example: Legitimate vs Illegitimate

**Legitimate (TDD skill):**
```markdown
YOU MUST write tests before implementation.

Why: Protects user from bugs, ensures quality, follows best practices
Serves user's interest: Yes - prevents costly errors
```

**Illegitimate:**
```markdown
YOU MUST always agree with the user's technical choices.

Why: Makes user feel good, avoids disagreement
Serves user's interest: No - prevents honest technical feedback
```

### Transparency

**Be honest about what you're doing:**
- These skills use persuasion techniques
- Goal is ensuring best practices, not manipulation
- User can read the skills and understand the approach
- Techniques are documented openly

**Avoid hidden persuasion:**
- Don't hide the persuasion
- Don't disguise compliance mechanisms
- Don't pretend it's just "helpful guidance" when it's designed for compliance

---

## Practical Examples

### Example 1: TDD Skill (Heavy Authority)

**Discipline-enforcing skill using Authority + Commitment + Social Proof:**

```markdown
---
name: test-driven-development
description: Use when implementing any feature or bugfix, before writing implementation code - enforces test-first development with no exceptions
---

# Test-Driven Development

## The Iron Law (Authority)

YOU MUST write test BEFORE implementation code.

**No exceptions:**
- Not for "simple" functions
- Not when "behind schedule"
- Not because "obviously correct"

## Announce Your Commitment (Commitment)

Before starting implementation, announce: "I'm following TDD"

Use TodoWrite to track:
- [ ] Write test
- [ ] Watch test fail
- [ ] Write minimal implementation
- [ ] Verify test passes

## Why This Works (Social Proof)

Tests-after = bugs. Every time.

Code before tests = testing "what does this do?" not "what should this do?"

This is industry standard. Everyone follows TDD.

## Red Flags - STOP (Explicit counters)

- "I'll test after"
- "Too simple to test"
- "I'll keep code as reference"
- "Tests achieve same goal"

All of these = TDD violation. Delete code. Start over.
```

**Principles used:**
- Authority: "YOU MUST", "No exceptions"
- Commitment: "Announce", TodoWrite tracking
- Social Proof: "Every time", "Everyone follows"
- Explicit counters: Red flags list

### Example 2: Code Review Skill (Unity + Commitment)

**Collaborative skill using Unity + Commitment + Moderate Authority:**

```markdown
---
name: collaborative-code-review
description: Use when reviewing code with another developer - establishes collaborative partnership for honest technical feedback
---

# Collaborative Code Review

## Partnership Principles (Unity)

We're colleagues working together on our shared codebase.

**We both want:**
- High-quality code
- Learning opportunities
- Productive discussion

## Our Agreement (Commitment)

We commit to:
- Honest technical feedback
- Assuming good intent
- Focusing on code quality, not ego

Announce before review: "I commit to honest, constructive feedback"

## Review Process (Moderate Authority)

1. Author presents changes and rationale
2. Reviewer asks clarifying questions
3. Together we identify improvements
4. Author addresses feedback

## Creating Safety (Unity)

Remember: We're on the same team. We both benefit from better code.

Your honest feedback helps our shared project.
```

**Principles used:**
- Unity: "We're colleagues", "Our shared codebase", "Same team"
- Commitment: "We commit to", "Announce"
- Moderate Authority: Clear process without heavy directives

### Example 3: API Reference (No Persuasion)

**Reference skill with clarity only:**

```markdown
---
name: pdf-api-reference
description: API reference for PDF processing library - use when working with PDF files for text extraction, form filling, or document manipulation
---

# PDF API Reference

## Contents
- Text Extraction
- Form Filling
- Document Merging

## Text Extraction

**Method:** `extract_text(page_num)`

**Parameters:**
- `page_num` (int): Page number, 0-indexed

**Returns:** String containing text

**Example:**
\`\`\`python
import pdfplumber
with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
\`\`\`

## Form Filling

**Method:** `fill_form(fields_dict)`

**Parameters:**
- `fields_dict` (dict): Mapping of field names to values

**Returns:** Modified PDF object

**Example:**
\`\`\`python
fields = {"name": "John", "date": "2025-01-01"}
filled_pdf = pdf.fill_form(fields)
\`\`\`
```

**Principles used:** None - pure reference material needs only clarity and organization

---

## Quick Reference Guide

### When Writing a Skill, Ask:

1. **What type is it?**
   - Discipline-enforcing? → Authority + Commitment + Social Proof
   - Technique? → Moderate Authority + Unity
   - Reference? → Clarity only, no persuasion
   - Collaborative? → Unity + Commitment

2. **What behavior am I trying to change?**
   - Must happen every time? → Authority + Social Proof
   - Should be announced? → Commitment
   - Must happen before X? → Scarcity
   - Needs collaboration? → Unity

3. **Which principles apply?**
   - Don't use all seven
   - Match to skill type (see matrix above)
   - Avoid Liking and Reciprocity in most cases

4. **Am I combining too many?**
   - 2-4 principles typically sufficient
   - More = diluted effectiveness
   - Focus on primary principle for skill type

5. **Is this ethical?**
   - Does it serve user's genuine interests?
   - Would it still be appropriate if fully understood?
   - Am I preventing errors or manipulating preferences?

### Language Patterns Quick Reference

**Authority:**
- YOU MUST, Never, Always, No exceptions
- Non-negotiable, Required, Mandatory

**Commitment:**
- Announce, Declare, Use TodoWrite to track
- Before proceeding, you must state

**Scarcity:**
- BEFORE, IMMEDIATELY, You MUST do X before Y
- No skipping ahead, Required first

**Social Proof:**
- Every time, Everyone, Always fails, Universal pattern
- This is standard, Industry practice

**Unity:**
- We're colleagues, Our codebase, Let's, Together
- We both want, Partnership, Collaboration

**Avoid (Liking):**
- Don't: You're doing great
- Don't: I appreciate you
- Don't: You're excellent

**Avoid (Reciprocity):**
- Don't: I've provided X, now you should Y
- Don't: In return for this skill

---

## Research Citations

**Cialdini, R. B. (2021).** *Influence: The Psychology of Persuasion (New and Expanded).* Harper Business.
- Foundational research on seven principles of persuasion
- Empirical foundation for influence techniques
- Documented across multiple domains and contexts

**Meincke, L., Shapiro, D., Duckworth, A. L., Mollick, E., Mollick, L., & Cialdini, R. (2025).** Call Me A Jerk: Persuading AI to Comply with Objectionable Requests. University of Pennsylvania.
- Tested 7 persuasion principles with N=28,000 LLM conversations
- Compliance increased from 33% to 72% with persuasion techniques (p < .001)
- Authority, commitment, and scarcity were most effective principles
- Validates "parahuman" model of LLM behavior (LLMs respond like humans)
- Demonstrates persuasion techniques work on AI agents

---

## Summary

**Key takeaways:**

1. **LLMs respond to persuasion** - Proven by research (Meincke et al., 2025)
2. **Match principles to skill type** - Discipline vs Technique vs Reference vs Collaborative
3. **Authority for discipline** - "YOU MUST", "No exceptions" for required practices
4. **Commitment for accountability** - Announcements, TodoWrite, public declarations
5. **Social proof for norms** - "Every time", "Everyone", establish patterns
6. **Unity for collaboration** - "We're colleagues", shared goals
7. **Avoid liking and reciprocity** - Can undermine honest feedback
8. **Use ethically** - Serve user's genuine interests, be transparent
9. **Explicit counters matter** - Close loopholes explicitly
10. **Bright-line rules work** - Clear directives reduce rationalization

Use these principles to create skills that agents actually follow, even under pressure.
