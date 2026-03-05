import { NextRequest, NextResponse } from 'next/server';
import { createCart, getCart, addToCart, updateCartLine, removeFromCart } from '@/lib/shopify';

export async function GET(request: NextRequest) {
  const cartId = request.nextUrl.searchParams.get('cartId');
  if (!cartId) {
    return NextResponse.json({ error: 'cartId required' }, { status: 400 });
  }
  try {
    const cart = await getCart(cartId);
    return NextResponse.json({ cart });
  } catch (error) {
    console.error('GET /api/cart error:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { action, cartId, lines, lineId, quantity, lineIds } = body as {
    action?: string;
    cartId?: string;
    lines?: { merchandiseId: string; quantity: number }[];
    lineId?: string;
    quantity?: number;
    lineIds?: string[];
  };

  // Input validation
  if (!action || typeof action !== 'string') {
    return NextResponse.json({ error: 'action is required' }, { status: 400 });
  }

  if (action !== 'create' && !cartId) {
    return NextResponse.json({ error: 'cartId is required for this action' }, { status: 400 });
  }

  if (action === 'update') {
    if (!lineId || typeof lineId !== 'string') {
      return NextResponse.json({ error: 'lineId is required for update' }, { status: 400 });
    }
    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 0) {
      return NextResponse.json({ error: 'quantity must be a non-negative integer' }, { status: 400 });
    }
  }

  if (action === 'remove') {
    if (!Array.isArray(lineIds) || lineIds.length === 0) {
      return NextResponse.json({ error: 'lineIds must be a non-empty array' }, { status: 400 });
    }
  }

  if ((action === 'create' || action === 'add') && (!Array.isArray(lines) || lines.length === 0)) {
    return NextResponse.json({ error: 'lines must be a non-empty array' }, { status: 400 });
  }

  try {
    let cart;
    switch (action) {
      case 'create':
        cart = await createCart(lines);
        break;
      case 'add':
        cart = await addToCart(cartId!, lines!);
        break;
      case 'update':
        cart = await updateCartLine(cartId!, lineId!, quantity!);
        break;
      case 'remove':
        cart = await removeFromCart(cartId!, lineIds!);
        break;
      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
    return NextResponse.json({ cart });
  } catch (error) {
    console.error(`POST /api/cart [${action}] error:`, error);
    const message = error instanceof Error ? error.message : 'Cart operation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
