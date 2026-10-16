import type { ArchetypeId } from '../lib/types';
import { dishMarkup } from './dishes';

interface DishMascotProps {
  id: ArchetypeId;
  size?: number;
  className?: string;
  /** Decorative art (default) is hidden from assistive tech. */
  decorative?: boolean;
  label?: string;
}

/** The single reusable dish illustration. Renders the shared inner SVG markup
 * inside a centred 100x100 viewBox so it looks identical in the app, the share
 * card and the build-time OG image. */
export function DishMascot({
  id,
  size = 120,
  className,
  decorative = true,
  label,
}: DishMascotProps) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={className}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={!decorative ? (label ?? id) : undefined}
      dangerouslySetInnerHTML={{ __html: dishMarkup(id) }}
    />
  );
}
