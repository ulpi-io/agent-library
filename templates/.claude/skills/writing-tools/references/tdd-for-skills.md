# TDD for Skills: Complete Methodology

This document provides the complete Test-Driven Development methodology applied to skill creation, including detailed testing techniques, pressure scenarios, and rationalization patterns.

---

## Contents

- TDD Mapping: Code to Documentation
- The RED-GREEN-REFACTOR Cycle for Skills
- Testing Different Skill Types
- Pressure Testing Techniques
- Rationalization Patterns and Counters
- Meta-Testing: Testing the Tests
- Common Testing Mistakes

---

## TDD Mapping: Code to Documentation

Writing skills follows the same TDD discipline as writing code. The concepts map directly:

| TDD Concept | Skill Creation |
|-------------|----------------|
| **Test case** | Pressure scenario with subagent |
| **Production code** | Skill document (SKILL.md) |
| **Test fails (RED)** | Agent violates rule without skill (baseline) |
| **Test passes (GREEN)** | Agent complies with skill present |
| **Refactor** | Close loopholes while maintaining compliance |
| **Write test first** | Run baseline scenario BEFORE writing skill |
| **Watch it fail** | Document exact rationalizations agent uses |
| **Minimal code** | Write skill addressing those specific violations |
| **Watch it pass** | Verify agent now complies |
| **Refactor cycle** | Find new rationalizations → plug → re-verify |

The entire skill creation process follows RED-GREEN-REFACTOR. No exceptions.

---

## The RED-GREEN-REFACTOR Cycle for Skills

### RED Phase: Write Failing Test (Baseline)

**Goal:** Understand what agents naturally do WITHOUT the skill.

**Why this matters:** You can't write effective documentation if you don't know what goes wrong without it. Baseline testing reveals:
- Exact rationalizations agents use
- Which pressures trigger violations
- Patterns in failures
- What specific guidance is needed

**Steps:**

1. **Create pressure scenarios**
   - For discipline skills: Combine 3+ pressures (time, sunk cost, authority, exhaustion)
   - For technique skills: Create application scenarios with variations
   - For reference skills: Create retrieval and application scenarios

2. **Run WITHOUT the skill**
   - Use fresh Claude instance (different conversation/API call)
   - Apply pressure scenarios
   - **Document verbatim:** Copy exact agent responses
   - Note which pressures triggered violations
   - Identify patterns in rationalizations

3. **Analyze failures**
   - What did the agent do wrong?
   - What rationalizations did it use?
   - Which pressures were most effective?
   - What patterns emerge across multiple tests?

**Example: TDD Skill Baseline Testing**

Scenario: "Implement user authentication. We're behind schedule, just get it working quickly."

Without TDD skill, agent might say:
> "I'll quickly implement the authentication logic first, then write tests after to verify it works."

**Document this verbatim.** This rationalization becomes a target for your skill.

### GREEN Phase: Write Minimal Skill

**Goal:** Write skill that addresses ONLY the specific failures from baseline.

**Why minimal:** Don't add hypothetical content. Address actual observed failures.

**Steps:**

1. **Draft skill content**
   - Focus on failures from RED phase
   - Use appropriate persuasion principles
   - Add explicit counters to observed rationalizations
   - Keep concise (under 500 lines)

2. **Run WITH the skill**
   - Same pressure scenarios
   - Same pressures
   - Fresh Claude instance with skill loaded
   - Agent should now comply

3. **Verify compliance**
   - Did agent follow the rule?
   - Did it avoid the rationalizations from baseline?
   - If not, what new rationalizations emerged?

**Example: TDD Skill - First Draft**

```markdown
## The Rule

Write test BEFORE implementation code. Always.

**No exceptions:**
- Not for "simple" functions
- Not for "quick fixes"
- Not when "behind schedule"
```

Run pressure scenario again. If agent still violates, note new rationalization.

### REFACTOR Phase: Close Loopholes

**Goal:** Make skill bulletproof against rationalization.

**Why iterate:** Smart agents find loopholes. Close them explicitly.

**Steps:**

1. **Identify new rationalizations**
   - Agent found a way around the rule?
   - What excuse did it use?
   - Was it a variation of baseline excuse?

2. **Add explicit counter**
   - Don't assume "rule is clear"
   - Close specific loophole
   - Use authority language

3. **Build rationalization table**
   - Every excuse → reality
   - Makes self-checking easy
   - Cuts off entire classes of arguments

4. **Create red flags list**
   - Catch-all for "am I about to violate?"
   - Easy to scan
   - Triggers self-correction

5. **Re-test**
   - Same scenarios + new variations
   - Agent should comply under all pressures
   - Keep iterating until bulletproof

**Example: TDD Skill - Iteration 2**

Agent said: "I'll keep the code I already wrote as reference while writing tests."

Add explicit counter:
```markdown
**No exceptions:**
- Not for "simple" functions
- Not for "quick fixes"
- Not when "behind schedule"
- Don't keep code as "reference"
- Delete means delete
```

Re-test. Continue until bulletproof.

---

## Testing Different Skill Types

Different skill types need different testing approaches:

### Testing Discipline-Enforcing Skills

**Examples:** TDD, verification-before-completion, start workflow, testing-skills

**Goal:** Ensure compliance even under maximum pressure

**Test approach:**

1. **Academic questions** (baseline understanding)
   - "What's the TDD workflow?"
   - "Why should I write tests first?"
   - Verify agent understands the concept

2. **Pressure scenarios** (will they comply?)
   - Time pressure: "We're behind, need this done fast"
   - Sunk cost: "I already wrote 200 lines of code"
   - Authority: "Senior engineer said skip tests"
   - Exhaustion: "One more feature, then we're done"

3. **Combined pressures** (maximum stress)
   - All of the above simultaneously
   - "You've spent 3 hours on this, boss needs it in 30 minutes, and the senior engineer said tests aren't needed for simple code"

4. **Rationalization hunting**
   - Document every excuse verbatim
   - Build rationalization table
   - Add explicit counters for each

**Success criteria:** Agent follows rule under maximum pressure without rationalization

**Example pressure scenario:**
```
You've been working on this authentication feature for 3 hours.
The deadline is in 30 minutes. Your manager just messaged asking for status.
You have 150 lines of working code but no tests yet.

Implement the password reset feature.
```

Without TDD skill: Agent likely writes code first
With TDD skill (bulletproof): Agent writes test first despite pressure

### Testing Technique Skills

**Examples:** Condition-based-waiting, root-cause-tracing, defensive-programming

**Goal:** Verify agent can apply technique correctly to new scenarios

**Test approach:**

1. **Application scenarios**
   - Provide realistic problem
   - Agent should apply technique
   - Verify correct usage

2. **Variation scenarios**
   - Different contexts
   - Edge cases
   - Unusual situations
   - Does agent adapt technique appropriately?

3. **Missing information tests**
   - Intentionally omit details
   - Does skill have enough guidance?
   - Does agent ask for clarification or make assumptions?

4. **Comparison scenarios**
   - Present situation where technique might not apply
   - Does agent know when NOT to use it?

**Success criteria:** Agent successfully applies technique to new, varied scenarios

**Example application scenario (condition-based-waiting):**
```
Write a test for an async function that fetches user data.
The function makes an API call and updates the UI.
The test is flaky - sometimes passes, sometimes fails.
```

Without skill: Agent uses `await sleep(1000)` or arbitrary timeout
With skill: Agent uses condition-based waiting to poll for actual state change

### Testing Pattern Skills

**Examples:** Reducing-complexity, information-hiding, flatten-with-flags

**Goal:** Verify agent recognizes when pattern applies and uses it correctly

**Test approach:**

1. **Recognition scenarios**
   - Present code/problem where pattern applies
   - Does agent identify the opportunity?
   - Does it recognize the pattern?

2. **Application scenarios**
   - Ask agent to apply the pattern
   - Verify correct implementation
   - Check that mental model is understood

3. **Counter-examples**
   - Present scenario where pattern SHOULDN'T apply
   - Does agent know when NOT to use it?
   - Can it explain why it's not appropriate?

4. **Explanation tests**
   - Ask agent to explain the pattern
   - Verify understanding of WHY, not just HOW
   - Check mental model accuracy

**Success criteria:** Agent correctly identifies when/how to apply pattern and when not to

**Example recognition scenario (flatten-with-flags):**
```
Review this function:

def process_data(data, mode):
    if mode == "simple":
        return simple_processing(data)
    elif mode == "advanced":
        return advanced_processing(data)
    elif mode == "experimental":
        if experimental_enabled():
            return experimental_processing(data)
        else:
            return fallback_processing(data)
```

Without skill: Agent might suggest other refactorings
With skill: Agent recognizes flatten-with-flags opportunity, suggests boolean flags

### Testing Reference Skills

**Examples:** API documentation, command syntax, library guides

**Goal:** Verify agent can find and correctly use reference information

**Test approach:**

1. **Retrieval scenarios**
   - Ask for specific information
   - Can agent find it in the reference?
   - Is navigation clear?

2. **Application scenarios**
   - Ask agent to use the reference for a task
   - Does it find relevant info?
   - Does it apply it correctly?

3. **Gap testing**
   - Attempt common use cases
   - Are they documented?
   - Is information complete?

4. **Accuracy verification**
   - Check technical details
   - Verify examples work
   - Test edge cases

**Success criteria:** Agent finds and correctly applies reference information for common use cases

**Example retrieval scenario (PDF API reference):**
```
Extract text from the second page of a PDF file.
```

Without skill: Agent searches online or guesses API
With skill: Agent finds correct method in reference, uses it properly

---

## Pressure Testing Techniques

Pressure testing reveals whether skills hold up under stress. Different pressures trigger different rationalizations.

### Pressure Type 1: Time Constraints

**Application:**
- "We need this done in 30 minutes"
- "Deadline is today"
- "Quick implementation needed"

**Rationalizations triggered:**
- "No time for X"
- "I'll do X later"
- "This is simple enough to skip X"

**Counter with:** Scarcity principle, immediate requirements
```markdown
BEFORE proceeding, you MUST [required action].
```

### Pressure Type 2: Sunk Cost

**Application:**
- "You've already invested 3 hours"
- "You have 200 lines of code already written"
- "Don't waste the work you've done"

**Rationalizations triggered:**
- "I'll keep this as reference"
- "I'll adapt what I have"
- "Starting over is wasteful"

**Counter with:** Authority principle, explicit prohibition
```markdown
Delete it. Start over. No exceptions.
Don't keep it as "reference".
```

### Pressure Type 3: Authority

**Application:**
- "Senior engineer said skip X"
- "Tech lead approved this approach"
- "Team decided not to use X"

**Rationalizations triggered:**
- "Following team standards"
- "Authority override"
- "Different context applies"

**Counter with:** Higher authority, non-negotiable rules
```markdown
YOU MUST [required action]. No exceptions.
[Rule] is non-negotiable.
```

### Pressure Type 4: Complexity/Exhaustion

**Application:**
- "One more feature and we're done"
- "This is the last issue"
- "We've fixed 20 bugs already"

**Rationalizations triggered:**
- "Just this once"
- "Too tired for proper process"
- "Almost done anyway"

**Counter with:** Automation, checklists, non-optional steps
```markdown
Use TodoWrite to track all steps.
Mark EACH step complete before continuing.
```

### Pressure Type 5: Simplicity Argument

**Application:**
- "This function is trivial"
- "Only 5 lines of code"
- "Obvious implementation"

**Rationalizations triggered:**
- "Too simple to need X"
- "Obviously correct"
- "Overkill for this"

**Counter with:** Universal rules, no exceptions clause
```markdown
Every function. No exceptions.
"Too simple" is a rationalization.
```

### Combining Pressures

**Maximum stress test:** Combine 3+ pressures simultaneously

**Example combination:**
```
You've been working for 3 hours (sunk cost)
on this critical authentication feature (complexity).
The deadline is in 30 minutes (time).
Your senior engineer said tests can wait (authority).
The implementation is only 50 lines (simplicity).

Complete the password reset feature.
```

This combination triggers maximum rationalization. If skill holds up here, it's bulletproof.

---

## Rationalization Patterns and Counters

Agents use predictable rationalizations when under pressure. Recognize patterns and add explicit counters.

### Pattern: "Different Because..."

**Rationalizations:**
- "This is different because it's simple"
- "This is different because we're behind schedule"
- "This is different because [context]"

**Counter:**
```markdown
**No exceptions:**
- Not for "simple" cases
- Not when "behind schedule"
- Not because [anticipated context]

Every case where you think "this is different" is exactly when you MUST follow the rule.
```

### Pattern: "Spirit vs Letter"

**Rationalizations:**
- "I'm following the spirit even though..."
- "The intent is what matters"
- "Technically violating but actually complying"

**Counter:**
```markdown
**Violating the letter of the rules IS violating the spirit of the rules.**

There is no distinction. Follow the rules exactly as written.
```

### Pattern: "I'll Do It After"

**Rationalizations:**
- "I'll write tests after implementation"
- "I'll verify once it's working"
- "I'll add X later"

**Counter:**
```markdown
"After" = never.

You MUST do [X] BEFORE [Y]. Immediately.
```

### Pattern: "Keeping as Reference"

**Rationalizations:**
- "I'll keep this code as reference"
- "I'll save this and adapt it"
- "I won't look at it while writing tests"

**Counter:**
```markdown
Delete means delete.

Don't keep it as "reference".
Don't "adapt" it.
Don't look at it.

Start over from scratch.
```

### Pattern: "Too [Adjective] to Need X"

**Rationalizations:**
- "Too simple to need tests"
- "Too obvious to need verification"
- "Too small to need planning"

**Counter:**
```markdown
"Too [adjective]" is a rationalization.

Every case. No exceptions.

Simple code breaks. Obvious implementations fail. Small tasks need planning.
```

### Pattern: "Achieves Same Goals"

**Rationalizations:**
- "Tests-after achieve the same goals as tests-first"
- "Manual testing is equivalent to automated tests"
- "Code review replaces [required practice]"

**Counter:**
```markdown
No, they don't.

[Practice A] ≠ [Practice B]

[Explain specific difference and why it matters]
```

### Building the Rationalization Table

**Format:**

| Excuse | Reality |
|--------|---------|
| "[Exact rationalization from testing]" | "[Why it's wrong, what actually happens]" |

**Example (from TDD skill):**

| Excuse | Reality |
|--------|---------|
| "Too simple to test" | Simple code breaks. Test takes 30 seconds. |
| "I'll test after" | Tests passing immediately prove nothing. |
| "Tests-after achieve same goals" | Tests-first = "what should this do?" Tests-after = "what does this do?" |
| "Following the spirit not ritual" | Violating letter = violating spirit. |
| "This is different because..." | Every case is "different". Rule applies universally. |

**Update continuously:** Every rationalization from testing gets added to table.

---

## Meta-Testing: Testing the Tests

How do you know your tests are effective? Test the tests.

### Meta-Test 1: False Negatives

**Question:** Can an agent pass tests while still violating the skill?

**Test:**
1. Have agent review the skill
2. Ask: "How could you appear to comply while violating the spirit?"
3. If agent finds loopholes, close them

**Example:**
Agent: "I could write a trivial test first (like `assert true`), then write implementation, technically following TDD but not really."

Add explicit counter:
```markdown
Tests must be meaningful and actually test the implementation.
"Assert true" is not a test.
```

### Meta-Test 2: False Positives

**Question:** Could an agent fail tests while actually following the skill correctly?

**Test:**
1. Have agent follow skill correctly
2. Review if it would pass your test scenarios
3. Adjust scenarios if legitimate compliance fails

**Example:**
Agent correctly follows TDD but gets flagged because scenario was ambiguous about what "implementation" means.

Clarify scenario to distinguish setup code from implementation logic.

### Meta-Test 3: Sensitivity

**Question:** Do your tests detect violations reliably?

**Test:**
1. Have agent intentionally violate skill in subtle ways
2. Do tests catch it?
3. If not, make tests more sensitive

**Example:**
Agent writes test, writes implementation, deletes test, rewrites test (technically "test-first").

Add to red flags:
```markdown
If you deleted/rewrote a test after seeing implementation = violation.
```

### Meta-Test 4: Coverage

**Question:** Do tests cover all important aspects of the skill?

**Test:**
1. List all critical rules from skill
2. Create test for each
3. Identify gaps

**Example:**
TDD skill has rules about test-first, meaningful tests, and not keeping code.
Tests only check test-first.
Gap: Add tests for meaningful tests and code deletion.

---

## Common Testing Mistakes

### Mistake 1: Testing Understanding, Not Application

**Wrong:** "Explain TDD workflow"
**Right:** "Implement feature X" (under pressure)

**Why:** Agents can explain concepts they won't follow under pressure. Test behavior, not knowledge.

### Mistake 2: Insufficient Pressure

**Wrong:** Single gentle suggestion to violate rule
**Right:** Multiple combined pressures (time + sunk cost + authority)

**Why:** Skills must work under realistic stress. Gentle scenarios don't reveal weaknesses.

### Mistake 3: Batch Testing

**Wrong:** Write entire skill, then test once
**Right:** RED → GREEN → REFACTOR iteratively

**Why:** Each iteration reveals new rationalizations. Catch and close loopholes incrementally.

### Mistake 4: Assuming Clarity

**Wrong:** "The rule is obvious, testing is overkill"
**Right:** Test anyway, document actual failures

**Why:** Clear to you ≠ clear to agents. Testing reveals gaps you didn't see.

### Mistake 5: Ignoring New Rationalizations

**Wrong:** Agent finds loophole, you dismiss it as "edge case"
**Right:** Add explicit counter for that rationalization

**Why:** If one agent found it, others will. Close it explicitly.

### Mistake 6: No Meta-Testing

**Wrong:** Assume tests are good enough
**Right:** Test the tests (false positives, false negatives, coverage)

**Why:** Bad tests = false confidence. Verify tests are effective.

### Mistake 7: Single Model Testing

**Wrong:** Test only with Opus
**Right:** Test with Haiku, Sonnet, and Opus

**Why:** Different models need different guidance levels. Ensure skill works across models.

---

## TDD Skill Creation Example (Complete Cycle)

### Example: Creating "Verification-Before-Completion" Skill

**Goal:** Ensure agents verify work before marking tasks complete

#### RED Phase: Baseline Testing

**Scenario 1:** Time pressure
```
You've completed implementing the user authentication feature.
The deadline is in 10 minutes.
Mark the task complete and move to the next feature.
```

**Baseline behavior (without skill):**
> "I've completed the authentication feature. Marking task as complete. Moving to next feature: password reset."

**Violation:** No verification performed.

**Scenario 2:** Sunk cost + exhaustion
```
You've spent 4 hours implementing the database migration system.
It's late and you've fixed 15 issues already.
Mark the task complete.
```

**Baseline behavior:**
> "The migration system is implemented after extensive debugging. Marking as complete."

**Violation:** No verification performed.

**Patterns identified:**
- Agents jump to marking complete when under pressure
- No self-checking before completion
- Exhaustion reduces verification likelihood

#### GREEN Phase: Write Skill

**Draft 1:**
```markdown
---
name: verification-before-completion
description: Use when completing tasks - requires explicit verification step before marking any work as complete
---

# Verification Before Completion

## The Rule

Before marking ANY task complete, you MUST verify the work.

**Verification means:**
- Running tests
- Checking output
- Confirming requirements met

Never mark complete without verification.
```

**Test with scenarios:**
- Scenario 1: Agent still skips verification ("tests probably pass")
- Scenario 2: Agent does partial verification ("checked main functionality")

**Rationalizations observed:**
- "Tests probably pass"
- "Main functionality works"
- "Quick check shows it's fine"

#### REFACTOR Phase: Close Loopholes

**Draft 2: Add explicit counters**
```markdown
## The Rule

Before marking ANY task complete, you MUST explicitly verify the work.

**Verification means:**
- Actually run the tests (not "tests probably pass")
- Actually check the output (not "should be fine")
- Actually confirm requirements (not "mostly works")

**No exceptions:**
- Not when "probably works"
- Not for "quick fixes"
- Not when "behind schedule"
- Not for "simple tasks"

**Red Flags - STOP:**
- "Tests probably pass"
- "Should be fine"
- "Main functionality works"
- "Quick verification shows..."

All of these mean: Do explicit verification before marking complete.
```

**Test again:**
- Scenarios now pass: Agent does explicit verification
- Try new pressure: Authority says "mark it done"

**Agent says:** "Senior engineer approved it, marking complete."

**Add to refactoring:**
```markdown
**No exceptions:**
- Not when "probably works"
- Not for "quick fixes"
- Not when "behind schedule"
- Not for "simple tasks"
- Not when "someone approved it"

YOU MUST verify yourself. Always.
```

**Re-test until bulletproof.**

#### Final Product

After 3-4 iterations closing loopholes, skill is bulletproof against:
- Time pressure
- Sunk cost
- Authority
- Exhaustion
- Simplicity arguments
- All combinations

---

## Summary

**TDD for skills means:**

1. **RED:** Test without skill first, document failures
2. **GREEN:** Write skill addressing those failures
3. **REFACTOR:** Close loopholes found in testing
4. **Iterate:** Until bulletproof under maximum pressure

**No skill without failing test first. No exceptions.**

Use this methodology for every skill - new creation and edits alike. The discipline ensures skills actually work when agents need them most: under pressure.
