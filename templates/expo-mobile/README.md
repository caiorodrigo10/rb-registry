# Expo Mobile App

A React Native mobile application built with [Expo](https://expo.dev) and [Expo Router](https://docs.expo.dev/router/introduction/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Expo Go](https://expo.dev/client) app on your phone (for testing)

### Installation

```bash
npm install
```

### Running the App

```bash
npx expo start
```

Then:
- Scan the QR code with Expo Go (Android) or Camera app (iOS)
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser

## Project Structure

- `app/` - Screen files (file-based routing)
- `components/` - Reusable UI components
- `constants/` - App constants and theme colors
- `hooks/` - Custom React hooks
- `assets/` - Images, fonts, and other static files

## Features

- ✅ File-based routing with Expo Router
- ✅ Dark/Light theme support
- ✅ Tab navigation
- ✅ TypeScript support
- ✅ Cross-platform (iOS, Android, Web)

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev/)

## Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```
