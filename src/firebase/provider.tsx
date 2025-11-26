'use client';

import React, { DependencyList, createContext, useContext, ReactNode, useMemo } from 'react';

// Lightweight shim implementation that removes Firebase dependency.

interface FirebaseProviderProps {
  children: ReactNode;
}

export interface UserHookResult {
  user: null;
  isUserLoading: boolean;
  userError: Error | null;
}

export const FirebaseContext = createContext<null | {}>(null);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export const useFirebase = () => {
  // No Firebase services available in shimmed mode.
  throw new Error('Firebase has been removed in this build. Use client-side API or a real backend.');
};

export const useAuth = () => {
  throw new Error('Firebase Auth removed.');
};

export const useFirestore = () => {
  // Return a falsy placeholder to keep existing callsites working where they only check for null.
  return null as any;
};

type MemoFirebase<T> = T & { __memo?: boolean };

export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T | MemoFirebase<T> {
  const memoized = useMemo(factory, deps);
  if (typeof memoized === 'object' && memoized !== null) {
    (memoized as MemoFirebase<T>).__memo = true;
  }
  return memoized as T | MemoFirebase<T>;
}

export const useUser = (): UserHookResult => {
  return { user: null, isUserLoading: false, userError: null };
};