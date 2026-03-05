import { shopifyClient } from './client';
import { GET_PRODUCT_BY_HANDLE, GET_PRODUCTS, GET_COLLECTION_WITH_PRODUCTS } from './queries/product';
import { CREATE_CART, GET_CART, ADD_TO_CART, UPDATE_CART_LINE, REMOVE_CART_LINE } from './queries/cart';
import type { Product, Collection, Cart } from './types';

// ─── Products ────────────────────────────────────────────────

export async function getProduct(handle: string): Promise<Product | null> {
  const { data, errors } = await shopifyClient.request(GET_PRODUCT_BY_HANDLE, {
    variables: { handle },
  });
  if (errors) console.error('getProduct errors:', errors);
  return data?.product ?? null;
}

export async function getProducts(options?: { query?: string; first?: number }): Promise<Product[]> {
  const { data, errors } = await shopifyClient.request(GET_PRODUCTS, {
    variables: { first: options?.first ?? 20, query: options?.query },
  });
  if (errors) console.error('getProducts errors:', errors);
  return data?.products?.edges?.map((e: { node: Product }) => e.node) ?? [];
}

export async function getCollection(handle: string): Promise<Collection | null> {
  const { data, errors } = await shopifyClient.request(GET_COLLECTION_WITH_PRODUCTS, {
    variables: { handle, first: 24 },
  });
  if (errors) console.error('getCollection errors:', errors);
  return data?.collection ?? null;
}

// ─── Cart ─────────────────────────────────────────────────────

export async function createCart(lines?: { merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const { data, errors } = await shopifyClient.request(CREATE_CART, {
    variables: { lines: lines ?? [] },
  });
  if (errors) throw new Error(`Shopify createCart error: ${JSON.stringify(errors)}`);
  const userErrors = data?.cartCreate?.userErrors;
  if (userErrors?.length) throw new Error(`Cart userErrors: ${userErrors.map((e: { message: string }) => e.message).join(', ')}`);
  const cart = data?.cartCreate?.cart;
  if (!cart) throw new Error('createCart returned null cart');
  return cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const { data, errors } = await shopifyClient.request(GET_CART, {
    variables: { cartId },
  });
  if (errors) console.error('getCart errors:', errors);
  return data?.cart ?? null;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const { data, errors } = await shopifyClient.request(ADD_TO_CART, {
    variables: { cartId, lines },
  });
  if (errors) throw new Error(`Shopify addToCart error: ${JSON.stringify(errors)}`);
  const userErrors = data?.cartLinesAdd?.userErrors;
  if (userErrors?.length) throw new Error(`Cart userErrors: ${userErrors.map((e: { message: string }) => e.message).join(', ')}`);
  const cart = data?.cartLinesAdd?.cart;
  if (!cart) throw new Error('addToCart returned null cart');
  return cart;
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const { data, errors } = await shopifyClient.request(UPDATE_CART_LINE, {
    variables: { cartId, lines: [{ id: lineId, quantity }] },
  });
  if (errors) throw new Error(`Shopify updateCartLine error: ${JSON.stringify(errors)}`);
  const userErrors = data?.cartLinesUpdate?.userErrors;
  if (userErrors?.length) throw new Error(`Cart userErrors: ${userErrors.map((e: { message: string }) => e.message).join(', ')}`);
  const cart = data?.cartLinesUpdate?.cart;
  if (!cart) throw new Error('updateCartLine returned null cart');
  return cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const { data, errors } = await shopifyClient.request(REMOVE_CART_LINE, {
    variables: { cartId, lineIds },
  });
  if (errors) throw new Error(`Shopify removeFromCart error: ${JSON.stringify(errors)}`);
  const userErrors = data?.cartLinesRemove?.userErrors;
  if (userErrors?.length) throw new Error(`Cart userErrors: ${userErrors.map((e: { message: string }) => e.message).join(', ')}`);
  const cart = data?.cartLinesRemove?.cart;
  if (!cart) throw new Error('removeFromCart returned null cart');
  return cart;
}

// ─── Utilities ────────────────────────────────────────────────

export function formatPrice(amount: string | null | undefined, currencyCode: string = 'INR'): string {
  const num = parseFloat(amount ?? '0');
  if (isNaN(num)) return currencyCode === 'INR' ? '₹0' : '0';
  if (currencyCode === 'INR') {
    return `₹${num.toLocaleString('en-IN')}`;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(num);
}
