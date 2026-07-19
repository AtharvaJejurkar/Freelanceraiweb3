import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, users } from '@/lib/db/schema';
import { eq, ne } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const freelancerId = searchParams.get('freelancer_id');

  if (!freelancerId) {
    return NextResponse.json({ error: 'freelancer_id is required' }, { status: 400 });
  }

  try {
    // Drizzle innerJoin to get company details, analogous to Supabase 'users!projects_company_id_fkey'
    const result = await db.select({
      id: projects.id,
      title: projects.title,
      total_value: projects.total_value,
      status: projects.status,
      escrow_pda: projects.escrow_pda,
      company: {
        display_name: users.display_name
      }
    })
    .from(projects)
    .leftJoin(users, eq(projects.company_id, users.id))
    .where(eq(projects.freelancer_id, freelancerId as string))
    // We only want active ones for the dashboard (neq status 'completed')
    // Not directly supported with a simple where chaining easily without and/or, but we can do:
    // Actually, eq works for status too. Let's just fetch all for this user and filter for now, or use `ne(projects.status, 'completed')`.
    ;

    const filtered = result.filter(p => p.status !== 'completed');

    return NextResponse.json(filtered);
  } catch (error: any) {
    console.error("Database error in GET /api/projects:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
