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

  return (
    <div className="bg-[#0F0F0E] px-4">
      <div className="max-w-7xl mx-auto relative flex items-center justify-end h-9">

        {/* Rotating announcement — absolutely centred across the full bar */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p
            className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/70 transition-opacity duration-300"
            style={{ opacity: fading ? 0 : 1 }}
          >
            {ANNOUNCEMENTS[currentIndex]}
          </p>
        </div>

        {/* Utility links — right side */}
        <div className="relative flex items-center gap-1 flex-shrink-0">
          <Link
            href="/pages/contact"
            className="text-[10px] text-white/50 hover:text-white/90 transition-colors duration-200 tracking-[0.1em] px-2"
          >
            Help
          </Link>
          <span className="text-white/20 text-[10px]">|</span>
          <Link
            href="/account/register"
            className="text-[10px] text-white/50 hover:text-white/90 transition-colors duration-200 tracking-[0.1em] px-2"
          >
            Sign Up
          </Link>
          <span className="text-white/20 text-[10px]">|</span>
          <Link
            href="/account/login"
            className="text-[10px] text-white/50 hover:text-white/90 transition-colors duration-200 tracking-[0.1em] px-2"
          >
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
}
