import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';
import { QUESTIONS } from '../src/data/questions';

describe('full flow', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState(null, '', '/');
  });

  it('goes landing -> quiz -> result and encodes the result in the hash', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /chiong ah/i }));

    for (const q of QUESTIONS) {
      fireEvent.click(screen.getByText(q.options[0].text));
    }
    // A tie-breaker may appear; answer it if present.
    const tiebreak = screen.queryByText(/cannot decide ah/i);
    if (tiebreak) fireEvent.click(screen.getAllByRole('button')[0]);

    expect(screen.getAllByText(/you confirm are/i).length).toBeGreaterThan(0);
    expect(window.location.hash).toMatch(/^#\/result\?r=/);
    expect(screen.getAllByTestId('breakdown-item')).toHaveLength(3);
  });

  it('renders a result directly from a shared hash', () => {
    window.history.replaceState(null, '', '/#/result?r=laksa');
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent(/laksa/i);
  });

  it('resumes from saved progress', () => {
    window.localStorage.setItem('simi-hawker.answers.v1', JSON.stringify({ q1: 'q1a' }));
    render(<App />);
    expect(screen.getByRole('button', { name: /continue where you stop/i })).toBeInTheDocument();
  });
});
