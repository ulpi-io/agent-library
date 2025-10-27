# Project Architecture

Architecture decisions and patterns for this Expo React Native project.

## Application Architecture

**Pattern:** Component-Service-Hook architecture

- **Screens**: Route components in `app/` directory (Expo Router)
- **Components**: Reusable UI components in `components/`
- **Hooks**: Custom hooks for logic reuse in `hooks/`
- **Services**: API and external service integrations in `services/`
- **Utils**: Pure utility functions in `utils/`
- **Types**: TypeScript type definitions in `types/`

**Why:** Separates concerns, makes testing easier, keeps components focused on UI.

## Navigation

**Router:** Expo Router (file-based routing)
- File-based routes in `app/` directory
- Dynamic routes: `[id].tsx` for `/item/:id`
- Route groups: `(tabs)/` for tab navigation
- Layouts: `_layout.tsx` for nested navigation

**Navigation Methods:**
- Declarative: `<Link href="/profile">` component
- Imperative: `router.push('/profile')` from `expo-router`
- Type-safe routes with TypeScript

## State Management

**Global State:** React Context API
- Context for theme, auth, and app-wide settings
- Custom hooks (e.g., `useAuth`, `useTheme`) to access context
- Providers wrapped in root `_layout.tsx`

**Local State:** React Hooks
- `useState` for simple component state
- `useReducer` for complex state logic
- `useMemo` and `useCallback` for performance

**Server State (Optional):** @tanstack/react-query
- For API data caching and synchronization
- Automatic background refetching
- Optimistic updates

## API Integration

**Client:** Native Fetch API
- Centralized API client in `services/api.ts`
- Axios or other libraries optional (prefer native when possible)
- Error handling with custom error classes
- Request/response interceptors for tokens

**Configuration:**
```typescript
const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';
const API_TIMEOUT = 30000; // 30 seconds
```

**Authentication:**
- Bearer token in Authorization header
- Tokens stored in `expo-secure-store`
- Automatic token refresh on 401 errors

## Data Storage

**Secure Storage:** expo-secure-store
- Use for auth tokens, API keys, sensitive data
- Encrypted storage on iOS and Android
- Falls back to AsyncStorage on web (with warning)

**Regular Storage:** @react-native-async-storage/async-storage
- Use for non-sensitive data (preferences, cache)
- Key-value store
- Async operations

**File Storage:** expo-file-system
- For local file operations
- Download/upload files
- Cache management

## Logging

**Framework:** react-native-logs
- Structured JSON logging
- Log levels: debug, info, warn, error
- Console transport in development
- File/remote transport in production
- Correlation IDs for request tracing

**Configuration:**
```typescript
const config = {
  levels: { debug: 0, info: 1, warn: 2, error: 3 },
  severity: __DEV__ ? 'debug' : 'error',
  transport: consoleTransport,
  async: true,
  dateFormat: 'time',
};
```

**What to Log:**
- All errors (with stack traces)
- Authentication attempts (success/failure)
- API calls to external services
- Navigation events (for analytics)
- Performance metrics

**Never Log:**
- Passwords or secrets
- Full credit card numbers
- Personal identification numbers
- Auth tokens

## Push Notifications

**Service:** expo-notifications
- Push token registration
- Local and remote notifications
- Notification handling (foreground/background)
- Badge management

**Configuration:**
- Configure push notification credentials in EAS
- Set up notification channels (Android)
- Request permissions on app start
- Handle notification taps

## Testing Strategy

**Framework:** Jest with jest-expo preset

**Required Tests:**
- Component test for every screen
- Unit test for every custom hook
- Unit test for every service method
- Integration test for critical user flows

**Coverage Requirements:**
- Hooks: Minimum 80% code coverage
- Services: Minimum 80% code coverage
- Components: Snapshot + interaction tests
- Critical paths (auth, payments): Minimum 95% coverage

**Test Organization:**
```
__tests__/
  components/
    Button.test.tsx
  hooks/
    useAuth.test.ts
  services/
    api.test.ts
  integration/
    auth-flow.test.tsx
```

**Test Libraries:**
- `@testing-library/react-native` - Component testing
- `@testing-library/react-hooks` - Hook testing
- `jest-expo` - Jest preset for Expo

## Performance

**Bundle Size:**
- Monitor bundle size with `npx expo export --dump-sourcemap`
- Lazy load screens/components when possible
- Use Hermes engine (default on Android)

**Rendering:**
- Memoize expensive components with `React.memo()`
- Memoize expensive calculations with `useMemo()`
- Memoize callbacks with `useCallback()`
- Use `FlatList` with proper optimization props

**Images:**
- Use `expo-image` for optimized image loading
- Implement proper image caching
- Resize images appropriately
- Use WebP format when possible

## Build & Deployment

**Build Service:** EAS Build
- Cloud-based builds for iOS and Android
- Automated version bumping
- Credential management
- Build profiles: development, preview, production

**Configuration (eas.json):**
```json
{
  "build": {
    "production": {
      "env": { "API_URL": "https://api.production.com" },
      "ios": { "buildConfiguration": "Release" },
      "android": { "buildType": "app-bundle" }
    },
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    }
  }
}
```

**Submit:** EAS Submit
- Automated submission to App Store and Play Store
- Store configuration in `eas.json`
- Support for TestFlight and internal tracks

**Updates:** EAS Update (Over-the-Air)
- Deploy JavaScript/asset updates without app store review
- Channel-based deployment (production, staging)
- Rollback support
- Not for native code changes

## Security

**Secrets Management:**
- Development: `.env` file (never commit)
- Production: EAS Secrets or environment variables
- Use `expo-constants` to access secrets
- Never hardcode API keys in source code

**Data Security:**
- Use `expo-secure-store` for sensitive data
- Enable SSL pinning for API requests (optional)
- Validate all user input
- Sanitize data before storage

**Authentication:**
- JWT tokens stored in SecureStore
- Token expiry: 7 days default
- Automatic token refresh
- Logout clears all stored tokens

**Permissions:**
- Request permissions just-in-time
- Explain why permissions are needed
- Handle permission denials gracefully
- Never assume permissions are granted

## Configuration Management

**App Configuration (app.config.js):**
```javascript
export default {
  name: 'MyApp',
  slug: 'my-app',
  version: '1.0.0',
  ios: {
    bundleIdentifier: 'com.company.myapp',
    buildNumber: '1',
  },
  android: {
    package: 'com.company.myapp',
    versionCode: 1,
  },
  extra: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
    eas: { projectId: process.env.EAS_PROJECT_ID },
  },
};
```

**Environment Variables:**
- Use `.env` files with `react-native-dotenv`
- Access via `Constants.expoConfig.extra`
- Different `.env` files per environment
- Document all variables in `.env.example`

**Constants File (constants/Config.ts):**
```typescript
import Constants from 'expo-constants';

export const Config = {
  API_BASE_URL: Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000',
  API_TIMEOUT: 30000,
  MAX_RETRY_ATTEMPTS: 3,
  ITEMS_PER_PAGE: 20,
} as const;
```

## Error Handling

**Global Error Boundary:**
- Catch React errors with Error Boundary component
- Log errors to monitoring service
- Show user-friendly error screens
- Provide retry mechanisms

**API Error Handling:**
- Custom error classes (ApiError, NetworkError)
- Retry logic with exponential backoff
- Offline detection and queue
- User-friendly error messages

**Crash Reporting:**
- Use Sentry or similar service
- Attach user context to crash reports
- Monitor crash-free rate
- Alert on spike in crashes

## Monitoring

**Analytics:**
- Use Expo Application Services analytics or custom
- Track screen views
- Track user actions
- Track errors and performance

**Performance Monitoring:**
- Monitor app startup time
- Track API response times
- Monitor memory usage
- Track frame drops

**Metrics to Monitor:**
- Crash-free rate (target: >99%)
- API success rate (target: >95%)
- Screen load time (target: <2s)
- App startup time (target: <3s)

## Deployment Process

**Pre-Deployment Checklist:**
- [ ] All tests passing locally
- [ ] All tests passing in CI/CD
- [ ] Code reviewed and approved
- [ ] Version bumped appropriately
- [ ] Changelog updated
- [ ] Environment variables configured
- [ ] EAS credentials configured

**Deployment Steps:**
1. Update version in `app.config.js`
2. Run tests: `npm test`
3. Build for iOS: `eas build --platform ios --profile production`
4. Build for Android: `eas build --platform android --profile production`
5. Test builds on physical devices
6. Submit to stores: `eas submit --platform all`
7. Monitor crash reports for 24 hours

**Post-Deployment:**
- Monitor error rates in Sentry/logging
- Check analytics for anomalies
- Verify critical user flows
- Monitor app store reviews
- Prepare rollback plan if needed

---

**Note:** This architecture works great for most Expo React Native projects. Customize sections as your project grows.
