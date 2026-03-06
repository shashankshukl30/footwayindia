'use client';

import { useEffect } from 'react';
import { useRecentlyViewedStore } from '@/lib/recently-viewed-store';
import type { Product } from '@/lib/shopify/types';

export function RecentlyViewedTracker({ product }: { product: Product }) {
  const add = useRecentlyViewedStore((s) => s.add);

  useEffect(() => {
    add({
      handle: product.handle,
      title: product.title,
      price: product.priceRange.minVariantPrice.amount,
      currencyCode: product.priceRange.minVariantPrice.currencyCode,
      image: product.featuredImage?.url ?? null,
      imageAlt: product.featuredImage?.altText ?? null,
      vendor: product.vendor ?? null,
    });
  }, [product, add]);

  return null;
}
