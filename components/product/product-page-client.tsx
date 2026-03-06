'use client';

import { useRef } from 'react';
import { ProductActions } from './product-actions';
import { StickyAddToCart } from './sticky-add-to-cart';
import type { Product } from '@/lib/shopify/types';

interface Props {
  product: Product;
}

export function ProductPageClient({ product }: Props) {
  const atcRef = useRef<HTMLDivElement>(null);
  const variants = product.variants.edges.map((e) => e.node);

  // Default: first variant if only one, else null (user must select)
  const defaultVariant = variants.length === 1 ? variants[0]! : null;

  return (
    <>
      {/* Trigger sentinel — placed right after the native ATC button */}
      <ProductActions product={product} />
      <div ref={atcRef} />
      <StickyAddToCart
        productTitle={product.title}
        variantId={defaultVariant?.id ?? null}
        availableForSale={defaultVariant?.availableForSale ?? false}
        selectedSize={null}
        triggerRef={atcRef}
      />
    </>
  );
}
