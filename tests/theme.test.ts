import { describe, it, expect } from 'vitest';
import { THEME_TOKENS } from '../src/lib/theme';

describe('theme tokens', () => {
  it('defines the Kopitiam Retro palette from the spec', () => {
    expect(THEME_TOKENS).toEqual({
      paper: '#FBF3E4',
      'paper-card': '#FFFBF0',
      kopi: '#5B3A1E',
      'kopi-mid': '#8A5A2B',
      chilli: '#C0392B',
      turmeric: '#E0A33E',
      ink: '#2B1B10',
    });
  });
});
