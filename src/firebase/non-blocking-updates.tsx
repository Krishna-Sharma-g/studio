'use client';

import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Shimbed non-blocking write helpers. They do nothing but return resolved promises
// to keep callsites working when Firebase is removed.
function derivePath(ref: any) {
  if (typeof ref === 'string') return ref;
  if (!ref) return 'unknown';
  if (typeof ref.path === 'string') return ref.path;
  if (typeof ref.id === 'string') return String(ref.id);
  return 'unknown';
}

function emitPermissionError(path: string, operation: 'create'|'update'|'delete'|'write'|'get'|'list', data?: any) {
  try {
    const err = new FirestorePermissionError({ path, operation, requestResourceData: data });
    errorEmitter.emit('permission-error', err);
    // Keep a lightweight console warning for local debugging.
    // Don't throw — preserve non-blocking behaviour.
    // eslint-disable-next-line no-console
    console.warn('[firebase-shim] Permission error emitted for', path, operation);
  } catch (e) {
    // ignore emitter failures
  }
}

export function setDocumentNonBlocking(_docRef: any, _data: any, _options?: any) {
  const path = derivePath(_docRef);
  emitPermissionError(path, 'write', _data);
  return Promise.resolve();
}

export function addDocumentNonBlocking(_colRef: any, _data: any) {
  const path = derivePath(_colRef);
  emitPermissionError(path, 'create', _data);
  return Promise.resolve(null);
}

export function updateDocumentNonBlocking(_docRef: any, _data: any) {
  const path = derivePath(_docRef);
  emitPermissionError(path, 'update', _data);
  return Promise.resolve();
}

export function deleteDocumentNonBlocking(_docRef: any) {
  const path = derivePath(_docRef);
  emitPermissionError(path, 'delete');
  return Promise.resolve();
}