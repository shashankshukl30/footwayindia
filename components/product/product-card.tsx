'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/shopify';
import type { Product } from '@/lib/shopify/types';
import { WishlistButton } from './wishlist-button';

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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={`/products/${product.handle}`} className="block">

        {/* Image container — portrait 4:5 ratio, light surface bg */}
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-surface">
          {product.featuredImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-brand-text-muted text-xs tracking-[0.2em] uppercase">No image</span>
            </div>
          )}

          {/* Wishlist */}
          <div className="absolute top-2 right-2 z-10">
            <WishlistButton handle={product.handle} size="sm" />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isOnSale && (
              <span className="bg-brand-red text-white text-[9px] font-semibold px-2.5 py-1 tracking-[0.15em] uppercase">
                -{discount}%
              </span>
            )}
            {isLowStock && (
              <span className="bg-white text-brand-text-muted text-[9px] font-medium px-2.5 py-1 tracking-[0.15em] uppercase border border-brand-border">
                {inventoryCount} left
              </span>
            )}
          </div>

          {/* Quick view — slim bottom bar */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <div className="w-full bg-[#0F0F0E] text-white py-3 text-[10px] font-medium uppercase tracking-[0.25em] flex items-center justify-center">
              View Product
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 pb-2">
          <p className="text-brand-text-muted text-[9px] font-medium tracking-[0.2em] uppercase mb-1">
            {product.vendor ?? 'Footway India'}
          </p>
          <h3 className="text-brand-text-secondary text-sm font-light leading-snug mb-3 group-hover:text-brand-text transition-colors duration-300"
              style={{ letterSpacing: '0.01em' }}>
            {product.title}
          </h3>

          <div className="flex items-center gap-3">
            <span className="text-brand-text font-medium text-sm">
              {formatPrice(minPrice.amount, minPrice.currencyCode)}
            </span>
            {isOnSale && compareMin && (
              <span className="text-brand-text-muted text-xs line-through font-light">
                {formatPrice(compareMin.amount, compareMin.currencyCode)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
