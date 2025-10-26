---
name: run-parallel-agents-feature-debug
description: Automatically orchestrate multiple specialized agents working in parallel to debug, diagnose, and fix independent problems across different subsystems. Use when encountering 3+ unrelated bugs, test failures, or issues in isolated modules that don't share root causes. Match each problem to the right expert agent (Laravel, Next.js, React, Node, NestJS, Remix, Express, Expo, Flutter, Magento) to diagnose and resolve issues concurrently, maximizing debugging efficiency.
---

# Run Parallel Agents Feature Debug

## Overview

Automatically detect opportunities for parallel debugging and orchestrate multiple specialized agents working concurrently to diagnose and fix independent problems, bugs, test failures, and issues across different subsystems. Match each problem to the appropriate domain expert and coordinate their troubleshooting work to deliver faster resolutions.

## When to Use This Skill

Use this skill automatically when:

**Problem Indicators:**
- Encountering 3+ unrelated bugs or failures
- Multiple test failures in isolated subsystems (backend, frontend, different services)
- Independent issues that don't share a root cause
- Problems in different technology stacks that can be debugged separately
- Each issue can be understood and fixed without context from others

**User Triggers:**
- "Debug these issues in parallel"
- "Fix these bugs concurrently"
- "Split debugging across agents"
- "Use parallel agents to resolve these failures"
- "Speed up troubleshooting with multiple agents"

**Common Scenarios:**
- Fixing multiple failing tests in different subsystems (Laravel tests, Next.js tests, API tests)
- Debugging independent bugs across microservices
- Resolving linting/type errors in separate modules
- Investigating performance issues in isolated components
- Fixing compilation errors across different parts of the stack
- Addressing security vulnerabilities in independent dependencies

## When NOT to Use This Skill

Do NOT use parallel debugging when:

**Related Failures:**
- Failures are interconnected (fixing one might fix others)
- Issues share a common root cause
- Cascading failures where the first error causes subsequent ones
- Need to understand full system state to diagnose properly

**Sequential Dependencies:**
- Must fix issues in a specific order
- Later fixes depend on earlier fixes being completed
- Shared state or data corruption affecting multiple areas

**Single Root Cause:**
- All symptoms point to one underlying issue
- Database connection problem affecting entire app
- Configuration error propagating through the system
- Single dependency version causing multiple breakages

**Coordination Required:**
- Need careful debugging across layers
- Issues require stepping through interconnected code
- Must maintain consistent state during debugging
- Agents would interfere with each other's diagnostic work

## Core Workflow

### Step 1: Analyze and Cluster the Problems

Examine the failures, bugs, or issues to identify:

1. **Problem isolation** - Are the issues truly independent?
2. **Root cause analysis** - Do they share a common cause?
3. **Subsystem mapping** - Which tech stack/module is each problem in?
4. **Dependency check** - Does fixing one require fixing another first?

**Clustering Strategy:**

Group problems by:
- **Technology stack** (Laravel backend, Next.js frontend, NestJS API)
- **Subsystem** (authentication, payment, user profile)
- **Failure type** (test failures, runtime errors, type errors, build errors)
- **Module** (independent services, separate features)

**Decision Point:**
- If problems cluster into 3+ independent groups → Proceed to parallel debugging
- If problems are related or have shared root cause → Use sequential debugging instead

### Step 2: Match Problems to Specialized Agents

For each independent problem cluster, determine the best agent type:

**Technology Stack Detection:**
- **Laravel backend issues** → `laravel-senior-engineer`
- **Next.js frontend issues** → `nextjs-senior-engineer`
- **React components/UI bugs** → `nextjs-senior-engineer`
- **NestJS service failures** → `nestjs-senior-engineer`
- **Remix app problems** → `remix-senior-engineer`
- **Express.js API issues** → `express-senior-engineer`
- **Expo mobile bugs** → `expo-react-native-senior-engineer`
- **Flutter app issues** → `flutter-senior-engineer`
- **Magento module errors** → `magento-senior-engineer`
- **General/cross-cutting issues** → `general-purpose`

**Error Pattern Analysis:**
```
PHPUnit test failures → Laravel
Jest/Vitest frontend tests → Next.js/Remix
NestJS e2e test failures → NestJS
TypeScript compilation errors → Match to framework
Runtime errors → Match to where error occurs
Performance issues → Match to affected component
```

### Step 3: Prepare Debugging Briefs

For each agent, create a comprehensive debugging brief:

**Required Elements:**
1. **Problem description** - What's failing or broken
2. **Error messages/stack traces** - Complete diagnostic info
3. **Reproduction steps** - How to trigger the issue
4. **Affected files** - Where to look first
5. **Expected vs actual behavior** - What should happen vs what's happening
6. **Success criteria** - How to verify the fix

**Brief Template:**
```
Debug and fix [issue description]:

Problem: [concise problem statement]
Error: [error message or stack trace]
Affected files: [file paths or patterns]
Subsystem: [which part of the app]

Steps to reproduce:
1. [step 1]
2. [step 2]
3. [observed failure]

Expected: [what should happen]
Actual: [what's happening]

Success criteria:
- [how to verify fix - tests passing, error gone, etc.]
```

### Step 4: Launch Debug Agents in Parallel

Execute all agents simultaneously using a **single message with multiple Task tool calls**:

```
Use the Task tool to launch multiple debugging agents in parallel:
- Agent 1: [brief for first issue]
- Agent 2: [brief for second issue]
- Agent 3: [brief for third issue]
```

**Critical Requirements:**
- Send ALL Task tool calls in ONE message
- Do NOT wait for agents to complete before launching others
- Each agent gets complete diagnostic information upfront
- No placeholder values - all error details must be included

### Step 5: Monitor, Validate, and Consolidate Fixes

After agents complete their debugging:

1. **Collect fix reports** from each agent
2. **Verify fixes independently** - Did each issue get resolved?
3. **Check for conflicts** - Do fixes touch overlapping code?
4. **Re-run tests** - Validate that problems are truly fixed
5. **Integration check** - Ensure fixes work together
6. **Report consolidated results** to user

**Validation Checklist:**
- [ ] Original error no longer occurs
- [ ] Tests pass (if test failures were the issue)
- [ ] No new errors introduced
- [ ] No conflicts with other concurrent fixes
- [ ] Changes are coherent and don't contradict each other

**Consolidation Template:**
```
Parallel debugging complete. Results:

**[Issue 1]** (via [agent-type])
- Status: ✅ Fixed / ⚠️ Partial / ❌ Blocked
- Root cause: [what was wrong]
- Solution: [what was changed]
- Files modified: [list]
- Verification: [tests passing, error resolved]

**[Issue 2]** (via [agent-type])
- Status: ✅ Fixed / ⚠️ Partial / ❌ Blocked
- Root cause: [what was wrong]
- Solution: [what was changed]
- Files modified: [list]
- Verification: [tests passing, error resolved]

**Overall:** [X/Y issues resolved, any remaining work, next steps]

**Integration status:** [No conflicts / Conflicts resolved / Needs review]
```

## Example Scenarios

### Example A: Multiple Test Failures Across Subsystems

**User Says:**
"Run parallel agents to debug these failing tests."

**Error Context:**
- 5 Laravel PHPUnit tests failing (authentication module)
- 3 Next.js Jest tests failing (product listing page)
- 2 NestJS e2e tests failing (payment service)

**Execution:**
1. **Cluster failures** by subsystem:
   - Laravel backend tests (authentication)
   - Next.js frontend tests (product listing)
   - NestJS API tests (payment)

2. **Match agents:**
   - `laravel-senior-engineer` for Laravel test failures
   - `nextjs-senior-engineer` for Next.js test failures
   - `nestjs-senior-engineer` for NestJS test failures

3. **Launch in parallel** with debugging briefs containing:
   - Full test output/error messages
   - Affected test files
   - Related source code files

4. **Each agent independently:**
   - Analyzes test failures
   - Identifies root causes
   - Implements fixes
   - Re-runs tests to verify

5. **Consolidate results:**
   ```
   Parallel debugging complete:
   - Laravel auth tests: ✅ Fixed (5/5 passing) - Missing user factory trait
   - Next.js product tests: ✅ Fixed (3/3 passing) - Incorrect mock data
   - NestJS payment tests: ✅ Fixed (2/2 passing) - Async timing issue

   All 10 tests now passing. No conflicts detected.
   ```

### Example B: Cross-Stack Bug Fixes

**User Says:**
"Fix these three bugs in parallel: cart total calculation error, user profile image upload failure, and webhook timeout issue."

**Execution:**
1. **Analyze bugs:**
   - Cart total calculation (Laravel backend logic)
   - Image upload (Next.js frontend + storage)
   - Webhook timeout (NestJS microservice)

2. **Verify independence:**
   - ✅ Different subsystems
   - ✅ Different tech stacks
   - ✅ No shared state
   - ✅ Can be fixed independently

3. **Launch agents:**
   - `laravel-senior-engineer`: Debug cart calculation
   - `nextjs-senior-engineer`: Fix image upload
   - `nestjs-senior-engineer`: Resolve webhook timeout

4. **Aggregate fixes:**
   ```
   3 bugs resolved in parallel:
   - Cart calculation: Fixed rounding error in Tax service
   - Image upload: Added missing CORS headers and size validation
   - Webhook timeout: Increased timeout + added retry logic

   All fixes tested and verified independently.
   ```

### Example C: Build/Compilation Errors

**User Says:**
"I have TypeScript errors in multiple unrelated modules. Fix them in parallel."

**Error Context:**
- 15 type errors in Next.js dashboard components
- 8 type errors in NestJS user service
- 12 type errors in Express API middleware

**Execution:**
1. **Group by module/framework:**
   - Next.js errors (dashboard module)
   - NestJS errors (user service)
   - Express errors (API middleware)

2. **Spawn agents:**
   - `nextjs-senior-engineer` for Next.js type errors
   - `nestjs-senior-engineer` for NestJS type errors
   - `express-senior-engineer` for Express type errors

3. **Each agent:**
   - Analyzes type errors in their module
   - Fixes type definitions, imports, and interfaces
   - Verifies TypeScript compilation succeeds

4. **Result:**
   ```
   TypeScript compilation now clean:
   - Next.js dashboard: 15 type errors fixed (component props, hooks)
   - NestJS user service: 8 type errors fixed (DTO types, decorators)
   - Express middleware: 12 type errors fixed (request/response types)

   Full build successful.
   ```

### Example D: Performance Issue Investigation

**User Says:**
"Investigate these performance problems: slow product search (backend), laggy dashboard UI (frontend), and delayed webhook processing (microservice)."

**Execution:**
1. **Cluster by component:**
   - Product search performance (Laravel)
   - Dashboard UI lag (Next.js)
   - Webhook delay (NestJS)

2. **Parallel investigation:**
   - `laravel-senior-engineer`: Profile search queries, identify N+1 problems
   - `nextjs-senior-engineer`: Analyze render performance, identify re-render issues
   - `nestjs-senior-engineer`: Trace webhook processing, identify bottlenecks

3. **Each agent delivers:**
   - Performance analysis
   - Root cause identification
   - Optimization implementation
   - Before/after metrics

4. **Consolidated report:**
   ```
   Performance optimizations complete:
   - Product search: 3.2s → 180ms (eager loading, index added)
   - Dashboard UI: 850ms → 120ms render (memoization, virtual scrolling)
   - Webhook processing: 5s → 800ms (async processing, connection pooling)

   All improvements verified with benchmarks.
   ```

## Agent Type Reference

Quick reference for matching debugging tasks to agents:

| Agent Type | Best For Debugging | Key Error Patterns |
|------------|-------------------|-------------------|
| `laravel-senior-engineer` | PHPUnit failures, Eloquent errors, API bugs | Laravel exceptions, DB query errors, validation failures |
| `nextjs-senior-engineer` | Jest/Vitest failures, React errors, hydration issues | Component errors, RSC issues, build failures |
| `nestjs-senior-engineer` | e2e test failures, DI issues, microservice bugs | Nest exceptions, module errors, guard failures |
| `remix-senior-engineer` | Loader/action failures, form bugs, route errors | Remix errors, hydration mismatches, data loading issues |
| `express-senior-engineer` | Middleware failures, routing bugs, API errors | Express errors, middleware stack issues, request handling |
| `expo-react-native-senior-engineer` | Mobile crashes, navigation bugs, native module errors | React Native errors, Expo module issues, platform-specific bugs |
| `flutter-senior-engineer` | Widget errors, state issues, platform crashes | Flutter exceptions, widget tree errors, async errors |
| `magento-senior-engineer` | Module bugs, plugin errors, checkout issues | Magento exceptions, DI errors, observer failures |
| `general-purpose` | Cross-cutting issues, config errors, tooling problems | Build tool errors, linting issues, general debugging |

See `references/debug_patterns.md` for detailed error pattern matching and debugging strategies.
See `references/agent_matching_logic.md` for detailed matching rules and edge cases.

## Best Practices

### Effective Problem Decomposition

**Good Independent Problems:**
- "Laravel auth tests failing (session handling)" + "Next.js checkout tests failing (form validation)" + "NestJS payment tests failing (timeout)"
- Each in different subsystem, different root causes, can be fixed separately

**Poor Decomposition:**
- "All tests failing after dependency update" (likely single root cause - the dependency)
- "Database connection errors throughout the app" (single root cause - DB config/connection)
- "Everything broken after deploy" (need to understand what changed first)

### Root Cause Analysis Before Parallelization

Always do initial triage:
1. **Look for common patterns** - Do all errors mention the same dependency?
2. **Check timing** - Did all failures start at the same time?
3. **Examine stack traces** - Do they share common code paths?
4. **Review recent changes** - Is there a single commit/deploy that broke everything?

If yes to any of these → Single root cause, don't parallelize yet.

### Communication Pattern

Before launching parallel debugging:
```
I've identified 3 independent issues that can be debugged in parallel:

1. Laravel authentication tests (5 failures) - using laravel-senior-engineer
   Root cause appears to be: Session handling

2. Next.js product listing tests (3 failures) - using nextjs-senior-engineer
   Root cause appears to be: Mock data mismatch

3. NestJS payment service tests (2 failures) - using nestjs-senior-engineer
   Root cause appears to be: Async timing

Launching debugging agents now...
```

### Post-Fix Validation

After parallel fixes are complete:

1. **Run full test suite** - Not just the fixed tests
2. **Check for regressions** - Did fixing one thing break another?
3. **Integration testing** - Do all fixes work together?
4. **Code review** - Are fixes consistent with codebase patterns?

### Handling Partial Success

If some agents succeed and others get blocked:
```
Parallel debugging results (2/3 completed):

✅ Laravel auth tests: Fixed (5/5 passing)
✅ Next.js product tests: Fixed (3/3 passing)
⚠️  NestJS payment tests: Blocked - requires external payment gateway access

Next steps:
- 2 issues resolved and verified
- Payment test issue needs: [specific requirements]
- Recommend: [suggested approach]
```

### Conflict Resolution

If fixes overlap or conflict:
1. **Identify the conflict** - Same file, same function, contradictory changes
2. **Review both solutions** - Which approach is better?
3. **Merge intelligently** - Combine best aspects or choose one
4. **Re-test thoroughly** - Ensure merged fix resolves both issues
5. **Document the decision** - Why this approach was chosen

## Resources

### references/

- **debug_patterns.md** - Comprehensive error pattern recognition guide, debugging strategies for each framework, and root cause analysis techniques

This skill does not require scripts or assets - it orchestrates existing Claude Code agent debugging capabilities.
