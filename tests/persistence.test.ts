import { describe, it, expect, beforeEach, vi } from 'vitest';
import { KEY, loadAnswers, saveAnswers, clearAnswers } from '../src/lib/persistence';

describe('persistence', () => {
  beforeEach(() => localStorage.clear());

  it('round-trips answers', () => {
    saveAnswers({ q1: 'q1a' });
    expect(loadAnswers()).toEqual({ q1: 'q1a' });
    clearAnswers();
    expect(loadAnswers()).toBeNull();
  });

  it('returns null when storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(loadAnswers()).toBeNull();
    vi.restoreAllMocks();
  });

  it('swallows write errors', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => saveAnswers({ q1: 'q1a' })).not.toThrow();
    vi.restoreAllMocks();
  });

  it('uses the documented storage key', () => {
    expect(KEY).toBe('simi-hawker.answers.v1');
  });
});
