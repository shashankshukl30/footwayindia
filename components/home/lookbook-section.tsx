'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const words = ['Crafted', 'for', 'the', 'miles', 'between', 'ambition', 'and', 'arrival.'];

export function LookbookSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="w-full grid md:grid-cols-2 min-h-[70vh] overflow-hidden">
      {/* Left — full-bleed image */}
      <div className="relative min-h-[50vw] md:min-h-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=1200&q=85"
          alt="Footway India lookbook — premium footwear"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[8s] ease-out hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-brand-bg/10" />
        {/* Floating label */}
        <div className="absolute bottom-6 left-6">
          <span className="text-[9px] font-medium tracking-[0.35em] uppercase text-white/70 bg-black/30 backdrop-blur-sm px-3 py-1.5">
            SS 2026 Collection
          </span>
        </div>
      </div>

      {/* Right — editorial copy */}
      <div
        ref={ref}
        className="flex flex-col justify-center px-10 py-16 md:px-14 lg:px-20 bg-brand-bg"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-5 h-px bg-brand-gold" />
          <p className="text-[9px] font-medium tracking-[0.4em] uppercase text-brand-gold">
            Editorial
          </p>
        </motion.div>

        {/* Masked word-by-word reveal */}
        <p
          className="font-serif italic text-brand-text text-3xl md:text-4xl lg:text-5xl leading-tight mb-10 flex flex-wrap gap-x-[0.3em]"
          aria-label={words.join(' ')}
        >
          {words.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ delay: i * 0.06 + 0.2, duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-brand-text-muted text-sm font-light leading-relaxed mb-10 max-w-sm"
        >
          Every step tells a story. Our new season collection fuses refined craftsmanship
          with the energy of modern movement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/collections/mens"
            className="group inline-flex items-center gap-3 bg-brand-text text-white px-7 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-brand-gold transition-colors duration-300"
          >
            Shop Men&apos;s
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            href="/collections/womens"
            className="inline-flex items-center gap-3 border border-brand-border text-brand-text px-7 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:border-brand-text hover:bg-brand-text hover:text-white transition-all duration-300"
          >
            Shop Women&apos;s
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
