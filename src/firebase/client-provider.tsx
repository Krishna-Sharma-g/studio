'use client';

import React, { type ReactNode } from 'react';
import { FirebaseProvider } from './provider';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  // No-op client provider for the shimmed setup. Keeps app layout intact.
  return (
    <FirebaseProvider>
      {children}
    </FirebaseProvider>
  );
}