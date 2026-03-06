'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function RouteAnnouncer() {
  const pathname  = usePathname();
  const ref       = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      if (ref.current) {
        ref.current.textContent = `Navigated to ${document.title}`;
      }
    }, 150);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <p
      ref={ref}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  );
}
