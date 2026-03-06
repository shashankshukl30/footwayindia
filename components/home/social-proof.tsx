'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 16 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] } },
};

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

function AnimatedCounter({ target, suffix = '', prefix = '', decimals = 0 }: AnimatedCounterProps) {
  const ref     = useRef<HTMLSpanElement>(null);
  const count   = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    `${prefix}${decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString()}${suffix}`
  );
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 1.6, ease: 'easeOut' });
    }
  }, [isInView, count, target]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const STATS = [
  { target: 2000, suffix: '+', label: 'Customers' },
  { target: 4.8,  decimals: 1,  label: 'Star Rating' },
  { target: 30,   label: 'Day Returns' },
  { target: 100,  suffix: '%',  label: 'Secure' },
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

      {/* Stats Bar — stagger parent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-border border border-brand-border"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center py-10 px-6 bg-brand-bg"
            >
              <p className="font-display font-bold text-brand-text leading-none mb-2"
                 style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </p>
              <p className="text-brand-text-muted text-[10px] tracking-[0.3em] uppercase font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
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

        {/* Review cards — stagger parent */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border"
        >
          {REVIEWS.map((review) => (
            <motion.article
              key={review.name}
              variants={itemVariants}
              className="bg-brand-bg p-8 md:p-10"
              aria-label={`Review by ${review.name}`}
            >
              {/* Stars — gold dots */}
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
        </motion.div>
      </div>
    </section>
  );
}
