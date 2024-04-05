import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs';

export const dynamic = 'force-dynamic';

async function handler(request: Request) {
  if (request.method === 'POST') {
    try {
      const userID = auth();
      if (!userID) return Response.json({ status: 'Not Authorised' });
      const { ...data } = await request.json();
      await prisma.projects.create({
        data: {
          ...data,
          user_id: userID.userId!,
        },
      });
      return Response.json({ status: 'ok! created' });
    } catch (err) {
      console.error({ error: err });
      return Response.json({ error: err });
    }
  } else {
    return Response.json({
      error: 'Method not allowed',
    });
  }
}

export const GET = handler;
export const POST = handler;
