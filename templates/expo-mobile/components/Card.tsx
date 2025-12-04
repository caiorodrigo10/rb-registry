import { StyleSheet, Pressable, type PressableProps } from 'react-native';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export type CardProps = PressableProps & {
  title: string;
  description: string;
  icon?: string;
};

export function Card({ title, description, icon, style, ...otherProps }: CardProps) {
  const borderColor = useThemeColor({}, 'icon');

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { borderColor: borderColor + '30' },
        pressed && styles.pressed,
        style as any,
      ]}
      {...otherProps}>
      <ThemedView style={styles.content}>
        {icon && <ThemedText style={styles.icon}>{icon}</ThemedText>}
        <ThemedView style={styles.textContent}>
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
          <ThemedText style={styles.description}>{description}</ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 12,
  },
  icon: {
    fontSize: 24,
  },
  textContent: {
    flex: 1,
    gap: 4,
  },
  description: {
    opacity: 0.7,
    fontSize: 14,
    lineHeight: 20,
  },
});
