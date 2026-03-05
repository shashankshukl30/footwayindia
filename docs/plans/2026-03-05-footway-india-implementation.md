# Footway India E-Commerce — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a world-class premium footwear e-commerce storefront for Footway India using Next.js 14 App Router + Shopify Headless, deployed on Vercel, with a Premium Dark brand identity.

**Architecture:** Next.js 14 App Router bootstrapped from Vercel's official commerce template (production-tested Shopify integration), heavily customized with a Premium Dark theme (#0A0A0A / gold). ISR for product/collection pages served from Vercel Edge CDN. Shopify Cart API for persistent cart. Shopify-hosted checkout with Razorpay.

**Tech Stack:** Next.js 14 · Tailwind CSS v3 · Shopify Storefront GraphQL API · Zustand · Framer Motion · Lucide React · Playwright (E2E) · Vitest (unit) · Vercel

**Design Doc:** `docs/plans/2026-03-05-footway-india-ecommerce-design.md`

---

## Prerequisites (Do these manually before running tasks)

### P1: Shopify Store Setup
1. Create Shopify store at shopify.com/free-trial
2. In Shopify Admin → Settings → Apps and sales channels → Develop apps → Create app named "Footway Headless"
3. Enable Storefront API scopes: `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`, `unauthenticated_write_checkouts`, `unauthenticated_read_checkouts`, `unauthenticated_write_customers`, `unauthenticated_read_customer_tags`
4. Copy: **Storefront API Access Token** (public, safe to expose)
5. Copy: **Store domain** (e.g., `your-store.myshopify.com`)

### P2: Add 3 Placeholder Products in Shopify Admin
For each product below, go to Products → Add product:

**Product 1 — Apex Runner Pro (Men's)**
- Title: `Apex Runner Pro`
- Price: ₹4,999
- Collection: Create collection `mens` (handle: `mens`)
- Sizes (variant option "Size"): UK 6, UK 7, UK 8, UK 9, UK 10, UK 11, UK 12
- Colors (variant option "Color"): Midnight Black, Cognac Brown
- Description: "Engineered for the urban runner who refuses to compromise. The Apex Runner Pro features a reinforced heel counter, responsive foam midsole, and premium full-grain upper. Where performance meets obsession."
- Images: Use high-quality sneaker images (download from Unsplash: unsplash.com/s/photos/men-sneakers — use 3-4 images per product)
- Inventory: Set 5 units per variant

**Product 2 — Luna Comfort Slip (Women's)**
- Title: `Luna Comfort Slip`
- Price: ₹3,499
- Collection: Create collection `womens` (handle: `womens`)
- Sizes: UK 3, UK 4, UK 5, UK 6, UK 7, UK 8
- Colors: Pearl White, Rose Gold
- Description: "Effortless elegance meets all-day comfort. The Luna Comfort Slip features a memory foam insole, breathable knit upper, and a silhouette that transitions seamlessly from studio to street."
- Images: Women's slip-on shoes (Unsplash: unsplash.com/s/photos/women-slip-on-shoes)
- Inventory: 5 units per variant

**Product 3 — Bounce Jr. (Children's)**
- Title: `Bounce Jr.`
- Price: ₹1,999
- Collection: Create collection `kids` (handle: `kids`)
- Sizes: UK 1, UK 2, UK 3, UK 4, UK 5
- Colors: Electric Blue, Coral Pink
- Description: "Designed for unstoppable kids. The Bounce Jr. features a flexible rubber sole for growing feet, easy velcro closure, and a cushioned footbed that keeps up with every adventure."
- Images: Kids shoes (Unsplash: unsplash.com/s/photos/kids-sneakers)
- Inventory: 5 units per variant

### P3: Create `.env.local` (after Task 1)
```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here
SHOPIFY_REVALIDATION_SECRET=any-random-string-min-32-chars
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Phase 1: Project Bootstrap & Configuration

### Task 1: Bootstrap Next.js Commerce Template

**Files:**
- Create: `d:/ANTIGRAVITY/FOOTWAY INDIA/` (project root)

**Step 1: Scaffold from Vercel Commerce template**

Run in `d:/ANTIGRAVITY/FOOTWAY INDIA/`:
```bash
npx create-next-app@latest . --example "https://github.com/vercel/commerce" --use-npm
```
Wait for it to complete. This pulls in a production-ready Next.js + Shopify headless starter.

**Step 2: Verify scaffold succeeded**
```bash
ls -la
```
Expected: see `app/`, `components/`, `lib/`, `package.json`, `tailwind.config.js`

**Step 3: Install additional dependencies**
```bash
npm install framer-motion zustand lucide-react @next/font
```

**Step 4: Verify no install errors**
```bash
npm run build 2>&1 | tail -20
```
Expected: Build succeeds (may show env warnings — that's OK without .env.local yet)

**Step 5: Commit**
```bash
git init
git add .
git commit -m "feat: bootstrap Next.js + Shopify commerce template"
```

---

### Task 2: Configure Environment & Shopify Connection

**Files:**
- Create: `.env.local`
- Modify: `lib/shopify/index.ts`

**Step 1: Create .env.local**
```bash
cat > .env.local << 'EOF'
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here
SHOPIFY_REVALIDATION_SECRET=footway-india-secret-2026-xyz
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF
```
Replace the values with your actual Shopify credentials from Prerequisite P1.

**Step 2: Start dev server**
```bash
npm run dev
```
Expected: Server starts on http://localhost:3000

**Step 3: Test Shopify connection**
Open browser: http://localhost:3000
Expected: Homepage loads (default commerce template UI). If you see products from your Shopify store, connection is working.

**Step 4: Verify products API**
Open browser: http://localhost:3000/search
Expected: Shows your 3 Shopify products (Apex Runner Pro, Luna Comfort Slip, Bounce Jr.)

**Step 5: Commit**
```bash
git add lib/ && git commit -m "feat: configure Shopify Storefront API connection"
```
Note: Do NOT commit `.env.local` (it's in .gitignore already).

---

### Task 3: Configure Tailwind Premium Dark Theme

**Files:**
- Modify: `tailwind.config.js`
- Modify: `app/globals.css`

**Step 1: Read the current Tailwind config**
```bash
cat tailwind.config.js
```

**Step 2: Replace tailwind.config.js**
Open `tailwind.config.js` and replace the `theme.extend` section with:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium Dark brand palette
        brand: {
          bg:        '#0A0A0A',   // Primary background
          surface:   '#1A1A1A',   // Cards, surfaces
          elevated:  '#242424',   // Elevated surfaces
          border:    '#2A2A2A',   // Borders, dividers
          gold:      '#C9A84C',   // Accent / CTA
          'gold-light': '#E8C96A', // Hover gold
          'gold-dark':  '#A8873E', // Active gold
          text:      '#FFFFFF',   // Primary text
          'text-secondary': '#E5E5E5', // Secondary text
          'text-muted':     '#9CA3AF', // Muted text
          error:     '#EF4444',
          success:   '#22C55E',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':  'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 76, 0.4)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(201, 168, 76, 0)' },
        },
      },
    },
  },
  plugins: [],
};
```

**Step 3: Replace app/globals.css**
Open `app/globals.css` and replace entirely with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

:root {
  --font-inter: 'Inter', sans-serif;
  --font-playfair: 'Playfair Display', serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0A0A0A;
  color: #FFFFFF;
  font-family: var(--font-inter);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar — dark premium */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0A0A0A;
}
::-webkit-scrollbar-thumb {
  background: #2A2A2A;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #C9A84C;
}

/* Selection highlight */
::selection {
  background-color: #C9A84C;
  color: #0A0A0A;
}

/* Remove default focus outline, replace with gold */
:focus-visible {
  outline: 2px solid #C9A84C;
  outline-offset: 2px;
}
```

**Step 4: Verify theme is applied**
Run dev server (if not already running): `npm run dev`
Open http://localhost:3000
Expected: Page background is now dark (#0A0A0A)

**Step 5: Commit**
```bash
git add tailwind.config.js app/globals.css
git commit -m "feat: configure premium dark brand theme (gold/black)"
```

---

## Phase 2: Layout Components

### Task 4: Announcement Bar Component

**Files:**
- Create: `components/layout/announcement-bar.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create the announcement bar**

Create `components/layout/announcement-bar.tsx`:
```tsx
'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ANNOUNCEMENTS = [
  '🚚 Free Shipping on orders above ₹999',
  '↩️ 30-Day Easy Returns — No Questions Asked',
  '⭐ Rated 4.8/5 by 2,000+ happy customers',
  '💳 No-Cost EMI available on all orders above ₹2,000',
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
      <p className="transition-all duration-300 font-sans">
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
```

**Step 2: Add to app/layout.tsx**
Open `app/layout.tsx`. Find the `<body>` tag and add `<AnnouncementBar />` as the first child inside `<body>`. Import it at the top:
```tsx
import { AnnouncementBar } from 'components/layout/announcement-bar';
```

**Step 3: Verify visually**
Go to http://localhost:3000
Expected: Gold announcement bar at top of page, rotating messages every 4 seconds, X to close.

**Step 4: Commit**
```bash
git add components/layout/announcement-bar.tsx app/layout.tsx
git commit -m "feat: add rotating announcement bar with free shipping/returns messaging"
```

---

### Task 5: Premium Dark Navbar

**Files:**
- Modify: `components/layout/navbar/index.tsx` (or wherever the template puts it)
- Create: `components/layout/navbar/mobile-menu.tsx`

**Step 1: Find existing navbar**
```bash
find . -name "*.tsx" | xargs grep -l "navbar\|Navbar\|nav" | head -10
```
Note the file path.

**Step 2: Read the current navbar**
Read the file found above.

**Step 3: Replace the navbar with premium dark version**

Replace the content of the navbar file (keep the existing cart icon logic, just restyle):
```tsx
import Link from 'next/link';
import { Suspense } from 'react';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { CartModal } from 'components/cart/modal';

const LINKS = [
  { href: '/collections/mens',   label: "Men's" },
  { href: '/collections/womens', label: "Women's" },
  { href: '/collections/kids',   label: "Kids" },
  { href: '/pages/size-guide',   label: 'Size Guide' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl font-bold tracking-widest text-brand-text uppercase hover:text-brand-gold transition-colors"
          >
            FOOTWAY INDIA
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-brand-text-secondary hover:text-brand-gold transition-colors tracking-wide uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Link
              href="/search"
              className="p-2 text-brand-text-secondary hover:text-brand-gold transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </Link>

            <Suspense fallback={
              <div className="relative p-2">
                <ShoppingBag size={20} className="text-brand-text-secondary" />
              </div>
            }>
              <CartModal />
            </Suspense>
          </div>
        </div>
      </nav>
    </header>
  );
}
```

**Step 4: Verify navbar looks premium**
Go to http://localhost:3000
Expected: Sticky dark navbar with gold hover states, "FOOTWAY INDIA" serif logo, navigation links.

**Step 5: Commit**
```bash
git add components/layout/navbar/
git commit -m "feat: implement premium dark sticky navbar with gold hover states"
```

---

### Task 6: Premium Footer

**Files:**
- Modify: `components/layout/footer.tsx` (wherever the template puts it)

**Step 1: Find and read existing footer**
```bash
find . -name "footer*" -path "*/components/*"
```

**Step 2: Replace footer with premium dark version**
```tsx
import Link from 'next/link';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const FOOTER_SECTIONS = [
  {
    title: 'Shop',
    links: [
      { href: '/collections/mens',   label: "Men's Footwear" },
      { href: '/collections/womens', label: "Women's Footwear" },
      { href: '/collections/kids',   label: "Children's Footwear" },
      { href: '/search',             label: 'All Products' },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '/pages/size-guide', label: 'Size Guide' },
      { href: '/pages/returns',    label: 'Returns & Exchanges' },
      { href: '/pages/contact',    label: 'Contact Us' },
      { href: '/pages/about',      label: 'About Footway India' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { href: '/pages/privacy',   label: 'Privacy Policy' },
      { href: '/pages/terms',     label: 'Terms of Service' },
      { href: '/pages/shipping',  label: 'Shipping Policy' },
      { href: '/pages/refund',    label: 'Refund Policy' },
    ],
  },
];

const SOCIAL = [
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com',  icon: Facebook,  label: 'Facebook' },
  { href: 'https://youtube.com',   icon: Youtube,   label: 'YouTube' },
  { href: 'https://twitter.com',   icon: Twitter,   label: 'Twitter/X' },
];

export function Footer() {
  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top: Brand + Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-xl font-bold tracking-widest text-brand-text uppercase mb-4">
              FOOTWAY INDIA
            </p>
            <p className="text-brand-text-muted text-sm leading-relaxed mb-6">
              Premium footwear crafted for those who move with intention. Quality you can feel with every step.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              {SOCIAL.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-brand-text-muted hover:text-brand-gold transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-brand-text font-semibold text-sm uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-brand-text-muted text-sm hover:text-brand-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-8 border-t border-b border-brand-border mb-8">
          {[
            '🔒 100% Secure Payments',
            '🚚 Free Shipping ₹999+',
            '↩️ 30-Day Returns',
            '⭐ 4.8/5 Rating',
            '📞 24/7 Support',
          ].map((badge) => (
            <span key={badge} className="text-brand-text-muted text-xs sm:text-sm font-medium">
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-text-muted text-xs">
            © {new Date().getFullYear()} Footway India. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png"
              alt="Visa" className="h-5 opacity-60" />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/800px-Mastercard-logo.svg.png"
              alt="Mastercard" className="h-5 opacity-60" />
            <span className="text-brand-text-muted text-xs bg-brand-elevated px-2 py-1 rounded">
              UPI
            </span>
            <span className="text-brand-text-muted text-xs bg-brand-elevated px-2 py-1 rounded">
              Razorpay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

**Step 3: Commit**
```bash
git add components/layout/footer.tsx
git commit -m "feat: implement premium dark footer with trust badges and social links"
```

---

## Phase 3: Homepage

### Task 7: Hero Section

**Files:**
- Create: `components/home/hero-section.tsx`
- Modify: `app/page.tsx`

**Step 1: Create hero section**

Create `components/home/hero-section.tsx`:
```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-brand-bg">

      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&q=80"
          alt="Premium footwear hero"
          className="w-full h-full object-cover object-center opacity-40"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-brand-gold text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4"
          >
            New Season 2026
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-brand-text leading-tight mb-6"
          >
            Step Into
            <span className="block text-brand-gold italic">Excellence</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-brand-text-secondary text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
          >
            Premium footwear for those who refuse to settle. Crafted for comfort,
            designed for impact. Free shipping on orders above ₹999.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/collections/mens"
              className="group inline-flex items-center gap-2 bg-brand-gold text-brand-bg px-7 py-3.5 text-sm font-semibold tracking-wide uppercase hover:bg-brand-gold-light transition-all duration-200 animate-pulse-gold"
            >
              Shop Men's
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/collections/womens"
              className="inline-flex items-center gap-2 border border-brand-border text-brand-text px-7 py-3.5 text-sm font-semibold tracking-wide uppercase hover:border-brand-gold hover:text-brand-gold transition-all duration-200"
            >
              Shop Women's
            </Link>
          </motion.div>

          {/* Micro social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center gap-3 mt-10"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-brand-elevated border-2 border-brand-bg flex items-center justify-center text-xs"
                >
                  {['😊', '😍', '🔥', '⭐'][i - 1]}
                </div>
              ))}
            </div>
            <div>
              <p className="text-brand-text text-sm font-semibold">★★★★★ 4.8/5</p>
              <p className="text-brand-text-muted text-xs">Trusted by 2,000+ customers</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-text-muted text-xs tracking-widest uppercase flex flex-col items-center gap-2"
      >
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-brand-text-muted to-transparent" />
      </motion.div>
    </section>
  );
}
```

**Step 2: Update app/page.tsx to include HeroSection**
Open `app/page.tsx`. Import and add `<HeroSection />` as the first section. Remove or keep the template's default content below it.

**Step 3: Verify hero renders**
Go to http://localhost:3000
Expected: Full-screen dark hero with gold headline "Step Into Excellence", sneaker background image at 40% opacity.

**Step 4: Commit**
```bash
git add components/home/hero-section.tsx app/page.tsx
git commit -m "feat: implement animated premium hero section with gold CTA"
```

---

### Task 8: Featured Collections Section

**Files:**
- Create: `components/home/featured-collections.tsx`
- Modify: `app/page.tsx`

**Step 1: Create featured collections**

Create `components/home/featured-collections.tsx`:
```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    href:    '/collections/mens',
    label:   "Men's Footwear",
    desc:    'From performance runners to everyday classics',
    img:     'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    badge:   'Bestsellers',
  },
  {
    href:    '/collections/womens',
    label:   "Women's Footwear",
    desc:    'Effortless style meets all-day comfort',
    img:     'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    badge:   'New Arrivals',
  },
  {
    href:    '/collections/kids',
    label:   "Children's Footwear",
    desc:    'Durable, fun, and built for every adventure',
    img:     'https://images.unsplash.com/photo-1570538104286-a2346ce7f13a?w=600&q=80',
    badge:   'Ages 2-12',
  },
];

export function FeaturedCollections() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Section header */}
      <div className="text-center mb-14">
        <p className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">
          Collections
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text">
          Shop by Category
        </h2>
      </div>

      {/* Collection cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLLECTIONS.map((col, i) => (
          <motion.div
            key={col.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <Link href={col.href} className="group block relative overflow-hidden bg-brand-surface border border-brand-border hover:border-brand-gold transition-all duration-300">

              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={col.img}
                  alt={col.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />

                {/* Badge */}
                <span className="absolute top-4 left-4 bg-brand-gold text-brand-bg text-xs font-bold px-3 py-1 uppercase tracking-wide">
                  {col.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-brand-text group-hover:text-brand-gold transition-colors mb-1">
                    {col.label}
                  </h3>
                  <p className="text-brand-text-muted text-sm">{col.desc}</p>
                </div>
                <ArrowRight
                  size={20}
                  className="text-brand-text-muted group-hover:text-brand-gold group-hover:translate-x-1 transition-all flex-shrink-0 ml-4"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Add to app/page.tsx**
Import `FeaturedCollections` and add it after `<HeroSection />`.

**Step 3: Verify**
Go to http://localhost:3000 and scroll down.
Expected: 3 collection cards with dark surfaces, hover effects, gold accents.

**Step 4: Commit**
```bash
git add components/home/featured-collections.tsx app/page.tsx
git commit -m "feat: add animated featured collections grid to homepage"
```

---

### Task 9: Social Proof / Trust Section

**Files:**
- Create: `components/home/social-proof.tsx`
- Modify: `app/page.tsx`

**Step 1: Create social proof section**

Create `components/home/social-proof.tsx`:
```tsx
'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const STATS = [
  { value: '2,000+', label: 'Happy Customers' },
  { value: '4.8★',   label: 'Average Rating' },
  { value: '30-Day', label: 'Return Policy' },
  { value: '100%',   label: 'Secure Checkout' },
];

const REVIEWS = [
  {
    name:   'Rahul M.',
    city:   'Mumbai',
    rating: 5,
    text:   'The Apex Runner Pro is exactly what I was looking for. Premium quality, incredibly comfortable. Fast delivery too!',
  },
  {
    name:   'Priya S.',
    city:   'Bangalore',
    rating: 5,
    text:   'Finally a brand that understands Indian feet. The Luna Comfort Slip is my everyday go-to. Easy returns process as well.',
  },
  {
    name:   'Ankit K.',
    city:   'Delhi',
    rating: 5,
    text:   'Bought the Bounce Jr. for my son. He absolutely loves them! Great quality for the price. Will be ordering again.',
  },
];

export function SocialProof() {
  return (
    <section className="bg-brand-surface border-y border-brand-border py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold mb-2">
                {stat.value}
              </p>
              <p className="text-brand-text-muted text-sm uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reviews header */}
        <div className="text-center mb-10">
          <p className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Customer Reviews
          </p>
          <h2 className="font-serif text-3xl font-bold text-brand-text">
            What Our Customers Say
          </h2>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-brand-elevated border border-brand-border p-6 rounded-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={14} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-brand-text-secondary text-sm leading-relaxed mb-6 italic">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-semibold text-sm">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-brand-text text-sm font-semibold">{review.name}</p>
                  <p className="text-brand-text-muted text-xs">{review.city} • Verified Purchase</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to app/page.tsx**
Add `<SocialProof />` after `<FeaturedCollections />`.

**Step 3: Commit**
```bash
git add components/home/social-proof.tsx app/page.tsx
git commit -m "feat: add social proof section with stats and customer reviews"
```

---

## Phase 4: Product Components & CRO

### Task 10: Product Card Component (CRO-Optimized)

**Files:**
- Modify: `components/product/product-tile.tsx` (or equivalent in template)

**Step 1: Find the product card component**
```bash
find . -name "*.tsx" | xargs grep -l "ProductCard\|product-tile\|ProductTile" 2>/dev/null | head -5
```

**Step 2: Read the existing product card**
Read the file found above.

**Step 3: Enhance with CRO elements**
Replace or wrap the existing product card with this pattern (adapt to match existing props):
```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';

// This wraps whatever the template's product card is.
// Key CRO additions: scarcity badge, star rating, price anchoring, hover quick-add

interface Props {
  product: {
    handle: string;
    title: string;
    featuredImage?: { url: string; altText?: string };
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    compareAtPriceRange?: { minVariantPrice: { amount: string } };
    tags?: string[];
  };
  inventoryCount?: number; // Pass from parent if available
}

export function ProductCard({ product, inventoryCount }: Props) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const comparePrice = product.compareAtPriceRange
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null;
  const isOnSale = comparePrice && comparePrice > price;
  const discount = isOnSale ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
  const isLowStock = inventoryCount !== undefined && inventoryCount <= 5;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={`/products/${product.handle}`} className="block">

        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-brand-surface border border-brand-border group-hover:border-brand-gold transition-colors duration-300">
          {product.featuredImage && (
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isOnSale && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 uppercase">
                -{discount}%
              </span>
            )}
            {isLowStock && (
              <span className="bg-brand-gold text-brand-bg text-xs font-bold px-2 py-0.5 uppercase">
                Only {inventoryCount} left
              </span>
            )}
          </div>

          {/* Quick-add overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-brand-gold text-brand-bg py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-gold-light transition-colors">
              <ShoppingBag size={14} />
              Quick Add
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="pt-4 pb-2">
          {/* Rating (placeholder — connect to Shopify metafields in v2) */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} className="fill-brand-gold text-brand-gold" />
            ))}
            <span className="text-brand-text-muted text-xs ml-1">(4.8)</span>
          </div>

          <h3 className="text-brand-text text-sm font-medium group-hover:text-brand-gold transition-colors mb-1 line-clamp-2">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-brand-gold font-semibold text-sm">
              ₹{price.toLocaleString('en-IN')}
            </span>
            {isOnSale && (
              <span className="text-brand-text-muted text-xs line-through">
                ₹{comparePrice!.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
```

**Step 4: Connect to existing template collection grid**
Update the collection page to use this enhanced `ProductCard`.

**Step 5: Commit**
```bash
git add components/product/
git commit -m "feat: CRO-optimized product card with scarcity, ratings, price anchoring, quick-add"
```

---

### Task 11: Product Detail Page Enhancements

**Files:**
- Modify: `app/products/[handle]/page.tsx`
- Create: `components/product/urgency-badge.tsx`
- Create: `components/product/size-selector.tsx`

**Step 1: Create urgency badge**

Create `components/product/urgency-badge.tsx`:
```tsx
'use client';

import { useEffect, useState } from 'react';
import { Clock, Flame } from 'lucide-react';

interface Props {
  inventoryCount: number;
}

export function UrgencyBadge({ inventoryCount }: Props) {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 15, seconds: 0 });
  const [viewerCount] = useState(() => Math.floor(Math.random() * 8) + 8); // 8-15

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)   return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="space-y-2 my-4">
      {/* Viewer count */}
      <div className="flex items-center gap-2 text-brand-text-secondary text-sm">
        <Flame size={14} className="text-orange-400" />
        <span>
          <strong className="text-brand-text">{viewerCount} people</strong> are viewing this right now
        </span>
      </div>

      {/* Countdown */}
      <div className="flex items-center gap-2 text-brand-text-secondary text-sm">
        <Clock size={14} className="text-brand-gold" />
        <span>
          Order in{' '}
          <strong className="text-brand-gold font-mono">
            {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
          </strong>{' '}
          for same-day dispatch
        </span>
      </div>

      {/* Inventory warning */}
      {inventoryCount <= 10 && (
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-sm">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          <span className="text-red-400 text-xs font-medium">
            Only {inventoryCount} left in stock — order soon!
          </span>
        </div>
      )}
    </div>
  );
}
```

**Step 2: Update product page to use urgency badge**
Open `app/products/[handle]/page.tsx`. Import and add `<UrgencyBadge inventoryCount={availableQuantity} />` below the product title and above the size selector.

**Step 3: Verify PDP looks premium**
Go to http://localhost:3000/products/apex-runner-pro
Expected: Dark background, product images, gold price, urgency countdown, viewer count.

**Step 4: Commit**
```bash
git add components/product/urgency-badge.tsx app/products/
git commit -m "feat: add urgency badge with countdown, viewer count, and inventory warning to PDP"
```

---

### Task 12: Cart Slide-Over Styling

**Files:**
- Modify: `components/cart/modal.tsx` (cart slide-over)
- Modify: `components/cart/cart-item.tsx`

**Step 1: Find cart components**
```bash
find . -name "*.tsx" -path "*/cart/*"
```

**Step 2: Read existing cart modal**
Read the cart modal file.

**Step 3: Update cart modal to Premium Dark styling**
Apply brand colors throughout the cart modal:
- Background: `bg-brand-bg border-l border-brand-border`
- Header: `font-serif text-brand-gold`
- Item borders: `border-brand-border`
- Checkout button: `bg-brand-gold text-brand-bg hover:bg-brand-gold-light`
- Empty state: Text `text-brand-text-muted`, icon `text-brand-gold`
- Cross-sell section title in `text-brand-gold font-serif`

Replace any white/light backgrounds with `brand-bg` and `brand-surface`. Replace any blue buttons with gold.

**Step 4: Commit**
```bash
git add components/cart/
git commit -m "feat: style cart slide-over with premium dark brand theme"
```

---

## Phase 5: Collection & Search Pages

### Task 13: Collection Page Layout

**Files:**
- Modify: `app/collections/[collection]/page.tsx` (or equivalent)

**Step 1: Find collection page**
```bash
find . -name "page.tsx" | xargs grep -l "collection\|Collection" 2>/dev/null | head -5
```

**Step 2: Update collection page heading style**
Add a collection hero header at the top of each collection page:
```tsx
{/* Collection header */}
<div className="bg-brand-surface border-b border-brand-border py-12 px-4 text-center mb-8">
  <p className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase mb-2">
    Collection
  </p>
  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text capitalize">
    {collection.title}
  </h1>
  {collection.description && (
    <p className="text-brand-text-muted text-sm mt-3 max-w-lg mx-auto">
      {collection.description}
    </p>
  )}
</div>
```

**Step 3: Style the filter/sort bar dark**
Find any filter or sort dropdowns. Set their background to `bg-brand-surface border-brand-border text-brand-text`.

**Step 4: Commit**
```bash
git add app/collections/
git commit -m "feat: premium dark collection page header with gold accent"
```

---

## Phase 6: Analytics & Meta Pixel

### Task 14: Meta Pixel & Google Tag Manager Setup

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Add GTM snippet to layout.tsx**
Add to `app/layout.tsx` `<head>`:
```tsx
{/* Google Tag Manager — replace GTM-XXXXXX with your GTM ID */}
{process.env.NEXT_PUBLIC_GTM_ID && (
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
    }}
  />
)}
```

Add to `.env.local`:
```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX
```

**Step 2: Add Vercel Analytics**
```bash
npm install @vercel/analytics @vercel/speed-insights
```

In `app/layout.tsx`, add:
```tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Inside <body>:
<Analytics />
<SpeedInsights />
```

**Step 3: Commit**
```bash
git add app/layout.tsx && git commit -m "feat: add GTM, Vercel Analytics, and Speed Insights"
```

---

## Phase 7: Testing & QA

### Task 15: Set Up Playwright E2E Tests

**Files:**
- Create: `e2e/homepage.spec.ts`
- Create: `e2e/product.spec.ts`
- Create: `e2e/cart.spec.ts`

**Step 1: Install Playwright**
```bash
npm init playwright@latest -- --quiet
```
Choose: TypeScript, `e2e/` folder, no GitHub Actions yet.

**Step 2: Write homepage test**

Create `e2e/homepage.spec.ts`:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders hero section with CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Excellence/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Shop Men/i })).toBeVisible();
  });

  test('shows 3 collection cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText("Men's Footwear")).toBeVisible();
    await expect(page.getByText("Women's Footwear")).toBeVisible();
    await expect(page.getByText("Children's Footwear")).toBeVisible();
  });

  test('announcement bar is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Free Shipping/i)).toBeVisible();
  });
});
```

**Step 3: Write product browsing test**

Create `e2e/product.spec.ts`:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Product browsing', () => {
  test('mens collection loads products', async ({ page }) => {
    await page.goto('/collections/mens');
    await expect(page.getByText('Apex Runner Pro')).toBeVisible();
  });

  test('womens collection loads products', async ({ page }) => {
    await page.goto('/collections/womens');
    await expect(page.getByText('Luna Comfort Slip')).toBeVisible();
  });

  test('kids collection loads products', async ({ page }) => {
    await page.goto('/collections/kids');
    await expect(page.getByText('Bounce Jr.')).toBeVisible();
  });

  test('PDP loads with price and add to cart', async ({ page }) => {
    await page.goto('/products/apex-runner-pro');
    await expect(page.getByText('₹4,999')).toBeVisible();
    await expect(page.getByRole('button', { name: /Add to Cart/i })).toBeVisible();
  });
});
```

**Step 4: Write cart test**

Create `e2e/cart.spec.ts`:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  test('can add product to cart', async ({ page }) => {
    await page.goto('/products/apex-runner-pro');

    // Select a size variant first (if required)
    const sizeBtn = page.getByRole('radio', { name: /UK 8/i });
    if (await sizeBtn.isVisible()) await sizeBtn.click();

    // Click add to cart
    await page.getByRole('button', { name: /Add to Cart/i }).click();

    // Cart count should increment
    await expect(page.getByLabel(/cart/i)).toContainText('1');
  });

  test('cart persists on navigation', async ({ page }) => {
    // Add to cart
    await page.goto('/products/bounce-jr');
    const sizeBtn = page.getByRole('radio').first();
    if (await sizeBtn.isVisible()) await sizeBtn.click();
    await page.getByRole('button', { name: /Add to Cart/i }).click();

    // Navigate away and back
    await page.goto('/');
    await page.goto('/cart');
    await expect(page.getByText('Bounce Jr.')).toBeVisible();
  });
});
```

**Step 5: Run tests**
Make sure dev server is running (`npm run dev`), then:
```bash
npx playwright test --project=chromium
```
Expected: All tests pass. Fix any failures before proceeding.

**Step 6: Commit**
```bash
git add e2e/ playwright.config.ts
git commit -m "test: add Playwright E2E tests for homepage, products, and cart"
```

---

### Task 16: Lighthouse Performance Audit

**Step 1: Build for production**
```bash
npm run build && npm start
```

**Step 2: Run Lighthouse via Chrome DevTools**
Open http://localhost:3000 in Chrome. DevTools → Lighthouse → Mobile → Generate report.

**Target scores:**
- Performance: ≥ 90
- Accessibility: ≥ 85
- Best Practices: ≥ 90
- SEO: ≥ 90

**Step 3: Fix common issues**
- If LCP score is low: ensure hero image has `loading="eager"` or is above-the-fold
- If CLS: ensure image dimensions are explicit
- If TBT: check for large JS bundles (`npm run build` output shows chunk sizes)

**Step 4: Verify Next.js Image optimization is active**
Any `<img>` tags in critical above-fold content should be replaced with Next.js `<Image>` component for automatic optimization.

**Step 5: Commit final fixes**
```bash
git add . && git commit -m "perf: optimize images and bundle for Lighthouse ≥90"
```

---

## Phase 8: Deployment

### Task 17: Deploy to Vercel

**Step 1: Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/footway-india.git
git push -u origin main
```

**Step 2: Import to Vercel**
1. Go to vercel.com → New Project → Import Git Repository
2. Select the `footway-india` repo
3. Framework Preset: **Next.js** (auto-detected)
4. Add Environment Variables (copy from `.env.local`):
   - `SHOPIFY_STORE_DOMAIN`
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - `SHOPIFY_REVALIDATION_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (set to your Vercel domain)
5. Click Deploy

**Step 3: Verify production deployment**
Open the Vercel deployment URL.
Expected: Site loads with dark theme, products visible, cart works.

**Step 4: Set up custom domain (optional)**
In Vercel project settings → Domains → Add `footwayindia.com`.
Follow DNS instructions (add Vercel nameservers or CNAME).

**Step 5: Final production E2E test**
Run Playwright against the production URL:
```bash
PLAYWRIGHT_BASE_URL=https://your-vercel-url.vercel.app npx playwright test
```

**Step 6: Commit final state**
```bash
git add . && git commit -m "chore: production deployment configuration complete"
```

---

## Implementation Complete ✓

**Verification checklist:**
- [ ] Homepage loads with dark theme, hero, collections, social proof
- [ ] Men's, Women's, Kids collections show their respective products
- [ ] Each PDP shows price (₹), urgency badge, viewer count, add-to-cart
- [ ] Cart persists across page navigations
- [ ] Razorpay appears on Shopify checkout (configure in Shopify Admin → Payments)
- [ ] All Playwright E2E tests pass
- [ ] Lighthouse Performance ≥ 90 on mobile
- [ ] Site is live on Vercel with custom domain

---

## Notes & Known Limitations (v1)

- Product ratings are placeholder (5★ hardcoded). Connect to Shopify product metafields or Judge.me app in v2.
- "12 people viewing" is a random range (8-15). In v2, connect to real-time via Shopify pixel events.
- Razorpay requires manual activation in Shopify Admin → Settings → Payments → Alternative payment methods.
- Invoice generation: Shopify automatically sends order confirmation emails. For custom PDF invoices, add the "Order Printer" Shopify app (free).
