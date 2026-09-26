export const THEME_TOKENS = {
  paper: '#FBF3E4',
  'paper-card': '#FFFBF0',
  kopi: '#5B3A1E',
  'kopi-mid': '#8A5A2B',
  chilli: '#C0392B',
  turmeric: '#E0A33E',
  ink: '#2B1B10',
} as const;

export type ThemeToken = keyof typeof THEME_TOKENS;
