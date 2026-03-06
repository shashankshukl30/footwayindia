'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, User, ShoppingBag, Search } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

interface BottomNavProps {
  onSearchOpen: () => void;
}

export function BottomNav({ onSearchOpen }: BottomNavProps) {
  const pathname = usePathname();
  const { cart, openCart } = useCartStore();
  const totalQuantity = cart?.totalQuantity ?? 0;

  const NAV = [
    { href: '/',          icon: Home,       label: 'Home' },
    { href: '/wishlist',  icon: Heart,      label: 'Wishlist' },
    { href: '/account',   icon: User,       label: 'Account' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-brand-border flex md:hidden safe-area-inset-bottom"
      aria-label="Mobile navigation"
    >
      {/* Home / Wishlist */}
      {NAV.slice(0, 2).map(({ href, icon: Icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors duration-200 ${
              active ? 'text-brand-text' : 'text-brand-text-muted hover:text-brand-text'
            }`}
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={20} strokeWidth={active ? 2 : 1.5} aria-hidden="true" />
            <span className="text-[9px] tracking-[0.1em] uppercase">{label}</span>
          </Link>
        );
      })}

      {/* Search — opens overlay */}
      <button
        onClick={onSearchOpen}
        className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-brand-text-muted hover:text-brand-text transition-colors duration-200"
        aria-label="Open search"
      >
        <Search size={20} strokeWidth={1.5} aria-hidden="true" />
        <span className="text-[9px] tracking-[0.1em] uppercase">Search</span>
      </button>

      {/* Account */}
      {NAV.slice(2).map(({ href, icon: Icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors duration-200 ${
              active ? 'text-brand-text' : 'text-brand-text-muted hover:text-brand-text'
            }`}
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={20} strokeWidth={active ? 2 : 1.5} aria-hidden="true" />
            <span className="text-[9px] tracking-[0.1em] uppercase">{label}</span>
          </Link>
        );
      })}

      {/* Cart */}
      <button
        onClick={openCart}
        className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-brand-text-muted hover:text-brand-text transition-colors duration-200 relative"
        aria-label={`Cart — ${totalQuantity} item${totalQuantity !== 1 ? 's' : ''}`}
      >
        <span className="relative">
          <ShoppingBag size={20} strokeWidth={1.5} aria-hidden="true" />
          {totalQuantity > 0 && (
            <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-brand-gold text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {totalQuantity > 9 ? '9+' : totalQuantity}
            </span>
          )}
        </span>
        <span className="text-[9px] tracking-[0.1em] uppercase">Cart</span>
      </button>
    </nav>
  );
}
