"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface LoadingContextType {
  isAppLoading: boolean;
  isContentVisible: boolean;
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  // Is this the very first visit in the browser session?
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  // Have we checked sessionStorage yet?
  const [isStorageChecked, setIsStorageChecked] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setIsInitialLoad(false);
    } else {
      sessionStorage.setItem("hasVisited", "true");
      setIsInitialLoad(true);
    }
    setIsStorageChecked(true);
  }, []);

  // Animation progress for the initial load
  const [isAnimationInProgress, setIsAnimationInProgress] = useState(true);
  useEffect(() => {
      if (isInitialLoad) {
          const timer = setTimeout(() => setIsAnimationInProgress(false), 2000);
          return () => clearTimeout(timer);
      } else {
          setIsAnimationInProgress(false);
      }
  }, [isInitialLoad]);

  // The app shows the loader ONLY if it's the initial load.
  // During this load, it waits for the session check AND the animation.
  // We also wait until we've checked sessionStorage.
  const isAppLoading = !isStorageChecked || (isInitialLoad && (status === 'loading' || isAnimationInProgress));

  // Content becomes visible after the loader is gone. On refresh, it's visible immediately.
  const [isContentVisible, setContentVisible] = useState(false);
  useEffect(() => {
    if (!isAppLoading) {
      // On refresh (not initial load), show content immediately.
      // On initial load, wait a bit for a smoother fade-in transition.
      const delay = isInitialLoad ? 200 : 0;
      const timer = setTimeout(() => setContentVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isAppLoading, isInitialLoad]);

  const value = { isAppLoading, isContentVisible, session, status };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
