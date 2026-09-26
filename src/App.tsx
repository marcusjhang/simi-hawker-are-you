import { useEffect, useState } from 'react';
import { Landing } from './components/Landing';
import { Quiz } from './components/Quiz';
import { ResultReceipt } from './components/ResultReceipt';
import { QUESTIONS } from './data/questions';
import { makeTiebreaker } from './data/tiebreaker';
import { clearAnswers, loadAnswers, saveAnswers } from './lib/persistence';
import {
  clearResultHash,
  readResultHash,
  writeResultHash,
} from './lib/resultUrl';
import { score, tiedIds } from './lib/scoring';
import type { ArchetypeId, Question, Result } from './lib/types';

function resultFor(steps: Question[], answers: Record<string, string>): Result {
  return score(steps, answers);
}

export default function App() {
  const [screen, setScreen] = useState<'landing' | 'quiz' | 'result'>('landing');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [resumeAvailable, setResumeAvailable] = useState(false);
  const [sharedWinner, setSharedWinner] = useState<ArchetypeId | null>(null);

  useEffect(() => {
    const saved = loadAnswers();
    if (saved && Object.keys(saved).length > 0) setResumeAvailable(true);
    const id = readResultHash();
    if (id) {
      setSharedWinner(id);
      setScreen('result');
    }
  }, []);

  const baseComplete = QUESTIONS.every((q) => answers[q.id]);
  const baseResult = baseComplete ? score(QUESTIONS, answers) : null;
  const steps = baseResult?.tie
    ? [...QUESTIONS, makeTiebreaker(tiedIds(baseResult))]
    : QUESTIONS;

  const finalResult: Result | null = sharedWinner
    ? { winner: sharedWinner, ranking: [{ id: sharedWinner, score: 0, pct: 0 }], tie: false }
    : baseComplete
      ? resultFor(steps, answers)
      : null;

  useEffect(() => {
    if (screen === 'quiz' && steps.every((q) => answers[q.id])) {
      setScreen('result');
    }
  }, [screen, answers, steps]);

  useEffect(() => {
    if (screen === 'result' && finalResult && !sharedWinner) {
      writeResultHash(finalResult.winner);
    }
  }, [screen, finalResult, sharedWinner]);

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: optionId };
      saveAnswers(next);
      return next;
    });
  };

  const handleBack = () => {
    const lastAnswered = [...steps].reverse().find((q) => answers[q.id]);
    if (!lastAnswered) return;
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[lastAnswered.id];
      saveAnswers(next);
      return next;
    });
  };

  const handleRestart = () => {
    clearAnswers();
    clearResultHash();
    setAnswers({});
    setSharedWinner(null);
    setResumeAvailable(false);
    setScreen('quiz');
  };

  if (screen === 'landing') {
    return (
      <Landing
        resumeAvailable={resumeAvailable}
        onStart={() => setScreen('quiz')}
        onResume={() => {
          const saved = loadAnswers();
          if (saved) setAnswers(saved);
          setScreen('quiz');
        }}
      />
    );
  }

  if (screen === 'result' && finalResult) {
    return <ResultReceipt result={finalResult} onRestart={handleRestart} />;
  }

  return (
    <Quiz
      questions={steps}
      answers={answers}
      onAnswer={handleAnswer}
      onBack={handleBack}
      onComplete={() => setScreen('result')}
    />
  );
}
