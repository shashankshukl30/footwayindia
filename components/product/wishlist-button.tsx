'use client';

import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/lib/wishlist-store';

interface WishlistButtonProps {
  handle: string;
  size?: 'sm' | 'md';
}

export function WishlistButton({ handle, size = 'md' }: WishlistButtonProps) {
  const { toggle, has } = useWishlistStore();
  const wishlisted = has(handle);
  const iconSize = size === 'sm' ? 14 : 18;

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(handle); }}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={wishlisted}
      className={`
        flex items-center justify-center rounded-full transition-all duration-300
        ${size === 'sm'
          ? 'w-7 h-7 bg-white/90 backdrop-blur-sm shadow-sm hover:scale-110'
          : 'w-9 h-9 border border-brand-border hover:border-brand-error bg-white'
        }
      `}
    >
      <Heart
        size={iconSize}
        strokeWidth={1.5}
        className={wishlisted ? 'fill-brand-error text-brand-error' : 'text-brand-text-muted'}
        aria-hidden="true"
      />
    </button>
  );
}
