'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    href:  '/collections/mens',
    label: "Men's",
    sub:   'Footwear',
    desc:  'From performance runners to everyday classics',
    img:   'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85',
    badge: 'Bestsellers',
    span:  true,   // spans 2 rows — hero card
  },
  {
    href:  '/collections/womens',
    label: "Women's",
    sub:   'Footwear',
    desc:  'Effortless style meets all-day comfort',
    img:   'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=85',
    badge: 'New Arrivals',
    span:  false,
  },
  {
    href:  '/collections/kids',
    label: "Kids'",
    sub:   'Footwear',
    desc:  'Durable, fun, built for every adventure',
    img:   'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&q=85',
    badge: 'Ages 2–12',
    span:  false,
  },
];

export function FeaturedCollections() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex items-end justify-between mb-12"
      >
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className="divider-gold" />
            <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">
              Collections
            </p>
          </div>
          <h2 className="font-display font-bold uppercase leading-none tracking-tight text-brand-text"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Shop by<br />Category
          </h2>
        </div>
        <Link
          href="/search"
          className="hidden md:flex items-center gap-2 text-brand-text-muted hover:text-brand-text transition-colors duration-300 text-[11px] tracking-[0.2em] uppercase group"
        >
          View All
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>

      {/* Asymmetric grid: hero card spans 2 rows on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:grid-rows-2">
        {COLLECTIONS.map((col, i) => (
          <motion.div
            key={col.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className={col.span ? 'md:row-span-2' : ''}
          >
            <Link
              href={col.href}
              className="group block relative overflow-hidden bg-brand-elevated"
              style={{ height: col.span ? '580px' : '280px' }}
            >
              {/* Image */}
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={col.img}
                  alt={col.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                {/* Keep dark overlay so white text is always readable over images */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Badge */}
              <div className="absolute top-5 left-5">
                <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-white border border-white/30 px-3 py-1.5 bg-black/20 backdrop-blur-sm">
                  {col.badge}
                </span>
              </div>

              {/* Content — bottom anchored */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white/60 text-[10px] tracking-[0.3em] uppercase mb-1 font-medium">
                      {col.sub}
                    </p>
                    <h3 className="font-display font-bold uppercase leading-none text-white group-hover:text-brand-gold transition-colors duration-300"
                        style={{ fontSize: col.span ? 'clamp(32px, 4vw, 56px)' : 'clamp(24px, 3vw, 40px)' }}>
                      {col.label}
                    </h3>
                    {col.span && (
                      <p className="text-white/60 text-xs mt-2 font-light max-w-[200px]">{col.desc}</p>
                    )}
                  </div>
                  <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold transition-all duration-300 flex-shrink-0 ml-4">
                    <ArrowRight
                      size={16}
                      className="text-white/70 group-hover:text-white transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
