'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ANNOUNCEMENTS = [
  'Free Shipping on orders above ₹999',
  'Rated 4.8/5 by 2,000+ customers across India',
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        setFading(false);
      }, 300);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`bg-[#0F0F0E] overflow-hidden transition-all duration-300 ease-in-out ${
        scrolled ? 'max-h-0' : 'max-h-12'
      }`}
    >
      {/* Same padding as navbar: px-4 sm:px-6 lg:px-8 so text aligns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-end h-9">

        {/* Rotating announcement — centred within the same max-w container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 sm:px-6 lg:px-8">
          <p
            className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/70 transition-opacity duration-300"
            style={{ opacity: fading ? 0 : 1 }}
          >
            {ANNOUNCEMENTS[currentIndex]}
          </p>
        </div>

        {/* Utility links — desktop only */}
        <div className="relative hidden sm:flex items-center gap-1 flex-shrink-0">
          <Link href="/pages/contact" className="text-[10px] text-white/50 hover:text-white/90 transition-colors duration-200 tracking-[0.1em] px-2">
            Help
          </Link>
          <span className="text-white/20 text-[10px]">|</span>
          <Link href="/account/register" className="text-[10px] text-white/50 hover:text-white/90 transition-colors duration-200 tracking-[0.1em] px-2">
            Sign Up
          </Link>
          <span className="text-white/20 text-[10px]">|</span>
          <Link href="/account/login" className="text-[10px] text-white/50 hover:text-white/90 transition-colors duration-200 tracking-[0.1em] px-2">
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
}
