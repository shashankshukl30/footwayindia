'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Heart, User, Menu, X, HelpCircle, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/cart-store';
import { useCustomerStore } from '@/lib/customer-store';

const NAV_LINKS = [
  { href: '/collections/mens',   label: "Men's" },
  { href: '/collections/womens', label: "Women's" },
  { href: '/collections/kids',   label: 'Kids' },
  { href: '/pages/size-guide',   label: 'Size Guide' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const { cart, openCart }          = useCartStore();
  const { customer }                = useCustomerStore();
  const totalQuantity               = cart?.totalQuantity ?? 0;
  const userInitial                 = customer?.firstName?.[0]?.toUpperCase() ?? customer?.email?.[0]?.toUpperCase() ?? null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Navbar — no sticky here, parent wrapper in layout handles it */}
      <header
        className={`transition-all duration-500 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-xl border-b border-brand-border shadow-sm'
            : 'bg-brand-bg/95 backdrop-blur-md border-b border-brand-border/60'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <Image
                src="/logo.png"
                alt="Footway India"
                width={160}
                height={64}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-10" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative text-[11px] font-medium text-brand-text-muted hover:text-brand-text transition-colors duration-300 tracking-[0.15em] uppercase group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-gold group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Icons */}
            <div className="flex items-center gap-0.5">
              <Link
                href="/search"
                className="p-2.5 text-brand-text-muted hover:text-brand-text transition-colors duration-300"
                aria-label="Search products"
              >
                <Search size={18} aria-hidden="true" strokeWidth={1.5} />
              </Link>

              <Link
                href="/wishlist"
                className="p-2.5 text-brand-text-muted hover:text-brand-gold transition-colors duration-300"
                aria-label="Wishlist"
              >
                <Heart size={18} aria-hidden="true" strokeWidth={1.5} />
              </Link>

              <Link
                href="/account"
                className="p-2.5 text-brand-text-muted hover:text-brand-text transition-colors duration-300"
                aria-label="Account"
              >
                {userInitial ? (
                  <span className="w-[18px] h-[18px] rounded-full bg-brand-gold text-white text-[9px] font-bold flex items-center justify-center">
                    {userInitial}
                  </span>
                ) : (
                  <User size={18} aria-hidden="true" strokeWidth={1.5} />
                )}
              </Link>

              {/* Cart — opens drawer */}
              <button
                onClick={openCart}
                className="relative p-2.5 text-brand-text-muted hover:text-brand-text transition-colors duration-300"
                aria-label={`Shopping cart${totalQuantity > 0 ? `, ${totalQuantity} items` : ''}`}
              >
                <ShoppingBag size={18} aria-hidden="true" strokeWidth={1.5} />
                {totalQuantity > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-gold text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {totalQuantity > 9 ? '9+' : totalQuantity}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2.5 text-brand-text-muted hover:text-brand-text transition-colors duration-300"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white border-l border-brand-border flex flex-col md:hidden shadow-xl"
            >
              <div className="flex items-center justify-between px-6 h-14 border-b border-brand-border">
                <Image src="/logo.png" alt="Footway India" width={110} height={44} className="h-9 w-auto object-contain" />
                <button onClick={() => setMobileOpen(false)} className="p-2 text-brand-text-muted hover:text-brand-text transition-colors" aria-label="Close menu">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="space-y-1" role="list">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 + 0.1, duration: 0.3 }}>
                      <Link href={link.href} onClick={() => setMobileOpen(false)} className="block py-3 font-display text-2xl font-bold tracking-wide text-brand-text hover:text-brand-gold transition-colors duration-200 uppercase border-b border-brand-border">
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Quick links */}
                <div className="mt-8 space-y-3">
                  {[
                    { href: '/search',   icon: Search,      label: 'Search' },
                    { href: '/wishlist', icon: Heart,       label: 'Wishlist' },
                    { href: '/account',  icon: User,        label: 'Account' },
                  ].map(({ href, icon: Icon, label }) => (
                    <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-brand-text-muted hover:text-brand-text transition-colors duration-200 text-sm tracking-wide">
                      <Icon size={16} strokeWidth={1.5} /> {label}
                    </Link>
                  ))}
                  <button onClick={() => { openCart(); setMobileOpen(false); }} className="flex items-center gap-3 text-brand-text-muted hover:text-brand-text transition-colors duration-200 text-sm tracking-wide">
                    <ShoppingBag size={16} strokeWidth={1.5} />
                    Cart {totalQuantity > 0 && `(${totalQuantity})`}
                  </button>
                </div>

                {/* Help / Auth links — mobile only (replaces announcement bar utility links) */}
                <div className="mt-8 pt-6 border-t border-brand-border space-y-3">
                  <Link href="/pages/contact" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-brand-text-muted hover:text-brand-text transition-colors duration-200 text-sm tracking-wide">
                    <HelpCircle size={16} strokeWidth={1.5} /> Help
                  </Link>
                  <Link href="/account/register" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-brand-text-muted hover:text-brand-text transition-colors duration-200 text-sm tracking-wide">
                    <UserPlus size={16} strokeWidth={1.5} /> Sign Up
                  </Link>
                  <Link href="/account/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-brand-text-muted hover:text-brand-text transition-colors duration-200 text-sm tracking-wide">
                    <LogIn size={16} strokeWidth={1.5} /> Log In
                  </Link>
                </div>
              </nav>

              <div className="px-6 py-6 border-t border-brand-border bg-brand-surface">
                <p className="text-brand-text-muted text-xs tracking-[0.2em] uppercase">Free shipping ₹999+</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
