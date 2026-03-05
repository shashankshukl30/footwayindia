'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ANNOUNCEMENTS = [
  '🚚 Free Shipping on orders above ₹999',
  '↩️ 30-Day Easy Returns — No Questions Asked',
  '⭐ Rated 4.8/5 by 2,000+ happy customers',
  '💳 No-Cost EMI available on orders above ₹2,000',
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative bg-brand-gold text-brand-bg text-center text-xs sm:text-sm font-medium py-2 px-8">
      <p className="font-sans transition-all duration-300">
        {ANNOUNCEMENTS[currentIndex]}
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
