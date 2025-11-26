'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export interface UseDocResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Shimmed useDoc: no Firestore available. Returns empty results.
 */
export function useDoc<T = any>(memoizedDocRef: any | null | undefined): UseDocResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!memoizedDocRef) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const t = setTimeout(() => {
      setData(null);
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(t);
  }, [memoizedDocRef]);

  if (memoizedDocRef && !memoizedDocRef.__memo) {
    throw new Error(memoizedDocRef + ' was not properly memoized using useMemoFirebase');
  }

  return { data, isLoading, error };
}