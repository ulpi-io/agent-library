# Project Commands

Common Laravel commands and project-specific workflows.

## First-Time Project Setup

```bash
# Clone repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Database setup
php artisan migrate
php artisan db:seed  # Optional: if you have seeders

# Build assets
npm run build

# Start development server
php artisan serve
```

## Development Commands

### Server & Queue
```bash
# Start development server
php artisan serve

# Start queue worker
php artisan queue:work

# Start queue worker with auto-reload
php artisan queue:listen

# Restart queue workers (after code changes)
php artisan queue:restart

# Start Laravel Horizon (if using Redis queues)
php artisan horizon
php artisan horizon:pause
php artisan horizon:continue
```

### Database Operations
```bash
# Run migrations
php artisan migrate

# Rollback last migration
php artisan migrate:rollback

# Rollback all migrations and re-run
php artisan migrate:fresh

# Fresh migration with seeders
php artisan migrate:fresh --seed

# Run seeders only
php artisan db:seed

# Run specific seeder
php artisan db:seed --class=UserSeeder

# Check migration status
php artisan migrate:status
```

### Cache Management
```bash
# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Clear specific cache
php artisan cache:forget <key>

# Cache config/routes for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Optimize for production (all caches)
php artisan optimize

# Clear production optimizations
php artisan optimize:clear
```

### Code Generation
```bash
# Generate controller
php artisan make:controller UserController
php artisan make:controller Api/UserController --api
php artisan make:controller UserController --resource

# Generate model
php artisan make:model User
php artisan make:model User -m  # With migration
php artisan make:model User -mf  # With migration and factory

# Generate migration
php artisan make:migration create_users_table
php artisan make:migration add_status_to_users_table

# Generate seeder
php artisan make:seeder UserSeeder

# Generate factory
php artisan make:factory UserFactory

# Generate form request
php artisan make:request StoreUserRequest

# Generate resource
php artisan make:resource UserResource
php artisan make:resource UserCollection

# Generate policy
php artisan make:policy UserPolicy
php artisan make:policy UserPolicy --model=User

# Generate job
php artisan make:job ProcessPayment

# Generate event
php artisan make:event UserRegistered

# Generate listener
php artisan make:listener SendWelcomeEmail

# Generate middleware
php artisan make:middleware EnsureUserIsAdmin

# Generate service
php artisan make:class Services/UserService
```

### Testing
```bash
# Run all tests
php artisan test

# Run tests in parallel
php artisan test --parallel

# Run specific test file
php artisan test tests/Feature/UserControllerTest.php

# Run specific test method
php artisan test --filter test_user_can_register

# Run tests with coverage
php artisan test --coverage

# Run tests with minimum coverage
php artisan test --min=80

# Generate test
php artisan make:test UserControllerTest
php artisan make:test UserServiceTest --unit
```

### Code Quality
```bash
# Run Laravel Pint (code formatter)
./vendor/bin/pint

# Check code style without fixing
./vendor/bin/pint --test

# Run Pint on specific file/directory
./vendor/bin/pint app/Services
```

### Debugging & Inspection
```bash
# List all routes
php artisan route:list

# List specific routes
php artisan route:list --name=user
php artisan route:list --method=POST

# Tinker (REPL)
php artisan tinker

# Show environment
php artisan env

# Clear compiled class file
php artisan clear-compiled

# View real-time logs (Laravel Pail)
php artisan pail
php artisan pail --filter="error"
```

## Custom Artisan Commands

Document your custom artisan commands here:

```bash
# Example custom commands (replace with your actual commands):

# php artisan app:sync-users
# Description: Sync users from external authentication service
# Usage: Run hourly via cron

# php artisan app:generate-reports --month=2024-10
# Description: Generate monthly business reports
# Usage: Run manually or via scheduler

# php artisan app:cleanup-temp-files
# Description: Remove temporary files older than 7 days
# Usage: Run daily via scheduler
```

## Deployment Commands

### Standard Deployment Steps
```bash
# 1. Pull latest code
git pull origin main

# 2. Install/update dependencies
composer install --no-dev --optimize-autoloader
npm install
npm run build

# 3. Run migrations
php artisan migrate --force

# 4. Clear and cache for production
php artisan optimize

# 5. Restart queue workers
php artisan queue:restart

# 6. Restart PHP-FPM (if applicable)
sudo systemctl restart php8.2-fpm
```

### Deployment with Maintenance Mode
```bash
# Enable maintenance mode
php artisan down --secret="deployment-token"
# Access via: https://yoursite.com/deployment-token

# Deploy changes (steps above)

# Disable maintenance mode
php artisan up
```

### Zero-Downtime Deployment (Laravel Envoy/Deployer)
```bash
# If using Laravel Envoy
envoy run deploy

# If using Deployer
dep deploy production
```

## Scheduler & Cron

### Setup Cron Job
Add this to your crontab (`crontab -e`):
```bash
* * * * * cd /path-to-project && php artisan schedule:run >> /dev/null 2>&1
```

### Test Scheduled Tasks
```bash
# List all scheduled tasks
php artisan schedule:list

# Run scheduler manually (for testing)
php artisan schedule:run

# Run specific scheduled task
php artisan schedule:test
```

## Queue Management

### Queue Commands
```bash
# Work queue
php artisan queue:work

# Work queue with options
php artisan queue:work redis --queue=high,default --sleep=3 --tries=3

# List failed jobs
php artisan queue:failed

# Retry failed job
php artisan queue:retry <job-id>

# Retry all failed jobs
php artisan queue:retry all

# Flush failed jobs
php artisan queue:flush

# Clear all jobs from queue
php artisan queue:clear redis
php artisan queue:clear redis --queue=high
```

### Laravel Horizon (Redis Queues)
```bash
# Start Horizon
php artisan horizon

# Pause workers
php artisan horizon:pause

# Continue workers
php artisan horizon:continue

# Terminate Horizon
php artisan horizon:terminate

# Check Horizon status
php artisan horizon:status
```

## Maintenance & Monitoring

### Application Health
```bash
# Check application health (implement custom health check)
# php artisan app:health-check

# Test email configuration
# php artisan app:test-email your@email.com

# View application metrics
# php artisan app:metrics
```

### Log Management
```bash
# View real-time logs (Laravel Pail)
php artisan pail

# View filtered logs
php artisan pail --filter="error"
php artisan pail --filter="payment"

# Manual log viewing
tail -f storage/logs/laravel-$(date +%Y-%m-%d).log
tail -f storage/logs/laravel.log
```

### Storage Management
```bash
# Create storage link (for public files)
php artisan storage:link

# Clear temporary files (implement custom command)
# php artisan app:cleanup-temp-files
```

## Development Helpers

### IDE Helper (if using laravel-ide-helper package)
```bash
# Generate IDE helper files
php artisan ide-helper:generate

# Generate model annotations
php artisan ide-helper:models

# Generate PhpStorm meta
php artisan ide-helper:meta
```

### Laravel Telescope (Development)
```bash
# Install Telescope
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate

# Clear Telescope data
php artisan telescope:clear

# Prune old entries
php artisan telescope:prune
```

## Useful Composer Commands

```bash
# Update dependencies
composer update

# Update specific package
composer update vendor/package

# Install package
composer require vendor/package

# Remove package
composer remove vendor/package

# Dump autoload
composer dump-autoload

# Show outdated packages
composer outdated

# Check for security vulnerabilities
composer audit
```

## Useful NPM Commands

```bash
# Install dependencies
npm install

# Update dependencies
npm update

# Build for development
npm run dev

# Build for production
npm run build

# Watch for changes
npm run watch

# Check for outdated packages
npm outdated

# Update package
npm update package-name
```

---

**Note:** Add your project-specific custom commands in the "Custom Artisan Commands" section above.
