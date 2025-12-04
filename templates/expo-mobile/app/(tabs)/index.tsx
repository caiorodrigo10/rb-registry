import { StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
        />
        <ThemedText type="title">Welcome!</ThemedText>
        <ThemedText type="subtitle">
          Your mobile app is ready to go
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedText style={styles.description}>
          This is a React Native app built with Expo. Edit the files in the{' '}
          <ThemedText type="defaultSemiBold">app/</ThemedText> folder to start building.
        </ThemedText>

        <Link href="/modal" asChild>
          <ThemedText type="link" style={styles.link}>
            Open modal →
          </ThemedText>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    gap: 8,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    gap: 16,
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
  },
  link: {
    textAlign: 'center',
    marginTop: 16,
  },
});
