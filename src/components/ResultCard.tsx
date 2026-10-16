import type { Archetype } from '../lib/types';
import { DishMascot } from '../art/DishMascot';

interface ResultCardProps {
  dish: Archetype;
  url: string;
}

const TOKENS = {
  paper: '#FBF3E4',
  card: '#FFFBF0',
  kopi: '#5B3A1E',
  kopiMid: '#8A5A2B',
  chilli: '#C0392B',
  ink: '#2B1B10',
};

export function ResultCard({ dish, url }: ResultCardProps) {
  return (
    <div
      data-testid="result-card"
      style={{
        width: 1080,
        height: 1350,
        boxSizing: 'border-box',
        background: TOKENS.paper,
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(138,90,43,0.05) 0 16px, transparent 16px 32px)',
        padding: 60,
        display: 'flex',
        fontFamily: 'Georgia, serif',
      }}
    >
      <div
        style={{
          flex: 1,
          boxSizing: 'border-box',
          border: `6px double ${TOKENS.kopiMid}`,
          background: TOKENS.card,
          padding: 56,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `inset 0 0 0 6px ${TOKENS.card}, inset 0 0 0 9px ${TOKENS.chilli}`,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 22,
            letterSpacing: 10,
            color: TOKENS.chilli,
          }}
        >
          YOU CONFIRM ARE...
        </div>
        <div style={{ marginTop: 8 }}>
          <DishMascot id={dish.id} size={360} />
        </div>
        <div
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 104,
            lineHeight: 1.05,
            color: TOKENS.kopi,
            textAlign: 'center',
            marginTop: 16,
          }}
        >
          {dish.name}
        </div>
        <div style={{ width: 220, height: 4, background: TOKENS.chilli, margin: '28px 0' }} />
        <div
          style={{
            fontStyle: 'italic',
            fontSize: 30,
            color: TOKENS.kopiMid,
            textAlign: 'center',
            maxWidth: 760,
          }}
        >
          {dish.tagline}
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 40 }}>
          {dish.traits.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 2,
                background: TOKENS.kopi,
                color: TOKENS.card,
                padding: '10px 18px',
                borderRadius: 4,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 18,
            letterSpacing: 3,
            color: TOKENS.kopiMid,
            marginTop: 64,
          }}
        >
          SIMI HAWKER ARE YOU?
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 16,
            color: TOKENS.kopiMid,
            marginTop: 6,
          }}
        >
          {url}
        </div>
      </div>
    </div>
  );
}
