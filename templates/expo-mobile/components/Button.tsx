import { StyleSheet, Pressable, type PressableProps, ActivityIndicator } from 'react-native';

import { ThemedText } from './ThemedText';

export type ButtonProps = PressableProps & {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
};

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  style,
  ...otherProps
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        styles[size],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style as any,
      ]}
      disabled={isDisabled}
      {...otherProps}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#fff' : '#667eea'}
          size="small"
        />
      ) : (
        <ThemedText
          style={[
            styles.text,
            variant === 'primary' && styles.primaryText,
            variant === 'secondary' && styles.secondaryText,
            variant === 'outline' && styles.outlineText,
          ]}>
          {title}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  primary: {
    backgroundColor: '#667eea',
  },
  secondary: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#667eea',
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#667eea',
  },
  outlineText: {
    color: '#667eea',
  },
});
