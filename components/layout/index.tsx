import { AnnouncementBar } from './announcement-bar';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { CustomCursor } from './custom-cursor';
import { ScrollToTop } from './scroll-to-top';
import { CartDrawer } from '@/components/cart/cart-drawer';
import type { ReactNode } from 'react';

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <div className="sticky top-0 z-40">
        <AnnouncementBar />
        <Navbar />
      </div>
      <CartDrawer />
      <main>{children}</main>
      <Footer />
    </>
  );
}
