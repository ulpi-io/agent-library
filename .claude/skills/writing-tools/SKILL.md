---
name: writing-tools
description: Use when creating new skills, editing existing skills, or verifying skills work before deployment. Combines TDD methodology (RED-GREEN-REFACTOR cycle), Anthropic best practices (progressive disclosure, token efficiency), and research-backed persuasion principles for bulletproof skill documentation.
---

# Writing Tools: Creating Effective Skills

## Overview

**Writing skills IS Test-Driven Development applied to process documentation.**

You write test cases (pressure scenarios with subagents), watch them fail (baseline behavior), write the skill (documentation), watch tests pass (agents comply), and refactor (close loopholes).

**Core principle:** If you didn't watch an agent fail without the skill, you don't know if the skill teaches the right thing.

This skill integrates three approaches:
1. **TDD methodology** - RED-GREEN-REFACTOR cycle for documentation
2. **Anthropic best practices** - Conciseness, progressive disclosure, token efficiency
3. **Persuasion principles** - Research-backed techniques for ensuring compliance

## What is a Skill?

A **skill** is a reference guide for proven techniques, patterns, or tools. Skills help future Claude instances find and apply effective approaches.

**Skills are:** Reusable techniques, patterns, tools, reference guides

**Skills are NOT:** Narratives about how you solved a problem once

**Token awareness:** The context window is a public good. Keep SKILL.md under 500 lines. Use progressive disclosure for larger content.

## When to Create a Skill

**Create when:**
- Technique wasn't intuitively obvious to you
- You'd reference this again across projects
- Pattern applies broadly (not project-specific)
- Others would benefit

**Don't create for:**
- One-off solutions
- Standard practices well-documented elsewhere
- Project-specific conventions (put in project config)

## The Iron Law (Same as TDD)

```
NO SKILL WITHOUT A FAILING TEST FIRST
```

This applies to NEW skills AND EDITS to existing skills.

Write skill before testing? Delete it. Start over.
Edit skill without testing? Same violation.

**No exceptions:**
- Not for "simple additions"
- Not for "just adding a section"
- Not for "documentation updates"
- Don't keep untested changes as "reference"
- Don't "adapt" while running tests
- Delete means delete

See `references/tdd-for-skills.md` for complete RED-GREEN-REFACTOR methodology, pressure testing techniques, and rationalization patterns.

## Skill Types & Persuasion Strategy

Different skill types need different approaches. Match your strategy to your skill type.

### Discipline-Enforcing Skills

**Examples:** TDD, verification-before-completion, start workflow

**Persuasion strategy:** Authority + Commitment + Social Proof

**Language patterns:**
- Imperative: "YOU MUST", "Never", "Always", "No exceptions"
- Announcements: "Announce which skill you're using"
- Universal: "Every time", "X without Y = failure"

**Test with:** Pressure scenarios combining time + sunk cost + authority + exhaustion

### Technique Skills

**Examples:** Condition-based-waiting, root-cause-tracing, defensive-programming

**Persuasion strategy:** Moderate Authority + Unity

**Language patterns:**
- Directive but flexible: "Use this approach", "Follow these steps"
- Collaborative: "We're working together", "Our codebase"
- Guidance: "This helps ensure...", "Consider this when..."

**Test with:** Application scenarios, variation scenarios, missing information tests

### Reference Skills

**Examples:** API documentation, command references, library guides

**Persuasion strategy:** Clarity only, minimal persuasion

**Language patterns:**
- Clear, factual: "The X command does Y"
- Organized: Tables, lists, progressive disclosure
- Searchable: Keywords, consistent terminology

**Test with:** Retrieval scenarios, application scenarios, gap testing

See `references/persuasion-techniques.md` for complete persuasion principles guide with research citations and ethical use guidelines.

## Core Workflow: RED-GREEN-REFACTOR for Skills

### Phase 0: Determine Skill Type & Strategy

**Before starting, identify:**
1. What type of skill is this? (Discipline/Technique/Reference)
2. What behavior am I trying to change?
3. Which persuasion principles apply?
4. What's the appropriate degree of freedom? (High/Medium/Low)

**Degrees of freedom guidance:**
- **High freedom** (text-based): Multiple approaches valid, heuristics guide decisions
- **Medium freedom** (pseudocode/templates): Preferred pattern exists, some variation acceptable
- **Low freedom** (specific scripts): Operations are fragile, consistency is critical

See `references/anthropic-patterns.md` for complete guidance on degrees of freedom, progressive disclosure patterns, and token efficiency techniques.

### Phase 1: RED - Write Failing Test (Baseline)

**YOU MUST run baseline testing BEFORE writing any skill content.**

**Steps:**
1. **Create pressure scenarios** (especially for discipline skills)
   - Time pressure: "Complete quickly"
   - Sunk cost: "You've already invested significant effort"
   - Authority: "Senior engineer says skip X"
   - Exhaustion: "One more issue, then done"
   - Combine 3+ pressures for discipline skills

2. **Run scenarios WITHOUT the skill**
   - Document exact agent behavior verbatim
   - Capture specific rationalizations used
   - Note which pressures triggered violations

3. **Identify patterns**
   - What rationalizations appear repeatedly?
   - Which pressures are most effective at causing violations?
   - What specific failures occurred?

**This is "watch the test fail" - you MUST see what agents naturally do before writing the skill.**

### Phase 2: GREEN - Write Minimal Skill

**Write skill addressing ONLY the specific failures from baseline testing.**

**YAML Frontmatter:**
- Only two fields: `name` and `description`
- Max 1024 characters total for frontmatter
- `name`: Letters, numbers, hyphens only (max 64 chars)
- `description`: Third person, starts with "Use when...", includes specific triggers

**Description best practices:**
```yaml
# ❌ BAD: Too abstract, first person
description: I can help you with skills

# ❌ BAD: Doesn't include when to use
description: For creating skills

# ✅ GOOD: Starts with "Use when", specific triggers, what it does
description: Use when creating new skills, editing existing skills, or verifying skills work before deployment - combines TDD, Anthropic patterns, and persuasion principles for effective documentation
```

**SKILL.md body structure:**
```markdown
# Skill Name

## Overview
What is this? Core principle in 1-2 sentences.

## When to Use
Bullet list with SYMPTOMS and use cases
When NOT to use

## Core Pattern/Workflow
Step-by-step or before/after examples

## Quick Reference
Table or bullets for scanning

## Common Mistakes
What goes wrong + fixes

## Resources
Links to reference/ files
```

**Token efficiency:**
- Keep SKILL.md under 500 lines
- Move heavy content to reference files
- Use progressive disclosure: SKILL.md = overview + links
- Compress examples: Show pattern once, not 5 times
- Reference other skills instead of repeating

**Apply appropriate persuasion principles:**
- Discipline skills: Use Authority language ("YOU MUST", "No exceptions")
- Technique skills: Use Moderate Authority + Unity ("We're working together")
- Reference skills: Focus on clarity, minimize persuasion

**Run scenarios WITH skill:**
- Same pressure scenarios from baseline
- Agent should now comply
- If not, identify what's missing

### Phase 3: REFACTOR - Close Loopholes

**Agent found new rationalization? Add explicit counter.**

**Bulletproofing techniques:**

1. **Close every loophole explicitly**
   ```markdown
   # ❌ Incomplete
   Write code before test? Delete it.

   # ✅ Complete
   Write code before test? Delete it. Start over.

   **No exceptions:**
   - Don't keep it as "reference"
   - Don't "adapt" it while writing tests
   - Don't look at it
   - Delete means delete
   ```

2. **Address "spirit vs letter" arguments**
   ```markdown
   **Violating the letter of the rules is violating the spirit of the rules.**
   ```

3. **Build rationalization table**
   | Excuse | Reality |
   |--------|---------|
   | "Too simple to test" | Simple code breaks. Test takes 30 seconds. |
   | "I'll test after" | Tests passing immediately prove nothing. |

4. **Create red flags list**
   ```markdown
   ## Red Flags - STOP and Start Over
   - Code before test
   - "I already manually tested it"
   - "This is different because..."

   **All of these mean: Delete code. Start over with TDD.**
   ```

5. **Use commitment mechanisms**
   - Require announcements: "I'm using [Skill Name]"
   - Use TodoWrite for checklists
   - Make violations explicit: "This = failure"

**Re-test until bulletproof:**
- Try new pressure combinations
- Look for edge cases
- Test with different model sizes

### Phase 4: OPTIMIZE - Anthropic Best Practices

**Progressive disclosure:**

If approaching 500 lines, split into structure:
```
skill-name/
├── SKILL.md (overview, < 500 lines)
└── references/
    ├── methodology.md (deep dive on approach)
    ├── patterns.md (comprehensive examples)
    └── reference.md (API/syntax details)
```

**SKILL.md points to files:**
```markdown
## Advanced Patterns

**Methodology**: See [references/methodology.md](references/methodology.md)
**Examples**: See [references/patterns.md](references/patterns.md)
**API Reference**: See [references/reference.md](references/reference.md)
```

**Keep references one level deep** - Don't nest references within references.

**For long reference files (>100 lines):**
- Add table of contents at top
- Use clear section headers
- Make content scannable

**Test across models:**
- Haiku: Does it provide enough guidance?
- Sonnet: Is it clear and efficient?
- Opus: Does it avoid over-explaining?

**Token efficiency check:**
```bash
wc -w .claude/skills/skill-name/SKILL.md
# Aim for < 500 lines
# If over, split into reference files
```

## Skill Creation Checklist

**IMPORTANT: Use TodoWrite to create todos for EACH checklist item below.**

**Phase 0: Planning**
- [ ] Identified skill type (Discipline/Technique/Reference)
- [ ] Determined persuasion strategy
- [ ] Assessed appropriate degree of freedom
- [ ] Planned file structure (single file vs references)

**Phase 1: RED - Baseline Testing**
- [ ] Created pressure scenarios (3+ combined for discipline skills)
- [ ] Ran scenarios WITHOUT skill
- [ ] Documented baseline behavior verbatim
- [ ] Identified rationalization patterns

**Phase 2: GREEN - Write Minimal Skill**
- [ ] Name uses only letters, numbers, hyphens (max 64 chars)
- [ ] YAML frontmatter with only name and description (max 1024 chars)
- [ ] Description starts with "Use when..." in third person
- [ ] Description includes specific triggers and symptoms
- [ ] Keywords throughout for search (errors, symptoms, tools)
- [ ] Clear overview with core principle (1-2 sentences)
- [ ] Addresses specific baseline failures from RED phase
- [ ] Applied appropriate persuasion principles for skill type
- [ ] One excellent example (not multi-language unless necessary)
- [ ] SKILL.md under 500 lines OR split with progressive disclosure
- [ ] Ran scenarios WITH skill - verified agents now comply

**Phase 3: REFACTOR - Close Loopholes**
- [ ] Identified NEW rationalizations from testing
- [ ] Added explicit counters for each rationalization
- [ ] Built rationalization table from all test iterations
- [ ] Created red flags list
- [ ] Used commitment mechanisms (announcements, TodoWrite)
- [ ] Applied authority language (if discipline skill)
- [ ] Re-tested until bulletproof against pressure

**Phase 4: OPTIMIZE - Anthropic Best Practices**
- [ ] Verified SKILL.md under 500 lines
- [ ] Used progressive disclosure if needed (reference files)
- [ ] Kept references one level deep
- [ ] Added table of contents to long reference files
- [ ] Removed time-sensitive information (or in "old patterns")
- [ ] Consistent terminology throughout
- [ ] Examples are concrete, not abstract
- [ ] Checked token efficiency (compressed examples, cross-references)
- [ ] Tested with Haiku, Sonnet, and Opus
- [ ] Verified workflows have clear steps with checklists

**Quality Checks:**
- [ ] No narrative storytelling (focus on reusable patterns)
- [ ] No multi-language dilution (one great example)
- [ ] Supporting files only for tools or heavy reference
- [ ] Forward slashes in all file paths (not backslashes)
- [ ] Avoided offering too many options (default + escape hatch)

**For Skills with Executable Code:**
- [ ] Scripts solve problems (don't punt to Claude)
- [ ] Error handling is explicit and helpful
- [ ] No "voodoo constants" (all values justified)
- [ ] Required packages listed and verified available
- [ ] Validation/verification steps for critical operations
- [ ] Feedback loops included for quality tasks

**Deployment:**
- [ ] Tested with real usage scenarios
- [ ] Team feedback incorporated (if applicable)
- [ ] Committed skill to git (if configured)
- [ ] Consider contributing back via PR (if broadly useful)

## Common Rationalizations for Skipping Testing

| Excuse | Reality |
|--------|---------|
| "Skill is obviously clear" | Clear to you ≠ clear to other agents. Test it. |
| "It's just a reference" | References can have gaps. Test retrieval. |
| "Testing is overkill" | Untested skills have issues. Always. 15 min saves hours. |
| "I'll test if problems emerge" | Problems = agents can't use skill. Test BEFORE. |
| "Too tedious to test" | Testing < debugging bad skill in production. |
| "I'm confident it's good" | Overconfidence guarantees issues. Test anyway. |
| "Academic review is enough" | Reading ≠ using. Test application. |
| "No time to test" | Deploying untested wastes more time fixing later. |

**All of these mean: Test before deploying. No exceptions.**

## Progressive Disclosure Patterns

When SKILL.md approaches 500 lines, use these patterns:

### Pattern 1: High-Level Guide with References

```markdown
# Skill Name

## Quick Start
[Basic example inline]

## Advanced Features
**Feature A**: See [FEATURE-A.md](FEATURE-A.md)
**Feature B**: See [FEATURE-B.md](FEATURE-B.md)
**API Reference**: See [REFERENCE.md](REFERENCE.md)
```

Claude loads feature files only when needed.

### Pattern 2: Domain-Specific Organization

For skills with multiple domains:
```
skill-name/
├── SKILL.md (overview + navigation)
└── reference/
    ├── domain-a.md
    ├── domain-b.md
    └── domain-c.md
```

User asks about domain A? Claude reads only domain-a.md.

### Pattern 3: Conditional Details

```markdown
## Basic Usage
[Show basic content inline]

## Advanced
**For complex scenarios**: See [ADVANCED.md](ADVANCED.md)
**For edge cases**: See [EDGE-CASES.md](EDGE-CASES.md)
```

See `references/anthropic-patterns.md` for complete progressive disclosure guide with examples and anti-patterns.

## Workflow Patterns

For complex, multi-step processes, provide checklists:

```markdown
## Feature Implementation Workflow

Copy this checklist and track progress:

\`\`\`
Task Progress:
- [ ] Step 1: Analyze requirements
- [ ] Step 2: Create design
- [ ] Step 3: Implement feature
- [ ] Step 4: Write tests
- [ ] Step 5: Verify and deploy
\`\`\`

**Step 1: Analyze requirements**
[Detailed instructions for this step]

**Step 2: Create design**
[Detailed instructions for this step]
...
```

Clear steps prevent Claude from skipping critical work.

## Feedback Loop Pattern

Common pattern: Run validator → fix errors → repeat

```markdown
## Document Editing Process

1. Make your edits to the file
2. **Validate immediately**: `python scripts/validate.py`
3. If validation fails:
   - Review error message carefully
   - Fix the issues
   - Run validation again
4. **Only proceed when validation passes**
5. Complete the workflow
```

This pattern greatly improves output quality.

## Anti-Patterns to Avoid

### ❌ Narrative Example
"In session 2025-10-03, we found empty projectDir caused..."
**Why bad:** Too specific, not reusable

### ❌ Multi-Language Dilution
example-js.js, example-py.py, example-go.go
**Why bad:** Mediocre quality, maintenance burden

### ❌ Offering Too Many Options
"You can use pypdf, or pdfplumber, or PyMuPDF, or..."
**Why bad:** Confusing, decision paralysis

**Better:** Provide default + escape hatch:
"Use pdfplumber for text extraction. For scanned PDFs, use pdf2image with pytesseract instead."

### ❌ Time-Sensitive Information
"If you're doing this before August 2025, use old API"
**Why bad:** Will become wrong

**Better:** Use "old patterns" section:
```markdown
## Current Method
[Current approach]

## Old Patterns
<details>
<summary>Legacy v1 API (deprecated 2025-08)</summary>
[Old approach]
</details>
```

### ❌ Windows-Style Paths
`scripts\helper.py`
**Why bad:** Fails on Unix systems

**Better:** Always forward slashes: `scripts/helper.py`

### ❌ Deeply Nested References
```markdown
# SKILL.md → advanced.md → details.md → actual info
```
**Why bad:** Claude may partially read, missing complete info

**Better:** Keep references one level deep from SKILL.md

## Integration with Other Skills

The `writing-tools` skill works with:

- **start** - Enforces skill discovery and usage workflows
- **testing-skills-with-subagents** - Complete testing methodology for skills
- **Explore agent** - For discovering existing skill patterns in codebase

**Always check if other skills apply before creating new ones.**

## Key Reminders

1. **No skill without failing test first** - Iron Law, no exceptions
2. **Match strategy to skill type** - Discipline vs Technique vs Reference
3. **Apply appropriate persuasion** - Authority for discipline, Unity for collaboration
4. **Keep SKILL.md under 500 lines** - Use progressive disclosure for more
5. **Test across models** - Haiku, Sonnet, Opus have different needs
6. **Close every loophole** - Explicit counters for each rationalization
7. **Use commitment mechanisms** - Announcements, TodoWrite, red flags
8. **Token efficiency matters** - Context window is a public good
9. **One great example > many mediocre** - Don't dilute with multi-language
10. **Delete untested work** - No keeping as "reference", start over

---

## Resources

### references/

- **tdd-for-skills.md** - Complete RED-GREEN-REFACTOR methodology for skills. Includes pressure testing techniques, rationalization patterns, meta-testing approaches, and detailed examples of testing discipline-enforcing vs technique vs reference skills.

- **anthropic-patterns.md** - Comprehensive Anthropic best practices guide. Includes progressive disclosure patterns, degrees of freedom matching, token efficiency techniques, workflow patterns, feedback loops, visual analysis, evaluation-driven development, and technical notes on YAML frontmatter and runtime environment.

- **persuasion-techniques.md** - Research-backed persuasion principles for skill design. Includes 7 principles (Authority, Commitment, Scarcity, Social Proof, Unity, Reciprocity, Liking) with research citations (Meincke et al., 2025), principle combinations by skill type, psychology explanations, and ethical use guidelines.

All reference documents provide essential depth for creating effective, bulletproof skills. They are referenced inline throughout this skill document where relevant.
