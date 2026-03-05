'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    href:  '/collections/mens',
    label: "Men's Footwear",
    desc:  'From performance runners to everyday classics',
    img:   'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    badge: 'Bestsellers',
  },
  {
    href:  '/collections/womens',
    label: "Women's Footwear",
    desc:  'Effortless style meets all-day comfort',
    img:   'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    badge: 'New Arrivals',
  },
  {
    href:  '/collections/kids',
    label: "Children's Footwear",
    desc:  'Durable, fun, built for every adventure',
    img:   'https://images.unsplash.com/photo-1570538104286-a2346ce7f13a?w=600&q=80',
    badge: 'Ages 2–12',
  },
];

export function FeaturedCollections() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">
          Collections
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text">
          Shop by Category
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLLECTIONS.map((col, i) => (
          <motion.div
            key={col.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <Link
              href={col.href}
              className="group block overflow-hidden bg-brand-surface border border-brand-border hover:border-brand-gold transition-colors duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={col.img}
                  alt={col.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-brand-gold text-brand-bg text-xs font-bold px-3 py-1 uppercase tracking-wide">
                  {col.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-brand-text group-hover:text-brand-gold transition-colors duration-200 mb-1">
                    {col.label}
                  </h3>
                  <p className="text-brand-text-muted text-sm">{col.desc}</p>
                </div>
                <ArrowRight
                  size={20}
                  className="text-brand-text-muted group-hover:text-brand-gold group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-4"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
