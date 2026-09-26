import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResultReceipt } from '../src/components/ResultReceipt';
import { score } from '../src/lib/scoring';
import { QUESTIONS } from '../src/data/questions';

const answers = {
  q1: 'q1a', q2: 'q2a', q3: 'q3a', q4: 'q4b', q5: 'q5a', q6: 'q6d', q7: 'q7c', q8: 'q8d',
};

describe('ResultReceipt', () => {
  const result = score(QUESTIONS, answers);

  it('reveals the winning dish and tagline', () => {
    render(<ResultReceipt result={result} onRestart={vi.fn()} />);
    expect(screen.getAllByText(/you confirm are/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading')).toHaveTextContent(/.+/);
  });

  it('shows a top-3 breakdown with percentage line items', () => {
    render(<ResultReceipt result={result} onRestart={vi.fn()} />);
    const items = screen.getAllByTestId('breakdown-item');
    expect(items).toHaveLength(3);
    expect(items[0].textContent).toMatch(/\d+%/);
  });

  it('shows all three trait chips', () => {
    render(<ResultReceipt result={result} onRestart={vi.fn()} />);
    expect(screen.getAllByTestId('trait-chip')).toHaveLength(3);
  });

  it('restarts when the CTA is pressed', () => {
    const onRestart = vi.fn();
    render(<ResultReceipt result={result} onRestart={onRestart} />);
    fireEvent.click(screen.getByRole('button', { name: /play again/i }));
    expect(onRestart).toHaveBeenCalledOnce();
  });
});
