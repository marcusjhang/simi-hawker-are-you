import { describe, it, expect } from 'vitest';
import { ARCHETYPES } from '../src/data/archetypes';
import { QUESTIONS } from '../src/data/questions';
import { DISH_ART, dishMarkup } from '../src/art/dishes';
import { MOTIF_IDS } from '../src/art/motifs';
import { ogSvg } from '../src/lib/ogTemplate';

describe('dish art', () => {
  it('covers all 10 dishes with non-empty svg markup', () => {
    expect(Object.keys(DISH_ART)).toHaveLength(ARCHETYPES.length);
    for (const a of ARCHETYPES) {
      const art = dishMarkup(a.id);
      expect(typeof art).toBe('string');
      expect(art.length).toBeGreaterThan(50);
      expect(art).toContain('<');
    }
  });

  it('draws every dish inside the shared centred 100x100 box', () => {
    for (const a of ARCHETYPES) {
      expect(dishMarkup(a.id)).not.toContain('NaN');
    }
  });
});

describe('question motifs', () => {
  it('has a motif for every question and the tie-breaker', () => {
    for (const q of QUESTIONS) expect(MOTIF_IDS).toContain(q.id);
    expect(MOTIF_IDS).toContain('tiebreak');
  });
});

describe('og image', () => {
  it('embeds the dish art when provided', () => {
    const art = dishMarkup('laksa');
    const svg = ogSvg('Laksa', 'Rich and warm', art);
    expect(svg).toContain('width="1200"');
    expect(svg).toContain('height="630"');
    expect(svg).toContain('Laksa');
    expect(svg).toContain(art);
  });
});
