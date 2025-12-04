import { StyleSheet, Switch } from 'react-native';
import { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Settings
      </ThemedText>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Preferences</ThemedText>

        <ThemedView style={styles.row}>
          <ThemedView style={styles.rowText}>
            <ThemedText type="defaultSemiBold">Notifications</ThemedText>
            <ThemedText style={styles.description}>
              Receive push notifications
            </ThemedText>
          </ThemedView>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </ThemedView>

        <ThemedView style={styles.row}>
          <ThemedView style={styles.rowText}>
            <ThemedText type="defaultSemiBold">Dark Mode</ThemedText>
            <ThemedText style={styles.description}>
              Use dark theme (follows system by default)
            </ThemedText>
          </ThemedView>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">About</ThemedText>
        <ThemedText style={styles.description}>
          Version 1.0.0
        </ThemedText>
        <ThemedText style={styles.description}>
          Built with Expo and React Native
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(150, 150, 150, 0.3)',
  },
  rowText: {
    flex: 1,
    marginRight: 16,
  },
  description: {
    opacity: 0.6,
    fontSize: 14,
  },
});
