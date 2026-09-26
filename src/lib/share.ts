import type { Archetype, ArchetypeId } from './types';

export function canonicalResultUrl(id: ArchetypeId): string {
  const { origin, pathname } = window.location;
  const base = pathname.replace(/index\.html$/, '');
  return `${origin}${base}result/${id}/`;
}

export function buildShareText(dish: Archetype, url: string): string {
  return `I got ${dish.name}! ${dish.tagline} which hawker are you? ${url}`;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export type ShareMethod = 'native' | 'downloaded';

export async function shareResult(
  blob: Blob,
  text: string,
  url: string,
): Promise<ShareMethod> {
  const file = new File([blob], 'simi-hawker.png', { type: 'image/png' });
  const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
  const canShareFiles =
    typeof nav.canShare === 'function' &&
    typeof nav.share === 'function' &&
    nav.canShare({ files: [file] });

  if (canShareFiles) {
    try {
      await nav.share({ files: [file], title: 'Simi Hawker Are You?', text, url });
      return 'native';
    } catch {
      // Cancelled or failed; fall through to download.
    }
  }

  downloadBlob(blob, 'simi-hawker.png');
  return 'downloaded';
}
