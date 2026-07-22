import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { escrowTransactions } from '@/lib/db/schema';
import { eq, or, desc } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const toWallet = searchParams.get('to_wallet');
  const fromWallet = searchParams.get('from_wallet');

  if (!toWallet && !fromWallet) {
    return NextResponse.json({ error: 'to_wallet or from_wallet is required' }, { status: 400 });
  }

  try {
    const conditions = [];
    if (toWallet) conditions.push(eq(escrowTransactions.to_wallet, toWallet));
    if (fromWallet) conditions.push(eq(escrowTransactions.from_wallet, fromWallet));

    const result = await db.select()
      .from(escrowTransactions)
      .where(or(...conditions))
      .orderBy(desc(escrowTransactions.created_at))
      .limit(5);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Database error in GET /api/transactions:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
