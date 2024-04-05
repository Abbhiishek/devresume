import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

async function handler(request: Request) {
  const payload = await request.json();

  try {
    const sites = await prisma.site.findMany({
      where: {
        user: {
          id: payload.userId as string,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(
      {
        sites: sites,
        status: 'success',
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export const POST = handler;
