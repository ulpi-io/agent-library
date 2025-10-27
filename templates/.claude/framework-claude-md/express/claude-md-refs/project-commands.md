# Project Commands

Common Node.js/Express.js commands and project-specific workflows.

## First-Time Project Setup

```bash
# Clone repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
npm install

# Environment setup
cp .env.example .env
# Edit .env with your configuration

# Database setup
npm run migrate
npm run seed  # Optional: if you have seeders

# Start development server
npm run dev
```

## Development Commands

### Server & Application
```bash
# Start development server with hot reload (nodemon)
npm run dev

# Start production server
npm start

# Start with PM2 (production)
pm2 start ecosystem.config.js

# Watch mode for development
npm run watch

# Debug mode
npm run debug
```

### Database Operations

#### Sequelize
```bash
# Run migrations
npm run migrate
# or
npx sequelize-cli db:migrate

# Rollback last migration
npx sequelize-cli db:migrate:undo

# Rollback all migrations
npx sequelize-cli db:migrate:undo:all

# Run seeders
npm run seed
# or
npx sequelize-cli db:seed:all

# Run specific seeder
npx sequelize-cli db:seed --seed 20231201-users.js

# Undo all seeders
npx sequelize-cli db:seed:undo:all

# Check migration status
npx sequelize-cli db:migrate:status

# Create new migration
npx sequelize-cli migration:generate --name create-users-table

# Create new seeder
npx sequelize-cli seed:generate --name demo-users
```

#### Prisma (Alternative)
```bash
# Run migrations
npx prisma migrate dev

# Deploy migrations (production)
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (GUI)
npx prisma studio

# Seed database
npx prisma db seed

# Create new migration
npx prisma migrate dev --name add-user-status
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Run Prettier
npm run format

# Check Prettier without fixing
npm run format:check

# Run both lint and format
npm run lint && npm run format
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- users.test.js

# Run specific test suite
npm test -- --testNamePattern="POST /api/v1/users"

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run tests in CI mode (no watch)
npm run test:ci
```

### Queue Operations (Bull/BullMQ)

```bash
# Start queue worker
npm run queue:work

# Start queue worker for specific queue
npm run queue:work:email

# Clear all jobs from queue
npm run queue:clear

# View queue statistics
npm run queue:stats
```

#### Bull Board (Queue Monitoring UI)
```bash
# Access Bull Board at http://localhost:3000/admin/queues
# Configure in your app:

const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const serverAdapter = new ExpressAdapter();
createBullBoard({
  queues: [new BullAdapter(emailQueue), new BullAdapter(jobQueue)],
  serverAdapter
});

app.use('/admin/queues', serverAdapter.getRouter());
```

## Code Generation

### Manual File Creation (No built-in generators)

```bash
# Create controller
touch src/controllers/user-controller.js

# Create service
touch src/services/user-service.js

# Create repository
touch src/repositories/user-repository.js

# Create middleware
touch src/middleware/auth.js

# Create validator
touch src/validators/user-validator.js

# Create route
touch src/routes/users.js

# Create test
touch tests/integration/users.test.js
touch tests/unit/user-service.test.js
```

### Sequelize Model Generation
```bash
# Generate model
npx sequelize-cli model:generate --name User --attributes email:string,password:string,name:string

# This creates:
# - models/user.js
# - migrations/XXXXXX-create-user.js
```

## Custom NPM Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage",
    "lint": "eslint src tests",
    "lint:fix": "eslint src tests --fix",
    "format": "prettier --write \"src/**/*.js\" \"tests/**/*.js\"",
    "format:check": "prettier --check \"src/**/*.js\" \"tests/**/*.js\"",
    "migrate": "npx sequelize-cli db:migrate",
    "migrate:undo": "npx sequelize-cli db:migrate:undo",
    "seed": "npx sequelize-cli db:seed:all",
    "queue:work": "node src/workers/queue-worker.js",
    "queue:clear": "node src/scripts/clear-queues.js"
  }
}
```

## Project-Specific Custom Commands

Document your custom commands here:

```bash
# Example custom commands (replace with your actual commands):

# npm run sync:users
# Description: Sync users from external authentication service
# Usage: Run hourly via cron or scheduler

# npm run generate:reports -- --month=2024-10
# Description: Generate monthly business reports
# Usage: Run manually or via scheduler

# npm run cleanup:temp-files
# Description: Remove temporary files older than 7 days
# Usage: Run daily via scheduler

# npm run backup:database
# Description: Create database backup
# Usage: Run daily via cron
```

## Deployment Commands

### Standard Deployment Steps

```bash
# 1. Pull latest code
git pull origin main

# 2. Install/update dependencies (production only)
npm ci --production

# 3. Run migrations
npm run migrate

# 4. Restart application
pm2 reload ecosystem.config.js

# 5. Check application status
pm2 status
```

### Deployment with Maintenance Mode

```bash
# 1. Put application in maintenance mode
# (You need to implement this - show maintenance page)
npm run maintenance:on

# 2. Deploy changes (steps above)

# 3. Exit maintenance mode
npm run maintenance:off
```

### PM2 Process Management

```bash
# Start application
pm2 start ecosystem.config.js

# Restart application (graceful)
pm2 reload ecosystem.config.js

# Restart application (hard)
pm2 restart ecosystem.config.js

# Stop application
pm2 stop ecosystem.config.js

# Delete from PM2
pm2 delete ecosystem.config.js

# View logs
pm2 logs

# View logs for specific app
pm2 logs api

# Monitor applications
pm2 monit

# View application list
pm2 list
pm2 status

# Save PM2 process list
pm2 save

# Resurrect saved processes (after reboot)
pm2 resurrect

# Generate startup script
pm2 startup

# View application info
pm2 info api

# Flush logs
pm2 flush
```

### Zero-Downtime Deployment

```bash
# PM2 reload (zero-downtime)
pm2 reload ecosystem.config.js

# Or use deployment tool like Shipit
npx shipit production deploy
```

## Docker Commands (if using Docker)

### Development
```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild containers
docker-compose up -d --build

# Run migrations in container
docker-compose exec api npm run migrate

# Access container shell
docker-compose exec api sh

# Run tests in container
docker-compose exec api npm test
```

### Production
```bash
# Build image
docker build -t myapp:latest .

# Run container
docker run -d -p 3000:3000 --env-file .env myapp:latest

# View logs
docker logs -f <container-id>

# Stop container
docker stop <container-id>
```

## Cron Jobs & Scheduled Tasks

### Using node-cron
```javascript
// src/schedulers/index.js
const cron = require('node-cron');

// Run every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running daily cleanup task');
  // Your task here
});

// Run every hour
cron.schedule('0 * * * *', () => {
  console.log('Running hourly sync task');
  // Your task here
});
```

### Using System Cron
Add to crontab (`crontab -e`):
```bash
# Run every 5 minutes
*/5 * * * * cd /path/to/project && npm run sync:data >> /var/log/cron.log 2>&1

# Run daily at 2 AM
0 2 * * * cd /path/to/project && npm run cleanup:temp-files >> /var/log/cron.log 2>&1

# Run hourly
0 * * * * cd /path/to/project && npm run process:queue >> /var/log/cron.log 2>&1
```

## Redis Commands

### Redis CLI
```bash
# Connect to Redis
redis-cli

# Connect to specific database
redis-cli -n 1

# View all keys
redis-cli KEYS "*"

# View specific keys
redis-cli KEYS "cache:*"

# Get value
redis-cli GET "cache:users:1"

# Delete key
redis-cli DEL "cache:users:1"

# Flush database
redis-cli FLUSHDB

# Flush all databases
redis-cli FLUSHALL

# Check Redis connection
redis-cli PING
```

### Cache Management
```bash
# Clear all cache (if you have a script)
npm run cache:clear

# Clear specific cache pattern
# (Implement in your app)
```

## Maintenance & Monitoring

### Application Health

```bash
# Check health endpoint
curl http://localhost:3000/health

# Check readiness endpoint
curl http://localhost:3000/ready

# View application metrics (if implemented)
curl http://localhost:3000/metrics
```

### Log Management

```bash
# View logs (if using PM2)
pm2 logs

# View logs (if using systemd)
journalctl -u myapp -f

# View error logs
pm2 logs --err

# View specific application logs
pm2 logs api

# Clear logs
pm2 flush

# Rotate logs (if using logrotate)
logrotate -f /etc/logrotate.d/myapp
```

### Process Monitoring

```bash
# Check if application is running
pm2 status

# Monitor CPU/memory usage
pm2 monit

# View detailed process info
pm2 info api

# Check Node.js process
ps aux | grep node

# Kill zombie processes
pkill -9 node
```

## Debugging

### Node.js Debugger
```bash
# Start with debugger
node --inspect src/index.js

# Start with debugger and break at first line
node --inspect-brk src/index.js

# Debug with nodemon
nodemon --inspect src/index.js

# Connect debugger on port 9229
chrome://inspect
```

### Environment Variables
```bash
# Print all environment variables
npm run env

# Check specific variable
echo $NODE_ENV
echo $DATABASE_URL

# Load .env and run command
npx dotenv -- node src/index.js
```

### Database Debugging
```bash
# Sequelize query logging (set in config)
# logging: console.log

# PostgreSQL query logging
tail -f /var/log/postgresql/postgresql-*.log

# MySQL query logging
tail -f /var/log/mysql/mysql.log
```

## Useful npm Commands

```bash
# Install dependencies
npm install

# Install production dependencies only
npm ci --production

# Install specific package
npm install <package-name>

# Install dev dependency
npm install --save-dev <package-name>

# Remove package
npm uninstall <package-name>

# Update all dependencies
npm update

# Update specific package
npm update <package-name>

# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit

# Fix security vulnerabilities
npm audit fix

# List installed packages
npm list --depth=0

# View package info
npm info <package-name>

# Clear npm cache
npm cache clean --force
```

## Git Hooks (using Husky)

### Setup
```bash
# Install Husky
npm install --save-dev husky

# Initialize Husky
npx husky init

# Add pre-commit hook
echo "npm run lint && npm test" > .husky/pre-commit

# Add commit-msg hook (for conventional commits)
echo "npx commitlint --edit \$1" > .husky/commit-msg
```

### Common Hooks
```bash
# .husky/pre-commit
npm run lint
npm run format:check
npm test

# .husky/pre-push
npm test
npm run test:coverage
```

---

**Note:** Replace custom command examples with your actual project-specific commands. Document any special deployment or maintenance procedures specific to your infrastructure.
