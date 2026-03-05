import Link from 'next/link';
import { Search, ShoppingBag } from 'lucide-react';

const NAV_LINKS = [
  { href: '/collections/mens',   label: "Men's" },
  { href: '/collections/womens', label: "Women's" },
  { href: '/collections/kids',   label: 'Kids' },
  { href: '/pages/size-guide',   label: 'Size Guide' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl font-bold tracking-widest text-brand-text uppercase hover:text-brand-gold transition-colors duration-200"
          >
            FOOTWAY INDIA
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-brand-text-secondary hover:text-brand-gold transition-colors duration-200 tracking-wide uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="p-2 text-brand-text-secondary hover:text-brand-gold transition-colors duration-200"
              aria-label="Search products"
            >
              <Search size={20} aria-hidden="true" />
            </Link>

            <Link
              href="/cart"
              className="relative p-2 text-brand-text-secondary hover:text-brand-gold transition-colors duration-200"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} aria-hidden="true" />
              {/* Cart count badge — wired up in Phase 4 */}
              <span
                id="cart-count-badge"
                className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold text-brand-bg text-[10px] font-bold rounded-full flex items-center justify-center hidden"
                aria-live="polite"
              />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
