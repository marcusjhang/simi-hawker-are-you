import type { ReactElement } from 'react';

/** Small line-icons for the quiz, one per question, drawn to match the dish
 * art (currentColor stroke so they inherit the theme). */
const MOTIFS: Record<string, ReactElement> = {
  q1: (
    <>
      <circle cx="0" cy="6" r="28" />
      <path d="M0,6 L0,-10 M0,6 L15,14" />
      <path d="M-26,-20 l-9,-8 M26,-20 l9,-8" />
      <circle cx="-36" cy="-31" r="6" fill="currentColor" stroke="none" />
      <circle cx="36" cy="-31" r="6" fill="currentColor" stroke="none" />
    </>
  ),
  q2: (
    <>
      <circle cx="-26" cy="-12" r="9" />
      <path d="M-40,23 q14,-18 28,0" />
      <circle cx="0" cy="-16" r="10" />
      <path d="M-15,25 q15,-20 30,0" />
      <circle cx="26" cy="-12" r="9" />
      <path d="M12,23 q14,-18 28,0" />
    </>
  ),
  q3: (
    <>
      <path d="M-17,-12 q10,-14 22,-4 q16,14 8,30 q-22,6 -32,-12 q-6,-8 2,-14 Z" />
      <path d="M-17,-12 q-6,-10 4,-16" />
    </>
  ),
  q4: (
    <>
      <path d="M-24,-10 h40 v12 a20,20 0 0 1 -40,0 Z" />
      <path d="M16,-4 a11,9 0 0 1 0,18" />
      <path d="M-32,26 h64" />
      <path d="M-10,-24 q-6,-7 0,-13 M6,-24 q-6,-7 0,-13" />
    </>
  ),
  q5: (
    <>
      <rect x="-22" y="-26" width="44" height="54" rx="6" />
      <rect x="-8" y="-33" width="16" height="10" rx="3" />
      <path d="M-11,0 l8,8 l15,-16" />
    </>
  ),
  q6: (
    <>
      <ellipse cx="0" cy="16" rx="26" ry="9" />
      <ellipse cx="0" cy="5" rx="26" ry="9" />
      <ellipse cx="0" cy="-6" rx="26" ry="9" />
    </>
  ),
  q7: (
    <>
      <path d="M-26,2 a12,12 0 0 1 0,-22 a16,16 0 0 1 30,-4 a12,12 0 0 1 6,26 Z" />
      <path d="M-15,14 l-4,13 M0,14 l-4,13 M15,14 l-4,13" />
    </>
  ),
  q8: (
    <>
      <path d="M12,-22 a28,28 0 1 0 10,38 a22,22 0 0 1 -10,-38 Z" />
      <path d="M28,-30 l3,7 l7,3 l-7,3 l-3,7 l-3,-7 l-7,-3 l7,-3 Z" />
    </>
  ),
  tiebreak: <path d="M-24,-24 L24,24 M24,-24 L-24,24" />,
};

export const MOTIF_IDS = Object.keys(MOTIFS);

export function Motif({
  id,
  className,
  size = 40,
}: {
  id: string;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {MOTIFS[id] ?? MOTIFS.tiebreak}
    </svg>
  );
}

/** A divider rule with a little crossed-chopsticks mark in the middle. */
export function ChopstickRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-kopi-mid/70 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-kopi-mid/30" />
      <Motif id="tiebreak" size={16} />
      <span className="h-px flex-1 bg-kopi-mid/30" />
    </div>
  );
}
