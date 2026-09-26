import { ARCHETYPES } from '../data/archetypes';
import type { ArchetypeId, Question, Result } from './types';

/** Deterministic fallback order when a tie cannot be broken by answers. */
const PRIORITY: ArchetypeId[] = ARCHETYPES.map((a) => a.id);

export function score(
  questions: Question[],
  answers: Record<string, string>,
): Result {
  const board = new Map<ArchetypeId, number>();
  for (const a of ARCHETYPES) board.set(a.id, 0);

  let total = 0;
  for (const question of questions) {
    const chosen = answers[question.id];
    if (!chosen) continue;
    const option = question.options.find((o) => o.id === chosen);
    if (!option) continue;
    for (const [id, weight] of Object.entries(option.weights) as [
      ArchetypeId,
      number,
    ][]) {
      board.set(id, (board.get(id) ?? 0) + weight);
      total += weight;
    }
  }

  const ranking = [...board.entries()]
    .map(([id, points]) => ({
      id,
      score: points,
      pct: total > 0 ? Math.round((points / total) * 100) : 0,
    }))
    .sort(
      (a, b) =>
        b.score - a.score || PRIORITY.indexOf(a.id) - PRIORITY.indexOf(b.id),
    );

  const topScore = ranking[0]?.score ?? 0;
  const tie = ranking.length > 1 && ranking[1].score === topScore;

  return { winner: ranking[0]!.id, ranking, tie };
}

/** All dishes sharing the top score, in priority order (max 4). */
export function tiedIds(result: Result): ArchetypeId[] {
  const topScore = result.ranking[0]?.score ?? 0;
  return result.ranking
    .filter((r) => r.score === topScore)
    .map((r) => r.id)
    .slice(0, 4);
}
