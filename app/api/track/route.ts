import prisma from '@/lib/db';
import { NextRequest } from 'next/server';
import UAParser from 'ua-parser-js';

async function handler(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') ?? '';
  const uaParser = new UAParser();
  uaParser.setUA(userAgent);
  const os = uaParser.getOS().name;
  const v = uaParser.getEngine().name;
  const browser = uaParser.getBrowser().name;
  const ip = request.ip || request.headers.get('X-Forwarded-For');
  const ipinfo = await fetch(`https://ipinfo.io/${ip}/json`).then((res) =>
    res.json()
  );

  if (request.method === 'GET') {
    try {
      return Response.json({
        status: 'ok! lookup created',
        ip: ip,
        ipinfo: ipinfo,
        os: os,
        browser: browser,
        v: {
          type: v,
          viewport: {
            messae: 'hjdklqehlk',
          },
        },
      });
    } catch (err) {
      console.error({ error: err });
      return Response.json({ error: err });
    }
  } else if (request.method === 'POST') {
    const payload = await request.json();
    const { namespace, event } = payload;

    const pcThreshold = 1024;
    const tabletThreshold = 768;

    let device;

    if (event.event.width < tabletThreshold) {
      device = 'mobile';
    } else if (event.event.width < pcThreshold) {
      device = 'tablet';
    } else {
      device = 'pc';
    }

    try {
      const response = await prisma.analytics.create({
        data: {
          type: namespace,
          os: os,
          browser: browser,
          device,
          location: `${ipinfo.city}, ${ipinfo.region}, ${ipinfo.country}`,
          path: event.path,
          siteId: event.event.siteId || null,
          blogId: event.event.blogId || null,
        },
      });

      if (event.event.siteId) {
        await prisma.site.update({
          where: {
            id: event.event.siteId,
          },
          data: {
            totalviews: {
              increment: 1,
            },
          },
        });
      }

      if (event.event.blogId) {
        await prisma.blog.update({
          where: {
            id: event.event.blogId,
          },
          data: {
            totalviews: {
              increment: 1,
            },
          },
        });
      }

      return Response.json({ status: 'tracked ' });
    } catch (error) {
      console.error({ error: error });
      return Response.json({ error: error });
    }
  } else {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }
}

export const GET = handler;
export const POST = handler;
