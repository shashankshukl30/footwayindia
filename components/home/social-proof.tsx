'use client';

import { motion } from 'framer-motion';

const STATS = [
  { value: '2,000+', label: 'Customers' },
  { value: '4.8',    label: 'Star Rating' },
  { value: '30',     label: 'Day Returns' },
  { value: '100%',   label: 'Secure' },
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
    <section className="py-24 border-y border-brand-border">

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-border border border-brand-border">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="text-center py-10 px-6 bg-brand-bg"
            >
              <p className="font-display font-bold text-brand-text leading-none mb-2"
                 style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
                {stat.value}
              </p>
              <p className="text-brand-text-muted text-[10px] tracking-[0.3em] uppercase font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="divider-gold" />
            <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">
              Reviews
            </p>
          </div>
          <h2 className="font-display font-bold uppercase leading-none tracking-tight text-brand-text"
              style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
            What They Say
          </h2>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border">
          {REVIEWS.map((review, i) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-brand-bg p-8 md:p-10"
              aria-label={`Review by ${review.name}`}
            >
              {/* Stars — terracotta dots */}
              <div className="flex gap-1 mb-6" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, j) => (
                  <span key={j} className="w-1.5 h-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="text-brand-text-secondary text-sm leading-relaxed mb-8 font-light"
                          style={{ letterSpacing: '0.01em' }}>
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-brand-border">
                <div
                  className="w-8 h-8 bg-brand-elevated flex items-center justify-center text-brand-text-muted font-medium text-xs uppercase border border-brand-border"
                  aria-hidden="true"
                >
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-brand-text text-sm font-medium tracking-wide">{review.name}</p>
                  <p className="text-brand-text-muted text-[10px] tracking-[0.15em] uppercase">{review.city} · Verified</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
