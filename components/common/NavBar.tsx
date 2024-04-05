'use client';

import { APP_DASHBOARD_LINK, APP_NAME } from '@/lib/contants';
import { UserButton } from '@clerk/nextjs';
import { Dialog } from '@headlessui/react';
import { X as CrossIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { ThemeModeToggle } from './ThemeToggler';
import { TypographyLarge } from './Typography';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navigation = [{ name: 'Dashboard', href: '/dashboard' }];

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="sticky inset-x-0 top-0 z-50 border-b-2 shadow-2xl bg-background ">
      <nav
        className="container flex items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" passHref legacyBehavior>
            <a className="-m-1.5 p-1.5">
              <span className="sr-only">{APP_NAME}</span>
              <div className="flex justify-center items-center gap-2">
                <TypographyLarge>{APP_NAME}</TypographyLarge>
              </div>
            </a>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <MenuIcon className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={'left'}>
              <SheetHeader>
                <SheetTitle>
                  <TypographyLarge>{APP_NAME}</TypographyLarge>
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-full px-1">
                <div className="py-6 space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      legacyBehavior
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7  rounded-lg "
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-4">
                    <ThemeModeToggle />
                    <UserButton />
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">{/* <NavBarMenu /> */}</div>

        <div className="items-center hidden gap-5 mr-3 lg:flex lg:flex-1 lg:justify-end">
          <Link
            href={APP_DASHBOARD_LINK}
            legacyBehavior
            className="w-6 h-6 rounded-3xl"
          >
            <Button variant="outline" className="rounded-3xl">
              Dashboard
            </Button>
          </Link>
          <ThemeModeToggle />
          <UserButton />
        </div>
      </nav>
      <Dialog
        as="div"
        className=" lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 " />
        <Dialog.Panel className="fixed  inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white dark:bg-background sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-end ">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <CrossIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    legacyBehavior
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7  rounded-lg "
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <ThemeModeToggle />
            <UserButton />
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}

export default NavBar;
