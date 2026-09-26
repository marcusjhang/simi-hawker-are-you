export type ArchetypeId =
  | 'chicken-rice'
  | 'laksa'
  | 'ckteow'
  | 'chilli-crab'
  | 'bak-kut-teh'
  | 'roti-prata'
  | 'hokkien-mee'
  | 'satay'
  | 'kaya-toast'
  | 'ice-kachang';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  emoji: string;
  tagline: string;
  traits: [string, string, string];
  blurb: string;
  pairing: ArchetypeId;
}

export interface Option {
  id: string;
  text: string;
  weights: Partial<Record<ArchetypeId, number>>;
}

export interface Question {
  id: string;
  text: string;
  options: [Option, Option, Option, Option];
}

export interface RankedResult {
  id: ArchetypeId;
  score: number;
  pct: number;
}

export interface Result {
  winner: ArchetypeId;
  ranking: RankedResult[];
  tie: boolean;
}
