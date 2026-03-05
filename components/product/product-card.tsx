'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { formatPrice } from '@/lib/shopify';
import type { Product } from '@/lib/shopify/types';

interface ProductCardProps {
  product: Product;
  inventoryCount?: number;
}

export function ProductCard({ product, inventoryCount }: ProductCardProps) {
  const minPrice = product.priceRange.minVariantPrice;
  const compareMin = product.compareAtPriceRange?.minVariantPrice;

  const price = parseFloat(minPrice.amount);
  const comparePrice = compareMin ? parseFloat(compareMin.amount) : null;
  const isOnSale = comparePrice !== null && comparePrice > price;
  const discount = isOnSale && comparePrice
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;
  const isLowStock = inventoryCount !== undefined && inventoryCount > 0 && inventoryCount <= 5;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={`/products/${product.handle}`} className="block">

        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-brand-surface border border-brand-border group-hover:border-brand-gold transition-colors duration-300">
          {product.featuredImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-text-muted text-sm">
              No image
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isOnSale && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 uppercase">
                -{discount}%
              </span>
            )}
            {isLowStock && (
              <span className="bg-brand-gold text-brand-bg text-xs font-bold px-2 py-0.5 uppercase">
                Only {inventoryCount} left
              </span>
            )}
          </div>

          {/* Quick-add overlay (slides up on hover) */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="w-full bg-brand-gold text-brand-bg py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-gold-light transition-colors">
              <ShoppingBag size={14} aria-hidden="true" />
              Quick View
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 pb-2">
          {/* Placeholder rating */}
          <div className="flex items-center gap-1 mb-2" aria-label="4.8 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className="fill-brand-gold text-brand-gold" aria-hidden="true" />
            ))}
            <span className="text-brand-text-muted text-xs ml-1">(4.8)</span>
          </div>

          <h3 className="text-brand-text text-sm font-medium group-hover:text-brand-gold transition-colors duration-200 mb-1 line-clamp-2">
            {product.title}
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-brand-gold font-semibold text-sm">
              {formatPrice(minPrice.amount, minPrice.currencyCode)}
            </span>
            {isOnSale && compareMin && (
              <span className="text-brand-text-muted text-xs line-through">
                {formatPrice(compareMin.amount, compareMin.currencyCode)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
