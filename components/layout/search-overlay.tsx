'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/shopify';

interface SearchResult {
  id: string;
  handle: string;
  title: string;
  vendor: string | null;
  price: string;
  currency: string;
  image: string | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function SearchOverlay({ open, onClose }: Props) {
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 220);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      setResults([]);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Fetch results
  useEffect(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    fetch(`/search?q=${encodeURIComponent(debouncedQuery)}&format=json`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.results) setResults(data.results.slice(0, 6));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  const handleClose = useCallback(() => { onClose(); }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-brand-bg/95 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            key="search-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.32, 0, 0.68, 1] }}
            className="fixed inset-x-0 top-0 z-50 pointer-events-none"
          >
            <div className="max-w-2xl mx-auto px-4 pt-24 pb-8 pointer-events-auto">
              {/* Search input */}
              <div className="relative flex items-center border-b-2 border-brand-text pb-4 mb-8">
                <Search size={20} className="text-brand-text-muted mr-4 flex-shrink-0" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for shoes, brands..."
                  className="flex-1 bg-transparent text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-brand-text focus:outline-none placeholder:text-brand-text-muted/50"
                  aria-label="Search products"
                  autoComplete="off"
                />
                <button
                  onClick={handleClose}
                  className="ml-4 text-brand-text-muted hover:text-brand-text transition-colors"
                  aria-label="Close search"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Results */}
              {loading && (
                <div className="flex gap-2 items-center text-brand-text-muted text-xs uppercase tracking-[0.2em]">
                  <span className="w-4 h-px bg-brand-gold animate-pulse" />
                  Searching...
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="space-y-1">
                  {results.map((r) => (
                    <Link
                      key={r.id}
                      href={`/products/${r.handle}`}
                      onClick={handleClose}
                      className="group flex items-center gap-4 py-3 border-b border-brand-border hover:border-brand-text transition-colors duration-200"
                    >
                      <div className="w-12 h-12 bg-brand-surface flex-shrink-0 overflow-hidden">
                        {r.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-brand-elevated" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] text-brand-text-muted uppercase tracking-[0.15em] mb-0.5">{r.vendor ?? 'Footway India'}</p>
                        <p className="text-brand-text text-sm font-medium truncate group-hover:text-brand-gold transition-colors">{r.title}</p>
                      </div>
                      <span className="text-brand-text text-sm font-medium flex-shrink-0">
                        {formatPrice(r.price, r.currency)}
                      </span>
                      <ArrowRight size={14} className="text-brand-text-muted group-hover:text-brand-gold group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  ))}

                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={handleClose}
                    className="block pt-4 text-[10px] text-brand-gold uppercase tracking-[0.25em] hover:text-brand-text transition-colors"
                  >
                    See all results for &ldquo;{query}&rdquo; →
                  </Link>
                </div>
              )}

              {!loading && query.length >= 2 && results.length === 0 && (
                <div>
                  <p className="text-brand-text-muted text-sm mb-4">No results for &ldquo;{query}&rdquo;</p>
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={handleClose}
                    className="text-[10px] text-brand-gold uppercase tracking-[0.25em] hover:text-brand-text transition-colors"
                  >
                    Browse all products →
                  </Link>
                </div>
              )}

              {query.length === 0 && (
                <div className="space-y-2">
                  <p className="text-[9px] text-brand-text-muted uppercase tracking-[0.3em] mb-4">Popular searches</p>
                  {['Running Shoes', "Men's Sneakers", "Women's Heels", 'Kids Footwear'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="block text-brand-text-secondary text-sm hover:text-brand-text transition-colors duration-200 py-1"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
