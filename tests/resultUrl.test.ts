import { describe, it, expect, beforeEach } from 'vitest';
import { readResultHash, writeResultHash, clearResultHash } from '../src/lib/resultUrl';

describe('resultUrl', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('round-trips a result id through the hash', () => {
    writeResultHash('laksa');
    expect(window.location.hash).toBe('#/result?r=laksa');
    expect(readResultHash()).toBe('laksa');
  });

  it('returns null when there is no result hash', () => {
    expect(readResultHash()).toBeNull();
  });

  it('ignores an unknown dish id', () => {
    window.history.replaceState(null, '', '/#/result?r=not-a-dish');
    expect(readResultHash()).toBeNull();
  });

  it('clears the hash', () => {
    writeResultHash('satay');
    clearResultHash();
    expect(readResultHash()).toBeNull();
  });
});
