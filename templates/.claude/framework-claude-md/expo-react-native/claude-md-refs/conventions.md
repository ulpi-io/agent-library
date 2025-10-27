# Team Conventions

Development standards and workflow conventions for this Expo React Native project.

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
refactor: simplify auth hook logic
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
- [ ] Component tests added/updated
- [ ] Tested on iOS simulator/device
- [ ] Tested on Android emulator/device
- [ ] Manual testing performed

## Checklist
- [ ] Code follows TypeScript and React Native conventions
- [ ] No console.logs left in code
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
- [ ] Code passes TypeScript type checking
- [ ] Tests included for new features/fixes
- [ ] No performance regressions (excessive re-renders)
- [ ] Security considerations addressed
- [ ] No hardcoded values (use constants/config)
- [ ] Error handling implemented
- [ ] No commented-out code
- [ ] Environment variables documented in `.env.example`
- [ ] Platform-specific code properly handled
- [ ] Accessibility considered

**Review SLA:** Reviews completed within 24 hours (business days)

**Blocking Issues:**
- Security vulnerabilities
- Failing tests
- Missing tests for new features
- Hardcoded secrets or sensitive data
- Unhandled error cases
- Performance issues (memory leaks, excessive re-renders)

**Auto-merge:** Not permitted - all changes require manual review

## Code Style

**Standard:** ESLint + Prettier + TypeScript

```bash
# Check code style
npm run lint

# Fix code style
npm run format

# Check TypeScript
npm run tsc
```

**ESLint Configuration:**
```javascript
// .eslintrc.js
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
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
  tabWidth: 2,
  arrowParens: 'avoid',
};
```

**Run Before Commit:**
```bash
npm run lint
npm run format
npm run tsc
npm test
```

**Additional Standards:**
- Use TypeScript for all new code
- Enable strict mode in tsconfig.json
- Use explicit types for props and state
- Avoid `any` - use `unknown` or proper types
- Use const by default, let when needed, never var

## Testing Standards

**Required Tests:**
- Component test for every screen
- Unit test for every custom hook
- Unit test for every service method
- Snapshot test for complex components
- Integration test for critical flows

**Coverage Requirements:**
- Hooks: Minimum 80% code coverage
- Services: Minimum 80% code coverage
- Components: Snapshot + interaction tests
- Critical paths (auth, payments): Minimum 95% coverage

**Test Organization:**
```
__tests__/
  components/
    ui/
      Button.test.tsx
  hooks/
    useAuth.test.ts
  services/
    api.test.ts
  screens/
    HomeScreen.test.tsx
```

**Test Naming:** Use descriptive names
```typescript
describe('Button', () => {
  it('should call onPress when pressed', () => {});
  it('should be disabled when disabled prop is true', () => {});
  it('should render children correctly', () => {});
});
```

**Test Data:** Use factories
```typescript
// __tests__/factories/user-factory.ts
export const createUser = (overrides = {}): User => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});
```

**Mock External Services:**
```typescript
jest.mock('expo-secure-store');
jest.mock('../services/api');

// In test
import * as SecureStore from 'expo-secure-store';
(SecureStore.getItemAsync as jest.Mock).mockResolvedValue('token');
```

**Run Tests Before Commit:**
```bash
npm test
```

**CI/CD:**
- Tests run automatically on every PR
- Tests must pass before merge
- Coverage reports generated on every PR
- Fail PR if coverage drops below threshold

## Component Conventions

**File Structure:**
- One component per file
- Co-locate styles with component
- Extract complex logic to custom hooks
- Keep components under 200 lines

**Component Naming:**
- PascalCase for component files (e.g., `UserProfile.tsx`)
- Screens: PascalCase + "Screen" suffix (e.g., `HomeScreen.tsx`)
- Match component name with filename

**Props Interface:**
```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, disabled, variant = 'primary' }) => {
  // Implementation
};
```

**Styles:**
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

## Hook Conventions

**Custom Hooks:**
- Always start with "use" prefix
- Return objects, not arrays (for readability)
- Document hook behavior with JSDoc
- Handle cleanup in useEffect

```typescript
/**
 * Fetches data from the API and manages loading/error states
 * @param endpoint - API endpoint to fetch from
 * @returns Object with data, isLoading, error, and refetch
 */
export const useApi = <T,>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Implementation

  return { data, isLoading, error, refetch };
};
```

## Navigation Conventions

**Route Naming:**
- Use lowercase with hyphens for file-based routes
- Use PascalCase for screen components
- Dynamic routes: `[id].tsx` for `/user/:id`

**Route Organization:**
```
app/
  (tabs)/
    _layout.tsx
    index.tsx        # Home tab
    profile.tsx      # Profile tab
  (auth)/
    _layout.tsx
    login.tsx
    register.tsx
  [id].tsx           # Dynamic route
  +not-found.tsx     # 404 page
```

**Navigation:**
- Prefer declarative `<Link>` over imperative `router.push()`
- Use type-safe routes with TypeScript
- Handle navigation errors gracefully

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
    "total": 100
  }
}
```

**Error Format:**
```json
{
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
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

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `UserProfile.tsx`, `LoginScreen.tsx`)
- Hooks: camelCase with "use" prefix (e.g., `useAuth.ts`, `useApi.ts`)
- Utils: camelCase (e.g., `formatDate.ts`, `validateEmail.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL.ts`)

**Variables and Functions:**
- camelCase: `getUserById`, `isAuthenticated`, `userProfile`
- Boolean variables: `is*`, `has*`, `can*`, `should*`

**Constants:**
- UPPER_SNAKE_CASE: `MAX_RETRY_ATTEMPTS`, `DEFAULT_PAGE_SIZE`, `API_TIMEOUT`

**Types and Interfaces:**
- PascalCase: `User`, `ApiResponse`, `ButtonProps`
- Suffix props with "Props": `ButtonProps`, `ScreenProps`

## Documentation Standards

**JSDoc Comments:** All public functions and hooks
```typescript
/**
 * Authenticates user with email and password
 * @param credentials - User email and password
 * @returns Promise resolving to authenticated user
 * @throws {AuthenticationError} If credentials are invalid
 */
export const login = async (credentials: Credentials): Promise<User> => {
  // Implementation
};
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
- Document platform-specific setup

**Environment Variables:**
- Always update `.env.example` with new variables
- Document purpose of each variable
- Never commit `.env` to version control

```bash
# .env.example
# API Configuration
API_URL=http://localhost:3000
API_KEY=your-api-key-here

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_PUSH_NOTIFICATIONS=true

# EAS Configuration
EAS_PROJECT_ID=your-project-id
```

## Security Standards

**Environment Variables:**
- Never commit `.env` files
- Always update `.env.example` (with dummy values)
- Document each variable's purpose
- Use EAS Secrets for production

**Code Review for Security:**
- Authentication/authorization changes require security-focused review
- Payment-related code requires lead developer review
- Sensitive data handling reviewed carefully
- Third-party SDK integrations reviewed for security

**Secrets Management:**
- Development: `.env` file
- Production: EAS Secrets
- Never hardcode API keys or tokens
- Rotate keys quarterly

**Data Security:**
- Use `expo-secure-store` for sensitive data
- Validate ALL user input
- Sanitize data before storage
- Never log sensitive data

## Performance Standards

**Component Optimization:**
- Use `React.memo()` for expensive components
- Use `useMemo()` for expensive calculations
- Use `useCallback()` for event handlers passed to children
- Avoid inline object/array creation in render

**List Optimization:**
- Use `FlatList` with proper optimization props
- Implement `getItemLayout` for fixed-height items
- Set appropriate `initialNumToRender` and `maxToRenderPerBatch`
- Use `keyExtractor` with stable IDs

**Image Optimization:**
- Use `expo-image` for optimized loading
- Implement proper caching strategies
- Resize images appropriately
- Use WebP format when possible

**Bundle Size:**
- Monitor with `npx expo export --dump-sourcemap`
- Lazy load routes/screens when possible
- Remove unused dependencies regularly

## Accessibility Standards

**Requirements:**
- All interactive elements must have `accessible` prop or `accessibilityLabel`
- All images must have `accessibilityLabel`
- Form inputs must have `accessibilityLabel`
- Use proper semantic components

**Testing:**
- Test with VoiceOver (iOS) and TalkBack (Android)
- Test keyboard navigation on web
- Ensure color contrast meets WCAG standards
- Test with screen reader enabled

## Deployment Standards

**Pre-Deployment Checklist:**
- [ ] All tests passing locally
- [ ] All tests passing in CI/CD
- [ ] Code reviewed and approved
- [ ] Version bumped in `app.config.js`
- [ ] Changelog updated
- [ ] Environment variables configured in EAS
- [ ] Tested on physical iOS device
- [ ] Tested on physical Android device
- [ ] Rollback plan documented

**Deployment Process:**
1. Update version in `app.config.js`
2. Run tests: `npm test`
3. Build for iOS: `eas build --platform ios --profile production`
4. Build for Android: `eas build --platform android --profile production`
5. Test builds on physical devices
6. Submit to stores: `eas submit --platform all`
7. Monitor crash reports for 24 hours

**Version Numbering:**
- Follow Semantic Versioning (MAJOR.MINOR.PATCH)
- Increment MAJOR for breaking changes
- Increment MINOR for new features
- Increment PATCH for bug fixes
- iOS buildNumber and Android versionCode auto-incremented by EAS

**Post-Deployment:**
- Monitor error rates in crash reporting
- Check analytics for anomalies
- Verify critical user flows
- Monitor app store reviews
- Check performance metrics
- Announce deployment in team channel

**Rollback Procedure:**
```bash
# If needed, submit previous build
eas submit --id <previous-build-id>

# Or publish rollback update via EAS Update
eas update --branch production --message "Rollback to previous version"
```

## Platform-Specific Conventions

**iOS:**
- Follow Apple Human Interface Guidelines
- Test on iPhone and iPad
- Handle notch and safe areas properly
- Use iOS-specific haptics

**Android:**
- Follow Material Design guidelines
- Test on various screen sizes
- Handle back button properly
- Use Android-specific permissions

**Web:**
- Progressive enhancement approach
- Handle responsive design
- Test on desktop and mobile browsers
- Proper SEO meta tags

---

**Note:** These conventions work great for most teams. Adjust as your team's workflow evolves.
