// Lighthouse CI config for Footway India — D2C footwear ecommerce.
//
// Routes cover the e-commerce conversion path:
//   / → homepage / brand entry
//   /collections → catalog landing
//   /cart → conversion gate
//   /search → search-results page
//
// Perf threshold is 0.80 (relaxed vs hospitality sites at 0.85-0.90).
// E-commerce sites carry heavier JS — cart state, search, product
// hydration — and 0.80 is achievable in production while still flagging
// real regressions. Tighten only if a release lands on Hydrogen-style
// architecture that genuinely runs lighter.

module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm start",
      startServerReadyPattern: "Ready",
      startServerReadyTimeout: 30000,
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/collections",
        "http://localhost:3000/cart",
        "http://localhost:3000/search",
      ],
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        skipAudits: ["uses-http2"],
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
