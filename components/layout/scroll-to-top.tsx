'use client';

import { useEffect } from 'react';

export function ScrollToTop() {
  useEffect(() => {
    // Disable browser's native scroll restoration so page always starts at top
    if (typeof window !== 'undefined') {
      history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
