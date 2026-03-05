import { AnnouncementBar } from './announcement-bar';
import { Navbar } from './navbar';
import { Footer } from './footer';
import type { ReactNode } from 'react';

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
