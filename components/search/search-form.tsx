'use client';

import { useRef } from 'react';

interface SearchFormProps {
  query: string;
  sort: string;
}

export function SearchForm({ query, sort }: SearchFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} method="GET" className="flex flex-col sm:flex-row gap-3 mb-10">
      <div className="flex flex-1 gap-3 max-w-lg">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search sneakers, boots, sandals..."
          className="flex-1 bg-brand-surface border border-brand-border text-brand-text placeholder:text-brand-text-muted px-4 py-3 text-sm focus:outline-none focus:border-brand-text transition-colors"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="bg-brand-text text-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors duration-300 flex-shrink-0"
        >
          Search
        </button>
      </div>
      <select
        name="sort"
        defaultValue={sort}
        onChange={() => formRef.current?.requestSubmit()}
        className="bg-brand-surface border border-brand-border text-brand-text-secondary text-sm px-4 py-3 focus:outline-none focus:border-brand-text transition-colors"
        aria-label="Sort products"
      >
        <option value="">Sort: Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </form>
  );
}
