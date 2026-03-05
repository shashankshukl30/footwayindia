'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Show cursors
    dot.style.opacity = '0';
    ring.style.opacity = '0';

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const onEnterLink = () => {
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(1.8)`;
      ring.style.borderColor = 'var(--color-brand-gold)';
      dot.style.opacity = '0';
    };

    const onLeaveLink = () => {
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(1)`;
      ring.style.borderColor = 'rgba(255,255,255,0.3)';
      dot.style.opacity = '1';
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${ring.dataset.scale ?? 1})`;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    document.addEventListener('mousemove', onMove);

    // Attach hover listeners to interactive elements
    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };

    addListeners();
    // Re-attach on DOM changes (for dynamic content)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Hide default cursor
    document.documentElement.style.cursor = 'none';

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      observer.disconnect();
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-1.5 h-1.5 rounded-full bg-brand-gold"
        style={{ opacity: 0, willChange: 'transform' }}
        aria-hidden="true"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-8 h-8 rounded-full border border-white/30"
        style={{
          opacity: 0,
          willChange: 'transform',
          transition: 'border-color 0.2s, transform 0.15s ease-out',
        }}
        aria-hidden="true"
      />
    </>
  );
}
