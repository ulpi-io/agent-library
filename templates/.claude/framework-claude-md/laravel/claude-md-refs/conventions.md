# Team Conventions

Development standards and workflow conventions for this Laravel project.

## Git Workflow

**Branching Strategy:** GitHub Flow
- `main` - Production-ready code, protected branch
- `feature/*` - New features (e.g., `feature/user-authentication`)
- `bugfix/*` - Bug fixes (e.g., `bugfix/login-validation`)
- `hotfix/*` - Critical production fixes (e.g., `hotfix/payment-error`)

**Branch Protection:**
- Require pull request before merging to `main`
- Require 2 approvals from team members
- Require all CI checks to pass
- No force push to `main`

**Commit Messages:** Conventional Commits format
```
feat: add user profile export functionality
fix: resolve login validation error
docs: update API documentation
refactor: simplify user service logic
test: add tests for payment processing
chore: update dependencies
```

**Commit Format:**
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation only changes
- `refactor:` - Code changes that neither fix bugs nor add features
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks (dependencies, config, etc.)
- `perf:` - Performance improvements

## Pull Request Process

**Requirements:**
- 2 approvals required before merge
- All CI/CD checks must pass
- Code review within 24 hours
- Squash and merge into `main`
- Delete branch after merge

**PR Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Feature tests added/updated
- [ ] Manual testing performed

## Checklist
- [ ] Code follows PSR-12 standards
- [ ] No N+1 queries introduced
- [ ] All tests passing
- [ ] Documentation updated
```

**Merge Strategy:** Squash and merge
- Keeps `main` history clean
- Single commit per feature/fix
- Detailed history preserved in PR

## Code Review Guidelines

**Review Checklist:**
- [ ] Code follows PSR-12 standards (verified by Pint)
- [ ] Tests included for new features/fixes
- [ ] No N+1 queries (check with Telescope in development)
- [ ] Security considerations addressed
- [ ] No hardcoded values (use config files)
- [ ] Error handling implemented
- [ ] No commented-out code
- [ ] Environment variables documented in `.env.example`

**Review SLA:** Reviews completed within 24 hours (business days)

**Blocking Issues:**
- Security vulnerabilities
- Failing tests
- Missing tests for new features
- Hardcoded secrets or sensitive data
- Unhandled error cases

**Auto-merge:** Not permitted - all changes require manual review

## Code Style

**Standard:** PSR-12 enforced by Laravel Pint
```bash
# Check code style
./vendor/bin/pint --test

# Fix code style
./vendor/bin/pint
```

**Run Pint Before Commit:**
```bash
git add .
./vendor/bin/pint
git add .
git commit -m "feat: your commit message"
```

**Additional Standards:**
- Use strict types: `declare(strict_types=1);`
- Type hint parameters and return types
- Use readonly properties (PHP 8.1+)
- Use named arguments for clarity in complex method calls

## Testing Standards

**Required Tests:**
- Feature test for every API endpoint
- Unit test for every service method
- Test for every queue job
- Test for every custom validation rule

**Coverage Requirements:**
- Services: Minimum 80% code coverage
- Controllers: Feature test for all endpoints
- Jobs: Unit test for all queue jobs
- Critical paths (payments, auth): Minimum 95% coverage

**Test Organization:**
```
tests/
  Feature/
    Api/
      UserControllerTest.php
      PostControllerTest.php
    Auth/
      LoginTest.php
  Unit/
    Services/
      UserServiceTest.php
      PaymentServiceTest.php
    Jobs/
      ProcessPaymentTest.php
```

**Test Naming:** Use descriptive names
```php
test('user can update own profile')
test('user cannot update other users profile')
test('payment processing fails with invalid card')
```

**Test Data:** Use factories, not seeders
```php
$user = User::factory()->create();
$posts = Post::factory()->count(3)->create(['user_id' => $user->id]);
```

**Mock External Services:**
```php
Mail::fake();
Queue::fake();
Storage::fake();
Http::fake([
    'api.stripe.com/*' => Http::response(['status' => 'success'], 200),
]);
```

**Run Tests Before Commit:**
```bash
php artisan test
```

**CI/CD:**
- Tests run automatically on every PR
- Tests must pass before merge
- Coverage reports generated weekly

## Database Conventions

**Migrations:**
- Descriptive names: `create_user_profiles_table`, `add_status_to_orders_table`
- Always include `down()` method for rollbacks
- Add indexes in migration: `$table->string('email')->index();`
- Foreign keys: `$table->foreignId('user_id')->constrained()->cascadeOnDelete();`
- Immutable after deployment to production

**Table Design:**
- All tables use `id()` for primary key (auto-incrementing bigint)
- Use UUIDs for public-facing IDs: `$table->uuid('public_id')->unique();`
- All tables have `created_at` and `updated_at` timestamps
- Use `softDeletes()` for user-generated content

**Column Naming:**
- snake_case for all columns
- Boolean columns: `is_active`, `has_verified_email`
- Foreign keys: `user_id`, `post_id` (singular model name + _id)
- Dates: `published_at`, `verified_at` (action + _at)

**Indexes:**
- Index all foreign keys
- Index frequently queried columns
- Add composite indexes for common WHERE clauses
- Document index rationale in migration comment

## API Conventions

**Response Format:** Always use API Resources
```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "meta": {
    "timestamp": "2025-01-01T00:00:00Z"
  }
}
```

**Error Format:**
```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

**HTTP Status Codes:**
- `200 OK` - Successful GET, PUT, PATCH
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Invalid request format
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Authenticated but not authorized
- `404 Not Found` - Resource doesn't exist
- `422 Unprocessable Entity` - Validation failed
- `500 Internal Server Error` - Server error

**Pagination:**
- Use cursor pagination for large datasets
- Include `next_cursor` and `prev_cursor` in meta
- Default limit: 20 items per page
- Max limit: 100 items per page

**Filtering:**
- Query parameters for filtering: `?status=active&role=admin`
- Sorting: `?sort=-created_at` (- for descending)
- Search: `?search=keyword`

## Naming Conventions

**Controllers:**
- PascalCase with `Controller` suffix
- Singular resource name: `UserController`, `PostController`

**Services:**
- PascalCase with `Service` suffix
- Singular resource name: `UserService`, `PaymentService`

**Jobs:**
- PascalCase describing action
- Use verb + noun: `ProcessPayment`, `SendWelcomeEmail`, `GenerateReport`

**Events:**
- PascalCase, past tense
- `UserRegistered`, `PaymentProcessed`, `OrderShipped`

**Listeners:**
- PascalCase with action
- `SendWelcomeNotification`, `UpdateUserStatistics`

**Form Requests:**
- Action + Resource + `Request`
- `StoreUserRequest`, `UpdatePostRequest`, `DeleteCommentRequest`

**Middleware:**
- PascalCase, descriptive
- `EnsureUserIsAdmin`, `EnsureSubscriptionActive`, `LogApiRequests`

**Policies:**
- Singular resource name + `Policy`
- `UserPolicy`, `PostPolicy`

## Documentation Standards

**PHPDoc Blocks:** All public methods
```php
/**
 * Create a new user and send welcome email.
 *
 * @param  array  $data  User data from validated request
 * @return User
 * @throws UserCreationException
 */
public function createUser(array $data): User
{
    // Implementation
}
```

**Focus on WHY, not WHAT:**
- Explain the business reason, not the implementation
- Code should be self-documenting for WHAT it does
- Comments explain WHY certain decisions were made

**README Updates:**
- Keep setup instructions current
- Document all environment variables
- Include deployment procedures
- List all custom artisan commands

**Environment Variables:**
- Always update `.env.example` with new variables
- Document purpose of each variable
- Never commit `.env` to version control

## Security Standards

**Environment Variables:**
- Never commit `.env` files
- Always update `.env.example` (with dummy values)
- Document each variable's purpose

**Code Review for Security:**
- Authentication/authorization changes require security-focused review
- Payment-related code requires lead developer review
- SQL queries reviewed for injection vulnerabilities
- File uploads reviewed for security implications

**Secrets Management:**
- Development: `.env` file
- Production: AWS Secrets Manager or similar
- Rotate API keys quarterly
- Use different keys per environment

## Performance Standards

**Query Optimization:**
- Eager load relationships: `User::with(['posts', 'comments'])->get()`
- Use `select()` to limit columns
- Use `chunk()` or `cursor()` for large datasets
- Never use `all()` in production

**Caching Requirements:**
- Cache queries taking >100ms
- Document cache keys and TTL
- Invalidate cache before updates

**N+1 Detection:**
- Use Laravel Telescope in development
- Review all loops that access relationships
- Add eager loading where needed

## Deployment Standards

**Pre-Deployment Checklist:**
- [ ] All tests passing locally
- [ ] All tests passing in CI/CD
- [ ] Code reviewed and approved
- [ ] Database migrations tested on staging
- [ ] Environment variables documented
- [ ] Rollback plan documented

**Deployment Process:**
1. Deploy to staging
2. Run smoke tests on staging
3. Get approval from team lead
4. Deploy to production (during low-traffic hours)
5. Monitor logs for 30 minutes
6. Verify critical paths (login, checkout, etc.)

**Post-Deployment:**
- Monitor error rates in logs
- Check queue processing
- Verify cache is working
- Test critical user flows
- Announce deployment in team channel

---

**Note:** These conventions work great for most teams. Adjust as your team's workflow evolves.
