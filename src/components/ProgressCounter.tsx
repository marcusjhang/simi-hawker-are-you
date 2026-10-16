import { ART } from '../art/palette';

interface ProgressCounterProps {
  current: number;
  total: number;
}

function Bowl({ filled, active }: { filled: boolean; active: boolean }) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={20}
      height={20}
      aria-hidden="true"
      className={active ? 'animate-pop' : undefined}
    >
      <rect
        x="-40"
        y="-18"
        width="80"
        height="12"
        rx="6"
        fill={ART.cream}
        stroke={ART.mid}
        strokeWidth={9}
      />
      <path
        d="M-36,-6 C-36,24 -18,34 0,34 C18,34 36,24 36,-6 Z"
        fill={filled ? ART.chilli : ART.card}
        stroke={filled ? ART.chilli : ART.mid}
        strokeWidth={9}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProgressCounter({ current, total }: ProgressCounterProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full" aria-live="polite">
      <div className="flex items-baseline justify-between font-[family-name:var(--font-label)] text-xs text-kopi-mid">
        <span>
          Question {current} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <Bowl key={i} filled={i < current} active={i === current - 1} />
        ))}
      </div>
    </div>
  );
}
