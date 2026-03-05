'use client';

import { useState } from 'react';
import type { Image } from '@/lib/shopify/types';

interface ProductGalleryProps {
  images: Image[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex] ?? null;

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square bg-brand-surface border border-brand-border overflow-hidden">
        {selected ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={selected.url}
            alt={selected.altText ?? title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-text-muted">
            No image available
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setSelectedIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`flex-shrink-0 w-20 h-20 border-2 overflow-hidden transition-colors duration-200 ${
                i === selectedIndex
                  ? 'border-brand-gold'
                  : 'border-brand-border hover:border-brand-gold/50'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.altText ?? ''} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
