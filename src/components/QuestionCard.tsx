import { byId } from '../data/archetypes';
import type { Question } from '../lib/types';

interface QuestionCardProps {
  question: Question;
  selectedId?: string;
  onSelect: (optionId: string) => void;
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;

export function QuestionCard({ question, selectedId, onSelect }: QuestionCardProps) {
  const isTiebreak = question.id === 'tiebreak';

  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-kopi">
        {question.text}
      </h2>
      <div className="mt-6 flex flex-col gap-3">
        {question.options.map((option, i) => {
          const label = isTiebreak
            ? `${byId[option.text as keyof typeof byId]?.name ?? option.text}`
            : option.text;
          const selected = selectedId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={selected}
              className={`flex min-h-12 w-full items-center gap-3 rounded-md border-2 px-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chilli ${
                selected
                  ? 'border-chilli bg-chilli/10 text-kopi'
                  : 'border-kopi-mid/40 bg-paper-card text-ink hover:border-kopi-mid'
              }`}
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded font-[family-name:var(--font-label)] text-xs font-bold ${
                  selected ? 'bg-chilli text-paper-card' : 'bg-kopi-mid/20 text-kopi'
                }`}
                aria-hidden="true"
              >
                {LETTERS[i]}
              </span>
              <span className="text-base">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
