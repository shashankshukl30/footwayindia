'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '@/lib/cart-store';

interface Props {
  productTitle: string;
  variantId: string | null;
  availableForSale: boolean;
  selectedSize: string | null;
  /** ref to the native ATC button — when it leaves viewport, sticky bar appears */
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

type BtnState = 'idle' | 'loading' | 'success';

export function StickyAddToCart({ productTitle, variantId, availableForSale, selectedSize, triggerRef }: Props) {
  const [visible,   setVisible]   = useState(false);
  const [btnState,  setBtnState]  = useState<BtnState>('idle');
  const { addItem, openCart }     = useCartStore();

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry!.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerRef]);

  async function handleAdd() {
    if (!variantId || !availableForSale) return;
    setBtnState('loading');
    try {
      await addItem(variantId);
      setBtnState('success');
      toast.success(productTitle, {
        description: 'Added to cart',
        action: { label: 'View Cart', onClick: openCart },
      });
      setTimeout(() => setBtnState('idle'), 2000);
    } catch {
      setBtnState('idle');
    }
  }

  const isDisabled = !variantId || !availableForSale || btnState !== 'idle';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-atc"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          /* bottom-16 on mobile clears the bottom nav bar; bottom-0 on md+ */
          className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 bg-white border-t border-brand-border px-4 py-3 flex items-center gap-4 shadow-lg"
        >
          <div className="flex-1 min-w-0">
            <p className="text-brand-text text-sm font-medium truncate">{productTitle}</p>
            {selectedSize && (
              <p className="text-brand-text-muted text-xs">Size: {selectedSize}</p>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={isDisabled}
            className={`flex-shrink-0 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors duration-300 ${
              btnState === 'success'
                ? 'bg-brand-success text-white'
                : isDisabled
                  ? 'bg-brand-surface text-brand-text-muted border border-brand-border cursor-not-allowed'
                  : 'bg-brand-text text-white hover:bg-brand-gold'
            }`}
            aria-label="Add to cart"
          >
            {btnState === 'loading' && <><Loader2 size={14} className="animate-spin" /> Adding...</>}
            {btnState === 'success' && <><Check size={14} /> Added</>}
            {btnState === 'idle' && (
              !variantId ? 'Select Size' :
              !availableForSale ? 'Out of Stock' :
              <><ShoppingBag size={14} /> Add to Cart</>
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
