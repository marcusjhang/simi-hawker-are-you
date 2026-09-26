import { describe, it, expect } from 'vitest';
import { score, tiedIds } from '../src/lib/scoring';
import { QUESTIONS } from '../src/data/questions';
import type { Question } from '../src/lib/types';

const q = (
  id: string,
  opts: Array<[string, Record<string, number>]>,
): Question => ({
  id,
  text: id,
  options: opts.map(([oid, weights], i) => ({ id: oid, text: oid, weights })) as Question['options'],
});

describe('score', () => {
  it('picks the dish with the most points', () => {
    const questions = [
      q('a', [['a1', { laksa: 3 }], ['a2', { satay: 3 }]]),
      q('b', [['b1', { laksa: 3 }], ['b2', { satay: 3 }]]),
    ];
    const result = score(questions, { a: 'a1', b: 'b1' });
    expect(result.winner).toBe('laksa');
    expect(result.tie).toBe(false);
  });

  it('reports a tie when the top two are equal', () => {
    const questions = [
      q('a', [['a1', { laksa: 3 }], ['a2', { satay: 3 }]]),
      q('b', [['b1', { laksa: 3 }], ['b2', { satay: 3 }]]),
    ];
    const result = score(questions, { a: 'a1', b: 'b2' });
    expect(result.tie).toBe(true);
    expect(tiedIds(result)).toEqual(expect.arrayContaining(['laksa', 'satay']));
  });

  it('is deterministic — same answers, same result', () => {
    const answers = { q1: 'q1d', q2: 'q2a', q3: 'q3d', q4: 'q4c', q5: 'q5b', q6: 'q6a', q7: 'q7d', q8: 'q8c' };
    expect(score(QUESTIONS, answers)).toEqual(score(QUESTIONS, answers));
  });

  it('percentages are integers and the top dish has the highest score', () => {
    const answers = { q1: 'q1a', q2: 'q2a', q3: 'q3a', q4: 'q4b', q5: 'q5a', q6: 'q6d', q7: 'q7c', q8: 'q8d' };
    const { ranking } = score(QUESTIONS, answers);
    for (const r of ranking) expect(Number.isInteger(r.pct)).toBe(true);
    expect(ranking[0].score).toBe(Math.max(...ranking.map((r) => r.score)));
  });

  it('breaks a remaining tie with a deterministic priority order, never randomly', () => {
    const questions = [
      q('a', [
        ['a1', { laksa: 3, satay: 3 }],
        ['a2', { satay: 3, laksa: 3 }],
      ]),
    ];
    const first = score(questions, { a: 'a1' });
    const second = score(questions, { a: 'a2' });
    // A single question with equal points is a tie; priority order decides,
    // and it must not depend on call order.
    expect(tiedIds(first).length).toBeGreaterThan(1);
    expect(first.winner).toBe(score(questions, { a: 'a1' }).winner);
    expect(second.winner).toBe(first.winner);
  });
});
