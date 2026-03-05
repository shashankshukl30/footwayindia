'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const STATS = [
  { value: '2,000+', label: 'Happy Customers' },
  { value: '4.8★',   label: 'Average Rating'  },
  { value: '30-Day', label: 'Return Policy'   },
  { value: '100%',   label: 'Secure Checkout' },
];

const REVIEWS = [
  {
    name:   'Rahul M.',
    city:   'Mumbai',
    rating: 5,
    text:   'The Apex Runner Pro is exactly what I was looking for. Premium quality, incredibly comfortable. Fast delivery too!',
  },
  {
    name:   'Priya S.',
    city:   'Bangalore',
    rating: 5,
    text:   'Finally a brand that understands Indian feet. The Luna Comfort Slip is my everyday go-to. Easy returns as well.',
  },
  {
    name:   'Ankit K.',
    city:   'Delhi',
    rating: 5,
    text:   'Bought the Bounce Jr. for my son. He absolutely loves them! Great quality for the price. Will be ordering again.',
  },
];

export function SocialProof() {
  return (
    <section className="bg-brand-surface border-y border-brand-border py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold mb-2">
                {stat.value}
              </p>
              <p className="text-brand-text-muted text-sm uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reviews header */}
        <div className="text-center mb-10">
          <p className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Customer Reviews
          </p>
          <h2 className="font-serif text-3xl font-bold text-brand-text">
            What Our Customers Say
          </h2>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-brand-elevated border border-brand-border p-6"
              aria-label={`Review by ${review.name}`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-brand-gold text-brand-gold" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="text-brand-text-secondary text-sm leading-relaxed mb-6 italic">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-semibold text-sm"
                  aria-hidden="true"
                >
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-brand-text text-sm font-semibold">{review.name}</p>
                  <p className="text-brand-text-muted text-xs">{review.city} · Verified Purchase</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
