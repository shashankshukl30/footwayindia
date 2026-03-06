'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const MENS_SIZES = [
  { uk: '6',   eu: '39', us: '7',   cm: '24.5' },
  { uk: '7',   eu: '40', us: '8',   cm: '25.4' },
  { uk: '8',   eu: '41', us: '9',   cm: '26.2' },
  { uk: '9',   eu: '42', us: '10',  cm: '27.1' },
  { uk: '10',  eu: '43', us: '11',  cm: '27.9' },
  { uk: '11',  eu: '44', us: '12',  cm: '28.8' },
  { uk: '12',  eu: '46', us: '13',  cm: '29.6' },
];

const WOMENS_SIZES = [
  { uk: '3',   eu: '36', us: '5',   cm: '22.5' },
  { uk: '4',   eu: '37', us: '6',   cm: '23.2' },
  { uk: '5',   eu: '38', us: '7',   cm: '23.9' },
  { uk: '6',   eu: '39', us: '8',   cm: '24.6' },
  { uk: '7',   eu: '40', us: '9',   cm: '25.4' },
  { uk: '8',   eu: '41', us: '10',  cm: '26.2' },
  { uk: '9',   eu: '42', us: '11',  cm: '27.0' },
];

export function SizeGuideModal({ open, onClose }: Props) {
  const [tab, setTab] = useState<'mens' | 'womens'>('mens');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const sizes = tab === 'mens' ? MENS_SIZES : WOMENS_SIZES;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="sg-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-brand-bg/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="sg-panel"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Size guide"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
              <div>
                <div className="flex items-center gap-3 mb-0.5">
                  <span className="w-4 h-px bg-brand-gold" />
                  <p className="text-[9px] font-medium tracking-[0.35em] uppercase text-brand-gold">Guide</p>
                </div>
                <h2 className="font-display font-bold uppercase text-xl text-brand-text tracking-tight">Size Guide</h2>
              </div>
              <button onClick={onClose} className="text-brand-text-muted hover:text-brand-text transition-colors" aria-label="Close size guide">
                <X size={18} />
              </button>
            </div>

            {/* Tab switcher */}
            <div className="flex border-b border-brand-border">
              {(['mens', 'womens'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 ${
                    tab === t
                      ? 'text-brand-text border-b-2 border-brand-text -mb-px'
                      : 'text-brand-text-muted hover:text-brand-text'
                  }`}
                >
                  {t === 'mens' ? "Men's" : "Women's"}
                </button>
              ))}
            </div>

            {/* Size table */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-border">
                    {['UK', 'EU', 'US', 'CM'].map((h) => (
                      <th key={h} className="pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-text-muted text-left">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((row) => (
                    <tr key={row.uk} className="border-b border-brand-border/50 hover:bg-brand-surface transition-colors">
                      <td className="py-3 text-brand-text font-medium">{row.uk}</td>
                      <td className="py-3 text-brand-text-secondary">{row.eu}</td>
                      <td className="py-3 text-brand-text-secondary">{row.us}</td>
                      <td className="py-3 text-brand-text-secondary">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 p-4 bg-brand-surface border border-brand-border">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-text mb-2">How to measure</p>
                <p className="text-xs text-brand-text-muted font-light leading-relaxed">
                  Stand on a flat surface, measure from the back of the heel to the tip of the longest toe.
                  If between sizes, we recommend sizing up.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
