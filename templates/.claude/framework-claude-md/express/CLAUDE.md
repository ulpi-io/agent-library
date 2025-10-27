# Express.js Framework Guide

Framework-specific guidelines and conventions for Express.js development with Claude Code.

## About This File

**Purpose:** Provides Express.js framework best practices and conventions. This is your starting point for any Express.js project.

**Scope:** Universal Express.js patterns that apply to all projects. Project-specific decisions (database, queue driver, ORM choice) are documented in `.claude/claude-md-refs/`.

**Token Management:** If you want to reduce token usage, comment out sections you don't use.

---

## Project Documentation

Additional project-specific guidance is available in:

- **@.claude/claude-md-refs/project-commands.md** - Project commands and deployment workflows
- **@.claude/claude-md-refs/architecture.md** - Architecture decisions and patterns
- **@.claude/claude-md-refs/conventions.md** - Team conventions and standards

---

## Standard Node.js Commands

### Development
```bash
npm install          # Install dependencies
npm run dev          # Start development server with hot reload
npm start            # Start production server
npm test             # Run tests
npm run lint         # Run ESLint
npm run format       # Run Prettier
```

### Testing
```bash
npm test                    # Run all tests
npm run test:watch          # Run tests in watch mode
npm run test:coverage       # Generate coverage report
npm run test:integration    # Run integration tests only
npm run test:unit           # Run unit tests only
```

## Code Style

### JavaScript/TypeScript Standards
- Use ES6+ features (async/await, destructuring, arrow functions)
- Use 2-space indentation
- Use semicolons consistently
- Use const by default, let when reassignment needed, avoid var
- Use template literals for string interpolation
- Use async/await over promises/callbacks

### File Organization
```
src/
  routes/           # Route definitions (thin, 5-10 lines)
  controllers/      # Request handlers (orchestrate services)
  services/         # Business logic layer
  repositories/     # Data access layer (optional)
  models/           # Database models (Sequelize/Mongoose/Prisma)
  middleware/       # Custom middleware
  utils/            # Utility functions
  config/           # Configuration files
  jobs/             # Queue job processors
  validators/       # Validation schemas (Joi/Zod)
  types/            # TypeScript type definitions
```

### Naming Conventions
- Files: kebab-case (e.g., `user-service.js`, `auth-middleware.js`)
- Classes: PascalCase (e.g., `UserService`, `AuthMiddleware`)
- Functions/variables: camelCase (e.g., `getUserById`, `isAuthenticated`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_ATTEMPTS`, `API_VERSION`)
- Routes: kebab-case (e.g., `/api/v1/user-profiles`)

## Application Architecture

### Route Handler Pattern
Keep route handlers thin - they should only handle HTTP concerns:

```javascript
// routes/users.js
router.post('/', validateUser, async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    next(error);
  }
});
```

### Service Layer Pattern
All business logic lives in service classes:

```javascript
// services/user-service.js
class UserService {
  constructor(userRepository, emailService, logger) {
    this.userRepository = userRepository;
    this.emailService = emailService;
    this.logger = logger;
  }

  async createUser(userData) {
    // Validation
    // Business logic
    // Data persistence
    // Side effects (emails, etc.)
    return user;
  }
}
```

### Repository Pattern (Optional)
For complex data access logic:

```javascript
// repositories/user-repository.js
class UserRepository {
  async findById(id) {
    return await User.findByPk(id, {
      include: ['profile', 'roles']
    });
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }
}
```

## Middleware Architecture

### Middleware Order
```javascript
// Correct middleware order
app.use(helmet());                    // Security headers first
app.use(cors(corsOptions));           // CORS
app.use(compression());               // Compression
app.use(express.json());              // Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);               // Logging
app.use(rateLimiter);                 // Rate limiting
app.use('/api', routes);              // Routes
app.use(errorHandler);                // Error handling last
```

### Custom Middleware Pattern
```javascript
// middleware/auth.js
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedError('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
```

## Async Error Handling

### Async Wrapper
Always wrap async route handlers:

```javascript
// utils/async-handler.js
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
router.get('/', asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  res.json({ data: users });
}));
```

### Custom Error Classes
```javascript
// utils/errors.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 422);
  }
}
```

### Centralized Error Handler
```javascript
// middleware/error-handler.js
const errorHandler = (err, req, res, next) => {
  logger.error({
    err,
    req: { method: req.method, url: req.url }
  });

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';

  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};
```

## Validation

### Input Validation with Joi
```javascript
// validators/user-validator.js
const Joi = require('joi');

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).max(100).required()
});

const validateUser = (req, res, next) => {
  const { error, value } = createUserSchema.validate(req.body);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
  req.validatedBody = value;
  next();
};
```

### Config-Driven Validation
```javascript
// config/validation.js
module.exports = {
  user: {
    nameMinLength: process.env.NAME_MIN_LENGTH || 2,
    nameMaxLength: process.env.NAME_MAX_LENGTH || 100,
    passwordMinLength: process.env.PASSWORD_MIN_LENGTH || 8
  }
};

// Use in validator
const config = require('../config/validation');

const schema = Joi.object({
  name: Joi.string()
    .min(config.user.nameMinLength)
    .max(config.user.nameMaxLength)
});
```

## Logging with Pino

### Logger Setup
```javascript
// config/logger.js
const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err
  }
});

module.exports = logger;
```

### Request Logging Middleware
```javascript
// middleware/logger.js
const pinoHttp = require('pino-http');
const logger = require('../config/logger');

const requestLogger = pinoHttp({
  logger,
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  }
});
```

### Structured Logging
```javascript
// In service
logger.info({ userId: user.id, action: 'user_created' }, 'User created successfully');
logger.error({ err, userId }, 'Failed to create user');
```

## Database Best Practices

### Connection Management
```javascript
// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});
```

### Transactions
```javascript
// In service
async createUserWithProfile(userData, profileData) {
  const t = await sequelize.transaction();

  try {
    const user = await User.create(userData, { transaction: t });
    const profile = await Profile.create(
      { ...profileData, userId: user.id },
      { transaction: t }
    );

    await t.commit();
    return { user, profile };
  } catch (error) {
    await t.rollback();
    throw error;
  }
}
```

### Query Optimization
- Use `attributes` to select specific columns
- Use `include` for eager loading (prevent N+1)
- Add indexes on frequently queried columns
- Use pagination for large result sets

```javascript
// Good: Eager loading
const users = await User.findAll({
  attributes: ['id', 'email', 'name'],
  include: ['profile', 'roles'],
  limit: 20,
  offset: 0
});

// Bad: N+1 query problem
const users = await User.findAll();
for (const user of users) {
  user.profile = await user.getProfile(); // N+1!
}
```

## API Development

### RESTful Route Design
```javascript
// Good REST structure
GET    /api/v1/users           # List users
GET    /api/v1/users/:id       # Get single user
POST   /api/v1/users           # Create user
PUT    /api/v1/users/:id       # Update user (full)
PATCH  /api/v1/users/:id       # Update user (partial)
DELETE /api/v1/users/:id       # Delete user
```

### Response Format
```javascript
// Success response
res.status(200).json({
  data: user,
  meta: {
    timestamp: new Date().toISOString()
  }
});

// List response with pagination
res.status(200).json({
  data: users,
  meta: {
    page: 1,
    perPage: 20,
    total: 100,
    totalPages: 5
  }
});

// Error response
res.status(422).json({
  error: {
    message: 'Validation failed',
    details: [
      { field: 'email', message: 'Email is required' }
    ]
  }
});
```

### HTTP Status Codes
- `200 OK` - Successful GET, PUT, PATCH
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Invalid request format
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Authenticated but not authorized
- `404 Not Found` - Resource doesn't exist
- `422 Unprocessable Entity` - Validation failed
- `500 Internal Server Error` - Server error

## Security Best Practices

### Helmet Security Headers
```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### CORS Configuration
```javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per window
  message: 'Too many requests, please try again later'
});

app.use('/api/', limiter);
```

### Environment Variables
```javascript
// .env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379
```

**Never commit .env files**

## Testing

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Integration Tests with Supertest
```javascript
// tests/integration/users.test.js
const request = require('supertest');
const app = require('../src/app');

describe('POST /api/v1/users', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.email).toBe('test@example.com');
  });

  it('should return 422 for invalid email', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        email: 'invalid-email',
        password: 'password123'
      });

    expect(response.status).toBe(422);
  });
});
```

### Unit Tests for Services
```javascript
// tests/unit/user-service.test.js
const UserService = require('../src/services/user-service');

describe('UserService', () => {
  let userService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findByEmail: jest.fn()
    };
    userService = new UserService(mockRepository);
  });

  it('should create a user', async () => {
    mockRepository.findByEmail.mockResolvedValue(null);
    mockRepository.create.mockResolvedValue({ id: 1, email: 'test@example.com' });

    const user = await userService.createUser({ email: 'test@example.com' });

    expect(user).toHaveProperty('id');
    expect(mockRepository.create).toHaveBeenCalled();
  });
});
```

## Production Deployment

### Process Management with PM2
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'api',
    script: './src/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    max_memory_restart: '1G'
  }]
};
```

### Graceful Shutdown
```javascript
// src/index.js
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

const gracefulShutdown = () => {
  logger.info('Received shutdown signal');

  server.close(() => {
    logger.info('HTTP server closed');

    // Close database connections
    sequelize.close().then(() => {
      logger.info('Database connections closed');
      process.exit(0);
    });
  });

  // Force close after 10 seconds
  setTimeout(() => {
    logger.error('Forcing shutdown');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
```

### Health Checks
```javascript
// routes/health.js
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.get('/ready', async (req, res) => {
  try {
    await sequelize.authenticate();
    await redis.ping();
    res.status(200).json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready', error: error.message });
  }
});
```

## Configuration Management

### Config-Driven Development
```javascript
// config/index.js
module.exports = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  database: {
    url: process.env.DATABASE_URL,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX, 10) || 10,
      min: parseInt(process.env.DB_POOL_MIN, 10) || 2
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW, 10) || 900000,
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100
  }
};
```

## Recommended Packages

- `express` - Web framework
- `pino` / `pino-http` - Logging
- `joi` or `zod` - Validation
- `helmet` - Security headers
- `cors` - CORS middleware
- `express-rate-limit` - Rate limiting
- `compression` - Response compression
- `passport` / `passport-jwt` - Authentication
- `sequelize` or `prisma` or `typeorm` - ORM
- `bull` or `bullmq` - Job queues
- `redis` / `ioredis` - Redis client
- `jest` - Testing framework
- `supertest` - HTTP testing
- `dotenv` - Environment variables
- `pm2` - Process manager

---

*Last updated: 2025-10-27*
*Framework: Express.js*
