interface ProgressCounterProps {
  current: number;
  total: number;
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
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-kopi-mid/20">
        <div
          className="h-full rounded-full bg-chilli transition-[width] duration-200 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
