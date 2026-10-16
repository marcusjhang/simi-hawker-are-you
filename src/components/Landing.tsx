import { DishMascot } from '../art/DishMascot';
import type { ArchetypeId } from '../lib/types';

interface LandingProps {
  onStart: () => void;
  onResume: () => void;
  resumeAvailable: boolean;
}

const CAST: ArchetypeId[] = [
  'laksa',
  'chicken-rice',
  'chilli-crab',
  'satay',
  'ice-kachang',
];

export function Landing({ onStart, onResume, resumeAvailable }: LandingProps) {
  return (
    <section className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-between px-6 py-10 text-center">
      <div className="flex flex-1 flex-col items-center justify-center">
        <span className="font-[family-name:var(--font-label)] text-xs tracking-[0.3em] text-chilli">
          AH KOW KOPITIAM PRESENTS
        </span>
        <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl leading-none text-kopi">
          Simi Hawker{' '}
          <br />
          Are You?
        </h1>
        <div className="my-5 h-0.5 w-24 bg-chilli" aria-hidden="true" />

        <div className="flex items-end justify-center gap-1" aria-hidden="true">
          {CAST.map((id, i) => (
            <span
              key={id}
              className="animate-float"
              style={{ animationDelay: `${i * 0.18}s` }}
            >
              <DishMascot id={id} size={i % 2 === 0 ? 58 : 46} />
            </span>
          ))}
        </div>

        <p className="mt-6 text-base text-kopi-mid">
          Singapore&apos;s most unscientific personality test. 8 questions,
          about 2 minutes, zero data collected &mdash; find out which hawker
          dish you confirm are.
        </p>
      </div>

      <div className="w-full">
        <button
          type="button"
          onClick={onStart}
          className="min-h-12 w-full rounded-md bg-chilli px-6 text-lg font-bold text-paper-card shadow-sm transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kopi active:scale-[0.99]"
        >
          Chiong ah! Start
        </button>

        {resumeAvailable && (
          <button
            type="button"
            onClick={onResume}
            className="mt-3 min-h-12 w-full rounded-md border border-kopi-mid px-6 text-sm font-semibold text-kopi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chilli"
          >
            Continue where you stop
          </button>
        )}

        <p className="mt-4 font-[family-name:var(--font-label)] text-xs text-kopi-mid">
          8 questions &middot; ~2 min &middot; no sign-up &middot; no data
          collected
        </p>
      </div>
    </section>
  );
}
