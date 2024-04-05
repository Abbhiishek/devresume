import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs';

export const dynamic = 'force-dynamic';
async function handler(request: Request) {
  if (request.method === 'POST') {
    const userID = await auth();
    const { feedback } = await request.json();
    const postfeedback = await prisma.feedback.create({
      data: {
        feedback: feedback,
        feedback_type: 'other' as string,
        user_id: userID.userId!,
      },
    });
    return Response.json({ ok: 'ok' });
  } else {
    return Response.json({
      error: 'Method not allowed',
    });
  }
}

export const GET = handler;
export const POST = handler;
