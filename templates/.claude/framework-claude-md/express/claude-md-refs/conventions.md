# Team Conventions

Development standards and workflow conventions for this Express.js project.

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
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Checklist
- [ ] Code passes ESLint and Prettier
- [ ] No N+1 queries introduced
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Environment variables added to .env.example
```

**Merge Strategy:** Squash and merge
- Keeps `main` history clean
- Single commit per feature/fix
- Detailed history preserved in PR

## Code Review Guidelines

**Review Checklist:**
- [ ] Code passes ESLint and Prettier checks
- [ ] Tests included for new features/fixes
- [ ] No N+1 queries (check with logging in development)
- [ ] Security considerations addressed
- [ ] No hardcoded values (use config files)
- [ ] Error handling implemented
- [ ] No commented-out code
- [ ] Environment variables documented in `.env.example`
- [ ] Async operations use try/catch or asyncHandler
- [ ] No blocking operations in request handlers

**Review SLA:** Reviews completed within 24 hours (business days)

**Blocking Issues:**
- Security vulnerabilities
- Failing tests
- Missing tests for new features
- Hardcoded secrets or sensitive data
- Unhandled error cases
- Blocking operations in request handlers

**Auto-merge:** Not permitted - all changes require manual review

## Code Style

**Standard:** ESLint + Prettier
```bash
# Check code style
npm run lint

# Fix code style
npm run format

# Or combined
npm run lint && npm run format
```

**ESLint Configuration:**
```javascript
// .eslintrc.js
module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prefer-const': 'error'
  }
};
```

**Prettier Configuration:**
```javascript
// .prettierrc.js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2
};
```

**Run Before Commit:**
```bash
git add .
npm run lint
npm run format
git add .
git commit -m "feat: your commit message"
```

**Additional Standards:**
- Use ES6+ features (async/await, arrow functions, destructuring)
- Use const by default, let when needed, never var
- Use template literals for string interpolation
- Use async/await over promises/callbacks
- Always handle errors in async functions

## Testing Standards

**Required Tests:**
- Integration test for every API endpoint
- Unit test for every service method
- Test for every queue job
- Test for every validation schema

**Coverage Requirements:**
- Services: Minimum 80% code coverage
- Routes: Integration test for all endpoints
- Jobs: Unit test for all queue jobs
- Critical paths (payments, auth): Minimum 95% coverage

**Test Organization:**
```
tests/
  integration/
    routes/
      users.test.js
      posts.test.js
    auth/
      login.test.js
  unit/
    services/
      user-service.test.js
      payment-service.test.js
    jobs/
      process-payment.test.js
```

**Test Naming:** Use descriptive names
```javascript
describe('POST /api/v1/users', () => {
  it('should create a new user with valid data', async () => {});
  it('should return 422 for invalid email', async () => {});
  it('should return 409 for duplicate email', async () => {});
});
```

**Test Data:** Use factories
```javascript
// tests/factories/user-factory.js
const createUser = (overrides = {}) => ({
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
  ...overrides
});
```

**Mock External Services:**
```javascript
jest.mock('../src/services/email-service');
jest.mock('../src/services/payment-service');

// In test
emailService.send.mockResolvedValue({ sent: true });
paymentService.charge.mockResolvedValue({ id: 'ch_123' });
```

**Run Tests Before Commit:**
```bash
npm test
```

**CI/CD:**
- Tests run automatically on every PR
- Tests must pass before merge
- Coverage reports generated on every PR

## Database Conventions

**Migrations:**
- Descriptive names: `001-create-users-table.js`, `002-add-status-to-orders.js`
- Always include `up` and `down` methods for rollbacks
- Add indexes in migration
- Use transactions for complex migrations
- Immutable after deployment to production

**Migration Example (Sequelize):**
```javascript
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Add index
    await queryInterface.addIndex('users', ['email']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};
```

**Table Design:**
- All tables use auto-incrementing integer for primary key
- Use UUIDs for public-facing IDs: add `uuid` column with unique constraint
- All tables have `created_at` and `updated_at` timestamps
- Use `deleted_at` for soft deletes

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

**Response Format:** Consistent JSON structure
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

**List Response:**
```json
{
  "data": [
    { "id": 1, "name": "User 1" },
    { "id": 2, "name": "User 2" }
  ],
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

**Error Format:**
```json
{
  "error": {
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "Email is required" }
    ]
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
- Default limit: 20 items per page
- Max limit: 100 items per page
- Query params: `?page=1&perPage=20`
- Include pagination meta in response

**Filtering:**
- Query parameters for filtering: `?status=active&role=admin`
- Sorting: `?sort=-createdAt` (- for descending)
- Search: `?search=keyword`

## Naming Conventions

**Files:**
- kebab-case for all files: `user-service.js`, `auth-middleware.js`

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

**Middleware:**
- camelCase, descriptive function names
- `authenticateUser`, `validateRequest`, `requireRole`

**Validators:**
- camelCase with `Schema` suffix
- `createUserSchema`, `updatePostSchema`

**Variables and Functions:**
- camelCase: `getUserById`, `isAuthenticated`, `userProfile`

**Constants:**
- UPPER_SNAKE_CASE: `MAX_RETRY_ATTEMPTS`, `DEFAULT_PAGE_SIZE`

## Documentation Standards

**JSDoc Comments:** All public functions and classes
```javascript
/**
 * Create a new user and send welcome email.
 *
 * @param {Object} userData - User data from validated request
 * @param {string} userData.email - User email address
 * @param {string} userData.password - User password
 * @returns {Promise<User>} Created user object
 * @throws {ValidationError} If user data is invalid
 */
async function createUser(userData) {
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
- List all custom npm scripts

**Environment Variables:**
- Always update `.env.example` with new variables
- Document purpose of each variable
- Never commit `.env` to version control

```bash
# .env.example
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname

# Authentication
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Redis
REDIS_URL=redis://localhost:6379

# External Services
STRIPE_API_KEY=sk_test_xxxxx
SENDGRID_API_KEY=SG.xxxxx
```

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
- Rate limiting implemented on public endpoints

**Secrets Management:**
- Development: `.env` file
- Production: AWS Secrets Manager, Azure Key Vault, or similar
- Rotate API keys quarterly
- Use different keys per environment

**Input Validation:**
- Validate ALL user input with Joi or Zod
- Sanitize user input before database queries
- Use parameterized queries (Sequelize does this automatically)
- Implement rate limiting on all endpoints

**Dependencies:**
- Run `npm audit` regularly
- Update dependencies monthly
- Review security advisories
- Pin exact versions in production

## Performance Standards

**Query Optimization:**
- Eager load relationships: `User.findAll({ include: ['posts', 'profile'] })`
- Use `attributes` to limit columns returned
- Use `limit` and `offset` for pagination
- Never query inside loops (N+1 problem)

**N+1 Detection Example:**
```javascript
// Bad: N+1 query problem
const users = await User.findAll();
for (const user of users) {
  user.posts = await user.getPosts(); // N+1!
}

// Good: Eager loading
const users = await User.findAll({
  include: ['posts']
});
```

**Caching Requirements:**
- Cache queries taking >100ms
- Document cache keys and TTL
- Invalidate cache before updates
- Use descriptive cache key prefixes: `cache:users:${id}`

**Async Operations:**
- Always use async/await for I/O operations
- Never use blocking operations (sync file reads, etc.)
- Queue long-running operations (>2 seconds)
- Use streaming for large data transfers

## Deployment Standards

**Pre-Deployment Checklist:**
- [ ] All tests passing locally
- [ ] All tests passing in CI/CD
- [ ] Code reviewed and approved
- [ ] Database migrations tested on staging
- [ ] Environment variables documented
- [ ] Rollback plan documented
- [ ] Dependencies audited for vulnerabilities

**Deployment Process:**
1. Deploy to staging
2. Run smoke tests on staging
3. Get approval from team lead
4. Deploy to production (during low-traffic hours)
5. Monitor logs for 30 minutes
6. Verify critical paths (login, checkout, etc.)

**Deployment Commands:**
```bash
# 1. Pull latest code
git pull origin main

# 2. Install dependencies
npm ci --production

# 3. Run migrations
npm run migrate

# 4. Restart application
pm2 reload ecosystem.config.js
```

**Post-Deployment:**
- Monitor error rates in logs
- Check queue processing
- Verify cache is working
- Test critical user flows
- Check application health endpoint
- Announce deployment in team channel

**Health Checks:**
```javascript
// /health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// /ready endpoint (checks dependencies)
app.get('/ready', async (req, res) => {
  try {
    await sequelize.authenticate();
    await redis.ping();
    res.json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready' });
  }
});
```

**Rollback Procedure:**
```bash
# Revert to previous deployment
pm2 delete all
git checkout <previous-commit>
npm ci --production
npm run migrate:rollback  # If needed
pm2 start ecosystem.config.js
```

## Logging Standards

**Log Levels:**
- `trace` - Very detailed debugging (not in production)
- `debug` - Debugging information
- `info` - General informational messages
- `warn` - Warning messages (non-critical issues)
- `error` - Error messages (caught errors)
- `fatal` - Fatal errors (application crash)

**What to Log:**
- All errors with stack traces
- Authentication attempts (success/failure)
- Authorization failures
- External API calls (with timing)
- Queue job start/completion/failure
- Database query errors

**What NOT to Log:**
- Passwords or secrets
- Credit card numbers
- JWT tokens
- Personal identification numbers
- Full request/response bodies (unless debugging)

**Structured Logging:**
```javascript
logger.info({ userId, action: 'user_created' }, 'User created successfully');
logger.error({ err, userId, context: { orderId } }, 'Failed to process payment');
```

**Correlation IDs:**
- Add unique request ID to every request
- Include request ID in all logs for that request
- Return request ID in error responses for support

```javascript
// Middleware
app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  req.log = logger.child({ requestId: req.id });
  next();
});
```

---

**Note:** These conventions work great for most teams. Adjust as your team's workflow evolves.
