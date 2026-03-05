'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-brand-bg">

      {/* Background image + overlay */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&q=80"
          alt=""
          role="presentation"
          className="w-full h-full object-cover object-center opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-brand-gold text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4"
          >
            New Season 2026
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-brand-text leading-tight mb-6"
          >
            Step Into
            <span className="block text-brand-gold italic">Excellence</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-brand-text-secondary text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
          >
            Premium footwear for those who refuse to settle. Crafted for comfort,
            designed for impact. Free shipping on orders above ₹999.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/collections/mens"
              className="group inline-flex items-center gap-2 bg-brand-gold text-brand-bg px-7 py-3.5 text-sm font-semibold tracking-wide uppercase hover:bg-brand-gold-light transition-all duration-200 animate-pulse-gold"
            >
              Shop Men&apos;s
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </Link>
            <Link
              href="/collections/womens"
              className="inline-flex items-center gap-2 border border-brand-border text-brand-text px-7 py-3.5 text-sm font-semibold tracking-wide uppercase hover:border-brand-gold hover:text-brand-gold transition-all duration-200"
            >
              Shop Women&apos;s
            </Link>
          </motion.div>

          {/* Social proof micro-strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center gap-3 mt-10"
          >
            <div className="flex -space-x-2" aria-hidden="true">
              {['😊', '😍', '🔥', '⭐'].map((emoji, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-brand-elevated border-2 border-brand-bg flex items-center justify-center text-xs"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <div>
              <p className="text-brand-text text-sm font-semibold">★★★★★ 4.8/5</p>
              <p className="text-brand-text-muted text-xs">Trusted by 2,000+ customers</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-brand-text-muted text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-brand-text-muted to-transparent" />
      </motion.div>
    </section>
  );
}
