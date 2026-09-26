import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  buildShareText,
  canonicalResultUrl,
  copyText,
  shareResult,
} from '../src/lib/share';
import { byId } from '../src/data/archetypes';

describe('share', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('builds a canonical result url with a trailing slash', () => {
    expect(canonicalResultUrl('laksa')).toBe(`${window.location.origin}/result/laksa/`);
  });

  it('builds share text with the dish and the url', () => {
    const text = buildShareText(byId.laksa, 'https://x/result/laksa/');
    expect(text).toContain('Laksa');
    expect(text).toContain('https://x/result/laksa/');
  });

  it('uses native share when files can be shared', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { ...navigator, canShare: () => true, share });
    const method = await shareResult(new Blob(['x']), 'hi', 'https://x');
    expect(method).toBe('native');
    expect(share).toHaveBeenCalledOnce();
  });

  it('falls back to download when native file share is unavailable', async () => {
    vi.stubGlobal('navigator', { ...navigator, canShare: undefined, share: undefined });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const method = await shareResult(new Blob(['x']), 'hi', 'https://x');
    expect(method).toBe('downloaded');
    expect(click).toHaveBeenCalled();
  });

  it('returns false from copyText when the clipboard throws', async () => {
    vi.stubGlobal('navigator', {
      ...navigator,
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error('blocked')) },
    });
    expect(await copyText('x')).toBe(false);
  });
});
