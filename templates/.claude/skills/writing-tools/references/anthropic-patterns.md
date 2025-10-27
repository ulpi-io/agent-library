# Anthropic Best Practices for Skills

This document provides comprehensive Anthropic-official best practices for skill authoring, including progressive disclosure patterns, token efficiency techniques, workflow patterns, and technical guidance.

---

## Contents

- Core Principles (Conciseness, Degrees of Freedom, Model Testing)
- Progressive Disclosure Patterns
- Token Efficiency Techniques
- Workflow and Feedback Loop Patterns
- Content Guidelines
- Common Patterns (Templates, Examples, Conditional Workflows)
- Skills with Executable Code
- Technical Notes (YAML, Runtime Environment)
- Anti-Patterns to Avoid

---

## Core Principles

### Principle 1: Conciseness is Key

**The context window is a public good.** Your skill shares context with:
- System prompt
- Conversation history
- Other skills' metadata
- User's actual request

**Default assumption: Claude is already very smart**

Only add context Claude doesn't already have. Challenge each piece:
- "Does Claude really need this explanation?"
- "Can I assume Claude knows this?"
- "Does this paragraph justify its token cost?"

**Good example: Concise** (≈50 tokens):
```markdown
## Extract PDF text

Use pdfplumber for text extraction:

\`\`\`python
import pdfplumber

with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
\`\`\`
```

**Bad example: Too verbose** (≈150 tokens):
```markdown
## Extract PDF text

PDF (Portable Document Format) files are a common file format that contains
text, images, and other content. To extract text from a PDF, you'll need to
use a library. There are many libraries available for PDF processing, but we
recommend pdfplumber because it's easy to use and handles most cases well.
First, you'll need to install it using pip. Then you can use the code below...
```

The concise version assumes Claude knows what PDFs are and how libraries work.

### Principle 2: Set Appropriate Degrees of Freedom

Match the level of specificity to the task's fragility and variability.

**High freedom** (text-based instructions):

Use when:
- Multiple approaches are valid
- Decisions depend on context
- Heuristics guide the approach

Example:
```markdown
## Code review process

1. Analyze the code structure and organization
2. Check for potential bugs or edge cases
3. Suggest improvements for readability and maintainability
4. Verify adherence to project conventions
```

**Medium freedom** (pseudocode or scripts with parameters):

Use when:
- A preferred pattern exists
- Some variation is acceptable
- Configuration affects behavior

Example:
```markdown
## Generate report

Use this template and customize as needed:

\`\`\`python
def generate_report(data, format="markdown", include_charts=True):
    # Process data
    # Generate output in specified format
    # Optionally include visualizations
\`\`\`
```

**Low freedom** (specific scripts, few or no parameters):

Use when:
- Operations are fragile and error-prone
- Consistency is critical
- A specific sequence must be followed

Example:
```markdown
## Database migration

Run exactly this script:

\`\`\`bash
python scripts/migrate.py --verify --backup
\`\`\`

Do not modify the command or add additional flags.
```

**Analogy:** Think of Claude as a robot exploring a path:
- **Narrow bridge with cliffs**: Only one safe way forward. Provide specific guardrails and exact instructions (low freedom). Example: database migrations.
- **Open field with no hazards**: Many paths lead to success. Give general direction and trust Claude to find the best route (high freedom). Example: code reviews.

### Principle 3: Test with All Models You Plan to Use

Skills act as additions to models, so effectiveness depends on the underlying model.

**Testing considerations by model:**
- **Claude Haiku** (fast, economical): Does the skill provide enough guidance?
- **Claude Sonnet** (balanced): Is the skill clear and efficient?
- **Claude Opus** (powerful reasoning): Does the skill avoid over-explaining?

What works perfectly for Opus might need more detail for Haiku. If you plan to use your skill across multiple models, aim for instructions that work well with all of them.

---

## Progressive Disclosure Patterns

**Core concept:** SKILL.md is an overview that points to detailed materials as needed, like a table of contents in an onboarding guide.

**Practical guidance:**
- Keep SKILL.md body under 500 lines for optimal performance
- Split content into separate files when approaching this limit
- Use the patterns below to organize instructions, code, and resources effectively

### Visual Overview: From Simple to Complex

**Basic skill:** Just SKILL.md with metadata and instructions

```
skill-name/
└── SKILL.md
```

**As skill grows:** Bundle additional content that Claude loads only when needed

```
skill-name/
├── SKILL.md              # Main instructions (loaded when triggered)
├── advanced.md           # Advanced features (loaded as needed)
├── reference.md          # API reference (loaded as needed)
├── examples.md           # Usage examples (loaded as needed)
└── scripts/
    ├── analyze.py        # Utility script (executed, not loaded)
    ├── validate.py       # Validation script
    └── process.py        # Processing script
```

### Pattern 1: High-Level Guide with References

```markdown
---
name: PDF Processing
description: Extracts text and tables from PDF files, fills forms, and merges documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
---

# PDF Processing

## Quick start

Extract text with pdfplumber:
\`\`\`python
import pdfplumber
with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
\`\`\`

## Advanced features

**Form filling**: See [FORMS.md](FORMS.md) for complete guide
**API reference**: See [REFERENCE.md](REFERENCE.md) for all methods
**Examples**: See [EXAMPLES.md](EXAMPLES.md) for common patterns
```

Claude loads FORMS.md, REFERENCE.md, or EXAMPLES.md only when needed.

### Pattern 2: Domain-Specific Organization

For skills with multiple domains, organize content by domain to avoid loading irrelevant context. When a user asks about sales metrics, Claude only needs to read sales-related schemas, not finance or marketing data.

```
bigquery-skill/
├── SKILL.md (overview and navigation)
└── reference/
    ├── finance.md (revenue, billing metrics)
    ├── sales.md (opportunities, pipeline)
    ├── product.md (API usage, features)
    └── marketing.md (campaigns, attribution)
```

```markdown
# BigQuery Data Analysis

## Available datasets

**Finance**: Revenue, ARR, billing → See [reference/finance.md](reference/finance.md)
**Sales**: Opportunities, pipeline, accounts → See [reference/sales.md](reference/sales.md)
**Product**: API usage, features, adoption → See [reference/product.md](reference/product.md)
**Marketing**: Campaigns, attribution, email → See [reference/marketing.md](reference/marketing.md)

## Quick search

Find specific metrics using grep:

\`\`\`bash
grep -i "revenue" reference/finance.md
grep -i "pipeline" reference/sales.md
grep -i "api usage" reference/product.md
\`\`\`
```

### Pattern 3: Conditional Details

Show basic content, link to advanced content:

```markdown
# DOCX Processing

## Creating documents

Use docx-js for new documents. See [DOCX-JS.md](DOCX-JS.md).

## Editing documents

For simple edits, modify the XML directly.

**For tracked changes**: See [REDLINING.md](REDLINING.md)
**For OOXML details**: See [OOXML.md](OOXML.md)
```

Claude reads REDLINING.md or OOXML.md only when the user needs those features.

### Important: Avoid Deeply Nested References

**Keep references one level deep from SKILL.md.** All reference files should link directly from SKILL.md to ensure Claude reads complete files when needed.

**Bad example: Too deep**:
```markdown
# SKILL.md
See [advanced.md](advanced.md)...

# advanced.md
See [details.md](details.md)...

# details.md
Here's the actual information...
```

**Good example: One level deep**:
```markdown
# SKILL.md

**Basic usage**: [instructions in SKILL.md]
**Advanced features**: See [advanced.md](advanced.md)
**API reference**: See [reference.md](reference.md)
**Examples**: See [examples.md](examples.md)
```

### Structure Longer Reference Files with Table of Contents

For reference files longer than 100 lines, include a table of contents at the top. This ensures Claude can see the full scope of available information even when previewing with partial reads.

**Example:**
```markdown
# API Reference

## Contents
- Authentication and setup
- Core methods (create, read, update, delete)
- Advanced features (batch operations, webhooks)
- Error handling patterns
- Code examples

## Authentication and setup
...

## Core methods
...
```

---

## Token Efficiency Techniques

**Problem:** Skills load into EVERY conversation where they're relevant. Every token counts.

**Target word counts:**
- Frequently-loaded skills: <200 words total
- Other skills: <500 words (still be concise)
- SKILL.md body: <500 lines

**Techniques:**

### 1. Move Details to Tool Help

```bash
# ❌ BAD: Document all flags in SKILL.md
search-conversations supports --text, --both, --after DATE, --before DATE, --limit N

# ✅ GOOD: Reference --help
search-conversations supports multiple modes and filters. Run --help for details.
```

### 2. Use Cross-References

```markdown
# ❌ BAD: Repeat workflow details
When searching, dispatch subagent with template...
[20 lines of repeated instructions]

# ✅ GOOD: Reference other skill
Always use subagents (50-100x context savings). REQUIRED: Use [other-skill-name] for workflow.
```

### 3. Compress Examples

```markdown
# ❌ BAD: Verbose example (42 words)
your human partner: "How did we handle authentication errors in React Router before?"
You: I'll search past conversations for React Router authentication patterns.
[Dispatch subagent with search query: "React Router authentication error handling 401"]

# ✅ GOOD: Minimal example (20 words)
Partner: "How did we handle auth errors in React Router?"
You: Searching...
[Dispatch subagent → synthesis]
```

### 4. Eliminate Redundancy

- Don't repeat what's in cross-referenced skills
- Don't explain what's obvious from command
- Don't include multiple examples of same pattern

### 5. Verification

```bash
wc -w .claude/skills/skill-name/SKILL.md
# Frequently-loaded: aim for <200 words
# Other skills: aim for <500 words
```

---

## Workflow and Feedback Loop Patterns

### Use Workflows for Complex Tasks

Break complex operations into clear, sequential steps. For particularly complex workflows, provide a checklist that Claude can copy into its response and check off as it progresses.

**Example 1: Research synthesis workflow** (for skills without code):

```markdown
## Research synthesis workflow

Copy this checklist and track your progress:

\`\`\`
Research Progress:
- [ ] Step 1: Read all source documents
- [ ] Step 2: Identify key themes
- [ ] Step 3: Cross-reference claims
- [ ] Step 4: Create structured summary
- [ ] Step 5: Verify citations
\`\`\`

**Step 1: Read all source documents**

Review each document in the `sources/` directory. Note the main arguments and supporting evidence.

**Step 2: Identify key themes**

Look for patterns across sources. What themes appear repeatedly? Where do sources agree or disagree?

**Step 3: Cross-reference claims**

For each major claim, verify it appears in the source material. Note which source supports each point.

**Step 4: Create structured summary**

Organize findings by theme. Include:
- Main claim
- Supporting evidence from sources
- Conflicting viewpoints (if any)

**Step 5: Verify citations**

Check that every claim references the correct source document. If citations are incomplete, return to Step 3.
```

**Example 2: PDF form filling workflow** (for skills with code):

```markdown
## PDF form filling workflow

Copy this checklist and check off items as you complete them:

\`\`\`
Task Progress:
- [ ] Step 1: Analyze the form (run analyze_form.py)
- [ ] Step 2: Create field mapping (edit fields.json)
- [ ] Step 3: Validate mapping (run validate_fields.py)
- [ ] Step 4: Fill the form (run fill_form.py)
- [ ] Step 5: Verify output (run verify_output.py)
\`\`\`

**Step 1: Analyze the form**

Run: `python scripts/analyze_form.py input.pdf`

This extracts form fields and their locations, saving to `fields.json`.

**Step 2: Create field mapping**

Edit `fields.json` to add values for each field.

**Step 3: Validate mapping**

Run: `python scripts/validate_fields.py fields.json`

Fix any validation errors before continuing.

**Step 4: Fill the form**

Run: `python scripts/fill_form.py input.pdf fields.json output.pdf`

**Step 5: Verify output**

Run: `python scripts/verify_output.py output.pdf`

If verification fails, return to Step 2.
```

Clear steps prevent Claude from skipping critical validation. The checklist helps both Claude and you track progress through multi-step workflows.

### Implement Feedback Loops

**Common pattern**: Run validator → fix errors → repeat

This pattern greatly improves output quality.

**Example 1: Style guide compliance** (for skills without code):

```markdown
## Content review process

1. Draft your content following the guidelines in STYLE_GUIDE.md
2. Review against the checklist:
   - Check terminology consistency
   - Verify examples follow the standard format
   - Confirm all required sections are present
3. If issues found:
   - Note each issue with specific section reference
   - Revise the content
   - Review the checklist again
4. Only proceed when all requirements are met
5. Finalize and save the document
```

**Example 2: Document editing process** (for skills with code):

```markdown
## Document editing process

1. Make your edits to `word/document.xml`
2. **Validate immediately**: `python ooxml/scripts/validate.py unpacked_dir/`
3. If validation fails:
   - Review the error message carefully
   - Fix the issues in the XML
   - Run validation again
4. **Only proceed when validation passes**
5. Rebuild: `python ooxml/scripts/pack.py unpacked_dir/ output.docx`
6. Test the output document
```

The validation loop catches errors early.

---

## Content Guidelines

### Avoid Time-Sensitive Information

Don't include information that will become outdated:

**Bad example: Time-sensitive** (will become wrong):
```markdown
If you're doing this before August 2025, use the old API.
After August 2025, use the new API.
```

**Good example** (use "old patterns" section):
```markdown
## Current method

Use the v2 API endpoint: `api.example.com/v2/messages`

## Old patterns

<details>
<summary>Legacy v1 API (deprecated 2025-08)</summary>

The v1 API used: `api.example.com/v1/messages`

This endpoint is no longer supported.
</details>
```

### Use Consistent Terminology

Choose one term and use it throughout the skill:

**Good - Consistent:**
- Always "API endpoint"
- Always "field"
- Always "extract"

**Bad - Inconsistent:**
- Mix "API endpoint", "URL", "API route", "path"
- Mix "field", "box", "element", "control"
- Mix "extract", "pull", "get", "retrieve"

Consistency helps Claude understand and follow instructions.

---

## Common Patterns

### Template Pattern

Provide templates for output format. Match the level of strictness to your needs.

**For strict requirements** (like API responses or data formats):

```markdown
## Report structure

ALWAYS use this exact template structure:

\`\`\`markdown
# [Analysis Title]

## Executive summary
[One-paragraph overview of key findings]

## Key findings
- Finding 1 with supporting data
- Finding 2 with supporting data
- Finding 3 with supporting data

## Recommendations
1. Specific actionable recommendation
2. Specific actionable recommendation
\`\`\`
```

**For flexible guidance** (when adaptation is useful):

```markdown
## Report structure

Here is a sensible default format, but use your best judgment based on the analysis:

\`\`\`markdown
# [Analysis Title]

## Executive summary
[Overview]

## Key findings
[Adapt sections based on what you discover]

## Recommendations
[Tailor to the specific context]
\`\`\`

Adjust sections as needed for the specific analysis type.
```

### Examples Pattern

For skills where output quality depends on seeing examples, provide input/output pairs just like in regular prompting:

```markdown
## Commit message format

Generate commit messages following these examples:

**Example 1:**
Input: Added user authentication with JWT tokens
Output:
\`\`\`
feat(auth): implement JWT-based authentication

Add login endpoint and token validation middleware
\`\`\`

**Example 2:**
Input: Fixed bug where dates displayed incorrectly in reports
Output:
\`\`\`
fix(reports): correct date formatting in timezone conversion

Use UTC timestamps consistently across report generation
\`\`\`

**Example 3:**
Input: Updated dependencies and refactored error handling
Output:
\`\`\`
chore: update dependencies and refactor error handling

- Upgrade lodash to 4.17.21
- Standardize error response format across endpoints
\`\`\`

Follow this style: type(scope): brief description, then detailed explanation.
```

Examples help Claude understand the desired style and level of detail more clearly than descriptions alone.

### Conditional Workflow Pattern

Guide Claude through decision points:

```markdown
## Document modification workflow

1. Determine the modification type:

   **Creating new content?** → Follow "Creation workflow" below
   **Editing existing content?** → Follow "Editing workflow" below

2. Creation workflow:
   - Use docx-js library
   - Build document from scratch
   - Export to .docx format

3. Editing workflow:
   - Unpack existing document
   - Modify XML directly
   - Validate after each change
   - Repack when complete
```

**Tip:** If workflows become large or complicated with many steps, consider pushing them into separate files and tell Claude to read the appropriate file based on the task at hand.

---

## Skills with Executable Code

### Solve, Don't Punt

When writing scripts for skills, handle error conditions rather than punting to Claude.

**Good example: Handle errors explicitly**:

```python
def process_file(path):
    """Process a file, creating it if it doesn't exist."""
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError:
        # Create file with default content instead of failing
        print(f"File {path} not found, creating default")
        with open(path, 'w') as f:
            f.write('')
        return ''
    except PermissionError:
        # Provide alternative instead of failing
        print(f"Cannot access {path}, using default")
        return ''
```

**Bad example: Punt to Claude**:

```python
def process_file(path):
    # Just fail and let Claude figure it out
    return open(path).read()
```

Configuration parameters should also be justified and documented to avoid "voodoo constants":

**Good example: Self-documenting**:

```python
# HTTP requests typically complete within 30 seconds
# Longer timeout accounts for slow connections
REQUEST_TIMEOUT = 30

# Three retries balances reliability vs speed
# Most intermittent failures resolve by the second retry
MAX_RETRIES = 3
```

**Bad example: Magic numbers**:

```python
TIMEOUT = 47  # Why 47?
RETRIES = 5   # Why 5?
```

### Provide Utility Scripts

Even if Claude could write a script, pre-made scripts offer advantages:

**Benefits of utility scripts:**
- More reliable than generated code
- Save tokens (no need to include code in context)
- Save time (no code generation required)
- Ensure consistency across uses

**Important distinction**: Make clear in your instructions whether Claude should:
- **Execute the script** (most common): "Run `analyze_form.py` to extract fields"
- **Read it as reference** (for complex logic): "See `analyze_form.py` for the field extraction algorithm"

For most utility scripts, execution is preferred because it's more reliable and efficient.

**Example:**

```markdown
## Utility scripts

**analyze_form.py**: Extract all form fields from PDF

\`\`\`bash
python scripts/analyze_form.py input.pdf > fields.json
\`\`\`

Output format:
\`\`\`json
{
  "field_name": {"type": "text", "x": 100, "y": 200},
  "signature": {"type": "sig", "x": 150, "y": 500}
}
\`\`\`

**validate_boxes.py**: Check for overlapping bounding boxes

\`\`\`bash
python scripts/validate_boxes.py fields.json
# Returns: "OK" or lists conflicts
\`\`\`

**fill_form.py**: Apply field values to PDF

\`\`\`bash
python scripts/fill_form.py input.pdf fields.json output.pdf
\`\`\`
```

### Use Visual Analysis

When inputs can be rendered as images, have Claude analyze them:

```markdown
## Form layout analysis

1. Convert PDF to images:
   \`\`\`bash
   python scripts/pdf_to_images.py form.pdf
   \`\`\`

2. Analyze each page image to identify form fields
3. Claude can see field locations and types visually
```

Claude's vision capabilities help understand layouts and structures.

### Create Verifiable Intermediate Outputs

When Claude performs complex, open-ended tasks, it can make mistakes. The "plan-validate-execute" pattern catches errors early by having Claude first create a plan in a structured format, then validate that plan with a script before executing it.

**Example:** Imagine asking Claude to update 50 form fields in a PDF based on a spreadsheet. Without validation, Claude might reference non-existent fields, create conflicting values, miss required fields, or apply updates incorrectly.

**Solution:** Use the workflow pattern with an intermediate `changes.json` file that gets validated before applying changes. The workflow becomes: analyze → **create plan file** → **validate plan** → execute → verify.

**Why this pattern works:**
- **Catches errors early**: Validation finds problems before changes are applied
- **Machine-verifiable**: Scripts provide objective verification
- **Reversible planning**: Claude can iterate on the plan without touching originals
- **Clear debugging**: Error messages point to specific problems

**When to use**: Batch operations, destructive changes, complex validation rules, high-stakes operations.

**Implementation tip**: Make validation scripts verbose with specific error messages like "Field 'signature_date' not found. Available fields: customer_name, order_total, signature_date_signed" to help Claude fix issues.

### Package Dependencies

Skills run in the code execution environment with platform-specific limitations:

- **claude.ai**: Can install packages from npm and PyPI and pull from GitHub repositories
- **Anthropic API**: Has no network access and no runtime package installation

List required packages in your SKILL.md and verify they're available in the code execution tool documentation.

---

## Technical Notes

### YAML Frontmatter Requirements

The SKILL.md frontmatter includes only `name` (64 characters max) and `description` (1024 characters max) fields.

**Format:**
```yaml
---
name: skill-name-with-hyphens
description: Use when [triggering conditions] - [what it does and how it helps, third person]
---
```

**Name conventions:**
- Use only letters, numbers, and hyphens
- No parentheses or special characters
- Max 64 characters

**Description best practices:**
- Start with "Use when..." to focus on triggering conditions
- Include specific symptoms, situations, and contexts
- Write in third person (injected into system prompt)
- Max 1024 characters for entire frontmatter
- Include both what it does AND when to use it

### Token Budgets

Keep SKILL.md body under 500 lines for optimal performance. If your content exceeds this, split it into separate files using the progressive disclosure patterns.

### Runtime Environment

Skills run in a code execution environment with filesystem access, bash commands, and code execution capabilities.

**How this affects authoring:**

**How Claude accesses skills:**
1. **Metadata pre-loaded**: At startup, name and description from all skills' YAML frontmatter are loaded into system prompt
2. **Files read on-demand**: Claude uses bash Read tools to access SKILL.md and other files from filesystem when needed
3. **Scripts executed efficiently**: Utility scripts can be executed via bash without loading their full contents into context. Only the script's output consumes tokens
4. **No context penalty for large files**: Reference files, data, or documentation don't consume context tokens until actually read

**Authoring implications:**
- **File paths matter**: Claude navigates your skill directory like a filesystem. Use forward slashes (`reference/guide.md`), not backslashes
- **Name files descriptively**: Use names that indicate content: `form_validation_rules.md`, not `doc2.md`
- **Organize for discovery**: Structure directories by domain or feature
  - Good: `reference/finance.md`, `reference/sales.md`
  - Bad: `docs/file1.md`, `docs/file2.md`
- **Bundle comprehensive resources**: Include complete API docs, extensive examples, large datasets; no context penalty until accessed
- **Prefer scripts for deterministic operations**: Write `validate_form.py` rather than asking Claude to generate validation code
- **Make execution intent clear**:
  - "Run `analyze_form.py` to extract fields" (execute)
  - "See `analyze_form.py` for the extraction algorithm" (read as reference)
- **Test file access patterns**: Verify Claude can navigate your directory structure by testing with real requests

**Example:**

```
bigquery-skill/
├── SKILL.md (overview, points to reference files)
└── reference/
    ├── finance.md (revenue metrics)
    ├── sales.md (pipeline data)
    └── product.md (usage analytics)
```

When the user asks about revenue, Claude reads SKILL.md, sees the reference to `reference/finance.md`, and invokes bash to read just that file. The sales.md and product.md files remain on the filesystem, consuming zero context tokens until needed.

### MCP Tool References

If your skill uses MCP (Model Context Protocol) tools, always use fully qualified tool names to avoid "tool not found" errors.

**Format**: `ServerName:tool_name`

**Example:**
```markdown
Use the BigQuery:bigquery_schema tool to retrieve table schemas.
Use the GitHub:create_issue tool to create issues.
```

Where:
- `BigQuery` and `GitHub` are MCP server names
- `bigquery_schema` and `create_issue` are the tool names within those servers

Without the server prefix, Claude may fail to locate the tool, especially when multiple MCP servers are available.

---

## Anti-Patterns to Avoid

### ❌ Windows-Style Paths

Always use forward slashes in file paths, even on Windows:

- ✓ **Good**: `scripts/helper.py`, `reference/guide.md`
- ✗ **Avoid**: `scripts\helper.py`, `reference\guide.md`

Unix-style paths work across all platforms, while Windows-style paths cause errors on Unix systems.

### ❌ Offering Too Many Options

Don't present multiple approaches unless necessary:

**Bad example: Too many choices** (confusing):
"You can use pypdf, or pdfplumber, or PyMuPDF, or pdf2image, or..."

**Good example: Provide a default** (with escape hatch):
"Use pdfplumber for text extraction:
```python
import pdfplumber
```

For scanned PDFs requiring OCR, use pdf2image with pytesseract instead."

### ❌ Deeply Nested References

Claude may partially read files when they're referenced from other referenced files.

**Keep references one level deep from SKILL.md.**

**Bad:** SKILL.md → advanced.md → details.md → actual info

**Good:** SKILL.md → advanced.md (complete info), reference.md (complete info), examples.md (complete info)

### ❌ Time-Sensitive Information

**Bad:** "If you're doing this before August 2025..."

**Good:** Use "old patterns" section with collapsible details

### ❌ Assuming Tools are Installed

**Bad:** "Use the pdf library to process the file."

**Good:** "Install required package: `pip install pypdf`

Then use it:
```python
from pypdf import PdfReader
reader = PdfReader("file.pdf")
```"

---

## Evaluation-Driven Development

**Create evaluations BEFORE writing extensive documentation.** This ensures your skill solves real problems rather than documenting imagined ones.

**Evaluation-driven development:**

1. **Identify gaps**: Run Claude on representative tasks without a skill. Document specific failures or missing context
2. **Create evaluations**: Build three scenarios that test these gaps
3. **Establish baseline**: Measure Claude's performance without the skill
4. **Write minimal instructions**: Create just enough content to address the gaps and pass evaluations
5. **Iterate**: Execute evaluations, compare against baseline, and refine

This approach ensures you're solving actual problems rather than anticipating requirements that may never materialize.

**Evaluation structure:**

```json
{
  "skills": ["pdf-processing"],
  "query": "Extract all text from this PDF file and save it to output.txt",
  "files": ["test-files/document.pdf"],
  "expected_behavior": [
    "Successfully reads the PDF file using an appropriate PDF processing library or command-line tool",
    "Extracts text content from all pages in the document without missing any pages",
    "Saves the extracted text to a file named output.txt in a clear, readable format"
  ]
}
```

Evaluations are your source of truth for measuring skill effectiveness.

---

## Iterative Development with Claude

The most effective skill development process involves Claude itself. Work with one instance of Claude ("Claude A") to create a skill that will be used by other instances ("Claude B").

**Creating a new skill:**

1. **Complete a task without a skill**: Work through a problem with Claude A using normal prompting. Notice what information you repeatedly provide.

2. **Identify the reusable pattern**: After completing the task, identify what context you provided that would be useful for similar future tasks.

3. **Ask Claude A to create a skill**: "Create a skill that captures this pattern we just used."

   **Tip:** Claude models understand the skill format natively. You don't need special system prompts to get Claude to help create skills.

4. **Review for conciseness**: Check that Claude A hasn't added unnecessary explanations. Ask: "Remove the explanation about what X means - Claude already knows that."

5. **Improve information architecture**: Ask Claude A to organize the content more effectively. For example: "Organize this so the table schema is in a separate reference file."

6. **Test on similar tasks**: Use the skill with Claude B (a fresh instance with the skill loaded) on related use cases.

7. **Iterate based on observation**: If Claude B struggles, return to Claude A with specifics: "When Claude used this skill, it forgot to X. Should we add a section about X?"

**Iterating on existing skills:**

1. **Use the skill in real workflows**: Give Claude B (with the skill loaded) actual tasks
2. **Observe Claude B's behavior**: Note where it struggles, succeeds, or makes unexpected choices
3. **Return to Claude A for improvements**: Share the current SKILL.md and describe what you observed
4. **Review Claude A's suggestions**: Claude A might suggest reorganizing, using stronger language, or restructuring
5. **Apply and test changes**: Update the skill with Claude A's refinements, then test again with Claude B
6. **Repeat based on usage**: Continue this observe-refine-test cycle

**Why this approach works**: Claude A understands agent needs, you provide domain expertise, Claude B reveals gaps through real usage, and iterative refinement improves skills based on observed behavior.

---

## Summary

**Anthropic best practices for skills:**

1. **Conciseness is key** - Context window is a public good, assume Claude is smart
2. **Match degrees of freedom** - High/Medium/Low based on task fragility
3. **Test across models** - Haiku, Sonnet, Opus have different needs
4. **Progressive disclosure** - SKILL.md < 500 lines, split larger content
5. **Keep references one level deep** - Don't nest references within references
6. **Token efficiency** - Compress examples, cross-reference, eliminate redundancy
7. **Use workflows and checklists** - Guide Claude through complex processes
8. **Implement feedback loops** - Validate → fix → repeat patterns
9. **Avoid time-sensitive info** - Use "old patterns" sections instead
10. **Consistent terminology** - Choose one term, use throughout
11. **Provide templates and examples** - Show patterns clearly
12. **Solve, don't punt** - Scripts should handle errors, not fail to Claude
13. **Create verifiable outputs** - Plan-validate-execute for complex tasks
14. **Evaluation-driven** - Build evaluations before extensive documentation
15. **Iterate with Claude** - Use Claude A to create, Claude B to test

Use these patterns to create effective, efficient skills that Claude can discover and use successfully.
