import { describe, it, expect } from 'vitest';
import { ARCHETYPES, byId } from '../src/data/archetypes';

describe('archetypes', () => {
  it('has exactly 10 unique dishes', () => {
    expect(ARCHETYPES).toHaveLength(10);
    expect(new Set(ARCHETYPES.map((a) => a.id)).size).toBe(10);
  });

  it('gives every dish three trait chips and a valid pairing', () => {
    for (const a of ARCHETYPES) {
      expect(a.traits).toHaveLength(3);
      expect(a.tagline.length).toBeGreaterThan(10);
      expect(a.blurb.length).toBeGreaterThan(40);
      expect(byId[a.pairing]).toBeDefined();
      expect(a.pairing).not.toBe(a.id);
    }
  });
});
