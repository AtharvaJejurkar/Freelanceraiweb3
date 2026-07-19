import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { escrowTransactions } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const toWallet = searchParams.get('to_wallet');

  if (!toWallet) {
    return NextResponse.json({ error: 'to_wallet is required' }, { status: 400 });
  }

  try {
    const result = await db.select()
      .from(escrowTransactions)
      .where(eq(escrowTransactions.to_wallet, toWallet))
      .orderBy(desc(escrowTransactions.created_at))
      .limit(5);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Database error in GET /api/transactions:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
