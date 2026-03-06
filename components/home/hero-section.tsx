'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Tag } from 'lucide-react';

const CYCLING_WORDS = [
  'BOLDLY',
  'FREELY',
  'FEARLESSLY',
  'FIERCELY',
  'DIFFERENTLY',
];

const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&q=85',
    kb: 'kenBurns',
  },
  {
    src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1920&q=85',
    kb: 'kenBurnsAlt',
  },
  {
    src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1920&q=85',
    kb: 'kenBurns',
  },
  {
    src: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1920&q=85',
    kb: 'kenBurnsAlt',
  },
];

const SLIDE_DURATION = 2800;
const FADE_DURATION  = 0.9;

export function HeroSection() {
  const [wordIndex,  setWordIndex]  = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [mounted,    setMounted]    = useState(false);
  const [paused,     setPaused]     = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setWordIndex((i) => (i + 1) % CYCLING_WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setImageIndex((i) => (i + 1) % HERO_IMAGES.length), SLIDE_DURATION);
    return () => clearInterval(t);
  }, [paused]);

  const goTo = useCallback((i: number) => setImageIndex(i), []);

  return (
    <section
      className="relative w-full min-h-[95vh] flex items-end overflow-hidden bg-brand-bg pb-16 md:pb-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      {/* ── Slideshow images ── */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={imageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_DURATION, ease: 'easeInOut' }}
            className="absolute inset-0 will-change-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_IMAGES[imageIndex]!.src}
              alt=""
              role="presentation"
              className="w-full h-full object-cover object-center opacity-70"
              style={{ animation: `${HERO_IMAGES[imageIndex]!.kb} 7s ease-out forwards` }}
              loading={imageIndex === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        </AnimatePresence>

        {/* Lighter gradient so the image breathes on all screen sizes */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/85 via-brand-bg/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ── Decorative background text ── */}
      <div
        className="absolute bottom-0 right-0 font-display font-extrabold uppercase leading-none select-none pointer-events-none text-[20vw] text-brand-text/[0.04] tracking-tighter"
        aria-hidden="true"
      >
        FOOTWAY
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">

          {/* ── Promo badge — above eyebrow ── */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 mb-5"
          >
            <span className="inline-flex items-center gap-2 bg-brand-gold/15 border border-brand-gold/40 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse flex-shrink-0" aria-hidden="true" />
              <Tag size={10} className="text-brand-gold flex-shrink-0" aria-hidden="true" />
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-brand-gold whitespace-nowrap">
                New Arrivals — Free Shipping ₹999+
              </span>
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="divider-gold" />
            <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">
              New Season 2026
            </p>
          </motion.div>

          {/* MOVE — static */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-brand-text"
              style={{ fontSize: 'clamp(52px, 9vw, 140px)' }}
            >
              MOVE
            </motion.h1>
          </div>

          {/* Cycling word */}
          <div
            className="overflow-hidden mb-8"
            style={{ height: 'clamp(46px, 7.92vw, 124px)' }}
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={wordIndex}
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-105%', opacity: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.76, 0, 0.24, 1],
                  delay: mounted ? 0 : 0.75,
                }}
                className="font-display font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-brand-gold"
                style={{ fontSize: 'clamp(52px, 9vw, 140px)' }}
              >
                {CYCLING_WORDS[wordIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">

            <div className="flex-1">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="text-brand-text-secondary text-sm leading-relaxed mb-8 max-w-sm font-light"
                style={{ letterSpacing: '0.01em' }}
              >
                Premium footwear for those who refuse to settle.
                Free shipping on orders above ₹999.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  href="/collections/mens"
                  className="group inline-flex items-center gap-3 bg-brand-text text-white px-7 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-brand-gold transition-colors duration-300"
                >
                  Shop Men&apos;s
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </Link>
                <Link
                  href="/collections/womens"
                  className="inline-flex items-center gap-3 border border-brand-border text-brand-text px-7 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:border-brand-text hover:bg-brand-text hover:text-white transition-all duration-300"
                >
                  Shop Women&apos;s
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex items-center gap-8 md:gap-10"
            >
              <div>
                <p className="font-display font-bold text-3xl text-brand-text tracking-tight leading-none mb-1">4.8</p>
                <p className="text-brand-text-muted text-[10px] tracking-[0.2em] uppercase">Rating</p>
              </div>
              <div className="w-px h-10 bg-brand-border" />
              <div>
                <p className="font-display font-bold text-3xl text-brand-text tracking-tight leading-none mb-1">2K+</p>
                <p className="text-brand-text-muted text-[10px] tracking-[0.2em] uppercase">Customers</p>
              </div>
              <div className="w-px h-10 bg-brand-border" />
              <div>
                <p className="font-display font-bold text-3xl text-brand-text tracking-tight leading-none mb-1">30</p>
                <p className="text-brand-text-muted text-[10px] tracking-[0.2em] uppercase">Day Returns</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Slide progress indicators ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
        aria-hidden="true"
      >
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-[2px] rounded-full transition-all duration-500 ease-out ${
              i === imageIndex
                ? 'w-8 bg-brand-gold'
                : 'w-2 bg-brand-border hover:bg-brand-text-muted'
            }`}
          />
        ))}
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-8 right-8 flex-col items-center gap-2 hidden md:flex"
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-brand-border to-brand-gold" />
        <span className="text-brand-text-muted text-[9px] tracking-[0.3em] uppercase rotate-90 origin-center mt-2">
          Scroll
        </span>
      </motion.div>

    </section>
  );
}
