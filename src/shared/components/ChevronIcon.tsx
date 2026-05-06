import React from 'react';
import { View } from 'react-native';

interface ChevronIconProps {
  size?: number;
  color?: string;
  /** Direction the chevron points */
  direction: 'up' | 'down' | 'left' | 'right';
}

/**
 * Pure RN chevron drawn with two thin View "arms".
 * No SVG / icon library required.
 * Supports all four directions.
 */
export function ChevronIcon({
  size = 20,
  color = '#94A3B8',
  direction,
}: ChevronIconProps) {
  const thickness = Math.max(2, size * 0.1);
  const armLength = size * 0.55;

  // Rotation angles for each direction
  // Each arm is a horizontal bar; we rotate around its tip to form a V shape.
  const rotations: Record<typeof direction, [string, string]> = {
    down:  ['-45deg', '45deg'],
    up:    ['45deg', '-45deg'],
    right: ['-135deg', '135deg'],
    left:  ['135deg', '-135deg'],
  };

  const [leftRot, rightRot] = rotations[direction];

  // For left/right the arms need a slight horizontal nudge to look centred
  const isHorizontal = direction === 'left' || direction === 'right';
  const nudge = isHorizontal ? armLength * 0.1 : armLength * 0.25;
  const leftNudge  = isHorizontal ? nudge  : -nudge;
  const rightNudge = isHorizontal ? -nudge : nudge;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      accessibilityElementsHidden
      importantForAccessibility="no"
    >
      {/* Left arm */}
      <View
        style={{
          position: 'absolute',
          width: armLength,
          height: thickness,
          backgroundColor: color,
          borderRadius: thickness,
          transform: [{ translateX: leftNudge }, { rotate: leftRot }],
        }}
      />
      {/* Right arm */}
      <View
        style={{
          position: 'absolute',
          width: armLength,
          height: thickness,
          backgroundColor: color,
          borderRadius: thickness,
          transform: [{ translateX: rightNudge }, { rotate: rightRot }],
        }}
      />
    </View>
  );
}
