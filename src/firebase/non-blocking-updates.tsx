'use client';

import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Shimbed non-blocking write helpers. They do nothing but return resolved promises
// to keep callsites working when Firebase is removed.

export function setDocumentNonBlocking(_docRef: any, _data: any, _options?: any) {
  return Promise.resolve();
}

export function addDocumentNonBlocking(_colRef: any, _data: any) {
  return Promise.resolve(null);
}

export function updateDocumentNonBlocking(_docRef: any, _data: any) {
  return Promise.resolve();
}

export function deleteDocumentNonBlocking(_docRef: any) {
  return Promise.resolve();
}