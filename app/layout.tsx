import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Footway India — Premium Footwear',
    template: '%s | Footway India',
  },
  description: 'Premium footwear for those who refuse to settle. Crafted for comfort, designed for impact. Shop Men\'s, Women\'s, and Kids footwear.',
  keywords: ['footwear', 'shoes', 'sneakers', 'premium shoes', 'India', 'men shoes', 'women shoes', 'kids shoes'],
  openGraph: {
    siteName: 'Footway India',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
