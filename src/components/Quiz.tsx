import { ProgressCounter } from './ProgressCounter';
import { QuestionCard } from './QuestionCard';
import type { Question } from '../lib/types';

interface QuizProps {
  questions: Question[];
  answers: Record<string, string>;
  onAnswer: (questionId: string, optionId: string) => void;
  onBack: () => void;
  onComplete: () => void;
}

export function Quiz({ questions, answers, onAnswer, onBack }: QuizProps) {
  const index = questions.findIndex((q) => !answers[q.id]);
  const currentIndex = index === -1 ? questions.length - 1 : index;
  const question = questions[currentIndex];
  const hasBack = currentIndex > 0;

  return (
    <section
      data-testid="quiz"
      className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-8"
    >
      <ProgressCounter current={currentIndex + 1} total={questions.length} />

      <div className="flex flex-1 items-center py-8">
        <QuestionCard
          question={question}
          selectedId={answers[question.id]}
          onSelect={(optionId) => onAnswer(question.id, optionId)}
        />
      </div>

      <div className="pb-2">
        {hasBack && (
          <button
            type="button"
            onClick={onBack}
            className="min-h-12 rounded-md px-4 text-sm font-semibold text-kopi-mid underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chilli"
          >
            Back
          </button>
        )}
      </div>
    </section>
  );
}
