# Expo React Native Framework Guide

Framework-specific guidelines and conventions for Expo React Native development with Claude Code.

## About This File

**Purpose:** Provides Expo React Native framework best practices and conventions. This is your starting point for any Expo React Native project.

**Scope:** Universal Expo React Native patterns that apply to all projects. Project-specific decisions (state management, backend, navigation patterns) are documented in `.claude/claude-md-refs/`.

**Token Management:** If you want to reduce token usage, comment out sections you don't use.

---

## Project Documentation

Additional project-specific guidance is available in:

- **@.claude/claude-md-refs/project-commands.md** - Project commands and deployment workflows
- **@.claude/claude-md-refs/architecture.md** - Architecture decisions and patterns
- **@.claude/claude-md-refs/conventions.md** - Team conventions and standards

---

## Standard Expo Commands

### Development
- `npx expo start` - Start development server
- `npx expo start --clear` - Start with cache cleared
- `npx expo start --ios` - Open in iOS simulator
- `npx expo start --android` - Open in Android emulator
- `npx expo start --web` - Open in web browser

### Building & Deployment
- `eas build --platform ios` - Build for iOS
- `eas build --platform android` - Build for Android
- `eas build --platform all` - Build for both platforms
- `eas submit --platform ios` - Submit to App Store
- `eas submit --platform android` - Submit to Play Store

### Testing
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

## Code Style

### TypeScript Standards
- Use TypeScript for all new code
- Enable strict mode in tsconfig.json
- Use explicit types for props and state
- Avoid `any` - use `unknown` or proper types
- Use type inference where obvious

### React Native Conventions
- Use functional components with hooks
- Use PascalCase for components
- Use camelCase for functions and variables
- Use UPPER_SNAKE_CASE for constants
- Use 2-space indentation
- Use single quotes for strings

### File Organization
```
app/
  (tabs)/              # Tab-based routes (Expo Router)
  (auth)/              # Auth group routes
  _layout.tsx          # Root layout
  index.tsx            # Home screen
components/
  ui/                  # Reusable UI components
  forms/               # Form components
hooks/                 # Custom React hooks
services/              # API and external services
utils/                 # Utility functions
types/                 # TypeScript type definitions
constants/             # App constants
config/                # Configuration files
```

### Naming Conventions
- Components: PascalCase (e.g., `UserProfile.tsx`, `LoginScreen.tsx`)
- Screens: PascalCase + "Screen" suffix (e.g., `HomeScreen.tsx`)
- Hooks: camelCase with "use" prefix (e.g., `useAuth.ts`, `useApi.ts`)
- Utils: camelCase (e.g., `formatDate.ts`, `validateEmail.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRY_ATTEMPTS`)

## Component Patterns

### Functional Components with TypeScript
```typescript
import { View, Text, StyleSheet } from 'react-native';

interface UserCardProps {
  name: string;
  email: string;
  onPress?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ name, email }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  name: { fontSize: 18, fontWeight: 'bold' },
  email: { fontSize: 14, color: '#666' },
});
```

### Custom Hooks
```typescript
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      const user = await fetchUser(token);
      setUser(user);
    }
    setIsLoading(false);
  };

  return { user, isLoading, isAuthenticated: !!user };
};
```

## Navigation with Expo Router

### File-Based Routing
Expo Router uses file-based routing:

```
app/
  _layout.tsx          # Root layout
  index.tsx            # / route
  profile.tsx          # /profile route
  posts/
    index.tsx          # /posts route
    [id].tsx           # /posts/:id route
  (tabs)/
    _layout.tsx        # Tab navigator
    home.tsx           # /home route (tab)
```

### Navigation Patterns
```typescript
import { Link, router } from 'expo-router';
import { Pressable, Text } from 'react-native';

// Declarative navigation
<Link href="/profile">Go to Profile</Link>

// Imperative navigation
router.push('/posts/123');
router.replace('/login');
router.back();
```

### Layout Configuration
```typescript
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen
        name="profile"
        options={{ title: 'Profile', presentation: 'modal' }}
      />
    </Stack>
  );
}
```

## State Management

### Context API for Global State
```typescript
import React, { createContext, useContext, useState } from 'react';

interface AppContextValue {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
```

### Local State Patterns
- Use `useState` for simple component state
- Use `useReducer` for complex state logic
- Use `useRef` for mutable values that don't trigger re-renders
- Use `useMemo` for expensive calculations
- Use `useCallback` to memoize callback functions

## API Integration

### Fetch with Error Handling
```typescript
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl;

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const token = await SecureStore.getItemAsync('authToken');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },
};
```

### Custom API Hook
```typescript
import { useState, useEffect } from 'react';

export const useApi = <T,>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const result = await apiClient.get<T>(endpoint);
        if (mounted) setData(result);
      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, [endpoint]);

  return { data, isLoading, error };
};
```

## Native Modules with Expo SDK

### Accessing Native Functionality
```typescript
// Location
import * as Location from 'expo-location';
const { status } = await Location.requestForegroundPermissionsAsync();
const location = await Location.getCurrentPositionAsync({});

// Image Picker
import * as ImagePicker from 'expo-image-picker';
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: 1,
});

// Secure Storage
import * as SecureStore from 'expo-secure-store';
await SecureStore.setItemAsync('key', 'value');
const value = await SecureStore.getItemAsync('key');
```

### Platform-Specific Code
```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
    }),
  },
});

if (Platform.OS === 'ios') {
  // iOS-specific code
} else if (Platform.OS === 'android') {
  // Android-specific code
}
```

## Testing

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*)',
  ],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    '!**/*.d.ts',
  ],
};
```

### Component Testing
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Click" onPress={onPress} />);
    fireEvent.press(getByText('Click'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

### Hook Testing
```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '../useAuth';

describe('useAuth', () => {
  it('should login user', async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'pass' });
    });
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

## Logging with react-native-logs

### Logger Setup
```typescript
import { logger, consoleTransport } from 'react-native-logs';

const config = {
  levels: { debug: 0, info: 1, warn: 2, error: 3 },
  severity: __DEV__ ? 'debug' : 'error',
  transport: consoleTransport,
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
};

export const log = logger.createLogger(config);
```

### Structured Logging
```typescript
import { log } from '../utils/logger';

log.info('User logged in', { userId: user.id });
log.error('API request failed', { endpoint: '/api/users', error: err.message });
log.debug('Component rendered', { componentName: 'HomeScreen' });
```

## Performance Optimization

### Memoization
```typescript
import { useMemo, useCallback, memo } from 'react';

// Memoize expensive calculations
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}, [users]);

// Memoize callbacks
const handlePress = useCallback(() => {
  navigation.navigate('Details', { id: item.id });
}, [item.id, navigation]);

// Memoize components
export const UserCard = memo<UserCardProps>(({ user }) => {
  return <View><Text>{user.name}</Text></View>;
});
```

### FlatList Optimization
```typescript
<FlatList
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  keyExtractor={(item) => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={10}
  removeClippedSubviews={true}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

## Production Deployment with EAS

### EAS Configuration
```json
// eas.json
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
  },
  "submit": {
    "production": {
      "ios": { "ascAppId": "1234567890" },
      "android": { "track": "internal" }
    }
  }
}
```

### App Configuration
```javascript
// app.config.js
export default {
  name: 'MyApp',
  slug: 'my-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  ios: {
    bundleIdentifier: 'com.company.myapp',
    buildNumber: '1',
  },
  android: {
    package: 'com.company.myapp',
    versionCode: 1,
  },
  extra: {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    eas: { projectId: 'your-project-id' },
  },
};
```

## Config-Driven Development

### Environment Variables
```javascript
// app.config.js
export default {
  extra: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
    enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
  },
};

// Access in code
import Constants from 'expo-constants';
const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

### App Constants
```typescript
// constants/Config.ts
import Constants from 'expo-constants';

export const Config = {
  API_BASE_URL: Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000',
  API_TIMEOUT: 30000,
  MAX_RETRY_ATTEMPTS: 3,
  ITEMS_PER_PAGE: 20,
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
} as const;
```

## Recommended Packages

### Core Packages
- `expo-router` - File-based navigation
- `expo-constants` - Access app configuration
- `expo-secure-store` - Secure storage for tokens
- `expo-image-picker` - Pick images/videos
- `expo-location` - Access device location
- `expo-notifications` - Push notifications

### State Management
- React Context API (built-in)
- `zustand` - Lightweight state management
- `@tanstack/react-query` - Server state management

### Development Tools
- `@testing-library/react-native` - Component testing
- `react-native-logs` - Structured logging
- `react-native-dotenv` - Environment variables

### UI Libraries
- React Native built-in components
- `react-native-svg` - SVG support
- `expo-linear-gradient` - Gradient backgrounds

---

*Last updated: 2025-10-27*
*Framework: Expo React Native*
