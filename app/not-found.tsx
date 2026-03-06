import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-[120px] leading-none font-display font-bold text-brand-surface select-none" aria-hidden="true">
        404
      </p>
      <div className="flex items-center gap-4 mb-4 -mt-4">
        <span className="divider-gold" />
        <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">
          Page Not Found
        </p>
        <span className="divider-gold" />
      </div>
      <h1 className="font-display font-bold uppercase text-2xl tracking-tight text-brand-text mb-3">
        Nothing here
      </h1>
      <p className="text-brand-text-muted text-sm max-w-sm mb-8">
        The page you&#39;re looking for doesn&#39;t exist or has been moved.
      </p>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="bg-brand-text text-white px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors duration-300"
        >
          Back to Home
        </Link>
        <Link
          href="/search"
          className="border border-brand-border text-brand-text px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] hover:border-brand-text transition-colors duration-300"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
