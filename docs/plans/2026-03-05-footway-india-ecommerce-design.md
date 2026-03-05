# Footway India — E-Commerce Platform Design

**Date:** 2026-03-05
**Status:** Approved
**Brand:** Footway India (Premium Footwear)
**Market:** India (primary), Global (future)

---

## 1. Project Overview

A world-class headless e-commerce storefront for Footway India — a premium footwear brand. Primary traffic from Google Ads and Meta Ads. Must support 1,000+ concurrent users with minimal latency. Rivals Nike, Adidas, Myntra in UX/UI quality.

---

## 2. Tech Stack (Final)

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | ISR, SSR, Edge-ready, Vercel-native |
| Styling | Tailwind CSS v3 + CSS Variables | Rapid UI, dark theme tokens |
| Commerce Backend | Shopify (Basic $29/mo) | Managed inventory, orders, auth |
| Commerce API | Shopify Storefront GraphQL API | Headless, performant |
| Cart State | Shopify Cart API + Zustand (UI) | Persistent cross-session cart |
| Animations | Framer Motion | Premium feel |
| Icons | Lucide React | Lightweight, consistent |
| Fonts | Inter + Playfair Display | Body/heading premium pair |
| Images | Next.js Image + Shopify CDN | Automatic optimization |
| Payment | Razorpay (via Shopify gateway) | UPI, cards, EMI, wallets |
| Deployment | Vercel Pro ($20/mo) | Edge CDN, auto-scale |
| Analytics | Vercel Analytics + Meta Pixel + GTM | Full paid ad tracking |

---

## 3. Architecture

```
User Browser
    └─> Vercel Edge CDN (ISR cache, 30+ PoPs)
            └─> Next.js 14 App Router (Vercel)
                    ├─> Shopify Storefront API (products, cart, checkout)
                    ├─> Shopify Admin API (order webhooks)
                    └─> Razorpay (payment, via Shopify gateway)
```

**Rendering Strategy:**
- Homepage, Collection pages, Product pages: **ISR** (revalidate: 3600) → cached at CDN edge
- Cart, Account, Orders: **SSR** (dynamic, user-specific)
- Checkout: **Shopify-hosted** (PCI compliant, no custom code needed)

---

## 4. Brand Identity

| Token | Value |
|---|---|
| Primary Background | `#0A0A0A` (near-black) |
| Secondary Background | `#1A1A1A` |
| Accent / CTA | `#C9A84C` (gold) |
| Primary Text | `#FFFFFF` |
| Secondary Text | `#E5E5E5` |
| Muted Text | `#9CA3AF` |
| Border | `#2A2A2A` |
| Error | `#EF4444` |
| Success | `#22C55E` |

**Fonts:**
- Headings: `Playfair Display` (serif, premium)
- Body/UI: `Inter` (sans-serif, clean)

---

## 5. Site Map

```
footwayindia.com/
├── /                          Homepage
├── /collections/mens          Men's Footwear
├── /collections/womens        Women's Footwear
├── /collections/kids          Children's Footwear
├── /products/[slug]           Product Detail Page (PDP)
├── /search                    Search with filters
├── /cart                      Cart page
├── /account/login             Login
├── /account/register          Register
├── /account/orders            Order history
├── /pages/about               About
├── /pages/contact             Contact
├── /pages/size-guide          Size guide
└── /pages/returns             Returns policy
```

---

## 6. CRO Psychology Strategy

Built on analysis of Nike, Adidas, Myntra, Ajio, Amazon, Flipkart top patterns:

| Trigger | Implementation |
|---|---|
| Scarcity | "Only 3 left in your size" (live Shopify inventory) |
| Social Proof | Star ratings + review count on all product cards and PDPs |
| Urgency | "Order in 2h 15m for same-day dispatch" countdown timer |
| Trust Signals | Free returns, secure checkout, Google rating badges in header |
| FOMO | "12 people viewing this right now" on PDP |
| Price Anchoring | MRP crossed out, sale price bold/gold |
| Easy Returns | "30-Day Easy Returns" in persistent announcement bar |
| Size Confidence | Size guide modal + "True to size" indicator |
| Above-the-fold CTA | Add to Cart sticky on mobile, prominent on desktop |
| One-click Guest Checkout | Shopify accelerated checkout |

### Ad Traffic Funnel

```
Ad Click (Google/Meta)
  → Collection or Landing Page
    → PDP (hero image + size selector + sticky CTA)
      → Cart Slide-Over (cross-sell shown)
        → Shopify Checkout (Razorpay)
          → Order Confirmation + Email
            → Tracking Page
```

---

## 7. Key Components

### Layout
- `AnnouncementBar.tsx` — "Free shipping on ₹999+" / rotating offers
- `Navbar.tsx` — Sticky dark nav, logo, search icon, cart icon with count
- `Footer.tsx` — Links, social, trust badges

### Homepage Sections
- `HeroSection.tsx` — Full-screen video or image hero with CTA
- `FeaturedCollections.tsx` — 3 category cards (Men/Women/Kids)
- `SocialProof.tsx` — Reviews, star rating, brand stats
- `BestSellers.tsx` — Product carousel
- `Newsletter.tsx` — Email capture with discount incentive

### Product Components
- `ProductCard.tsx` — Grid card with hover zoom, quick add
- `ProductGallery.tsx` — Image zoom, thumbnail strip
- `SizeSelector.tsx` — Size grid, "Out of Stock" grayed
- `AddToCartBtn.tsx` — Sticky mobile CTA
- `UrgencyBadge.tsx` — Inventory warning + countdown

### Cart
- `CartSlideOver.tsx` — Animated right-side drawer
- `CartItem.tsx` — Item with quantity controls
- `CartUpsell.tsx` — "Customers also bought"

---

## 8. Placeholder Products (Seeded in Shopify Admin)

| Handle | Name | Collection | Price |
|---|---|---|---|
| `apex-runner-pro` | Apex Runner Pro | mens | ₹4,999 |
| `luna-comfort-slip` | Luna Comfort Slip | womens | ₹3,499 |
| `bounce-jr` | Bounce Jr. | kids | ₹1,999 |

Each product will have:
- Premium lifestyle photography (Unsplash/Pexels placeholders)
- Size options (UK 6–12 for adults, UK 1–5 for kids)
- Color variants (1–2 colors)
- Description with CRO-optimized copy

---

## 9. Monthly Running Costs

| Service | Cost |
|---|---|
| Shopify Basic | $29/mo (~₹2,407) |
| Vercel Pro | $20/mo (~₹1,660) |
| Domain | ~$1/mo (~₹83) |
| Cloudflare (CDN/DNS) | Free |
| Shopify Email | Free (10k/mo) |
| **Fixed Total** | **~$50/mo (~₹4,150)** |
| Razorpay | 2% of GMV (variable) |

---

## 10. Load Handling Strategy (1,000+ Concurrent Users)

- **ISR pages** served from Vercel Edge CDN — zero server load for product/collection browsing
- **Shopify** infrastructure handles cart/checkout scaling automatically
- **Vercel Pro** handles ~1M req/month with no cold starts
- **No custom database** to scale — Shopify manages all commerce data
- Result: 1,000 concurrent users costs the same as 10 concurrent users

---

## 11. Out of Scope (v1)

- Loyalty/rewards program
- Live chat
- AR try-on
- Multi-currency
- Multi-language
- B2B wholesale portal

---

## 12. Success Criteria

- Lighthouse Performance score ≥ 90 on mobile
- First Contentful Paint < 1.5s on 4G
- Zero checkout errors end-to-end
- Cart persistence across sessions
- All 3 product categories browsable and purchasable
- Razorpay test payment flow working
