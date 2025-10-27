# Laravel 12.x Framework Guide

Framework-specific guidelines and conventions for Laravel 12.x development with Claude Code.

## About This File

**Purpose:** Provides Laravel 12.x framework best practices and conventions. This is your starting point for any Laravel project.

**Scope:** Universal Laravel patterns that apply to all projects. For project-specific decisions (queue drivers, cache drivers, database choices), customize the files in `.claude/claude-md-refs/`.

**Token Management:** If you want to reduce token usage, comment out sections you don't use.

---

## Project-Specific Customization

Customize these files for your project:

- **@.claude/claude-md-refs/project-commands.md** - Your custom artisan commands and deployment scripts
- **@.claude/claude-md-refs/architecture.md** - Your architecture decisions (queue driver, cache driver, database, etc.)
- **@.claude/claude-md-refs/conventions.md** - Your team conventions (git workflow, code review, etc.)

---

## Standard Laravel Commands

### Development
- `php artisan serve` - Start development server
- `php artisan migrate` - Run database migrations
- `php artisan migrate:fresh --seed` - Fresh migration with seeders
- `php artisan db:seed` - Run database seeders
- `php artisan queue:work` - Start queue worker
- `php artisan cache:clear` - Clear application cache
- `php artisan config:clear` - Clear configuration cache
- `php artisan route:list` - List all registered routes

### Testing
- `php artisan test` - Run PHPUnit/Pest test suite
- `php artisan test --parallel` - Run tests in parallel
- `php artisan test --coverage` - Generate code coverage report

### Code Quality
- `./vendor/bin/pint` - Run Laravel Pint (PSR-12 code formatter)
- `./vendor/bin/pint --test` - Check code style without fixing
- `php artisan optimize` - Cache config, routes, and views for production

## Code Style

### PHP Standards
- Use PSR-12 coding standard
- Use 4-space indentation for PHP files
- Always use strict types: `declare(strict_types=1);`
- Use type hints for parameters and return types
- Use readonly properties where applicable (PHP 8.1+)

### Naming Conventions
- Controllers: PascalCase with `Controller` suffix (e.g., `UserController`)
- Models: Singular PascalCase (e.g., `User`, `OrderItem`)
- Database tables: Plural snake_case (e.g., `users`, `order_items`)
- Migrations: `YYYY_MM_DD_HHMMSS_descriptive_name.php`
- Service classes: PascalCase with `Service` suffix (e.g., `PaymentService`)
- Jobs: PascalCase describing action (e.g., `SendWelcomeEmail`, `ProcessVideoUpload`)
- FormRequests: PascalCase with `Request` suffix (e.g., `StoreUserRequest`)
- Resources: PascalCase with `Resource` suffix (e.g., `UserResource`)
- Custom exceptions: PascalCase with `Exception` suffix (e.g., `PaymentFailedException`)

### File Organization
```
app/
  Http/
    Controllers/     # Thin controllers (routing layer only)
    Requests/        # FormRequest validation classes
    Resources/       # API Resource transformations
    Middleware/      # Custom middleware
  Services/          # Business logic layer
  Repositories/      # Data access layer (if using repository pattern)
  Models/            # Eloquent models
  Jobs/              # Queue jobs
  Exceptions/        # Custom exceptions
  Observers/         # Model observers
```

## Architecture Patterns

### Controller Pattern
- Keep controllers thin (routing layer only)
- Inject services via constructor (dependency injection)
- Use FormRequests for validation
- Return API Resources for responses
- Never put business logic in controllers

```php
public function store(StoreUserRequest $request): JsonResponse
{
    $user = $this->userService->createUser($request->validated());
    return UserResource::make($user)->response()->setStatusCode(201);
}
```

### Service Layer Pattern
- All business logic lives in service classes
- Use constructor injection for dependencies
- Implement single responsibility principle
- Return models, collections, or throw exceptions
- Type hint all parameters and return types

```php
class UserService
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly Cache $cache,
        private readonly Log $log,
    ) {}

    public function createUser(array $data): User
    {
        // Business logic here
        return $this->userRepository->create($data);
    }
}
```

### Repository Pattern (Optional)
- Use repositories for complex query logic
- Keep Eloquent queries out of services
- Return models or collections
- Implement interfaces for testability

## Database Best Practices

### Eloquent
- Always eager load relationships with `with()` to prevent N+1 queries
- Use `firstOrFail()` and `findOrFail()` for 404 handling
- Use scopes for reusable query logic
- Use accessors/mutators for data transformation
- Use observers for model lifecycle events
- Never use `all()` without pagination in production
- Use cursor-based pagination for large datasets: `cursorPaginate()`

```php
// Eager loading prevents N+1
$users = User::with(['posts', 'profile'])->get();

// Scopes for reusable queries
public function scopeActive(Builder $query): void {
    $query->where('status', 'active');
}
```

### Migrations
- Always include up() and down() methods
- Use descriptive names describing the change
- Never modify existing migrations after deployment
- Use `softDeletes()` instead of hard deletes when appropriate
- Add indexes for foreign keys and frequently queried columns

```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('email')->unique()->index();
    $table->foreignId('company_id')->constrained()->cascadeOnDelete();
    $table->timestamps();
});
```

### Query Optimization
- Use `select()` to limit columns returned
- Use `chunk()` or `cursor()` for processing large datasets
- Use database transactions for multi-step operations: `DB::transaction()`
- Use `exists()` instead of `count() > 0`

## Queue System

### Job Best Practices
- Implement `ShouldQueue` interface for all async jobs
- Set job timeout: `public int $timeout = 300;`
- Set max attempts: `public int $tries = 3;`
- Implement exponential backoff: `public array $backoff = [60, 120, 240];`
- Handle failures with failed() method
- Make all jobs idempotent (safe to retry)

```php
class ProcessVideoUpload implements ShouldQueue
{
    public int $tries = 3;
    public array $backoff = [60, 120, 240];
    public int $timeout = 600;

    public function failed(Throwable $exception): void {
        Log::error('Video processing failed', ['id' => $this->video->id]);
    }
}
```

### When to Queue
- Queue all long-running operations (emails, exports, external API calls)
- Use queue priorities: `dispatch()->onQueue('high')`
- Use job batching for related jobs: `Bus::batch()`
- Implement graceful shutdown in queue workers

## API Development

### FormRequest Validation
- Create FormRequest for ALL incoming requests
- Implement custom error messages
- Use authorization() method for policy checks
- Never validate in controllers

```php
class StoreUserRequest extends FormRequest
{
    public function rules(): array {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users'],
        ];
    }

    public function authorize(): bool {
        return $this->user()->can('create', User::class);
    }
}
```

### API Resources
- Use API Resources for ALL response transformations
- Never return raw models or arrays
- Implement conditional attributes with `whenLoaded()`
- Use resource collections for lists

```php
class UserResource extends JsonResource
{
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'posts' => PostResource::collection($this->whenLoaded('posts')),
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}
```

### API Design
- Use RESTful conventions (GET, POST, PUT/PATCH, DELETE)
- Version APIs: `/api/v1/users`, `/api/v2/users`
- Return proper HTTP status codes (200, 201, 204, 400, 401, 403, 404, 422, 500)
- Use cursor-based pagination for large datasets
- Implement rate limiting: `throttle:60,1` in routes

### Error Handling
- Create custom exceptions with render() method
- Return consistent JSON error format
- Log all errors appropriately
- Never expose sensitive data in error messages

```php
class PaymentFailedException extends Exception
{
    public function render(Request $request): JsonResponse {
        return response()->json([
            'message' => 'Payment processing failed',
            'error_code' => 'PAYMENT_FAILED',
        ], 400);
    }
}
```

## Caching Best Practices

- Set appropriate TTL for all cached items
- Invalidate cache BEFORE write operations (prevent race conditions)
- Use `remember()` for cache-aside pattern
- Use cache locks to prevent race conditions: `Cache::lock()`
- Use descriptive cache keys: `users:{id}:profile`

```php
// Cache with TTL
$users = Cache::remember('active-users', 3600, fn() => User::active()->get());

// Invalidate BEFORE updates
Cache::forget('active-users');
$user->update($data);

// Cache locks prevent race conditions
$lock = Cache::lock('process-order-' . $orderId, 10);
if ($lock->get()) {
    // Process order
    $lock->release();
}
```

## Security & Authentication

### Laravel Sanctum
- Use Sanctum for SPA and mobile API authentication
- Issue tokens with scopes: `createToken('token-name', ['posts:read'])`
- Validate token abilities in middleware
- Set token expiration in config

### Authorization
- Use Gates for simple checks
- Use Policies for model-based authorization
- Always check authorization in FormRequests
- Never rely on client-side authorization

```php
// Policy method
public function update(User $user, Post $post): bool {
    return $user->id === $post->user_id;
}

// Check in FormRequest authorize()
public function authorize(): bool {
    return $this->user()->can('update', $this->route('post'));
}
```

### Security Best Practices
- Always use HTTPS in production
- Enable CSRF protection for web routes
- Sanitize user input (FormRequests)
- Use prepared statements (Eloquent does this)
- Never commit `.env` files
- Rotate API keys regularly
- Implement rate limiting on all API endpoints

## Testing Requirements

### PHPUnit/Pest
- Write feature tests for all API endpoints
- Write unit tests for services, jobs, and complex logic
- Use database transactions for test isolation: `use RefreshDatabase;`
- Use factories for test data generation
- Fake external services: `Mail::fake()`, `Queue::fake()`

```php
// Feature test
test('can create user', function () {
    $response = $this->postJson('/api/v1/users', [
        'name' => 'John',
        'email' => 'john@example.com',
    ]);

    $response->assertCreated();
    $this->assertDatabaseHas('users', ['email' => 'john@example.com']);
});

// Unit test
test('user service creates user', function () {
    $service = new UserService(new UserRepository());
    $user = $service->createUser(['name' => 'John', 'email' => 'john@example.com']);

    expect($user)->toBeInstanceOf(User::class);
});
```

### Test Coverage
- Aim for >80% code coverage on services and business logic
- Test happy paths and error cases
- Test validation rules in FormRequests
- Test authorization in Policies
- Test queue jobs with `Queue::fake()`

## Production Deployment

### Optimization
- Run `php artisan optimize` - Caches config, routes, views
- Run `php artisan config:cache` - Cache configuration
- Run `php artisan route:cache` - Cache routes
- Run `php artisan view:cache` - Precompile Blade views
- Set `APP_DEBUG=false` in production
- Use OPcache for PHP bytecode caching

### Monitoring
- Implement health check endpoint: `/api/health`
- Use Laravel Pail for real-time log monitoring: `php artisan pail`
- Monitor queue processing
- Set up application performance monitoring (APM)
- Monitor database query performance

### Configuration
- Use environment variables for all config: `.env` file
- Never commit `.env` to version control
- Use `.env.example` as template
- Validate required env vars on boot
- Use typed config values: `config('app.max_users', 100)`

## Config-Driven Development

### Principle
- All limits, options, and business rules live in config files
- Never use magic numbers or hardcoded values
- Make all settings environment-variable driven
- Document all config values

```php
// config/business.php
return [
    'max_login_attempts' => env('MAX_LOGIN_ATTEMPTS', 5),
    'max_file_size_mb' => env('MAX_FILE_SIZE_MB', 10),
    'session_timeout_minutes' => env('SESSION_TIMEOUT', 120),
];

// Usage in code
$maxAttempts = config('business.max_login_attempts');
```

## Recommended Packages

- `laravel/sanctum` - API authentication for SPAs/mobile
- `laravel/pail` - Real-time log monitoring
- `laravel/horizon` - Queue monitoring (if using Redis queues)
- `laravel/telescope` - Debugging assistant (development only)
- `spatie/laravel-query-builder` - API query building

## Documentation Requirements

- Add PHPDoc blocks to public methods explaining why, not what
- Document architectural decisions in `.claude/claude-md-refs/architecture.md`
- Keep README updated with setup and deployment instructions
- Document all environment variables in `.env.example`
- Document API endpoints with OpenAPI/Swagger when appropriate

---

*Last updated: 2025-10-27*
*Framework version: Laravel 12.x*
