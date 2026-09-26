import { byId } from '../data/archetypes';
import type { ArchetypeId } from './types';

const PREFIX = '#/result?r=';

export function readResultHash(): ArchetypeId | null {
  const hash = window.location.hash;
  if (!hash.startsWith(PREFIX)) return null;
  const id = hash.slice(PREFIX.length);
  return id in byId ? (id as ArchetypeId) : null;
}

export function writeResultHash(id: ArchetypeId): void {
  window.history.replaceState(null, '', `${PREFIX}${id}`);
}

export function clearResultHash(): void {
  window.history.replaceState(
    null,
    '',
    window.location.pathname + window.location.search,
  );
}
