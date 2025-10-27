# Project Architecture

Architecture decisions and patterns for this Express.js project.

## Application Architecture

**Pattern:** Service-Repository-Controller architecture

- **Routes**: Define endpoints and apply middleware
- **Controllers**: Handle HTTP concerns (request/response)
- **Services**: Business logic layer, orchestrate operations
- **Repositories**: Data access layer (optional, for complex queries)
- **Models**: Database models (Sequelize/Mongoose/Prisma)
- **Jobs**: Async operations (emails, file processing, external API calls)

**Why:** Separates concerns, makes testing easier, keeps controllers thin.

## Authentication & Authorization

**API Authentication:** Passport.js with JWT strategy
- Token-based authentication for stateless APIs
- Token expiry: 7 days default
- Refresh token support for long-lived sessions
- Token payload: `{ userId, email, roles }`

**Session Authentication:** express-session with Redis store
- For web applications requiring sessions
- Secure, httpOnly cookies
- CSRF protection enabled

**Authorization:** Role-based access control (RBAC)
- Middleware checks user roles/permissions
- Role hierarchy: `admin > manager > user`
- Permission-based for fine-grained control

```javascript
// Example middleware
const requireRole = (role) => (req, res, next) => {
  if (!req.user || !req.user.roles.includes(role)) {
    throw new ForbiddenError('Insufficient permissions');
  }
  next();
};
```

## API Design

**Style:** RESTful with JSON responses

**Versioning:** URL-based (`/api/v1/`, `/api/v2/`)
- New version for breaking changes
- Maintain old versions for 6 months minimum
- Document deprecation in response headers

**Rate Limiting:**
- Authenticated users: 100 requests/minute
- Guests: 20 requests/minute
- Stricter limits on auth endpoints (5/minute for login)

**Pagination:** Cursor-based for large datasets, offset for small
- Default: 20 items per page
- Max: 100 items per page
- Include `total`, `page`, `perPage` in meta

**Response Format:**
```json
{
  "data": { ... },
  "meta": {
    "timestamp": "2025-01-01T00:00:00Z",
    "page": 1,
    "perPage": 20,
    "total": 100
  }
}
```

## Database

**Primary Database:** PostgreSQL 14+
- Connection pooling: min 2, max 10 connections
- UTF-8 encoding
- Timezone: UTC

**ORM:** Sequelize
- Migrations for all schema changes
- Seeders for initial/test data
- Model associations defined in models
- Query logging in development only

**Indexes:**
- Index all foreign keys
- Index frequently queried columns
- Add composite indexes for common query patterns
- Document index rationale in migrations

**Transactions:**
- Use for multi-step operations
- Automatic rollback on error
- Isolation level: READ COMMITTED (default)

```javascript
await sequelize.transaction(async (t) => {
  const user = await User.create(userData, { transaction: t });
  await Profile.create(profileData, { transaction: t });
  return user;
});
```

## Caching

**Driver:** Redis 7.x
- Separate Redis database from sessions (db 0 for cache, db 1 for sessions)
- Connection pooling enabled

**Cache Strategy:**
- TTL: 3600 seconds (1 hour) for dynamic data
- Cache expensive queries (>100ms)
- Invalidate cache BEFORE write operations
- Use key prefixes for namespacing: `cache:users:${id}`

**Example:**
```javascript
const cacheKey = `users:${userId}`;
let user = await redis.get(cacheKey);

if (!user) {
  user = await User.findByPk(userId);
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
}
```

## Queue System

**Driver:** Bull/BullMQ with Redis
- Separate Redis database for queues (db 2)
- Queue names: `default`, `email`, `high-priority`

**Job Configuration:**
- Timeout: 30000ms (30 seconds) default
- Max attempts: 3 with exponential backoff
- Backoff: [5000, 15000, 45000] milliseconds
- Remove completed jobs after 24 hours
- Keep failed jobs for debugging

**When to Queue:**
- Sending emails
- Processing file uploads
- Generating reports
- Calling external APIs
- Any operation taking >2 seconds

**Monitoring:**
- Bull Board UI at `/admin/queues` (admin only)
- Job metrics: completed, failed, delayed
- Alert on high failure rates

```javascript
// Queue configuration
const emailQueue = new Bull('email', {
  redis: redisConfig,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000
    },
    timeout: 30000,
    removeOnComplete: {
      age: 86400 // 24 hours
    }
  }
});
```

## Logging

**Framework:** Pino
- Structured JSON logging
- Log levels: trace, debug, info, warn, error, fatal
- Separate log files by level in production
- Request correlation IDs for tracing

**Log Destinations:**
- Development: Console (pretty-printed)
- Production: Files (JSON format) + Error tracking service

**What to Log:**
- All errors (with stack traces)
- Authentication attempts (success/failure)
- Authorization failures
- API calls to external services
- Database query errors
- Job queue events

**Never Log:**
- Passwords or secrets
- Full credit card numbers
- Personal identification numbers
- JWT tokens

```javascript
logger.info({ userId, action: 'user_login' }, 'User logged in');
logger.error({ err, userId }, 'Failed to process payment');
```

## File Storage

**Driver:** AWS S3 (or S3-compatible like MinIO)
- Public files: Accessible via CDN
- Private files: Served via signed URLs (1-hour expiry)
- File uploads: Use multer middleware

**Configuration:**
```javascript
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
```

**Local Development:** Use local filesystem, switch to S3 in production

## Session Management

**Store:** Redis with express-session
- Session TTL: 7 days
- Secure cookies in production (https only)
- httpOnly and sameSite flags enabled
- CSRF protection via csurf middleware

```javascript
app.use(session({
  store: new RedisStore({ client: redis }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));
```

## Testing Strategy

**Framework:** Jest
- Unit tests: Services, utilities, helpers
- Integration tests: API endpoints with Supertest
- Test database: Separate from development

**Coverage Target:**
- Services: 80% minimum
- Routes: Integration test for every endpoint
- Utilities: 90% minimum
- Critical paths (payments, auth): 95% minimum

**Test Organization:**
```
tests/
  unit/
    services/
    utils/
  integration/
    routes/
  fixtures/
    users.json
```

**CI/CD:**
- All tests must pass before merge
- Run tests in parallel for speed
- Generate coverage reports on every PR

## Security

**Secrets Management:**
- Development: `.env` file (never commit)
- Production: AWS Secrets Manager or HashiCorp Vault
- Rotate API keys quarterly

**HTTPS:**
- Always use HTTPS in production
- Redirect HTTP to HTTPS
- HSTS header enabled (max-age: 31536000)

**Input Validation:**
- All requests validated with Joi/Zod schemas
- Sanitize user input
- Parameterized queries (Sequelize does this)

**Security Headers:**
- helmet middleware for all routes
- CSP, X-Frame-Options, X-Content-Type-Options
- Hide X-Powered-By header

**Rate Limiting:**
- Global: 100 requests/minute per IP
- Login: 5 attempts/minute per IP
- Registration: 3 attempts/minute per IP
- Password reset: 3 attempts/hour per email

## Deployment

**Environment:**
- Development: Local with Docker Compose
- Staging: Mirrors production (AWS/GCP/Azure)
- Production: AWS EC2/ECS or similar

**Process Manager:** PM2
- Cluster mode (one process per CPU core)
- Auto-restart on crash
- Log rotation enabled
- Max memory restart: 1GB

**Deployment Process:**
1. Run tests: `npm test`
2. Build assets (if applicable)
3. Deploy to staging
4. Run smoke tests on staging
5. Deploy to production (off-peak hours)
6. Health check verification
7. Monitor logs for 30 minutes

**Zero-Downtime Deployment:**
- PM2 reload (cluster mode)
- Or blue-green deployment
- Or rolling deployment with load balancer

**Rollback Plan:**
- Keep last 5 deployments
- Rollback via PM2 or container orchestrator
- Database rollback via migrations

## Monitoring

**Application Metrics:**
- PM2 monitoring dashboard
- Health check endpoints: `/health`, `/ready`
- Response time tracking
- Error rate monitoring

**Logs:**
- Centralized logging (ELK stack or CloudWatch)
- Log retention: 30 days
- Alert on error spikes

**Metrics to Monitor:**
- Request rate and response times
- Error rate (4xx, 5xx)
- Queue depth and processing time
- Database connection pool usage
- Memory and CPU usage
- Failed login attempts

**Alerting:**
- Error rate >1% for 5 minutes
- Response time >500ms average
- Queue depth >1000 jobs
- Database connection pool exhausted
- Memory usage >90%

---

**Note:** This architecture works great for most Express.js projects. Customize sections as your project grows.
