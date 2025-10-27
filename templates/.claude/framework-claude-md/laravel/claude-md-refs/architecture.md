# Project Architecture

Architecture decisions and patterns for this Laravel project.

## Application Architecture

**Pattern:** Service-Repository-Model architecture

- **Controllers**: Thin routing layer only, handle HTTP concerns
- **Services**: Business logic layer, orchestrate operations
- **Repositories**: Data access layer (optional, use for complex queries)
- **Models**: Eloquent models with relationships and scopes only
- **Jobs**: Async operations (emails, exports, external API calls)

**Why:** Separates concerns, makes testing easier, keeps controllers thin.

## Authentication & Authorization

**API Authentication:** Laravel Sanctum
- Token-based authentication for SPAs and mobile apps
- Token expiry: 30 days of inactivity
- Scopes for granular permissions: `createToken('name', ['posts:read', 'posts:write'])`

**Web Authentication:** Session-based with Laravel's default `auth` middleware

**Authorization:** Laravel Policies
- Model-based authorization via Policy classes
- Gate-based for simple boolean checks
- Always check in FormRequest `authorize()` method

## API Design

**Style:** RESTful with JSON responses

**Versioning:** URL-based (`/api/v1/`, `/api/v2/`)
- New version for breaking changes
- Maintain old versions for 6 months
- Announce deprecation via `X-API-Deprecated` header

**Rate Limiting:**
- Authenticated users: 60 requests/minute
- Guests: 10 requests/minute
- Configure in `app/Providers/RouteServiceProvider.php`

**Pagination:** Cursor-based for large datasets, offset for small collections

**Response Format:**
```json
{
  "data": { ... },
  "meta": {
    "cursor": "...",
    "next_cursor": "...",
    "total": 100
  }
}
```

## Database

**Primary Database:** MySQL 8.0
- Connection: `mysql` (default)
- Use InnoDB engine for all tables
- UTF8MB4 charset for emoji support

**Schema Changes:**
- All changes via migrations
- Never modify migrations after deployment
- Always include `down()` method for rollbacks

**Indexes:**
- Index all foreign keys
- Index frequently queried columns
- Add composite indexes for common query patterns

## Queue System

**Driver:** Redis
- Connection: `redis` in `config/queue.php`
- Default queue for standard operations
- Use named queues for priority: `dispatch()->onQueue('high')`

**Queue Workers:**
```bash
php artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
```

**Job Configuration:**
- Timeout: 300 seconds (5 minutes) default
- Max attempts: 3 with exponential backoff
- Backoff: [60, 120, 240] seconds between retries

**When to Queue:**
- Sending emails
- Processing uploads
- Generating reports
- External API calls
- Any operation taking >2 seconds

**Monitoring:**
- Use Laravel Horizon for Redis queue monitoring
- Dashboard at `/horizon` (admin only)
- Configure in `config/horizon.php`

## Caching

**Driver:** Redis
- Connection: `redis` in `config/cache.php`
- Separate Redis database from queue (database 1 for cache, 0 for queue)

**Cache Strategy:**
- TTL: 3600 seconds (1 hour) for dynamic data
- Cache expensive queries (>100ms)
- Invalidate cache BEFORE write operations
- Use cache tags for grouped invalidation

**Example:**
```php
// Cache with tags
Cache::tags(['users', 'posts'])->remember('user-' . $id, 3600, fn() => User::find($id));

// Invalidate before update
Cache::tags(['users'])->flush();
$user->update($data);
```

## File Storage

**Driver:** S3 (AWS S3 or S3-compatible like MinIO)
- Public files: `public` disk → accessible via CloudFront CDN
- Private files: `private` disk → served via signed URLs
- Temp files: Auto-delete after 24 hours

**Configuration:**
```php
// config/filesystems.php
's3' => [
    'driver' => 's3',
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION'),
    'bucket' => env('AWS_BUCKET'),
],
```

**Local Development:** Use `local` disk, switch to S3 in production

## Logging

**Driver:** Stack (daily files + Slack for production errors)

**Channels:**
- `daily`: Daily log files in `storage/logs/`
- `slack`: Critical errors sent to Slack (production only)
- `stderr`: For Docker containers

**Configuration:**
```php
// config/logging.php
'stack' => [
    'driver' => 'stack',
    'channels' => ['daily', 'slack'],
],
```

**Best Practices:**
- Log all exceptions
- Log business-critical operations (payments, orders)
- Use appropriate levels: debug, info, warning, error, critical
- Never log sensitive data (passwords, tokens, credit cards)

## Testing Strategy

**Framework:** PHPUnit or Pest
- Feature tests: All API endpoints
- Unit tests: Services and complex business logic
- Use `RefreshDatabase` trait for test isolation

**Coverage Target:**
- Services: 80% minimum
- Critical paths (payments, auth): 95% minimum
- Controllers: Feature test for every endpoint

**Test Organization:**
```
tests/
  Feature/     # API endpoint tests
  Unit/        # Service and logic tests
  Factories/   # Model factories
```

**CI/CD:**
- All tests must pass before merge
- Run tests in parallel: `php artisan test --parallel`
- Generate coverage reports weekly

## Security

**Secrets Management:**
- Store secrets in `.env` file (development)
- Use AWS Secrets Manager or similar in production
- Rotate API keys quarterly

**HTTPS:**
- Always use HTTPS in production
- Redirect HTTP to HTTPS in production

**Input Validation:**
- All requests validated via FormRequest classes
- Never trust client input
- Sanitize before display (Blade auto-escapes)

**SQL Injection Prevention:**
- Use Eloquent ORM (auto-escapes)
- If raw queries needed, always use parameter binding

**CSRF Protection:**
- Enabled for all web routes
- Excluded for API routes (use Sanctum tokens instead)

**Rate Limiting:**
- Login: 5 attempts per minute
- Registration: 3 attempts per minute
- API: 60 requests per minute (authenticated)
- Forgot password: 3 attempts per hour

## Deployment

**Environment:**
- Development: Local with SQLite/MySQL
- Staging: Mirrors production environment
- Production: AWS/DigitalOcean/Laravel Forge

**Deployment Process:**
1. Run tests: `php artisan test`
2. Deploy to staging
3. Run smoke tests on staging
4. Deploy to production (off-peak hours)
5. Run migrations: `php artisan migrate --force`
6. Clear and cache config: `php artisan optimize`
7. Restart queue workers: `php artisan queue:restart`

**Zero-Downtime:**
- Use Laravel Envoy or Deployer for atomic deployments
- Put app in maintenance mode: `php artisan down`
- Deploy changes
- Bring app up: `php artisan up`

**Rollback Plan:**
- Keep last 5 releases on server
- Database rollback via migrations: `php artisan migrate:rollback`
- Code rollback: Switch symlink to previous release

## Monitoring

**Application Performance:**
- Laravel Telescope (development only)
- Laravel Horizon (queue monitoring)
- Health check endpoint: `GET /api/health`

**Error Tracking:**
- Log errors to daily files
- Send critical errors to Slack
- Consider Sentry for production error tracking

**Metrics to Monitor:**
- Queue depth and processing time
- Failed jobs count
- API response times
- Database query performance
- Cache hit ratio
- Disk space usage

---

**Note:** This architecture works great for most Laravel projects. Customize sections as your project grows.
