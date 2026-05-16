export const Colors = {
  // ── Brand ──────────────────────────────────────────────
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#5B8CFF',

  // ── Accent / Secondary ─────────────────────────────────
  secondary: '#1F2937',
  accent: '#F2547B',
  accentAlt: '#F3C54C',
  success: '#8BC34A',

  // ── Surfaces ───────────────────────────────────────────
  background: '#F0F4FC',
  backgroundSecondary: '#F0F4FC',
  surface: '#FFFFFF',
  border: '#E0E0E0',

  // ── Text ───────────────────────────────────────────────
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    inverse: '#FFFFFF',
    hint: '#6B7280',
  },

  // ── Selected / Focus states ────────────────────────────
  selected: {
    background: '#EFF6FF',
    border: '#2563EB',
  },

  // ── Gradients (for use with LinearGradient) ────────────
  gradients: {
    main: ['#2563EB', '#5B8CFF'],          // linear 135deg
    premiumAccent: ['#F3C54C', '#F2547B'], // linear 135deg
    softCard: ['#FFFFFF', '#EDE7F6'],      // linear 180deg
  },
} as const;
