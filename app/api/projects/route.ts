import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, users } from '@/lib/db/schema';
import { eq, or, and } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const freelancerId = searchParams.get('freelancer_id');
  const companyId = searchParams.get('company_id');
  const status = searchParams.get('status');

  try {
    const result = await db.select({
      id: projects.id,
      title: projects.title,
      description: projects.description,
      total_value: projects.total_value,
      status: projects.status,
      escrow_pda: projects.escrow_pda,
      company_id: projects.company_id,
      freelancer_id: projects.freelancer_id,
      users: {
        display_name: users.display_name
      }
    })
    .from(projects)
    .leftJoin(users, or(
      and(eq(projects.company_id, users.id), freelancerId ? eq(projects.freelancer_id, freelancerId) : undefined),
      and(eq(projects.freelancer_id, users.id), companyId ? eq(projects.company_id, companyId) : undefined)
    ));

    let filtered = result;

    if (freelancerId) {
      filtered = filtered.filter(p => p.freelancer_id === freelancerId);
    }
    if (companyId) {
      filtered = filtered.filter(p => p.company_id === companyId);
    }
    if (status) {
      filtered = filtered.filter(p => p.status === status);
    } else if (freelancerId || companyId) {
      filtered = filtered.filter(p => p.status !== 'completed');
    }

    return NextResponse.json(filtered);
  } catch (error: any) {
    console.error("Database error in GET /api/projects:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
