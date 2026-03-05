'use client';

import { useEffect, useState } from 'react';
import { Clock, Flame } from 'lucide-react';

interface UrgencyBadgeProps {
  inventoryCount: number;
}

export function UrgencyBadge({ inventoryCount }: UrgencyBadgeProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 15, seconds: 0 });
  const [viewerCount] = useState(() => Math.floor(Math.random() * 8) + 8);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)   return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev; // Stops at 0
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="space-y-2 my-4">
      {/* Viewer count */}
      <p className="flex items-center gap-2 text-brand-text-secondary text-sm">
        <Flame size={14} className="text-orange-400" aria-hidden="true" />
        <span>
          <strong className="text-brand-text">{viewerCount} people</strong> viewing this right now
        </span>
      </p>

      {/* Countdown */}
      <p className="flex items-center gap-2 text-brand-text-secondary text-sm">
        <Clock size={14} className="text-brand-gold" aria-hidden="true" />
        <span>
          Order in{' '}
          <strong className="text-brand-gold font-mono">
            {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
          </strong>{' '}
          for same-day dispatch
        </span>
      </p>

      {/* Low stock warning */}
      {inventoryCount > 0 && inventoryCount <= 10 && (
        <div
          className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1.5"
          role="alert"
        >
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" aria-hidden="true" />
          <span className="text-red-400 text-xs font-medium">
            Only {inventoryCount} left in stock — order soon!
          </span>
        </div>
      )}
    </div>
  );
}
