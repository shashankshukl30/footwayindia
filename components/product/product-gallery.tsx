'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Image as ShopifyImage } from '@/lib/shopify/types';

interface ProductGalleryProps {
  images: ShopifyImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [touchStart,    setTouchStart]    = useState(0);
  const selected = images[selectedIndex] ?? null;

  const prev = useCallback(() =>
    setSelectedIndex((i) => Math.max(i - 1, 0)), []);
  const next = useCallback(() =>
    setSelectedIndex((i) => Math.min(i + 1, images.length - 1)), [images.length]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(2);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(2);
    e.currentTarget.style.setProperty('--zoom-x', `${x}%`);
    e.currentTarget.style.setProperty('--zoom-y', `${y}%`);
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative aspect-square bg-brand-surface border border-brand-border overflow-hidden group cursor-crosshair"
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            {selected ? (
              <Image
                src={selected.url}
                alt={selected.altText ?? title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out md:group-hover:scale-150"
                style={{ transformOrigin: 'var(--zoom-x, 50%) var(--zoom-y, 50%)' }}
                priority={selectedIndex === 0}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-brand-text-muted text-xs tracking-[0.2em] uppercase">No image available</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Mobile swipe overlay */}
        <div
          className="absolute inset-0 md:hidden"
          onTouchStart={(e) => setTouchStart(e.touches[0]!.clientX)}
          onTouchEnd={(e) => {
            const delta = touchStart - e.changedTouches[0]!.clientX;
            if (Math.abs(delta) > 50) { delta > 0 ? next() : prev(); }
          }}
        />

        {/* Mobile dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === selectedIndex ? 'w-4 bg-brand-text' : 'w-1.5 bg-brand-border'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Product images">
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setSelectedIndex(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') next();
                if (e.key === 'ArrowLeft') prev();
              }}
              aria-label={`View image ${i + 1}`}
              aria-selected={i === selectedIndex}
              role="tab"
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 overflow-hidden transition-all duration-200 ${
                i === selectedIndex
                  ? 'border-brand-text'
                  : 'border-brand-border hover:border-brand-text/40'
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${title} view ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
