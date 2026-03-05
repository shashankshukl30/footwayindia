import { NextRequest, NextResponse } from 'next/server';
import { createCart, getCart, addToCart, updateCartLine, removeFromCart } from '@/lib/shopify';

export async function GET(request: NextRequest) {
  const cartId = request.nextUrl.searchParams.get('cartId');
  if (!cartId) return NextResponse.json({ error: 'cartId required' }, { status: 400 });

  const cart = await getCart(cartId);
  return NextResponse.json({ cart });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, cartId, lines, lineId, quantity } = body;

  try {
    let cart;
    switch (action) {
      case 'create':
        cart = await createCart(lines);
        break;
      case 'add':
        cart = await addToCart(cartId, lines);
        break;
      case 'update':
        cart = await updateCartLine(cartId, lineId, quantity);
        break;
      case 'remove':
        cart = await removeFromCart(cartId, body.lineIds);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Cart API error:', error);
    return NextResponse.json({ error: 'Cart operation failed' }, { status: 500 });
  }
}
