import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultCard } from '../src/components/ResultCard';
import { renderCard } from '../src/lib/renderCard';
import { byId } from '../src/data/archetypes';

vi.mock('html-to-image', () => ({
  toBlob: vi.fn().mockResolvedValue(new Blob(['png'], { type: 'image/png' })),
}));

describe('ResultCard', () => {
  it('renders the dish at 1080x1350', () => {
    render(<ResultCard dish={byId.laksa} url="https://example.com/result/laksa/" />);
    const card = screen.getByTestId('result-card');
    expect(card).toHaveStyle({ width: '1080px', height: '1350px' });
    expect(card.textContent).toContain('Laksa');
    expect(card.textContent).toContain('https://example.com/result/laksa/');
  });
});

describe('renderCard', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns a png blob', async () => {
    const blob = await renderCard(document.createElement('div'));
    expect(blob.type).toBe('image/png');
  });

  it('throws when the renderer returns null', async () => {
    const { toBlob } = await import('html-to-image');
    (toBlob as ReturnType<typeof vi.fn>).mockResolvedValueOnce(null);
    await expect(renderCard(document.createElement('div'))).rejects.toThrow(/failed/i);
  });
});
