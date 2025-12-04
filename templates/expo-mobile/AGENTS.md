# Expo Mobile App - AI Agent Instructions

## Project Overview

This is a React Native mobile application built with Expo. It uses file-based routing via Expo Router.

## Project Structure

```
├── app/                    # File-based routing (Expo Router)
│   ├── _layout.tsx        # Root layout (navigation provider)
│   ├── (tabs)/            # Tab navigation group
│   │   ├── _layout.tsx    # Tab bar configuration
│   │   ├── index.tsx      # Home screen (/)
│   │   ├── explore.tsx    # Explore screen (/explore)
│   │   └── settings.tsx   # Settings screen (/settings)
│   └── modal.tsx          # Modal screen (/modal)
├── components/            # Reusable components
│   ├── ThemedView.tsx     # View with theme support
│   ├── ThemedText.tsx     # Text with theme support
│   ├── Card.tsx           # Card component
│   └── Button.tsx         # Button component
├── constants/             # App constants
│   └── Colors.ts          # Color palette (light/dark)
├── hooks/                 # Custom hooks
│   ├── useThemeColor.ts   # Theme color hook
│   └── useColorScheme.ts  # Color scheme hook
├── assets/                # Static assets
│   ├── images/           # App icons and images
│   └── fonts/            # Custom fonts
├── app.json              # Expo configuration
├── roobin.json           # Roobin manifest
└── package.json          # Dependencies
```

## Key Concepts

### Adding New Screens

1. Create a new file in `app/` folder:
   - `app/profile.tsx` → accessible at `/profile`
   - `app/user/[id].tsx` → dynamic route `/user/123`

2. For tab screens, add to `app/(tabs)/`:
   - Create the screen file
   - Update `app/(tabs)/_layout.tsx` to add tab configuration

### Navigation

```tsx
import { Link, router } from 'expo-router';

// Declarative navigation
<Link href="/profile">Go to Profile</Link>

// Imperative navigation
router.push('/profile');
router.replace('/home');
router.back();
```

### Theming

Use themed components for automatic dark/light mode support:

```tsx
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function MyScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText type="title">Hello World</ThemedText>
    </ThemedView>
  );
}
```

### Styling

React Native uses StyleSheet, not CSS:

```tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16, // flexbox gap is supported
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
```

**Key differences from CSS:**
- `flexDirection` default is `column` (not `row`)
- No units needed (all values are density-independent pixels)
- Use camelCase for property names

## Commands

```bash
# Start development server
npx expo start

# Run on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Install a package (use expo install for native packages)
npx expo install expo-camera

# Type checking
npm run check:types

# Lint
npm run lint
```

## Adding Native Features

Always use `npx expo install` for native packages to ensure version compatibility:

```bash
# Camera
npx expo install expo-camera

# Location
npx expo install expo-location

# Notifications
npx expo install expo-notifications
```

## Important Notes

1. **No CSS files** - Use StyleSheet or inline styles
2. **No DOM APIs** - Use React Native components (View, Text, etc.)
3. **Platform-specific code** - Use `Platform.OS` or file extensions (.ios.tsx, .android.tsx)
4. **Assets** - Import images directly: `require('./assets/image.png')`
5. **Fonts** - Must be loaded before use with `expo-font`

## Expo Go Limitations

When running in Expo Go:
- Cannot use custom native modules
- Some permissions require development build
- Limited to Expo SDK APIs

For full native access, create a development build:
```bash
npx expo prebuild
npx expo run:ios  # or run:android
```
