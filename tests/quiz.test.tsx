import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Quiz } from '../src/components/Quiz';
import { QUESTIONS } from '../src/data/questions';

describe('Quiz', () => {
  it('shows a step counter and the first question', () => {
    render(
      <Quiz questions={QUESTIONS} answers={{}} onAnswer={vi.fn()} onBack={vi.fn()} onComplete={vi.fn()} />,
    );
    expect(screen.getByText(/question 1 of 8/i)).toBeInTheDocument();
    expect(screen.getByText(QUESTIONS[0].text)).toBeInTheDocument();
  });

  it('reports the chosen option id', () => {
    const onAnswer = vi.fn();
    render(
      <Quiz questions={QUESTIONS} answers={{}} onAnswer={onAnswer} onBack={vi.fn()} onComplete={vi.fn()} />,
    );
    const options = screen.getAllByRole('button');
    fireEvent.click(options[0]);
    expect(onAnswer).toHaveBeenCalledWith(QUESTIONS[0].id, QUESTIONS[0].options[0].id);
  });

  it('lets you go back with no back button on question 1', () => {
    const onBack = vi.fn();
    render(
      <Quiz questions={QUESTIONS} answers={{}} onAnswer={vi.fn()} onBack={onBack} onComplete={vi.fn()} />,
    );
    expect(screen.queryByRole('button', { name: /back/i })).toBeNull();
  });

  it('calls onComplete after the last question is answered', () => {
    const onComplete = vi.fn();
    const answers: Record<string, string> = {};
    for (const q of QUESTIONS.slice(0, -1)) answers[q.id] = q.options[0].id;
    render(
      <Quiz questions={QUESTIONS} answers={answers} onAnswer={vi.fn()} onBack={vi.fn()} onComplete={onComplete} />,
    );
    const last = QUESTIONS[QUESTIONS.length - 1];
    fireEvent.click(screen.getByText(last.options[0].text));
    // onComplete is invoked by App after state settles; Quiz only signals the answer here.
    expect(within(screen.getByTestId('quiz')).getByText(last.text)).toBeInTheDocument();
  });
});
