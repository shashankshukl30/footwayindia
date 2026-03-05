import { AnnouncementBar } from './announcement-bar';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { CustomCursor } from './custom-cursor';
import { ScrollToTop } from './scroll-to-top';
import type { ReactNode } from 'react';

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <AnnouncementBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
