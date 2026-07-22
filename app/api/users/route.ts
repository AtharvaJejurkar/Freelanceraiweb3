import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('wallet_address');

  if (!walletAddress) {
    return NextResponse.json({ error: 'wallet_address is required' }, { status: 400 });
  }

  try {
    const result = await db.select().from(users).where(eq(users.wallet_address, walletAddress)).limit(1);
    if (result.length > 0) {
      return NextResponse.json(result[0]);
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error: any) {
    console.error("Database error in GET /api/users:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { wallet_address, role, display_name, reputation_score } = body;

    if (!wallet_address || !role) {
      return NextResponse.json({ error: 'wallet_address and role are required' }, { status: 400 });
    }

    const newUser = await db.insert(users).values({
      wallet_address,
      role,
      display_name: display_name || `User_${wallet_address.substring(0, 4)}`,
      reputation_score: reputation_score || 100,
    }).returning();

    return NextResponse.json(newUser[0]);
  } catch (error: any) {
    console.error("Database error in POST /api/users:", error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { wallet_address, domain, experience, bio, is_onboarded, display_name } = body;

    if (!wallet_address) {
      return NextResponse.json({ error: 'wallet_address is required for updating' }, { status: 400 });
    }

    const updatedUser = await db.update(users)
      .set({
        ...(display_name && { display_name }),
        domain,
        experience,
        bio,
        is_onboarded: is_onboarded !== undefined ? is_onboarded : true,
      })
      .where(eq(users.wallet_address, wallet_address))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser[0]);
  } catch (error: any) {
    console.error("Database error in PUT /api/users:", error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
