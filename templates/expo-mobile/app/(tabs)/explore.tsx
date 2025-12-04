import { StyleSheet, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card } from '@/components/Card';

const FEATURES = [
  {
    title: 'File-based Routing',
    description: 'Expo Router uses file-based routing similar to Next.js. Create files in app/ to add new screens.',
    icon: '📁',
  },
  {
    title: 'Cross-platform',
    description: 'Build for iOS, Android, and web from a single codebase using React Native.',
    icon: '📱',
  },
  {
    title: 'Fast Refresh',
    description: 'See your changes instantly with Fast Refresh. No need to rebuild your app.',
    icon: '⚡',
  },
  {
    title: 'TypeScript',
    description: 'Full TypeScript support with typed routes and components out of the box.',
    icon: '🔷',
  },
];

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Explore Features
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Discover what you can build with Expo
        </ThemedText>

        <ThemedView style={styles.cards}>
          {FEATURES.map((feature, index) => (
            <Card
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 16,
  },
  cards: {
    gap: 16,
  },
});
