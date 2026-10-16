import { Motif } from '../art/motifs';

interface TraitChipProps {
  label: string;
  tone: 'chilli' | 'kopi' | 'turmeric';
  icon?: string;
}

const TONES: Record<TraitChipProps['tone'], string> = {
  chilli: 'bg-chilli text-paper-card',
  kopi: 'bg-kopi-mid text-paper-card',
  turmeric: 'bg-turmeric text-kopi',
};

export function TraitChip({ label, tone, icon }: TraitChipProps) {
  return (
    <span
      data-testid="trait-chip"
      className={`inline-flex items-center gap-1 rounded px-3 py-1 font-[family-name:var(--font-label)] text-[0.7rem] font-bold tracking-wider ${TONES[tone]}`}
    >
      {icon && <Motif id={icon} size={13} />}
      {label}
    </span>
  );
}
