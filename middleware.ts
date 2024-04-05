import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
export default authMiddleware({
  async afterAuth(auth, req, evt) {
    const url = req.nextUrl;
    // console.log(url)

    let hostname = req.headers
      .get('host')!
      .replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
    if (
      hostname.includes('---') &&
      hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
    ) {
      hostname = `${hostname.split('---')[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

      // console.log("host name 12111", hostname)
    }

    const searchParams = req.nextUrl.searchParams.toString();

    // console.log("search params", searchParams)
    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;
    // console.log("path", path)
    // rewrite root application to `/home` folder when user goes to /

    if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
      if (!auth.userId && !auth.isPublicRoute) {
        return redirectToSignIn({ returnBackUrl: req.url });
      }

      return NextResponse.rewrite(
        new URL(`/app${path === '/' ? '' : path}`, req.url)
      );
    }

    if (hostname === 'dresume.me') {
      return NextResponse.redirect('https://app.dresume.me');
    }
    if (
      hostname === 'localhost:3000' ||
      hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
    ) {
      // console.log("rewriting /home")
      return NextResponse.rewrite(
        new URL(`/home${path === '/' ? '' : path}`, req.url)
      );
    }

    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
  },

  publicRoutes: ['/', '/api/webhook/user'],
});

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
};
