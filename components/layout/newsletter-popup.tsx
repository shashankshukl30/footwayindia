'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'footway-newsletter-dismissed';
const DELAY_MS    = 5000; // show after 5 s

export function NewsletterPopup() {
  const [visible,   setVisible]   = useState(false);
  const [email,     setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Don't show if already dismissed / subscribed
    if (sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  }

  function dismissPermanent() {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, '1');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    // In production: call your email marketing API here
    setSubmitted(true);
    localStorage.setItem(STORAGE_KEY, '1');
    setTimeout(() => setVisible(false), 2800);
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="nl-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-brand-bg/70 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Panel */}
          <motion.div
            key="nl-panel"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.32, 0, 0.68, 1] }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0 pointer-events-none"
          >
            <div
              className="bg-white w-full max-w-lg shadow-2xl pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="newsletter-heading"
            >
              <div className="grid grid-cols-1 sm:grid-cols-5">

                {/* Left: accent image strip */}
                <div className="hidden sm:block sm:col-span-2 bg-[#0F0F0E] relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
                    alt=""
                    role="presentation"
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F0F0E]/60" />
                  <div className="absolute bottom-6 left-5 right-5">
                    <p className="font-display font-extrabold uppercase text-white text-2xl leading-tight tracking-tight">
                      MOVE<br />
                      <span className="text-brand-gold">BOLDLY</span>
                    </p>
                  </div>
                </div>

                {/* Right: form */}
                <div className="sm:col-span-3 p-7 sm:p-8 relative">
                  <button
                    onClick={dismiss}
                    className="absolute top-4 right-4 text-brand-text-muted hover:text-brand-text transition-colors duration-200"
                    aria-label="Close newsletter popup"
                  >
                    <X size={18} />
                  </button>

                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4">
                        <Mail size={22} className="text-brand-gold" />
                      </div>
                      <h2 className="font-display font-bold uppercase text-xl text-brand-text tracking-tight mb-2">
                        You&apos;re in!
                      </h2>
                      <p className="text-brand-text-muted text-sm font-light">
                        Welcome to the Footway family. Check your inbox for a special welcome offer.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="w-4 h-px bg-brand-gold" />
                        <p className="text-[9px] font-medium tracking-[0.35em] uppercase text-brand-gold">
                          Exclusive Access
                        </p>
                      </div>

                      <h2
                        id="newsletter-heading"
                        className="font-display font-bold uppercase text-2xl leading-tight text-brand-text tracking-tight mb-2"
                      >
                        10% Off Your<br />First Order
                      </h2>
                      <p className="text-brand-text-muted text-sm font-light mb-6 leading-relaxed">
                        Join 2,000+ customers. Get early access to new arrivals, exclusive deals,
                        and style inspiration — straight to your inbox.
                      </p>

                      <form onSubmit={handleSubmit} noValidate>
                        <div className="flex gap-0">
                          <input
                            ref={inputRef}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            required
                            className="flex-1 px-4 py-3 border border-brand-border text-brand-text text-sm placeholder:text-brand-text-muted focus:outline-none focus:border-brand-text transition-colors duration-200 bg-brand-surface"
                            aria-label="Email address"
                          />
                          <button
                            type="submit"
                            className="px-5 py-3 bg-brand-text text-white text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors duration-300 flex items-center gap-2 flex-shrink-0"
                          >
                            <ArrowRight size={14} />
                          </button>
                        </div>
                        {error && (
                          <p className="text-brand-red text-xs mt-2">{error}</p>
                        )}
                      </form>

                      <button
                        onClick={dismissPermanent}
                        className="mt-4 text-[10px] text-brand-text-muted hover:text-brand-text tracking-[0.1em] transition-colors duration-200 underline underline-offset-2"
                      >
                        No thanks, I&apos;ll pay full price
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
