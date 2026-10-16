import type { ArchetypeId } from '../lib/types';
import { ART } from './palette';

/**
 * Retro stamp / line-art dish mascots.
 *
 * Each entry is the INNER markup of an SVG drawn in a 100x100 box centred on
 * the origin (so x and y both run roughly -50..50). That lets the exact same
 * art be reused three ways:
 *   - React:    <DishMascot id> wraps it in <svg viewBox="-50 -50 100 100">
 *   - share:    html-to-image renders that React node
 *   - OG image: ogSvg injects it into a <g transform="translate(x,y) scale(s)">
 *
 * Cute-by-construction: one kopi outline, at most one accent fill, and every
 * dish gets a face (shiny eyes, rosy cheeks, an expression that matches its
 * personality). No gradients.
 */

const S = 4; // main stroke width
const L = ART.line;
const C = ART.cream;

type FaceOpts = {
  eyes?: 'open' | 'happy' | 'wink' | 'serene' | 'wide';
  mouth?: 'smile' | 'grin' | 'line' | 'smirk' | 'tongue';
  cheeks?: boolean;
  brow?: 'none' | 'determined' | 'raised';
};

/** One shared face grammar so the whole cast feels like the same family. */
function face(cx: number, cy: number, o: FaceOpts = {}): string {
  const { eyes = 'open', mouth = 'smile', cheeks = true, brow = 'none' } = o;
  const ex1 = cx - 9;
  const ex2 = cx + 9;

  const openEye = (x: number) =>
    `<circle cx="${x}" cy="${cy}" r="3.4" fill="${L}"/>` +
    `<circle cx="${x + 1.3}" cy="${cy - 1.3}" r="1.2" fill="${C}"/>`;
  const happyEye = (x: number) =>
    `<path d="M${x - 4},${cy + 1.5} q4,-5.5 8,0" fill="none" stroke="${L}" stroke-width="3" stroke-linecap="round"/>`;
  const sereneEye = (x: number) =>
    `<path d="M${x - 4},${cy} q4,4 8,0" fill="none" stroke="${L}" stroke-width="3" stroke-linecap="round"/>`;

  let eyeStr = '';
  if (eyes === 'open') eyeStr = openEye(ex1) + openEye(ex2);
  else if (eyes === 'happy') eyeStr = happyEye(ex1) + happyEye(ex2);
  else if (eyes === 'wink') eyeStr = openEye(ex1) + happyEye(ex2);
  else if (eyes === 'serene') eyeStr = sereneEye(ex1) + sereneEye(ex2);
  else if (eyes === 'wide')
    eyeStr =
      `<circle cx="${ex1}" cy="${cy}" r="4.2" fill="${L}"/><circle cx="${ex1 + 1.6}" cy="${cy - 1.6}" r="1.6" fill="${C}"/>` +
      `<circle cx="${ex2}" cy="${cy}" r="4.2" fill="${L}"/><circle cx="${ex2 + 1.6}" cy="${cy - 1.6}" r="1.6" fill="${C}"/>`;

  const my = cy + 8;
  let mouthStr = '';
  if (mouth === 'smile')
    mouthStr = `<path d="M${cx - 6},${my} Q${cx},${my + 6} ${cx + 6},${my}" fill="none" stroke="${L}" stroke-width="3" stroke-linecap="round"/>`;
  else if (mouth === 'grin')
    mouthStr =
      `<path d="M${cx - 8},${my - 1} Q${cx},${my + 9} ${cx + 8},${my - 1} Z" fill="${L}"/>` +
      `<path d="M${cx - 5},${my + 1} Q${cx},${my + 5} ${cx + 5},${my + 1} Z" fill="${ART.chilli}"/>`;
  else if (mouth === 'line')
    mouthStr = `<path d="M${cx - 5},${my} L${cx + 5},${my}" stroke="${L}" stroke-width="3" stroke-linecap="round"/>`;
  else if (mouth === 'smirk')
    mouthStr = `<path d="M${cx - 6},${my} Q${cx + 5},${my + 4} ${cx + 8},${my - 3}" fill="none" stroke="${L}" stroke-width="3" stroke-linecap="round"/>`;
  else if (mouth === 'tongue')
    mouthStr =
      `<path d="M${cx - 6},${my} Q${cx},${my + 6} ${cx + 6},${my}" fill="none" stroke="${L}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M${cx - 2},${my + 4} q2,4 4,0 Z" fill="${ART.chilli}"/>`;

  const cheekStr = cheeks
    ? `<circle cx="${cx - 14}" cy="${cy + 4}" r="3.6" fill="${ART.chilliSoft}"/><circle cx="${cx + 14}" cy="${cy + 4}" r="3.6" fill="${ART.chilliSoft}"/>`
    : '';
  const browStr =
    brow === 'determined'
      ? `<path d="M${ex1 - 5},${cy - 9} L${ex1 + 3},${cy - 6} M${ex2 + 5},${cy - 9} L${ex2 - 3},${cy - 6}" stroke="${L}" stroke-width="2.6" stroke-linecap="round"/>`
      : brow === 'raised'
        ? `<path d="M${ex1 - 4},${cy - 9} q4,-3 8,-1" fill="none" stroke="${L}" stroke-width="2.6" stroke-linecap="round"/>`
        : '';
  return cheekStr + eyeStr + browStr + mouthStr;
}

const steam = (cy = -30): string =>
  `<g fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round">` +
  `<path d="M-14,${cy} q-6,-7 0,-13 q6,-7 0,-13"/>` +
  `<path d="M0,${cy - 4} q-6,-7 0,-13 q6,-7 0,-13"/>` +
  `<path d="M14,${cy} q-6,-7 0,-13 q6,-7 0,-13"/>` +
  `</g>`;

/** A front-facing bowl: rim + body. Content sits inside the opening. */
const bowlBody = (): string =>
  `<rect x="-40" y="-16" width="80" height="9" rx="4.5" fill="${ART.cream}" stroke="${L}" stroke-width="${S}"/>` +
  `<path d="M-37,-6 C-37,25 -19,34 0,34 C19,34 37,25 37,-6 Z" fill="${ART.card}" stroke="${L}" stroke-width="${S}" stroke-linejoin="round"/>`;

/** A side plate / saucer. */
const plate = (): string =>
  `<ellipse cx="0" cy="27" rx="46" ry="12" fill="${ART.card}" stroke="${L}" stroke-width="${S}"/>`;

export const DISH_ART: Record<ArchetypeId, string> = {
  'chicken-rice':
    plate() +
    `<path d="M-27,10 Q-27,-15 0,-15 Q27,-15 27,10 Q27,20 0,20 Q-27,20 -27,10 Z" fill="${ART.rice}" stroke="${L}" stroke-width="${S}" stroke-linejoin="round"/>` +
    `<path d="M-17,-8 Q0,-20 17,-8 Q0,0 -17,-8 Z" fill="${ART.turmericSoft}" stroke="${L}" stroke-width="3" stroke-linejoin="round"/>` +
    face(0, 8, { eyes: 'open', mouth: 'smile' }),

  laksa:
    bowlBody() +
    `<path d="M-31,-4 C-31,18 -16,27 0,27 C16,27 31,18 31,-4 Z" fill="${ART.chilliSoft}" stroke="${ART.chilli}" stroke-width="3"/>` +
    `<path d="M-17,14 Q0,6 17,14" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M-15,20 Q0,13 15,20" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M-15,-8 q9,-7 16,0 q-7,7 -16,0 Z" fill="${ART.chilli}" stroke="${L}" stroke-width="3"/>` +
    `<circle cx="21" cy="-6" r="7" fill="${ART.card}" stroke="${L}" stroke-width="3"/><circle cx="21" cy="-6" r="3" fill="${ART.turmeric}"/>` +
    face(-2, 4, { eyes: 'happy', mouth: 'grin' }) +
    steam(-34),

  ckteow:
    plate() +
    `<path d="M-31,21 Q-33,-12 0,-12 Q33,-12 31,21 Z" fill="${ART.kopiSoft}" stroke="${L}" stroke-width="${S}" stroke-linejoin="round"/>` +
    `<path d="M-22,2 q8,6 14,0 M-24,12 q8,6 14,0" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M10,2 q8,6 14,0 M12,12 q8,6 14,0" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="-16" cy="-6" r="4" fill="${ART.chilli}" stroke="${L}" stroke-width="2.5"/>` +
    `<circle cx="14" cy="-8" r="4" fill="${ART.chilli}" stroke="${L}" stroke-width="2.5"/>` +
    face(0, 4, { eyes: 'open', mouth: 'grin', brow: 'determined' }) +
    steam(-32),

  'chilli-crab':
    plate() +
    `<g fill="none" stroke="${L}" stroke-width="${S}" stroke-linecap="round">` +
    `<path d="M-26,16 q-8,2 -14,10 M-28,8 q-10,0 -16,4 M-26,24 q-8,4 -12,10"/>` +
    `<path d="M26,16 q8,2 14,10 M28,8 q10,0 16,4 M26,24 q8,4 12,10"/>` +
    `</g>` +
    `<path d="M-44,2 a10,10 0 1 0 8,-14" fill="${ART.chilli}" stroke="${L}" stroke-width="3"/>` +
    `<path d="M44,2 a10,10 0 1 0 -8,-14" fill="${ART.chilli}" stroke="${L}" stroke-width="3"/>` +
    `<ellipse cx="0" cy="10" rx="27" ry="19" fill="${ART.chilliSoft}" stroke="${L}" stroke-width="${S}"/>` +
    `<path d="M-27,6 q-14,0 -18,-6 M27,6 q14,0 18,-6" fill="none" stroke="${L}" stroke-width="${S}" stroke-linecap="round"/>` +
    face(0, 8, { eyes: 'open', mouth: 'smirk', brow: 'raised' }),

  'bak-kut-teh':
    `<path d="M-34,-8 L-38,30 Q-38,34 -34,34 L34,34 Q38,34 38,30 L34,-8 Z" fill="${ART.kopiSoft}" stroke="${L}" stroke-width="${S}" stroke-linejoin="round"/>` +
    `<rect x="-40" y="-16" width="80" height="9" rx="4.5" fill="${ART.cream}" stroke="${L}" stroke-width="${S}"/>` +
    `<path d="M-20,-4 q10,-8 20,0 q10,8 20,0" fill="none" stroke="${L}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M-18,2 q9,7 18,0 q9,7 18,0" fill="none" stroke="${ART.mid}" stroke-width="2.5" stroke-linecap="round"/>` +
    face(0, 14, { eyes: 'serene', mouth: 'smile' }) +
    steam(-32),

  'roti-prata':
    plate() +
    `<path d="M-29,22 Q-33,-6 -1,-14 Q31,-6 27,22 Z" fill="${ART.turmericSoft}" stroke="${L}" stroke-width="${S}" stroke-linejoin="round"/>` +
    `<path d="M-29,8 Q-2,0 27,8" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="34" cy="16" r="10" fill="${ART.chilliSoft}" stroke="${L}" stroke-width="3"/>` +
    `<circle cx="34" cy="16" r="4" fill="${ART.chilli}"/>` +
    face(0, 8, { eyes: 'happy', mouth: 'smile' }),

  'hokkien-mee':
    bowlBody() +
    `<path d="M-30,-4 C-30,16 -15,25 0,25 C15,25 30,16 30,-4 Z" fill="${ART.kopiSoft}" stroke="${L}" stroke-width="3"/>` +
    `<path d="M-16,12 Q0,5 16,12 M-14,18 Q0,11 14,18" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M-12,-6 q7,-6 13,0 q-6,6 -13,0 Z" fill="${ART.chilli}" stroke="${L}" stroke-width="3"/>` +
    `<path d="M10,-8 q6,-5 11,0 q-5,5 -11,0 Z" fill="${ART.chilli}" stroke="${L}" stroke-width="3"/>` +
    `<circle cx="22" cy="-4" r="4" fill="${ART.turmeric}" stroke="${L}" stroke-width="2.5"/>` +
    face(-2, 6, { eyes: 'open', mouth: 'smile' }),

  satay:
    `<g stroke="${L}" stroke-width="${S}" stroke-linecap="round">` +
    `<line x1="-18" y1="30" x2="-18" y2="-26"/>` +
    `<line x1="0" y1="30" x2="0" y2="-28"/>` +
    `<line x1="18" y1="30" x2="18" y2="-26"/>` +
    `</g>` +
    `<g fill="${ART.turmericSoft}" stroke="${L}" stroke-width="3">` +
    `<rect x="-27" y="-14" width="18" height="26" rx="8"/>` +
    `<rect x="-11" y="-16" width="22" height="30" rx="9"/>` +
    `<rect x="9" y="-14" width="18" height="26" rx="8"/>` +
    `</g>` +
    `<ellipse cx="0" cy="33" rx="40" ry="9" fill="${ART.card}" stroke="${L}" stroke-width="${S}"/>` +
    `<ellipse cx="0" cy="31" rx="30" ry="5.5" fill="${ART.kopiSoft}" stroke="${ART.mid}" stroke-width="2"/>` +
    face(0, -4, { eyes: 'happy', mouth: 'grin' }),

  'kaya-toast':
    `<path d="M-30,26 L-30,-6 Q-30,-12 -24,-12 L4,-12 Q10,-12 10,-6 L10,26 Z" fill="${ART.turmericSoft}" stroke="${L}" stroke-width="${S}" stroke-linejoin="round"/>` +
    `<path d="M-22,26 L-22,-2" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M-6,26 L-6,2" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="24" cy="6" r="12" fill="${ART.card}" stroke="${L}" stroke-width="${S}"/><circle cx="24" cy="6" r="5" fill="${ART.turmeric}"/>` +
    face(-10, 4, { eyes: 'happy', mouth: 'smile' }),

  'ice-kachang':
    `<path d="M-30,26 Q-34,-24 0,-30 Q34,-24 30,26 Z" fill="${ART.card}" stroke="${L}" stroke-width="${S}" stroke-linejoin="round"/>` +
    `<path d="M-22,-2 q8,7 15,0 q8,7 15,0" fill="none" stroke="${ART.chilli}" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M-20,10 q8,7 15,0 q8,7 15,0" fill="none" stroke="${ART.turmeric}" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="-12" cy="-18" r="4" fill="${ART.chilli}" stroke="${L}" stroke-width="2.5"/>` +
    `<circle cx="12" cy="-20" r="4" fill="${ART.mid}" stroke="${L}" stroke-width="2.5"/>` +
    `<circle cx="0" cy="-25" r="3.4" fill="${ART.turmeric}" stroke="${L}" stroke-width="2.5"/>` +
    face(0, 14, { eyes: 'wink', mouth: 'tongue' }),
};

export function dishMarkup(id: ArchetypeId): string {
  return DISH_ART[id];
}
