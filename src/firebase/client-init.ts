'use client';

// Firebase has been removed — this file intentionally provides a simple shim
// so imports succeed but no SDKs are loaded. Consumers should not expect
// real auth or firestore behavior when Firebase is removed.

export function initializeFirebase() {
  return {
    firebaseApp: null,
    auth: null,
    firestore: null,
  };
}

export function getSdks() {
  return initializeFirebase();
}
