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
  if (errors) console.error('createCart errors:', errors);
  return data!.cartCreate.cart;
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
  if (errors) console.error('addToCart errors:', errors);
  return data!.cartLinesAdd.cart;
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const { data, errors } = await shopifyClient.request(UPDATE_CART_LINE, {
    variables: { cartId, lines: [{ id: lineId, quantity }] },
  });
  if (errors) console.error('updateCartLine errors:', errors);
  return data!.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const { data, errors } = await shopifyClient.request(REMOVE_CART_LINE, {
    variables: { cartId, lineIds },
  });
  if (errors) console.error('removeFromCart errors:', errors);
  return data!.cartLinesRemove.cart;
}

// ─── Utilities ────────────────────────────────────────────────

export function formatPrice(amount: string, currencyCode: string = 'INR'): string {
  const num = parseFloat(amount);
  if (currencyCode === 'INR') {
    return `₹${num.toLocaleString('en-IN')}`;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(num);
}
