import { describe, it, expect } from 'vitest';
import { QUESTIONS } from '../src/data/questions';
import { ARCHETYPES } from '../src/data/archetypes';
import { score } from '../src/lib/scoring';
import type { ArchetypeId } from '../src/lib/types';

function simulate(runs: number): {
  wins: Map<ArchetypeId, number>;
  ties: number;
} {
  const wins = new Map<ArchetypeId, number>();
  for (const a of ARCHETYPES) wins.set(a.id, 0);
  let ties = 0;

  // Deterministic PRNG (mulberry32) so the test never flakes.
  let seed = 0x9e3779b9;
  const rand = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = 0; i < runs; i++) {
    const answers: Record<string, string> = {};
    for (const q of QUESTIONS) {
      const pick = q.options[Math.floor(rand() * q.options.length)];
      answers[q.id] = pick.id;
    }
    const { winner, tie } = score(QUESTIONS, answers);
    if (tie) ties += 1;
    wins.set(winner, (wins.get(winner) ?? 0) + 1);
  }
  return { wins, ties };
}

describe('quiz balance (10,000 uniform runs)', () => {
  const { wins, ties } = simulate(10_000);

  it('makes every dish reachable', () => {
    for (const a of ARCHETYPES) {
      expect(wins.get(a.id) ?? 0).toBeGreaterThan(0);
    }
  });

  it('keeps every dish between 4% and 20% of wins', () => {
    for (const a of ARCHETYPES) {
      const share = (wins.get(a.id) ?? 0) / 10_000;
      expect(share).toBeGreaterThanOrEqual(0.04);
      expect(share).toBeLessThanOrEqual(0.2);
    }
  });

  it('exercises the disclosed tie-break path', () => {
    expect(ties).toBeGreaterThan(0);
  });
});
