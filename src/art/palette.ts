/** Kopitiam Retro art palette. Explicit hex (not CSS vars) so the same art can
 * be rasterised by Node/sharp for the OG images. */
export const ART = {
  line: '#5B3A1E',
  mid: '#8A5A2B',
  chilli: '#C0392B',
  turmeric: '#E0A33E',
  cream: '#FBF3E4',
  card: '#FFFBF0',
  ink: '#2B1B10',
  chilliSoft: '#EBC3BC',
  turmericSoft: '#F3DCA8',
  kopiSoft: '#D8C3AC',
  rice: '#F6EEDD',
} as const;

export type ArtColor = keyof typeof ART;
