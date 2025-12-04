import { StyleSheet, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <StatusBar style="light" />

      <ThemedView style={styles.content}>
        <ThemedText type="title">Modal</ThemedText>
        <ThemedText style={styles.description}>
          This is a modal screen. It slides up from the bottom and can be dismissed by swiping down.
        </ThemedText>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.back()}>
          <ThemedText style={styles.buttonText}>Close</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  description: {
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#667eea',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
