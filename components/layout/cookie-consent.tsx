'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

const STORAGE_KEY = 'footway-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay slightly so it doesn't flash on load before hydration
    const t = setTimeout(() => {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.32, 0, 0.68, 1] }}
          className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-5 sm:max-w-sm z-50"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="bg-white border border-brand-border shadow-xl p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Cookie size={16} className="text-brand-gold flex-shrink-0" aria-hidden="true" />
                <p className="text-brand-text text-[11px] font-semibold uppercase tracking-[0.2em]">
                  Cookie Policy
                </p>
              </div>
              <button
                onClick={decline}
                className="text-brand-text-muted hover:text-brand-text transition-colors duration-200 flex-shrink-0"
                aria-label="Dismiss cookie banner"
              >
                <X size={15} />
              </button>
            </div>

            {/* Body */}
            <p className="text-brand-text-muted text-xs leading-relaxed mb-4 font-light">
              We use cookies to enhance your browsing experience, analyse traffic, and
              personalise content. By clicking &ldquo;Accept&rdquo; you consent to our use of cookies.{' '}
              <Link
                href="/pages/privacy"
                className="text-brand-gold hover:text-brand-text underline underline-offset-2 transition-colors duration-200"
              >
                Learn more
              </Link>
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="flex-1 py-2.5 bg-brand-text text-white text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors duration-300"
              >
                Accept
              </button>
              <button
                onClick={decline}
                className="flex-1 py-2.5 border border-brand-border text-brand-text-secondary text-[10px] font-medium uppercase tracking-[0.2em] hover:border-brand-text hover:text-brand-text transition-all duration-200"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
