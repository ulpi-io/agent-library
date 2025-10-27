# Project-Specific Commands

Custom commands and workflows specific to this project. Standard Laravel commands are in the main CLAUDE.md file.

## Custom Artisan Commands

- `php artisan app:sync-users` - Sync users from external authentication service (runs hourly via cron)
- `php artisan app:generate-reports --month=2024-10` - Generate monthly business reports with analytics
- `php artisan app:process-webhooks` - Process queued webhooks from external APIs (Stripe, PayPal, etc.)
- `php artisan app:cleanup-temp-files` - Remove temporary files older than 7 days
- `php artisan app:recalculate-metrics` - Recalculate and cache business metrics dashboard
- `php artisan app:export-users --format=csv` - Export users to CSV/JSON for reporting
- `php artisan app:import-legacy-data {file}` - Import data from legacy system

## Project Setup

- `composer install && npm install && cp .env.example .env && php artisan key:generate` - First-time project setup
- `php artisan migrate:fresh --seed && npm run build` - Reset database with seed data and build assets
- `php artisan ide-helper:generate && php artisan ide-helper:models` - Generate IDE helper files for autocomplete

## Deployment Workflows

- `./deploy.sh production` - Deploy to production (runs tests, builds assets, migrates DB, clears cache)
- `./deploy.sh staging` - Deploy to staging environment
- `./rollback.sh production` - Rollback last production deployment
- `php artisan down --secret="deployment-token-xyz"` - Enable maintenance mode with bypass token
- `php artisan app:warmup-cache` - Pre-warm application cache after deployment

## Database Operations

- `php artisan app:backup-db` - Backup database to S3 with timestamp
- `php artisan app:restore-db {filename}` - Restore database from S3 backup
- `php artisan app:anonymize-db` - Anonymize database for local development (removes PII)
- `php artisan app:sync-staging-db` - Pull production data to staging (anonymized)

## Monitoring & Debugging

- `php artisan app:health-check` - Run comprehensive health checks (DB, Redis, S3, external APIs)
- `php artisan app:check-queue-health` - Check queue worker status and failed jobs count
- `tail -f storage/logs/laravel-$(date +%Y-%m-%d).log` - Watch today's application logs
- `php artisan app:test-email {email}` - Send test email to verify SMTP configuration
- `php artisan app:test-webhook {url}` - Test webhook endpoint with sample payload

## Cache Management

- `php artisan app:cache-warmup` - Pre-warm critical application caches
- `php artisan app:clear-user-cache {user_id}` - Clear cache for specific user
- `php artisan app:invalidate-api-cache` - Invalidate all API response caches

## Job Management

- `php artisan app:retry-failed-payments` - Retry all failed payment jobs from last 24 hours
- `php artisan app:cancel-pending-orders` - Cancel orders pending longer than 30 minutes
- `php artisan app:dispatch-daily-summary` - Manually dispatch daily summary email job
