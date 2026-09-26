import { useRef, useState } from 'react';
import { byId } from '../data/archetypes';
import type { Result } from '../lib/types';
import { TraitChip } from './TraitChip';
import { ResultCard } from './ResultCard';
import { renderCard } from '../lib/renderCard';
import {
  buildShareText,
  canonicalResultUrl,
  copyText,
  shareResult,
} from '../lib/share';

interface ResultReceiptProps {
  result: Result;
  onRestart: () => void;
}

const TONES = ['chilli', 'kopi', 'turmeric'] as const;

export function ResultReceipt({ result, onRestart }: ResultReceiptProps) {
  const dish = byId[result.winner];
  const top3 = result.ranking.slice(0, 3);

  const cardRef = useRef<HTMLDivElement>(null);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  const handleShare = async () => {
    if (!cardRef.current) return;
    const url = canonicalResultUrl(dish.id);
    const text = buildShareText(dish, url);
    setShareStatus('Building your card...');
    try {
      const blob = await renderCard(cardRef.current);
      const method = await shareResult(blob, text, url);
      if (method === 'downloaded') {
        const copied = await copyText(text);
        setShareStatus(copied ? 'Card downloaded, link copied!' : 'Card downloaded!');
      } else {
        setShareStatus(null);
      }
    } catch {
      setShareStatus('Cannot build the card leh. Try again?');
    }
  };

  return (
    <section className="mx-auto flex min-h-dvh max-w-md flex-col items-center px-6 py-10">
      <div
        aria-hidden="true"
        style={{ position: 'fixed', left: -99999, top: 0, pointerEvents: 'none' }}
      >
        <div ref={cardRef}>
          <ResultCard dish={dish} url={canonicalResultUrl(dish.id)} />
        </div>
      </div>

      <article className="w-full rounded-md border-[3px] border-double border-kopi-mid bg-paper-card px-6 py-8 shadow-[inset_0_0_0_4px_var(--color-paper-card),inset_0_0_0_5px_var(--color-chilli)]">
        <p className="text-center font-[family-name:var(--font-label)] text-xs tracking-[0.3em] text-kopi-mid">
          AH KOW KOPITIAM
        </p>
        <p className="mt-6 text-center font-[family-name:var(--font-label)] text-xs tracking-[0.2em] text-chilli">
          YOU CONFIRM ARE...
        </p>
        <h1 className="mt-2 border-y-2 border-chilli py-3 text-center font-[family-name:var(--font-display)] text-4xl leading-tight text-kopi">
          {dish.name}
        </h1>
        <p className="mt-4 text-center text-sm italic text-kopi-mid">{dish.tagline}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {dish.traits.map((t, i) => (
            <TraitChip key={t} label={t} tone={TONES[i] ?? 'kopi'} />
          ))}
        </div>
        <p className="mt-6 text-[0.95rem] leading-relaxed text-ink">{dish.blurb}</p>
        <p className="mt-3 text-sm text-kopi-mid">
          Best eaten with:{' '}
          <span className="font-semibold text-kopi">{byId[dish.pairing].name}</span>
        </p>

        <div className="my-6 border-t border-dashed border-kopi-mid" />

        <p className="font-[family-name:var(--font-label)] text-xs tracking-[0.2em] text-kopi-mid">
          YOUR TOP 3
        </p>
        <ul className="mt-3 space-y-1 font-[family-name:var(--font-label)] text-sm text-ink">
          {top3.map((r) => (
            <li key={r.id} data-testid="breakdown-item" className="flex items-baseline gap-2">
              <span className="uppercase">{byId[r.id].name}</span>
              <span className="flex-1 border-b border-dotted border-kopi-mid/60" aria-hidden="true" />
              <span className="font-bold text-kopi">{r.pct}%</span>
            </li>
          ))}
        </ul>

        <div className="my-6 border-t border-dashed border-kopi-mid" />
        <p className="text-center font-[family-name:var(--font-label)] text-[0.65rem] tracking-[0.2em] text-kopi-mid">
          SINCE 1965 &middot; NO DATA COLLECTED
        </p>
      </article>

      <button
        type="button"
        onClick={handleShare}
        className="mt-6 min-h-12 w-full rounded-md bg-kopi px-6 text-lg font-bold text-paper-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chilli"
      >
        Share my hawker
      </button>
      {shareStatus && (
        <p role="status" className="mt-2 text-center text-sm text-kopi-mid">
          {shareStatus}
        </p>
      )}

      <button
        type="button"
        onClick={onRestart}
        className="mt-3 min-h-12 w-full rounded-md bg-chilli px-6 text-lg font-bold text-paper-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kopi"
      >
        Play again
      </button>
    </section>
  );
}
