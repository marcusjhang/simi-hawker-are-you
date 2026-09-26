import type { Archetype, ArchetypeId } from '../lib/types';

export const ARCHETYPES: Archetype[] = [
  {
    id: 'chicken-rice',
    name: 'Chicken Rice',
    emoji: '🍗',
    tagline: 'Everyone agrees on you, and that is a superpower.',
    traits: ['STEADY', 'RELIABLE', 'NO DRAMA'],
    blurb:
      'Every table has one person everybody can agree on, and somehow it is always you. You do not need to be the loudest — you just quietly deliver every time. At times a bit predictable, but that is exactly why people keep you around.',
    pairing: 'roti-prata',
  },
  {
    id: 'laksa',
    name: 'Laksa',
    emoji: '🍜',
    tagline: 'Rich, warm, and a little bit extra — in the best way.',
    traits: ['COMFORTING', 'RICH', 'EXTRA'],
    blurb:
      'You are the one people come to when the day has been long. Warm, generous, and full of flavour, you make everything feel better just by being there. At times you go a bit heavy on the coconut milk, but nobody is complaining.',
    pairing: 'kaya-toast',
  },
  {
    id: 'ckteow',
    name: 'Char Kway Teow',
    emoji: '🍝',
    tagline: 'Maximum wok hei, zero patience. Worth the queue.',
    traits: ['CHIONG', 'HIGH HEAT', 'DRAMATIC'],
    blurb:
      'You run hot, in the best way. When you are on, nobody can match your wok hei, and when you are off, everyone still orders you anyway. At times a bit dramatic — but life with you is never boring.',
    pairing: 'chilli-crab',
  },
  {
    id: 'chilli-crab',
    name: 'Chilli Crab',
    emoji: '🦀',
    tagline: 'Main-character energy. Messy, expensive, unforgettable.',
    traits: ['BOLD', 'SHOWY', 'WORTH IT'],
    blurb:
      'You are the dish people save for a special occasion. Confident, a little extravagant, and completely impossible to ignore, you are the reason the table is laughing. At times you leave a mess, but everyone remembers the night.',
    pairing: 'ckteow',
  },
  {
    id: 'bak-kut-teh',
    name: 'Bak Kut Teh',
    emoji: '🍲',
    tagline: 'Old-school and peppery. You set trends, you do not follow.',
    traits: ['TRADITIONAL', 'NO-NONSENSE', 'DEEP'],
    blurb:
      'You believe in doing things properly, the way they have always been done. Peppery, grounded, and quietly restorative, you are the person everyone calls when things get hard. At times a bit stubborn, but your way usually works.',
    pairing: 'hokkien-mee',
  },
  {
    id: 'roti-prata',
    name: 'Roti Prata',
    emoji: '🫓',
    tagline: 'Good at any hour, any mood, any crowd.',
    traits: ['FLEXIBLE', 'CHILL', 'ALWAYS THERE'],
    blurb:
      'You are the 2am friend. Crispy when you need to be, soft when it counts, and available in more configurations than anyone can name. At times you spread yourself thin, but you are everyone\u2019s comfort food.',
    pairing: 'chicken-rice',
  },
  {
    id: 'hokkien-mee',
    name: 'Hokkien Mee',
    emoji: '🍤',
    tagline: 'Quietly deep. The connoisseur\u2019s pick.',
    traits: ['UNDERRATED', 'RICH', 'SECRETLY GREAT'],
    blurb:
      'You do not shout, you simmer. People who take the time to know you discover a depth of prawn stock that the loud dishes cannot fake. At times you get overlooked in the queue, but the real ones know exactly where you are.',
    pairing: 'satay',
  },
  {
    id: 'satay',
    name: 'Satay',
    emoji: '🍢',
    tagline: 'You bring the whole kampong wherever you go.',
    traits: ['SOCIAL', 'GENEROUS', 'FUN'],
    blurb:
      'You are the reason plans actually happen. Never arriving alone, always ordering for the table, you turn any night into an occasion. At times a bit hard to get a word in, but nobody wants the party to stop.',
    pairing: 'ice-kachang',
  },
  {
    id: 'kaya-toast',
    name: 'Kaya Toast',
    emoji: '🍞',
    tagline: 'A kopitiam morning in human form.',
    traits: ['NOSTALGIC', 'SWEET', 'SENTIMENTAL'],
    blurb:
      'You are old songs, rainy mornings, and a soft-boiled egg done just right. Warm and a little sentimental, you make people feel at home without trying. At times you live in the past, but you make the present much nicer.',
    pairing: 'laksa',
  },
  {
    id: 'ice-kachang',
    name: 'Ice Kachang',
    emoji: '🍧',
    tagline: 'Colourful chaos, and somehow everyone\u2019s favourite.',
    traits: ['CHAOTIC', 'COLOURFUL', 'DELIGHTFUL'],
    blurb:
      'You are impossible to describe and impossible to dislike. A bit of everything, piled high, unexpected flavours at the bottom — people never know what they will get, but they always smile. At times a bit all over the place, but that is your charm.',
    pairing: 'satay',
  },
];

export const byId = Object.fromEntries(
  ARCHETYPES.map((a) => [a.id, a]),
) as Record<ArchetypeId, Archetype>;
