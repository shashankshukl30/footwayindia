import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SiteLayout } from '@/components/layout';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Footway India — Premium Footwear',
    template: '%s | Footway India',
  },
  description: "Premium footwear for those who refuse to settle. Crafted for comfort, designed for impact. Shop Men's, Women's, and Kids footwear.",
  keywords: ['footwear', 'shoes', 'sneakers', 'premium shoes', 'India', 'men shoes', 'women shoes', 'kids shoes'],
  openGraph: {
    siteName: 'Footway India',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <body>
        {/* Google Tag Manager — only loads when GTM ID is configured */}
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        <SiteLayout>{children}</SiteLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
