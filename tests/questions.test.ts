import { describe, it, expect } from 'vitest';
import { QUESTIONS } from '../src/data/questions';
import { makeTiebreaker } from '../src/data/tiebreaker';
import { ARCHETYPES } from '../src/data/archetypes';

describe('questions', () => {
  it('has exactly 8 questions with 4 options each', () => {
    expect(QUESTIONS).toHaveLength(8);
    for (const q of QUESTIONS) expect(q.options).toHaveLength(4);
  });

  it('only awards points to 1-3 known dishes per option', () => {
    const known = new Set(ARCHETYPES.map((a) => a.id));
    for (const q of QUESTIONS) {
      for (const o of q.options) {
        const ids = Object.keys(o.weights);
        expect(ids.length).toBeGreaterThanOrEqual(1);
        expect(ids.length).toBeLessThanOrEqual(3);
        for (const id of ids) expect(known.has(id as never)).toBe(true);
        for (const w of Object.values(o.weights)) expect(w).toBeGreaterThan(0);
      }
    }
  });

  it('makes every dish the primary (weight >= 2) of at least one option', () => {
    const primaries = new Set<string>();
    for (const q of QUESTIONS)
      for (const o of q.options)
        for (const [id, w] of Object.entries(o.weights))
          if ((w ?? 0) >= 2) primaries.add(id);
    for (const a of ARCHETYPES) expect(primaries.has(a.id)).toBe(true);
  });

  it('builds a 2-4 option tie-breaker from tied ids', () => {
    const q = makeTiebreaker(['laksa', 'satay']);
    expect(q.id).toBe('tiebreak');
    expect(q.options).toHaveLength(2);
    expect(q.options[0].weights).toEqual({ laksa: 3 });
    expect(q.options[1].weights).toEqual({ satay: 3 });
  });
});
