// SECURITY NOTE: This uses NEXT_PUBLIC_ env vars intentionally for the Storefront API.
// The Storefront API public token is designed to be exposed client-side.
// IMPORTANT: Ensure the token only has the minimum required scopes in Shopify Admin:
// unauthenticated_read_product_listings, unauthenticated_read_product_inventory,
// unauthenticated_write_checkouts, unauthenticated_read_checkouts,
// unauthenticated_write_customers, unauthenticated_read_customer_tags
// Do NOT grant Admin API scopes to this token.
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2024-10',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
});
