import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Landing } from '../src/components/Landing';

describe('Landing', () => {
  it('shows the title, value line, and start CTA', () => {
    render(<Landing onStart={vi.fn()} onResume={vi.fn()} resumeAvailable={false} />);
    expect(screen.getByRole('heading')).toHaveTextContent(/simi hawker are you/i);
    expect(screen.getAllByText(/8 questions/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /chiong ah/i })).toBeInTheDocument();
  });

  it('calls onStart when the CTA is pressed', () => {
    const onStart = vi.fn();
    render(<Landing onStart={onStart} onResume={vi.fn()} resumeAvailable={false} />);
    fireEvent.click(screen.getByRole('button', { name: /chiong ah/i }));
    expect(onStart).toHaveBeenCalledOnce();
  });

  it('offers resume only when there is saved progress', () => {
    const { rerender } = render(
      <Landing onStart={vi.fn()} onResume={vi.fn()} resumeAvailable={false} />,
    );
    expect(screen.queryByRole('button', { name: /continue where you stop/i })).toBeNull();
    rerender(<Landing onStart={vi.fn()} onResume={vi.fn()} resumeAvailable />);
    expect(screen.getByRole('button', { name: /continue where you stop/i })).toBeInTheDocument();
  });
});
