'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Loader2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/shopify';
import { useCartStore } from '@/lib/cart-store';
import type { Product, ProductVariant } from '@/lib/shopify/types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const { addItem, isLoading } = useCartStore();

  // Reset state when product changes
  useEffect(() => {
    if (!product) return;
    const variants = product.variants.edges.map((e) => e.node);
    setSelectedVariantId(variants.length === 1 ? variants[0]!.id : null);
    setImageIndex(0);
  }, [product]);

  // Close on Escape
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  const handleAddToCart = useCallback(async () => {
    if (!selectedVariantId) return;
    await addItem(selectedVariantId);
    onClose();
  }, [selectedVariantId, addItem, onClose]);

  if (!product) return null;

  const variants = product.variants.edges.map((e) => e.node);
  const images   = product.images.edges.map((e) => e.node);
  const allImages = images.length > 0 ? images : (product.featuredImage ? [product.featuredImage] : []);

  const selectedVariant: ProductVariant | null =
    variants.find((v) => v.id === selectedVariantId) ?? null;

  const sizeOption = product.options.find((o) => o.name.toLowerCase() === 'size');
  const minPrice   = product.priceRange.minVariantPrice;
  const compareMin = product.compareAtPriceRange?.minVariantPrice;
  const isOnSale   = compareMin && parseFloat(compareMin.amount) > parseFloat(minPrice.amount);

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-brand-bg/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.32, 0, 0.68, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2">

                {/* Left: Image */}
                <div className="relative aspect-[4/5] sm:aspect-auto bg-brand-surface overflow-hidden">
                  {allImages[imageIndex] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={allImages[imageIndex]!.url}
                      alt={allImages[imageIndex]!.altText ?? product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-brand-text-muted text-xs uppercase tracking-widest">No image</span>
                    </div>
                  )}

                  {/* Thumbnail strip */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {allImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImageIndex(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            i === imageIndex ? 'bg-brand-text w-4' : 'bg-white/60'
                          }`}
                          aria-label={`View image ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Info */}
                <div className="p-6 sm:p-8 flex flex-col">
                  {/* Close */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-brand-text-muted text-[9px] uppercase tracking-[0.2em] mb-1">
                        {product.vendor ?? 'Footway India'}
                      </p>
                      <h2 className="font-display font-bold uppercase text-xl leading-tight text-brand-text tracking-tight">
                        {product.title}
                      </h2>
                    </div>
                    <button
                      onClick={onClose}
                      className="ml-4 flex-shrink-0 text-brand-text-muted hover:text-brand-text transition-colors duration-200"
                      aria-label="Close quick view"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-brand-text text-2xl font-bold">
                      {formatPrice(minPrice.amount, minPrice.currencyCode)}
                    </span>
                    {isOnSale && compareMin && (
                      <span className="text-brand-text-muted text-base line-through font-light">
                        {formatPrice(compareMin.amount, compareMin.currencyCode)}
                      </span>
                    )}
                  </div>

                  {/* Size selector */}
                  {sizeOption && (
                    <div className="mb-6">
                      <p className="text-brand-text text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
                        Select Size
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {variants.map((variant) => {
                          const sizeValue = variant.selectedOptions.find(
                            (o) => o.name.toLowerCase() === 'size'
                          )?.value ?? variant.title;
                          const isSelected  = selectedVariantId === variant.id;
                          const isAvailable = variant.availableForSale;
                          return (
                            <button
                              key={variant.id}
                              onClick={() => isAvailable && setSelectedVariantId(variant.id)}
                              disabled={!isAvailable}
                              aria-pressed={isSelected}
                              aria-label={`Size ${sizeValue}${!isAvailable ? ' — out of stock' : ''}`}
                              className={`min-w-[2.75rem] px-3 py-2 text-sm font-medium border transition-all duration-200 ${
                                isSelected
                                  ? 'border-brand-text bg-brand-text text-white'
                                  : isAvailable
                                    ? 'border-brand-border text-brand-text-secondary hover:border-brand-text hover:text-brand-text'
                                    : 'border-brand-border text-brand-text-muted opacity-40 cursor-not-allowed line-through'
                              }`}
                            >
                              {sizeValue}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto space-y-3">
                    {/* Add to Cart */}
                    <button
                      onClick={handleAddToCart}
                      disabled={!selectedVariant || isLoading || !selectedVariant?.availableForSale}
                      className={`w-full py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 ${
                        selectedVariant && selectedVariant.availableForSale && !isLoading
                          ? 'bg-brand-text text-white hover:bg-brand-gold cursor-pointer'
                          : 'bg-brand-surface text-brand-text-muted border border-brand-border cursor-not-allowed'
                      }`}
                    >
                      {isLoading ? (
                        <><Loader2 size={15} className="animate-spin" /> Adding...</>
                      ) : !selectedVariant ? (
                        'Select a Size'
                      ) : !selectedVariant.availableForSale ? (
                        'Out of Stock'
                      ) : (
                        <><ShoppingBag size={15} /> Add to Cart</>
                      )}
                    </button>

                    {/* View full product */}
                    <Link
                      href={`/products/${product.handle}`}
                      onClick={onClose}
                      className="w-full py-3 text-[11px] font-medium uppercase tracking-[0.2em] flex items-center justify-center gap-2 border border-brand-border text-brand-text-secondary hover:border-brand-text hover:text-brand-text transition-all duration-200"
                    >
                      <ExternalLink size={13} />
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
