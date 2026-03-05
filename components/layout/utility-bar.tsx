import Link from 'next/link';

export function UtilityBar() {
  return (
    <div className="bg-brand-surface border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-8 gap-1">
          <Link
            href="/pages/contact"
            className="text-[10px] text-brand-text-muted hover:text-brand-text transition-colors duration-200 tracking-[0.1em] px-2"
          >
            Help
          </Link>
          <span className="text-brand-border text-[10px]">|</span>
          <Link
            href="/account/register"
            className="text-[10px] text-brand-text-muted hover:text-brand-text transition-colors duration-200 tracking-[0.1em] px-2"
          >
            Sign Up
          </Link>
          <span className="text-brand-border text-[10px]">|</span>
          <Link
            href="/account/login"
            className="text-[10px] text-brand-text-muted hover:text-brand-text transition-colors duration-200 tracking-[0.1em] px-2"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
