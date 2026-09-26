import { describe, it, expect } from 'vitest';
import { escapeXml, ogSvg, resultPage } from '../src/lib/ogTemplate';

describe('ogTemplate', () => {
  it('escapes xml entities', () => {
    expect(escapeXml('a & b < c > d "e"')).toBe('a &amp; b &lt; c &gt; d &quot;e&quot;');
  });

  it('builds a 1200x630 svg containing the dish name', () => {
    const svg = ogSvg('Laksa', 'Rich and warm');
    expect(svg).toContain('width="1200"');
    expect(svg).toContain('height="630"');
    expect(svg).toContain('Laksa');
  });

  it('builds a result page with matching og tags and a redirect', () => {
    const html = resultPage({
      id: 'laksa',
      name: 'Laksa',
      tagline: 'Rich and warm',
      site: 'https://x',
    });
    expect(html).toContain('og:title" content="Laksa');
    expect(html).toContain('og:image" content="https://x/result/laksa/og.png"');
    expect(html).toContain('og:url" content="https://x/result/laksa/"');
    expect(html).toContain('index.html#/result?r=laksa');
  });
});
