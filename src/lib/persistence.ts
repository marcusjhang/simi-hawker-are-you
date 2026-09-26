export const KEY = 'simi-hawker.answers.v1';

export function loadAnswers(): Record<string, string> | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

export function saveAnswers(answers: Record<string, string>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(answers));
  } catch {
    // Storage blocked (private mode, quota). Degrade to in-memory state.
  }
}

export function clearAnswers(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Ignore.
  }
}
