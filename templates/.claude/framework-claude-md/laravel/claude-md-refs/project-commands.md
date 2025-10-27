# Project-Specific Commands

**Purpose:** Document your custom artisan commands, deployment scripts, and project-specific workflows that Claude Code should know about.

**Instructions:** Replace the examples below with your actual custom commands. Delete sections that don't apply to your project.

---

## Custom Artisan Commands

Document custom artisan commands you've created for this project:

```bash
# php artisan app:your-command - Description of what it does
# php artisan app:another-command {arg} --option - Description
```

**Example:**
```bash
# php artisan app:sync-users - Sync users from external system (if you have this)
# php artisan app:generate-reports - Generate monthly reports (if you have this)
```

## Project Setup

Document your first-time setup workflow:

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm run build
```

## Deployment Workflows

Document your deployment process:

```bash
# If you have custom deployment scripts:
# ./deploy.sh production
# ./deploy.sh staging

# Or manual deployment steps:
# git pull
# composer install --no-dev --optimize-autoloader
# php artisan migrate --force
# php artisan config:cache
# php artisan route:cache
# php artisan view:cache
# npm run build
```

## Database Operations

Document any custom database management commands:

```bash
# php artisan app:backup-db - If you have custom backup command
# php artisan app:restore-db - If you have custom restore command
```

## Monitoring & Debugging

Document monitoring and health check commands:

```bash
# tail -f storage/logs/laravel-$(date +%Y-%m-%d).log - Watch logs
# php artisan app:health-check - If you have custom health check
```

## Cache Management

Document any custom cache management beyond standard Laravel commands:

```bash
# Standard Laravel cache commands (always available):
# php artisan cache:clear
# php artisan config:clear
# php artisan route:clear
# php artisan view:clear

# Custom cache commands (add if you have them):
# php artisan app:cache-warmup
```

## Job Management

Document custom job management commands:

```bash
# Standard Laravel queue commands (always available):
# php artisan queue:work
# php artisan queue:restart
# php artisan queue:failed
# php artisan queue:retry {id}

# Custom job commands (add if you have them):
# php artisan app:retry-failed-payments
```

---

**Note:** This is a template. Remove the example sections and add your actual project commands.
