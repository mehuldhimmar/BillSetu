import React from 'react';
import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';
import { styles } from './DashboardCard.styles';

interface DashboardCardProps {
  /** Local image asset — use require('../../../images/foo.png') */
  image: ImageSourcePropType;
  label: string;
  onPress: () => void;
  accessibilityLabel?: string;
}

export function DashboardCard({
  image,
  label,
  onPress,
  accessibilityLabel,
}: DashboardCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
    >
      {/* Frosted white circle on primary card */}
      <View style={styles.iconCircle}>
        <Image
          source={image}
          style={styles.iconImage}
          resizeMode="contain"
          accessibilityElementsHidden
        />
      </View>

      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}
