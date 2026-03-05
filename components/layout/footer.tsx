import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Twitter, Heart } from 'lucide-react';

const FOOTER_SECTIONS = [
  {
    title: 'Shop',
    links: [
      { href: '/collections/mens',   label: "Men's Footwear" },
      { href: '/collections/womens', label: "Women's Footwear" },
      { href: '/collections/kids',   label: "Kids' Footwear" },
      { href: '/search',             label: 'All Products' },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '/pages/size-guide', label: 'Size Guide' },
      { href: '/pages/returns',    label: 'Returns & Exchanges' },
      { href: '/pages/contact',    label: 'Contact Us' },
      { href: '/pages/about',      label: 'About Us' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/pages/privacy',  label: 'Privacy Policy' },
      { href: '/pages/terms',    label: 'Terms of Service' },
      { href: '/pages/shipping', label: 'Shipping Policy' },
      { href: '/pages/refund',   label: 'Refund Policy' },
    ],
  },
];

const SOCIAL_LINKS = [
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Facebook,  label: 'Facebook' },
  { href: '#', icon: Youtube,   label: 'YouTube' },
  { href: '#', icon: Twitter,   label: 'Twitter/X' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer-bg mt-24">

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="col-span-2">
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="Footway India"
                width={120}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-footer-muted text-sm leading-relaxed mb-8 max-w-xs font-light">
              Premium footwear crafted for those who move with intention.
              Quality you can feel with every step.
            </p>
            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer"
                  className="text-footer-muted hover:text-footer-text transition-colors duration-300"
                >
                  <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-footer-text text-[10px] font-semibold uppercase tracking-[0.25em] mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3" role="list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-footer-muted text-sm font-light hover:text-footer-text transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-footer-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-footer-muted text-[11px] tracking-[0.1em]">
              © {year} Footway India. All rights reserved.
            </p>
            <span className="hidden sm:block text-footer-border">·</span>
            <p className="flex items-center gap-1.5 text-footer-muted text-[11px] tracking-[0.1em]">
              Made with <Heart size={10} className="text-brand-red fill-brand-red" aria-label="love" /> by{' '}
              <a
                href="https://www.digiocular.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-muted hover:text-footer-text underline underline-offset-2 transition-colors duration-200"
              >
                Digiocular
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-footer-muted text-[10px] tracking-[0.15em] uppercase">Secure payments via</span>
            {['UPI', 'Razorpay', 'EMI'].map((method) => (
              <span
                key={method}
                className="text-footer-muted text-[10px] font-medium tracking-[0.1em] uppercase border border-footer-border px-2.5 py-1"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
