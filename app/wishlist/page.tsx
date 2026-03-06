'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/lib/wishlist-store';
import { ProductCard } from '@/components/product/product-card';
import type { Product } from '@/lib/shopify/types';

export default function WishlistPage() {
  const { items, clear } = useWishlistStore();
  const [products, setProducts] = useState<Product[]>([]);
  // Track which key (serialized items) was last resolved to derive loading without setState in effect body
  const [resolvedKey, setResolvedKey] = useState('');

  const itemsKey = items.join(',');
  const loading = items.length > 0 && resolvedKey !== itemsKey;
  const displayProducts = items.length === 0 ? [] : products;
  const isEmpty = !loading && displayProducts.length === 0;

  useEffect(() => {
    if (items.length === 0) return;

    const key = items.join(',');
    const controller = new AbortController();

    Promise.all(
      items.map((handle) =>
        fetch(`/api/product?handle=${encodeURIComponent(handle)}`, { signal: controller.signal })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    ).then((results) => {
      setProducts(results.filter(Boolean) as Product[]);
      setResolvedKey(key);
    });

    return () => controller.abort();
  }, [items]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="divider-gold" />
        <div>
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold mb-1">
            Your Saved Items
          </p>
          <h1 className="font-display font-bold uppercase text-3xl tracking-tight text-brand-text">
            Wishlist
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: items.length || 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/5] bg-brand-surface mb-3" />
              <div className="h-3 bg-brand-surface rounded w-1/2 mb-2" />
              <div className="h-4 bg-brand-surface rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : isEmpty ? (
        <div className="text-center py-24 border border-brand-border">
          <Heart
            size={40}
            strokeWidth={1}
            className="text-brand-border mx-auto mb-4"
            aria-hidden="true"
          />
          <p className="text-brand-text text-lg font-medium mb-2">Your wishlist is empty</p>
          <p className="text-brand-text-muted text-sm mb-8">
            Save items you love by tapping the heart icon on any product.
          </p>
          <Link
            href="/search"
            className="inline-block bg-brand-text text-white px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors duration-300"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-brand-text-muted text-xs tracking-[0.15em] uppercase">
              {displayProducts.length} saved item{displayProducts.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={clear}
              className="text-brand-text-muted text-xs hover:text-brand-error transition-colors duration-200 tracking-wide"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
