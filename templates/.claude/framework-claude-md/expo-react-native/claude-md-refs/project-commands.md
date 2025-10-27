# Project Commands

Common Expo React Native commands and project-specific workflows.

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

# Install Expo CLI globally (optional)
npm install -g expo-cli

# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo
eas login

# Start development server
npx expo start
```

## Development Commands

### Server & Application
```bash
# Start development server
npx expo start

# Start with cache cleared
npx expo start --clear

# Start on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Start with tunnel (for testing on physical device over internet)
npx expo start --tunnel

# Start in production mode
npx expo start --no-dev --minify
```

### Running on Devices
```bash
# Run on iOS simulator
npx expo run:ios

# Run on specific iOS simulator
npx expo run:ios --simulator="iPhone 14 Pro"

# Run on connected iOS device
npx expo run:ios --device

# Run on Android emulator
npx expo run:android

# Run on connected Android device
npx expo run:android --device

# Run on web
npx expo start --web
```

## EAS (Expo Application Services) Commands

### Initial Setup
```bash
# Configure EAS Build
eas build:configure

# Configure EAS Update
eas update:configure

# Login to EAS
eas login

# Check account info
eas whoami
```

### Building

```bash
# Build for iOS (production)
eas build --platform ios --profile production

# Build for Android (production)
eas build --platform android --profile production

# Build for all platforms
eas build --platform all --profile production

# Build with specific profile
eas build --platform ios --profile development
eas build --platform ios --profile preview

# Build locally (requires Xcode/Android Studio)
eas build --platform ios --local

# Check build status
eas build:list

# View specific build
eas build:view <build-id>

# Cancel build
eas build:cancel <build-id>
```

### Submitting to App Stores

```bash
# Submit iOS build to App Store
eas submit --platform ios

# Submit Android build to Play Store
eas submit --platform android

# Submit specific build
eas submit --platform ios --id <build-id>

# Submit with auto-select latest build
eas submit --platform ios --latest

# Submit to TestFlight (iOS)
eas submit --platform ios --profile testflight
```

### OTA Updates (EAS Update)

```bash
# Publish update to default channel
eas update

# Publish to specific channel
eas update --channel production
eas update --channel staging

# Publish to specific branch
eas update --branch production --message "Bug fixes"

# View update history
eas update:list

# View update details
eas update:view <update-id>

# Roll back to previous update
eas update:rollback --channel production

# Configure update channels
eas channel:create staging
eas channel:list
eas channel:view production
```

### Credentials Management

```bash
# View credentials
eas credentials

# Configure iOS credentials
eas credentials --platform ios

# Configure Android credentials
eas credentials --platform android

# View device IDs (for ad-hoc builds)
eas device:list

# Add device ID
eas device:create
```

## Testing Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- Button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="Button"

# Update snapshots
npm test -- -u

# Run tests in CI mode (no watch)
npm test -- --ci

# Run tests with verbose output
npm test -- --verbose
```

## Code Quality Commands

### Linting
```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Lint specific files
npm run lint -- src/components/**/*.tsx
```

### Formatting
```bash
# Run Prettier
npm run format

# Check Prettier without fixing
npm run format:check

# Format specific files
npm run format -- src/**/*.tsx
```

### TypeScript
```bash
# Type check
npm run tsc

# Type check in watch mode
npm run tsc -- --watch

# Build TypeScript
npm run tsc -- --build
```

## Project Maintenance

### Dependencies
```bash
# Install dependencies
npm install

# Install specific package
npm install <package-name>

# Install dev dependency
npm install --save-dev <package-name>

# Install Expo SDK package
npx expo install <expo-package>

# Update all dependencies
npm update

# Update Expo SDK
npx expo install --fix

# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit

# Fix security vulnerabilities
npm audit fix

# List installed packages
npm list --depth=0
```

### Expo SDK
```bash
# Check Expo SDK version
npx expo --version

# Upgrade Expo SDK
npx expo upgrade

# Install compatible versions of packages
npx expo install react-native react

# Doctor command (diagnose issues)
npx expo doctor

# Customize native projects
npx expo prebuild

# Clean prebuild
npx expo prebuild --clean
```

## Custom NPM Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "start": "expo start",
    "start:clear": "expo start --clear",
    "ios": "expo start --ios",
    "android": "expo start --android",
    "web": "expo start --web",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json}\"",
    "tsc": "tsc --noEmit",
    "build:ios": "eas build --platform ios --profile production",
    "build:android": "eas build --platform android --profile production",
    "submit:ios": "eas submit --platform ios",
    "submit:android": "eas submit --platform android"
  }
}
```

## Project-Specific Custom Commands

Document your custom commands here:

```bash
# Example custom commands (replace with your actual commands):

# npm run db:seed
# Description: Seed local database with test data
# Usage: Run after fresh install

# npm run generate:icons
# Description: Generate app icons from source
# Usage: Run after updating icon source

# npm run analyze:bundle
# Description: Analyze bundle size
# Usage: Run before releases to check bundle size
```

## Deployment Commands

### Standard Deployment Flow

```bash
# 1. Ensure clean working directory
git status

# 2. Update version in app.config.js
# Edit app.config.js manually

# 3. Run tests
npm test

# 4. Build for production
eas build --platform all --profile production

# 5. Wait for builds to complete
eas build:list

# 6. Download and test builds on physical devices
# Test critical user flows

# 7. Submit to app stores
eas submit --platform all

# 8. Publish OTA update (if minor changes)
eas update --channel production --message "Release v1.2.3"

# 9. Tag release in git
git tag -a v1.2.3 -m "Release v1.2.3"
git push origin v1.2.3
```

### Automated Deployment with EAS Workflows

Create `.eas/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: ['main']

jobs:
  build_ios:
    name: Build iOS
    type: build
    params:
      platform: ios
      profile: production

  build_android:
    name: Build Android
    type: build
    params:
      platform: android
      profile: production

  submit_ios:
    name: Submit to App Store
    needs: [build_ios]
    type: submit
    params:
      build_id: ${{ needs.build_ios.outputs.build_id }}

  submit_android:
    name: Submit to Play Store
    needs: [build_android]
    type: submit
    params:
      build_id: ${{ needs.build_android.outputs.build_id }}
```

### Development Build Deployment

```bash
# Build development client
eas build --profile development --platform ios
eas build --profile development --platform android

# Install on device
# iOS: Download from build page or use TestFlight
# Android: Download APK directly

# Start development server
npx expo start --dev-client
```

## Environment Management

### Environment Variables

```bash
# Development
cp .env.example .env.development

# Staging
cp .env.example .env.staging

# Production
cp .env.example .env.production

# Set environment variables in EAS
eas secret:create --name API_URL --value https://api.production.com --scope project
eas secret:list
eas secret:delete --name API_URL
```

### Configuration

```bash
# View current configuration
npx expo config

# View configuration for specific platform
npx expo config --type introspect

# Export configuration
npx expo export
```

## Debugging Commands

### Logs and Debugging

```bash
# View device logs (iOS)
npx react-native log-ios

# View device logs (Android)
npx react-native log-android

# View Expo logs
npx expo start --log-level info

# Clear Metro bundler cache
npx expo start --clear

# Reset project
rm -rf node_modules
npm install
npx expo start --clear

# Debug remotely
# In Expo Go: Shake device → "Debug Remote JS"

# Inspect element
# In Expo Go: Shake device → "Show Element Inspector"
```

### Performance Profiling

```bash
# Profile app startup
npx expo start --profile

# Analyze bundle size
npx expo export --dump-sourcemap
npx react-native-bundle-visualizer

# Check for common issues
npx expo doctor
```

## Platform-Specific Commands

### iOS-Specific

```bash
# Open iOS project in Xcode
open ios/*.xcworkspace

# Clean iOS build
cd ios && xcodebuild clean

# Install pods
cd ios && pod install

# Update pods
cd ios && pod update

# View iOS simulator list
xcrun simctl list devices
```

### Android-Specific

```bash
# Open Android project in Android Studio
open -a "Android Studio" android

# Clean Android build
cd android && ./gradlew clean

# Build Android APK
cd android && ./gradlew assembleRelease

# Build Android App Bundle
cd android && ./gradlew bundleRelease

# List connected devices
adb devices

# Reverse port for localhost
adb reverse tcp:8081 tcp:8081
```

## Maintenance & Monitoring

### Health Checks

```bash
# Check project health
npx expo doctor

# Verify dependencies
npm ls

# Check for issues
npx expo config --type public
```

### Cleaning

```bash
# Clear Expo cache
npx expo start --clear

# Clear npm cache
npm cache clean --force

# Clear watchman cache
watchman watch-del-all

# Full clean
rm -rf node_modules package-lock.json
npm install
npx expo start --clear
```

### Asset Management

```bash
# Optimize images
# Use tools like ImageOptim, TinyPNG

# Generate app icons
npx expo prebuild

# Generate splash screens
npx expo prebuild
```

## Git Hooks (using Husky)

### Setup

```bash
# Install Husky
npm install --save-dev husky

# Initialize Husky
npx husky init

# Add pre-commit hook
echo "npm run lint && npm run tsc && npm test" > .husky/pre-commit

# Add commit-msg hook (for conventional commits)
echo "npx commitlint --edit \$1" > .husky/commit-msg
```

### Common Hooks

```bash
# .husky/pre-commit
npm run lint
npm run format:check
npm run tsc
npm test

# .husky/pre-push
npm test
npm run test:coverage
```

---

**Note:** Replace custom command examples with your actual project-specific commands. Document any special deployment or maintenance procedures specific to your app.
