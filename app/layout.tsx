import { Toaster } from '@/components/ui/sonner';
import { APP_DESC, APP_NAME } from '@/lib/contants';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font/sans';
import { Metadata } from 'next';
import '.././styles/globals.css';
import { Providers } from './NextUIProvider';

const image = 'https://app.dresume.me/placeholder.png';
export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESC,
  icons: ['https://app.dresume.me/favicon.ico'],
  openGraph: {
    title: APP_NAME,
    description: APP_DESC,
    images: [image],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESC,
    images: [image],
    creator: '@abhishekkushwaha',
  },
  metadataBase: new URL('https://app.dresume.me'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://analytics.us.umami.is/script.js"
          data-website-id="629a831c-6680-4cf7-9962-90c8b14b28dc"
         />
      </head>
      <body className={GeistSans.className}>
        {/* <NextTopLoader /> */}
        <Providers>
          {children}
          <SpeedInsights />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
