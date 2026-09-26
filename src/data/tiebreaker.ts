import type { ArchetypeId, Question } from '../lib/types';

export function makeTiebreaker(ids: ArchetypeId[]): Question {
  const picked = ids.slice(0, 4);
  return {
    id: 'tiebreak',
    text: 'Eh, last one — cannot decide ah. Which one you cannot live without?',
    options: picked.map((id, i) => ({
      id: `tiebreak-${i}`,
      text: id,
      weights: { [id]: 3 },
    })) as Question['options'],
  };
}
