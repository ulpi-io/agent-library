# Project Architecture Decisions

Key architectural patterns and decisions for this Laravel project. Customize for your architecture.

## Application Architecture

- **Pattern**: Service-Repository-Model architecture
- **Services**: Business logic layer, injected into controllers
- **Repositories**: Data access layer, abstracts database operations
- **Models**: Eloquent models with relationships and scopes only
- **DTOs**: Use typed DTOs for complex data transfer between layers

## Multi-Tenancy (if applicable)

- **Strategy**: Single database with tenant_id on all tables
- **Tenant Resolution**: Subdomain-based (tenant.app.com)
- **Scope**: Global `TenantScope` applied to all tenant-aware models
- **Switching**: Only super admins can switch tenants via `ActingAsTenant` middleware
- **Isolation**: Database-level row isolation, Redis namespacing per tenant

## API Architecture

- **Style**: RESTful with JSON responses
- **Versioning**: URL-based (`/api/v1/`, `/api/v2/`)
- **Breaking Changes**: Require new API version, old versions maintained for 6 months
- **Deprecation**: Announced 3 months in advance via `X-API-Deprecated` header
- **Rate Limiting**: 60 requests/minute per authenticated user, 10/minute for guests
- **Pagination**: Cursor-based for large datasets, offset for small collections

## Authentication & Authorization

- **API Auth**: Laravel Sanctum with token-based authentication
- **Web Auth**: Session-based with `auth` middleware
- **Token Expiry**: API tokens expire after 30 days of inactivity
- **Permissions**: Role-based with Policies for model authorization
- **2FA**: TOTP-based two-factor authentication via `laravel/fortify`

## Event-Driven Architecture

- **Events**: All domain events extend `DomainEvent` base class
- **Dispatch Timing**: After database transaction commits (`DB::afterCommit()`)
- **Listeners**: Queued by default for async processing
- **Event Store**: All events logged to `domain_events` table for replay
- **Notifications**: Broadcast via Pusher for real-time updates

## Queue Architecture

- **Driver**: Redis with Laravel Horizon for monitoring
- **Queues**:
  - `high` - Critical operations (payments, orders) - 10 workers
  - `default` - Standard operations (emails, notifications) - 5 workers
  - `low` - Background tasks (reports, cleanup) - 2 workers
  - `external` - Third-party API calls - 3 workers with rate limiting
- **Retry Strategy**: 3 attempts with exponential backoff (60s, 120s, 240s)
- **Failed Jobs**: Manual review required, stored in `failed_jobs` table
- **Monitoring**: Horizon dashboard at `/horizon` (admin only)

## Caching Strategy

- **Driver**: Redis for all caching
- **Layers**:
  - Application cache: 5-minute TTL for dynamic data
  - Query cache: Tagged cache, invalidated on model updates
  - Configuration cache: File-based in production (`config:cache`)
  - Route cache: File-based in production (`route:cache`)
- **Invalidation**: Invalidate BEFORE write operations to prevent race conditions
- **Tags**: Use cache tags for grouped invalidation (e.g., `['users', 'posts']`)
- **Locks**: Use Redis locks for atomic operations

## Database Architecture

- **Primary DB**: MySQL 8.0 for relational data
- **Cache/Queue**: Redis 7.x for caching and queue storage
- **Search**: Elasticsearch via Laravel Scout for full-text search (if applicable)
- **NoSQL**: DynamoDB for event logs and analytics data (if applicable)
- **Read Replicas**: Load balance reads across replicas in production
- **Migrations**: All schema changes via migrations, no manual SQL

## File Storage

- **Driver**: S3-compatible storage (AWS S3 or MinIO)
- **Public Files**: Uploaded to `public` disk, accessible via CDN
- **Private Files**: Uploaded to `private` disk, served via signed URLs
- **Image Processing**: Queue jobs with Intervention Image for resizing
- **Retention**: Temp files auto-deleted after 24 hours

## Background Job Patterns

- **Long Operations**: Always queue (emails, reports, file processing, API calls)
- **Job Batching**: Group related jobs with `Bus::batch()` for tracking
- **Job Chaining**: Use `->chain()` for dependent sequential jobs
- **Rate Limiting**: Apply `RateLimited` middleware to external API jobs
- **Idempotency**: All jobs must be idempotent (safe to retry)

## Logging & Monitoring

- **Log Driver**: Stack driver (daily files + Slack for errors in production)
- **Log Channels**: Separate channels for `api`, `queue`, `auth`, `payments`
- **Metrics**: Custom metrics tracked via Horizon tags and Telescope
- **APM**: Application Performance Monitoring via New Relic/Datadog (if applicable)
- **Error Tracking**: Sentry for exception tracking and alerting

## Testing Strategy

- **Unit Tests**: All services and complex business logic
- **Feature Tests**: All API endpoints and web routes
- **Integration Tests**: External API integrations with mocked responses
- **Browser Tests**: Critical user flows with Laravel Dusk (if applicable)
- **Coverage Target**: Minimum 80% on services, 90% on critical payment flows
- **CI/CD**: All tests run on every PR, must pass before merge

## Security Practices

- **Input Validation**: All requests via FormRequests
- **SQL Injection**: Prevented by Eloquent (no raw queries without bindings)
- **XSS**: Blade templates auto-escape, API returns JSON only
- **CSRF**: Enabled for all web routes, excluded for API routes
- **Rate Limiting**: Applied to login, registration, API endpoints
- **Secrets**: All sensitive data in `.env`, never committed to git
- **Dependencies**: Weekly automated security updates via Dependabot
