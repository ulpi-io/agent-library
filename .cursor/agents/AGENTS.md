# Project Instructions

Global instructions for AI agents working across all frameworks and technologies in this project.

---

## Code Style

- **Use clear, descriptive variable and function names** - Avoid abbreviations unless widely understood
- **Write self-documenting code** - Code should explain itself; comments should explain why, not what
- **Follow language-specific conventions** - PSR-12 for PHP, Airbnb/Standard for JavaScript, PEP 8 for Python
- **Prefer explicit over implicit** - Make intentions clear in code
- **Keep functions small and focused** - Single responsibility principle
- **Use consistent formatting** - Run formatters (Prettier, Pint, Black) before committing

---

## Architecture

- **Follow separation of concerns** - Business logic, presentation, and data access should be separate
- **Use dependency injection** - Avoid hard-coded dependencies and global state
- **Prefer composition over inheritance** - Build flexible, reusable components
- **Implement proper error handling** - Don't suppress errors; handle them appropriately
- **Keep configuration separate from code** - Use environment variables and config files
- **Design for testability** - Write code that's easy to test in isolation

---

## Testing

- **Write tests for all critical functionality** - Prioritize business logic, APIs, and data mutations
- **Follow the testing pyramid** - More unit tests, fewer integration tests, minimal E2E tests
- **Use descriptive test names** - Test names should describe what's being tested and expected behavior
- **Test behavior, not implementation** - Tests should verify outcomes, not internal details
- **Keep tests independent** - Tests should not depend on each other or run order
- **Use factories and fixtures** - For consistent, maintainable test data

---

## Security

- **Never commit secrets** - API keys, passwords, tokens go in environment variables only
- **Validate all user input** - Trust nothing from external sources
- **Use parameterized queries** - Prevent SQL injection
- **Implement proper authentication and authorization** - Verify identity and permissions
- **Keep dependencies updated** - Regularly update to patch security vulnerabilities
- **Follow principle of least privilege** - Grant minimum permissions necessary

---

## Performance

- **Profile before optimizing** - Measure to identify actual bottlenecks
- **Implement caching strategically** - Cache expensive operations with proper invalidation
- **Optimize database queries** - Use indexes, eager loading, avoid N+1 queries
- **Handle async operations properly** - Use queues/background jobs for long-running tasks
- **Monitor production performance** - Track metrics, logs, and errors

---

## Documentation

- **Document complex logic and architectural decisions** - Explain the "why" behind non-obvious code
- **Keep documentation close to code** - In-code comments, docstrings, or adjacent markdown files
- **Update documentation when code changes** - Stale docs are worse than no docs
- **Write clear commit messages** - Explain what changed and why
- **Document APIs** - Clear endpoint documentation with examples

---

## Git & Version Control

- **Write meaningful commit messages** - Clear, concise description of changes
- **Keep commits atomic** - One logical change per commit
- **Use feature branches** - Keep main/master stable
- **Review code before merging** - All changes should be reviewed
- **Don't commit generated files** - Build artifacts, logs, dependencies stay out of version control

---

## General Principles

- **Prioritize code readability** - Code is read far more than it's written
- **Fail fast and loudly** - Make errors obvious and easy to debug
- **Don't repeat yourself (DRY)** - Extract common patterns into reusable components
- **YAGNI (You Aren't Gonna Need It)** - Don't build features before they're needed
- **Keep it simple** - Simplest solution that works is usually the best
- **Think about the next developer** - Write code you'd want to inherit

---

## Framework-Specific Instructions

For framework-specific guidance, see the nested AGENTS.md files:

- **Laravel**: `.cursor/agents/laravel/AGENTS.md` - Laravel 12.x development, queues, Horizon, multi-database
- **Express**: `.cursor/agents/express/AGENTS.md` - Express.js with REST API and middleware patterns
- **NestJS**: `.cursor/agents/nestjs/AGENTS.md` - NestJS TypeScript enterprise framework, Bull/BullMQ queues
- **Next.js**: `.cursor/agents/nextjs/AGENTS.md` - Next.js 14/15 with App Router, Server Components, Server Actions
- **Expo React Native**: `.cursor/agents/expo-react-native/AGENTS.md` - Cross-platform mobile with Expo
- **Flutter**: `.cursor/agents/flutter/AGENTS.md` - Cross-platform with Dart and Flutter SDK
- **Magento**: `.cursor/agents/magento/AGENTS.md` - Magento 2 e-commerce development

These framework-specific files extend and override these global instructions with specialized patterns and practices.
