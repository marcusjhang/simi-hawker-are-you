import type { Question } from '../lib/types';

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Alarm ring already. What is your first move?',
    options: [
      { id: 'q1a', text: 'Lim kopi first, everything else can wait.', weights: { 'kaya-toast': 3, 'roti-prata': 1 } },
      { id: 'q1b', text: 'Snooze five times, then dash out the door.', weights: { 'roti-prata': 3, 'ice-kachang': 1 } },
      { id: 'q1c', text: 'Wake up immediately. I am disciplined one.', weights: { 'bak-kut-teh': 3, 'chicken-rice': 1 } },
      { id: 'q1d', text: 'Jump up — got 100 things to do today.', weights: { ckteow: 3, 'chilli-crab': 1 } },
    ],
  },
  {
    id: 'q2',
    text: '12pm at the hawker centre and the queue is snaking. You...',
    options: [
      { id: 'q2a', text: 'Join the longest queue. Long queue means ho jiak.', weights: { laksa: 3, 'bak-kut-teh': 1 } },
      { id: 'q2b', text: 'Go straight to the stall I always trust.', weights: { 'chicken-rice': 3, 'kaya-toast': 1 } },
      { id: 'q2c', text: 'Find the rest of the gang already seated.', weights: { satay: 3, 'hokkien-mee': 1 } },
      { id: 'q2d', text: 'Forget it — go somewhere with aircon.', weights: { 'chilli-crab': 3, satay: 1 } },
    ],
  },
  {
    id: 'q3',
    text: 'Be honest. What is your relationship with chilli?',
    options: [
      { id: 'q3a', text: 'Mild only, I scared.', weights: { 'kaya-toast': 3, 'bak-kut-teh': 1 } },
      { id: 'q3b', text: 'Some chilli, but must still taste the wok hei.', weights: { ckteow: 3, 'hokkien-mee': 1 } },
      { id: 'q3c', text: 'I take whatever the stall recommends.', weights: { 'hokkien-mee': 3, laksa: 1 } },
      { id: 'q3d', text: 'Chilli is a personality. I bring my own.', weights: { 'chilli-crab': 3, ckteow: 1 } },
    ],
  },
  {
    id: 'q4',
    text: 'Free weekend, no plans. Your ideal?',
    options: [
      { id: 'q4a', text: 'Cafe hop and take nice photos.', weights: { 'ice-kachang': 3, satay: 1 } },
      { id: 'q4b', text: 'Stay home, boil soup, watch drama.', weights: { 'bak-kut-teh': 3, 'kaya-toast': 1 } },
      { id: 'q4c', text: 'Rainy day, hot bowl, no need to talk.', weights: { laksa: 3, 'chilli-crab': 1 } },
      { id: 'q4d', text: 'Anything also can — I am flexible.', weights: { 'roti-prata': 3, 'chicken-rice': 1 } },
    ],
  },
  {
    id: 'q5',
    text: 'Group project, four people. Which one are you?',
    options: [
      { id: 'q5a', text: 'The responsible one. I do everything.', weights: { 'chicken-rice': 3, laksa: 1 } },
      { id: 'q5b', text: 'The ideas person. Messy but brilliant.', weights: { 'ice-kachang': 3, 'chilli-crab': 1 } },
      { id: 'q5c', text: 'The negotiator. I talk to everybody.', weights: { satay: 3, 'bak-kut-teh': 1 } },
      { id: 'q5d', text: 'Quiet one who secretly saves the day.', weights: { 'hokkien-mee': 3, 'roti-prata': 1 } },
    ],
  },
  {
    id: 'q6',
    text: 'Payday. What happens?',
    options: [
      { id: 'q6a', text: 'Spend it all within a week. Zero regrets.', weights: { 'ice-kachang': 3, ckteow: 1 } },
      { id: 'q6b', text: 'Save 80%, spend on one really good meal.', weights: { 'bak-kut-teh': 3, 'chicken-rice': 1 } },
      { id: 'q6c', text: 'Buy that thing I have been eyeing for months.', weights: { 'chilli-crab': 3, 'kaya-toast': 1 } },
      { id: 'q6d', text: 'Treat my parents to a nice breakfast.', weights: { 'kaya-toast': 3, laksa: 1 } },
    ],
  },
  {
    id: 'q7',
    text: 'Rain like waterfall. What now?',
    options: [
      { id: 'q7a', text: 'Cannot cancel, I am already on the way.', weights: { 'hokkien-mee': 3, 'chicken-rice': 1 } },
      { id: 'q7b', text: 'Stay in, order delivery, watch show.', weights: { 'roti-prata': 3, 'kaya-toast': 1 } },
      { id: 'q7c', text: 'Perfect weather for hot peppery soup.', weights: { 'bak-kut-teh': 3, laksa: 1 } },
      { id: 'q7d', text: 'Rainy day is laksa day. Non-negotiable.', weights: { laksa: 3, 'ice-kachang': 1 } },
    ],
  },
  {
    id: 'q8',
    text: '2am. Hungry. You reach for...',
    options: [
      { id: 'q8a', text: 'Fried rice with everything thrown inside.', weights: { ckteow: 3, satay: 1 } },
      { id: 'q8b', text: 'Whatever is in the fridge, just steam it.', weights: { 'chicken-rice': 3, 'roti-prata': 1 } },
      { id: 'q8c', text: 'Supper with the whole gang.', weights: { satay: 3, 'ice-kachang': 1 } },
      { id: 'q8d', text: 'Kopi and toast — my comfort combo.', weights: { 'kaya-toast': 3, 'bak-kut-teh': 1 } },
    ],
  },
];
