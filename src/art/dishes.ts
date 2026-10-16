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
 * Style rules: one 4px kopi outline, at most one accent fill, a small friendly
 * face, no gradients.
 */

const S = 4; // main stroke width

const face = (cx: number, cy: number, r = 3): string =>
  `<circle cx="${cx - 9}" cy="${cy}" r="${r}" fill="${ART.line}"/>` +
  `<circle cx="${cx + 9}" cy="${cy}" r="${r}" fill="${ART.line}"/>` +
  `<path d="M${cx - 6},${cy + 7} Q${cx},${cy + 12} ${cx + 6},${cy + 7}" fill="none" stroke="${ART.line}" stroke-width="3" stroke-linecap="round"/>`;

const steam = (cy = -30): string =>
  `<g fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round">` +
  `<path d="M-14,${cy} q-6,-7 0,-13 q6,-7 0,-13"/>` +
  `<path d="M0,${cy - 4} q-6,-7 0,-13 q6,-7 0,-13"/>` +
  `<path d="M14,${cy} q-6,-7 0,-13 q6,-7 0,-13"/>` +
  `</g>`;

/** A front-facing bowl: rim + body. Content sits inside the opening. */
const bowlBody = (): string =>
  `<rect x="-40" y="-16" width="80" height="9" rx="4.5" fill="${ART.cream}" stroke="${ART.line}" stroke-width="${S}"/>` +
  `<path d="M-37,-6 C-37,25 -19,34 0,34 C19,34 37,25 37,-6 Z" fill="${ART.card}" stroke="${ART.line}" stroke-width="${S}" stroke-linejoin="round"/>`;

/** A side plate / saucer. */
const plate = (): string =>
  `<ellipse cx="0" cy="27" rx="46" ry="12" fill="${ART.card}" stroke="${ART.line}" stroke-width="${S}"/>`;

export const DISH_ART: Record<ArchetypeId, string> = {
  'chicken-rice':
    plate() +
    `<path d="M-26,14 Q-26,-10 0,-10 Q26,-10 26,14 Z" fill="${ART.rice}" stroke="${ART.line}" stroke-width="${S}" stroke-linejoin="round"/>` +
    `<path d="M-22,2 Q-8,-9 8,2 Z" fill="${ART.turmericSoft}" stroke="${ART.line}" stroke-width="3"/>` +
    `<path d="M-4,4 Q10,-7 24,4 Z" fill="${ART.turmericSoft}" stroke="${ART.line}" stroke-width="3"/>` +
    face(0, 6),

  laksa:
    bowlBody() +
    `<path d="M-31,-4 C-31,18 -16,27 0,27 C16,27 31,18 31,-4 Z" fill="${ART.chilliSoft}" stroke="${ART.chilli}" stroke-width="3"/>` +
    `<path d="M-17,12 Q0,4 17,12" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M-15,18 Q0,11 15,18" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M-14,-8 q9,-7 16,0 q-7,7 -16,0 Z" fill="${ART.chilli}" stroke="${ART.line}" stroke-width="3"/>` +
    `<circle cx="20" cy="-6" r="7" fill="${ART.card}" stroke="${ART.line}" stroke-width="3"/><circle cx="20" cy="-6" r="3" fill="${ART.turmeric}"/>` +
    face(-2, 6) +
    steam(-34),

  ckteow:
    plate() +
    `<path d="M-31,21 Q-33,-12 0,-12 Q33,-12 31,21 Z" fill="${ART.kopiSoft}" stroke="${ART.line}" stroke-width="${S}" stroke-linejoin="round"/>` +
    `<path d="M-22,2 q8,6 14,0 M-24,12 q8,6 14,0" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M10,2 q8,6 14,0 M12,12 q8,6 14,0" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="-16" cy="-6" r="4" fill="${ART.chilli}" stroke="${ART.line}" stroke-width="2.5"/>` +
    `<circle cx="14" cy="-8" r="4" fill="${ART.chilli}" stroke="${ART.line}" stroke-width="2.5"/>` +
    face(0, 4) +
    steam(-32),

  'chilli-crab':
    plate() +
    `<g fill="none" stroke="${ART.line}" stroke-width="${S}" stroke-linecap="round">` +
    `<path d="M-26,16 q-8,2 -14,10 M-28,8 q-10,0 -16,4 M-26,24 q-8,4 -12,10"/>` +
    `<path d="M26,16 q8,2 14,10 M28,8 q10,0 16,4 M26,24 q8,4 12,10"/>` +
    `</g>` +
    `<path d="M-44,2 a10,10 0 1 0 8,-14" fill="${ART.chilli}" stroke="${ART.line}" stroke-width="3"/>` +
    `<path d="M44,2 a10,10 0 1 0 -8,-14" fill="${ART.chilli}" stroke="${ART.line}" stroke-width="3"/>` +
    `<ellipse cx="0" cy="10" rx="27" ry="19" fill="${ART.chilliSoft}" stroke="${ART.line}" stroke-width="${S}"/>` +
    `<path d="M-27,6 q-14,0 -18,-6 M27,6 q14,0 18,-6" fill="none" stroke="${ART.line}" stroke-width="${S}" stroke-linecap="round"/>` +
    `<circle cx="-9" cy="8" r="3.2" fill="${ART.line}"/><circle cx="9" cy="8" r="3.2" fill="${ART.line}"/>` +
    `<path d="M-6,15 Q0,20 6,15" fill="none" stroke="${ART.line}" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="-15" cy="20" r="2.4" fill="${ART.chilli}"/><circle cx="15" cy="20" r="2.4" fill="${ART.chilli}"/>`,

  'bak-kut-teh':
    `<path d="M-34,-8 L-38,30 Q-38,34 -34,34 L34,34 Q38,34 38,30 L34,-8 Z" fill="${ART.kopiSoft}" stroke="${ART.line}" stroke-width="${S}" stroke-linejoin="round"/>` +
    `<rect x="-40" y="-16" width="80" height="9" rx="4.5" fill="${ART.cream}" stroke="${ART.line}" stroke-width="${S}"/>` +
    `<path d="M-20,-4 q10,-8 20,0 q10,8 20,0" fill="none" stroke="${ART.line}" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="-12" cy="12" r="3.4" fill="${ART.line}"/><circle cx="12" cy="12" r="3.4" fill="${ART.line}"/>` +
    `<path d="M-9,19 Q0,25 9,19" fill="none" stroke="${ART.line}" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="-18" cy="2" r="2" fill="${ART.ink}"/><circle cx="18" cy="2" r="2" fill="${ART.ink}"/>` +
    steam(-32),

  'roti-prata':
    plate() +
    `<path d="M-30,22 L-4,-8 L22,8 Z" fill="${ART.turmericSoft}" stroke="${ART.line}" stroke-width="${S}" stroke-linejoin="round"/>` +
    `<path d="M-16,10 L0,-2 M-6,14 L8,4" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="30" cy="14" r="11" fill="${ART.chilliSoft}" stroke="${ART.line}" stroke-width="3"/>` +
    `<circle cx="30" cy="14" r="4.5" fill="${ART.chilli}"/>` +
    `<circle cx="-14" cy="8" r="3" fill="${ART.line}"/><circle cx="-2" cy="8" r="3" fill="${ART.line}"/>` +
    `<path d="M-11,15 Q-8,19 -5,15" fill="none" stroke="${ART.line}" stroke-width="3" stroke-linecap="round"/>`,

  'hokkien-mee':
    bowlBody() +
    `<path d="M-30,-4 C-30,16 -15,25 0,25 C15,25 30,16 30,-4 Z" fill="${ART.kopiSoft}" stroke="${ART.line}" stroke-width="3"/>` +
    `<path d="M-16,10 Q0,3 16,10 M-14,16 Q0,9 14,16" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M-12,-6 q7,-6 13,0 q-6,6 -13,0 Z" fill="${ART.chilli}" stroke="${ART.line}" stroke-width="3"/>` +
    `<path d="M10,-8 q6,-5 11,0 q-5,5 -11,0 Z" fill="${ART.chilli}" stroke="${ART.line}" stroke-width="3"/>` +
    `<circle cx="22" cy="-4" r="4" fill="${ART.turmeric}" stroke="${ART.line}" stroke-width="2.5"/>` +
    face(-2, 8),

  satay:
    `<g stroke="${ART.line}" stroke-width="${S}" stroke-linecap="round">` +
    `<line x1="-20" y1="28" x2="-20" y2="-24"/>` +
    `<line x1="0" y1="28" x2="0" y2="-26"/>` +
    `<line x1="20" y1="28" x2="20" y2="-24"/>` +
    `</g>` +
    `<g fill="${ART.turmericSoft}" stroke="${ART.line}" stroke-width="3">` +
    `<ellipse cx="-20" cy="-6" rx="10" ry="14"/>` +
    `<ellipse cx="0" cy="-8" rx="10" ry="14"/>` +
    `<ellipse cx="20" cy="-6" rx="10" ry="14"/>` +
    `</g>` +
    `<ellipse cx="0" cy="32" rx="40" ry="9" fill="${ART.card}" stroke="${ART.line}" stroke-width="${S}"/>` +
    `<ellipse cx="0" cy="30" rx="30" ry="5.5" fill="${ART.kopiSoft}" stroke="${ART.mid}" stroke-width="2"/>` +
    `<circle cx="-9" cy="-10" r="2.6" fill="${ART.line}"/><circle cx="9" cy="-10" r="2.6" fill="${ART.line}"/>` +
    `<path d="M-6,-4 Q0,1 6,-4" fill="none" stroke="${ART.line}" stroke-width="3" stroke-linecap="round"/>`,

  'kaya-toast':
    `<path d="M-30,26 L-30,-6 Q-30,-12 -24,-12 L4,-12 Q10,-12 10,-6 L10,26 Z" fill="${ART.turmericSoft}" stroke="${ART.line}" stroke-width="${S}" stroke-linejoin="round"/>` +
    `<path d="M-22,26 L-22,-2" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M-6,26 L-6,2" fill="none" stroke="${ART.mid}" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="22" cy="6" r="12" fill="${ART.card}" stroke="${ART.line}" stroke-width="${S}"/><circle cx="22" cy="6" r="5" fill="${ART.turmeric}"/>` +
    face(-10, 6),

  'ice-kachang':
    `<path d="M-30,26 Q-34,-24 0,-30 Q34,-24 30,26 Z" fill="${ART.card}" stroke="${ART.line}" stroke-width="${S}" stroke-linejoin="round"/>` +
    `<path d="M-22,-2 q8,7 15,0 q8,7 15,0" fill="none" stroke="${ART.chilli}" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M-20,10 q8,7 15,0 q8,7 15,0" fill="none" stroke="${ART.turmeric}" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="-12" cy="-16" r="4" fill="${ART.chilli}" stroke="${ART.line}" stroke-width="2.5"/>` +
    `<circle cx="12" cy="-18" r="4" fill="${ART.mid}" stroke="${ART.line}" stroke-width="2.5"/>` +
    `<circle cx="0" cy="-24" r="3.4" fill="${ART.turmeric}" stroke="${ART.line}" stroke-width="2.5"/>` +
    `<circle cx="-9" cy="18" r="3" fill="${ART.line}"/><circle cx="9" cy="18" r="3" fill="${ART.line}"/>` +
    `<path d="M-6,24 Q0,29 6,24" fill="none" stroke="${ART.line}" stroke-width="3" stroke-linecap="round"/>`,
};

export function dishMarkup(id: ArchetypeId): string {
  return DISH_ART[id];
}
