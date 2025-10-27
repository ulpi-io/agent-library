# Team Conventions

Team-specific development standards and conventions. Customize for your team's workflow.

## Git Workflow

- **Branching Strategy**: Git Flow
  - `main` - Production-ready code
  - `develop` - Integration branch for features
  - `feature/*` - New features (e.g., `feature/user-authentication`)
  - `bugfix/*` - Bug fixes (e.g., `bugfix/login-validation`)
  - `hotfix/*` - Critical production fixes (e.g., `hotfix/payment-error`)
  - `release/*` - Release preparation (e.g., `release/v1.2.0`)

- **Commit Messages**: Use Conventional Commits format
  - `feat:` - New features
  - `fix:` - Bug fixes
  - `docs:` - Documentation changes
  - `refactor:` - Code refactoring
  - `test:` - Adding or updating tests
  - `chore:` - Maintenance tasks
  - Example: `feat: add user profile export functionality`

- **Pull Requests**:
  - Require 2 approvals before merge
  - Must pass all CI/CD checks
  - Squash and merge into target branch
  - Delete branch after merge

- **Release Process**:
  - Tag releases with semantic versioning: `v1.2.3`
  - Update CHANGELOG.md with release notes
  - Deploy via automated pipeline after tag push

## Code Review Guidelines

- **Required Reviews**: 2 team members must approve
- **Review Checklist**:
  - Code follows PSR-12 standards (verified by Pint)
  - Tests included for new features
  - No N+1 queries (check with Telescope)
  - Security considerations addressed
  - Documentation updated if needed
  - No commented-out code committed
  - Environment variables documented in `.env.example`

- **Review SLA**: Reviews completed within 24 hours
- **Blocking Issues**: Security vulnerabilities, failing tests, missing documentation
- **Auto-merge**: Small fixes (<50 lines) can auto-merge with 1 approval

## Testing Standards

- **Coverage Requirements**:
  - Services: Minimum 80% code coverage
  - Controllers: All endpoints must have feature tests
  - Jobs: All queue jobs must have unit tests
  - Critical paths (payments, auth): Minimum 95% coverage

- **Test Organization**:
  - Feature tests in `tests/Feature/`
  - Unit tests in `tests/Unit/`
  - Use descriptive test names: `test_user_can_update_profile()`
  - Group related tests in test classes

- **Test Data**:
  - Use factories for test data, not database seeders
  - Use `RefreshDatabase` trait for test isolation
  - Mock external API calls (Stripe, SendGrid, etc.)
  - Use `Queue::fake()`, `Mail::fake()` for async operations

- **Test Execution**:
  - Run tests before every commit: `php artisan test`
  - Run parallel tests in CI: `php artisan test --parallel`
  - Generate coverage reports weekly

## Database Conventions

- **Migrations**:
  - All foreign keys must have indexes
  - Use descriptive migration names: `create_user_profiles_table`
  - Always include `down()` method for rollbacks
  - Migrations are immutable after deployment to production

- **Table Design**:
  - Use UUIDs for public-facing IDs: `$table->uuid('public_id')`
  - Internal IDs remain auto-incrementing integers
  - All tables must have `created_at` and `updated_at` timestamps
  - Use `soft_deletes()` for user-generated content

- **Indexes**:
  - Index all foreign keys
  - Index frequently queried columns
  - Add composite indexes for common query patterns
  - Document index rationale in migration comments

- **Data Integrity**:
  - Use foreign key constraints with `cascadeOnDelete()` or `restrictOnDelete()`
  - Validate data in both FormRequests and database constraints
  - No nullable columns without explicit reason

## Naming Conventions (Overrides)

- **Jobs**: Use `Process` prefix for actions
  - `ProcessPayment`, `ProcessVideoUpload`, `ProcessOrderShipment`

- **Events**: Use past tense
  - `UserRegistered`, `OrderWasShipped`, `PaymentCompleted`

- **Listeners**: Use `Handle` prefix
  - `HandleUserRegistered`, `HandleOrderWasShipped`

- **Middleware**: Use descriptive names
  - `EnsureUserIsAdmin`, `EnsureSubscriptionActive`, `LogApiRequests`

- **Form Requests**: Use action + model format
  - `StoreUserRequest`, `UpdatePostRequest`, `DeleteCommentRequest`

- **Services**: Use model + `Service` suffix
  - `UserService`, `PaymentService`, `NotificationService`

- **Repositories**: Use model + `Repository` suffix
  - `UserRepository`, `PostRepository`, `OrderRepository`

## API Conventions

- **Response Format**: Always use API Resources
  - Success: `{ "data": {...}, "meta": {...} }`
  - Error: `{ "message": "...", "errors": {...} }`

- **Status Codes**: Use appropriate HTTP codes
  - 200: Success (GET, PUT, PATCH)
  - 201: Created (POST)
  - 204: No Content (DELETE)
  - 400: Bad Request
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not Found
  - 422: Validation Error
  - 500: Server Error

- **Pagination**: Use cursor pagination for large datasets
  - Format: `?cursor=eyJpZCI6MTAwfQ&limit=20`
  - Include `next_cursor` and `prev_cursor` in response

- **Filtering**: Use query parameters
  - Single filter: `?status=active`
  - Multiple filters: `?status=active&role=admin`
  - Sorting: `?sort=-created_at` (- for descending)

## Documentation Standards

- **PHPDoc Blocks**:
  - All public methods must have PHPDoc
  - Explain WHY, not WHAT (code should be self-documenting)
  - Document parameters, return types, and exceptions

- **Architecture Decisions**:
  - Document significant decisions in ADR format
  - Store in `docs/architecture/` directory
  - Include context, decision, and consequences

- **API Documentation**:
  - Maintain OpenAPI spec in `docs/openapi.yaml`
  - Generate API docs from OpenAPI spec
  - Update with every API change

- **README Updates**:
  - Keep setup instructions current
  - Document all environment variables
  - Include deployment procedures

## Security Standards

- **Environment Variables**:
  - Never commit `.env` files
  - Always update `.env.example` with new variables
  - Document purpose of each variable

- **Secrets Management**:
  - Use AWS Secrets Manager or similar for production secrets
  - Rotate API keys quarterly
  - Use different keys per environment

- **Code Review for Security**:
  - Authentication/authorization changes require security review
  - Payment-related code requires lead developer review
  - SQL queries reviewed for injection vulnerabilities
  - File uploads reviewed for security implications

## Performance Standards

- **Query Optimization**:
  - Eager load relationships to prevent N+1
  - Use `select()` to limit columns
  - Use `chunk()` or `cursor()` for large datasets
  - Index frequently queried columns

- **Caching Requirements**:
  - Cache expensive queries (>100ms)
  - Use cache tags for easy invalidation
  - Document cache TTL rationale

- **Asset Optimization**:
  - Images optimized before upload
  - JS/CSS minified in production
  - Use CDN for static assets

## Deployment Standards

- **Pre-Deployment Checklist**:
  - All tests passing
  - Code coverage meets requirements
  - Database migrations tested on staging
  - Environment variables documented
  - Rollback plan documented

- **Deployment Process**:
  - Deploy to staging first
  - Run smoke tests on staging
  - Deploy to production during low-traffic hours
  - Monitor logs and metrics for 30 minutes post-deployment

- **Post-Deployment**:
  - Verify critical paths (login, checkout, etc.)
  - Monitor error rates in Sentry
  - Check queue processing in Horizon
  - Announce deployment in team channel
