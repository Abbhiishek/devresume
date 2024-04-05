import prisma from '@/lib/db';
import { IncomingHttpHeaders } from 'http';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook, WebhookRequiredHeaders } from 'svix';

const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_KEY || '';

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature'),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const {
      id,
      username,
      email_addresses,
      first_name,
      last_name,
      profile_image_url,
      ...attributes
    } = evt.data;

    await prisma.user.upsert({
      where: { id: id as string },
      create: {
        id: id as string,
        username: username as string,
        email: email_addresses[0].email_address as string,
        firstname: (first_name as string) || '',
        lastname: (last_name as string) || '',
        avatar: profile_image_url,
        attributes: attributes,
      },
      update: {
        username: username as string,
        email: email_addresses[0].email_address as string,
        firstname: (first_name as string) || '',
        lastname: (last_name as string) || '',
        attributes: attributes,
      },
    });
  }

  return NextResponse.json(
    {
      message: 'ok',
    },
    { status: 200 }
  );
}

type EventType = 'user.created' | 'user.updated' | '*';

type Event = {
  data: Record<string, string | number | Date | any>;
  object: 'event';
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
