'use client';

import { useState } from 'react';
import { AnnouncementBar } from './announcement-bar';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { CustomCursor } from './custom-cursor';
import { ScrollToTop } from './scroll-to-top';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { NewsletterPopup } from './newsletter-popup';
import { CookieConsent } from './cookie-consent';
import { BottomNav } from './bottom-nav';
import { SearchOverlay } from './search-overlay';
import { RouteAnnouncer } from './route-announcer';
import { Toaster } from 'sonner';
import type { ReactNode } from 'react';

export function SiteLayout({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <RouteAnnouncer />
      <ScrollToTop />
      <CustomCursor />
      <div className="sticky top-0 z-40">
        <AnnouncementBar />
        <Navbar onSearchOpen={() => setSearchOpen(true)} />
      </div>
      <CartDrawer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main id="main-content" className="pb-16 md:pb-0">{children}</main>
      <Footer />
      <BottomNav onSearchOpen={() => setSearchOpen(true)} />
      <NewsletterPopup />
      <CookieConsent />
      <Toaster position="bottom-left" richColors closeButton />
    </>
  );
}
