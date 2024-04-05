'use client';
import { TypographyLarge } from '@/components/common/Typography';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function UserPortfolioNavbar({
  name,
  logo,
  siteid,
}: {
  name: string;
  logo: string;
  siteid: string;
}) {
  useEffect(() => {
    const track = async () => {
      try {
        const res = await fetch('/api/track', {
          method: 'POST',
          body: JSON.stringify({
            namespace: 'sites',
            event: {
              path: window.location.pathname,
              event: {
                siteId: siteid,
                width: window.innerWidth,
                height: window.innerHeight,
              },
            },
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    track();
  }, [siteid]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = [
    { name: 'About', href: '#About' },
    { name: 'Skills', href: '#Skills' },
    { name: 'Education', href: '#Education' },
    { name: 'Experience', href: '#Experience' },
    { name: 'Project', href: '#Projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#Contact' },
  ];
  return (
    <div className="sticky inset-x-0 top-0 z-50 border-b-2 shadow-2xl bg-opacity-95 bg-black">
      <nav
        className="container flex items-center justify-between  lg:justify-start p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-row lg:flex-1 ">
          <Link href="#Home" passHref legacyBehavior>
            <div className="-m-1.5 p-1.5 flex  justify-start items-center sm:gap-5 gap-2">
              <span className="sr-only"> {name} | Dev Resume</span>
              {logo && (
                <Image
                  src={logo}
                  alt={name}
                  width={150}
                  height={150}
                  className="w-12 h-12 rounded-full hidden sm:flex"
                />
              )}
              <TypographyLarge className="font-title text-xl">
                {name}
              </TypographyLarge>
            </div>
          </Link>
        </div>
        {/* the menu to open side bar in mobile */}
        <div className="flex lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger>
              <div
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="w-10 h-10 text-primary " aria-hidden="true" />
              </div>
            </SheetTrigger>
            <SheetContent side={'right'}>
              <div className="py-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                    }}
                  >
                    <span className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-gray-50 hover:text-gray-900">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              passHref
              className="text-sm font-semibold leading-6 text-gray-200 hover:underline underline-offset-2 decoration-wavy decoration-green-400 "
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default UserPortfolioNavbar;
