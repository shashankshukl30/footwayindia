import { NextRequest, NextResponse } from 'next/server';
import { createCustomer, loginCustomer, logoutCustomer, getCustomer, recoverCustomer } from '@/lib/shopify';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { action } = body;

  try {
    switch (action) {
      case 'register': {
        const { firstName, lastName, email, password } = body;
        if (!firstName || !lastName || !email || !password) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const result = await createCustomer({ firstName, lastName, email, password });
        if (result.errors.length) {
          return NextResponse.json({ error: result.errors.join('. ') }, { status: 422 });
        }
        // Auto-login after register
        const loginResult = await loginCustomer(email, password);
        if (loginResult.errors.length) {
          return NextResponse.json({ customer: result.customer, accessToken: null });
        }
        return NextResponse.json({ customer: result.customer, accessToken: loginResult.accessToken });
      }

      case 'login': {
        const { email, password } = body;
        if (!email || !password) {
          return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
        }
        const result = await loginCustomer(email, password);
        if (result.errors.length) {
          return NextResponse.json({ error: result.errors.join('. ') }, { status: 401 });
        }
        const customer = result.accessToken ? await getCustomer(result.accessToken) : null;
        return NextResponse.json({ customer, accessToken: result.accessToken });
      }

      case 'logout': {
        const { accessToken } = body;
        if (accessToken) await logoutCustomer(accessToken);
        return NextResponse.json({ success: true });
      }

      case 'get': {
        const { accessToken } = body;
        if (!accessToken) {
          return NextResponse.json({ customer: null });
        }
        const customer = await getCustomer(accessToken);
        return NextResponse.json({ customer });
      }

      case 'recover': {
        const { email } = body;
        if (!email) {
          return NextResponse.json({ error: 'Missing email' }, { status: 400 });
        }
        const result = await recoverCustomer(email);
        if (result.errors.length) {
          return NextResponse.json({ error: result.errors.join('. ') }, { status: 422 });
        }
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (err) {
    console.error('Customer API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
