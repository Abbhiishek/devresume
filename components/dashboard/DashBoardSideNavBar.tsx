'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  ArrowLeft,
  BarChart3,
  Boxes,
  CircleUser,
  Edit3,
  LayoutDashboard,
  MenuIcon,
  Newspaper,
  PartyPopper,
  Rss,
  Settings,
  Settings2,
  SettingsIcon,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';

import { ScrollArea } from '@/components/ui/scroll-area';
import { getSiteFromPostId } from '@/lib/actions';
import { APP_NAME } from '@/lib/contants';
import { useParams, useSelectedLayoutSegments } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { TypographyLarge } from '../common/Typography';

function SideNavBar() {
  return (
    <>
      <div className="flex-col hidden h-screen gap-5 mb-10 lg:flex basis-1/5">
        <NavBarOptions />
      </div>
      <div className="lg:hidden">
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
              <div className="grid gap-4 py-4">
                <NavBarOptions />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

const NavBarOptions = () => {
  const segments = useSelectedLayoutSegments();
  const { blogslug, slug } = useParams() as {
    blogslug?: string;
    slug?: string;
  };
  const [siteId, setSiteId] = useState<string | null>();
  useEffect(() => {
    if (segments[2] === 'blog' && blogslug) {
      getSiteFromPostId(blogslug).then((slug) => {
        setSiteId(slug);
      });
    }
  }, [segments, blogslug]);
  console.log(segments);

  const tabs = useMemo(() => {
    if (
      segments[0] === 'portfolio' &&
      slug &&
      segments[2] === 'blog' &&
      blogslug
    ) {
      return [
        {
          name: 'Back to All Post',
          icon: <ArrowLeft width={18} />,
          Link: `/dashboard/portfolio/${slug}/blog`,
          urlname: 'dashboard',
        },
        {
          name: 'Editor',
          Link: `/dashboard/portfolio/${slug}/blog/${blogslug}`,
          isActive: segments.length === 4,
          icon: <Edit3 width={18} />,
        },
        {
          name: 'Settings',
          Link: `/dashboard/portfolio/${slug}/blog/${blogslug}/settings`,
          isActive: segments.includes('settings'),
          icon: <Settings width={18} />,
        },
      ];
    } else if (segments[0] === 'settings') {
      // for only settings navs .......
      return [
        {
          name: 'Back to DashBoard',
          icon: <ArrowLeft width={18} />,
          Link: '/dashboard',
          urlname: 'dashboard',
        },
        {
          name: 'User Settings',
          icon: <UserCircle width={18} />,
          Link: `/dashboard/settings`,
          urlname: 'settings',
          isActive: segments.length === 1,
        },
      ];
    } else if (segments[0] === 'portfolio' && slug) {
      return [
        {
          name: 'Back to All Portfolio',
          icon: <ArrowLeft width={18} />,
          Link: '/dashboard/portfolio',
          urlname: 'portfolio',
        },
        {
          name: 'Overview',
          icon: <PartyPopper width={18} />,
          Link: `/dashboard/portfolio/${slug}`,
          isActive: segments.length === 2,
        },
        {
          name: 'Blogs',
          icon: <Newspaper width={18} />,
          Link: `/dashboard/portfolio/${slug}/blog`,
          isActive: segments.includes('blog'),
        },
        {
          name: 'Analytics',
          icon: <BarChart3 width={18} />,
          Link: `/dashboard/portfolio/${slug}/analytics`,
          urlname: 'analytics',
          isActive: segments.includes('analytics'),
        },
        {
          name: 'Settings',
          icon: <Settings2 className="w-5 h-5" />,
          Link: `/dashboard/portfolio/${slug}/settings`,
          urlname: 'settings',
          isActive: segments.includes('settings'),
        },
      ];
    }
    // default one at root .........
    return [
      {
        name: 'Overview',
        Link: '/dashboard',
        urlname: 'dashboard',
        isActive: segments.length === 0,
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        name: 'Portfolio',
        Link: '/dashboard/portfolio',
        urlname: 'portfolio',
        isActive: segments[0] === 'portfolio',
        icon: <CircleUser className="w-5 h-5" />,
      },
      {
        name: 'Explore',
        Link: '/community',
        urlname: 'community',
        isActive: segments[0] === 'community',
        icon: <Boxes className="w-5 h-5" />,
      },
      {
        name: 'Give Feebback',
        Link: '/dashboard/feedback',
        urlname: 'feedback',
        isActive: segments[0] === 'feedback',
        icon: <Rss className="w-5 h-5" />,
      },
      {
        name: 'User Settings',
        Link: '/dashboard/settings',
        urlname: 'settings',
        isActive: segments[0] === 'settings',
        icon: <SettingsIcon className="w-5 h-5" />,
      },
    ];
  }, [segments, slug, blogslug]);

  return (
    <div className="flex flex-col items-start justify-center gap-5">
      {tabs.map((nav, index) => (
        <Link key={index} href={nav.Link} className="w-full">
          <Button
            key={index}
            variant={nav.isActive ? 'default' : 'bordered'}
            className={`flex items-center justify-start w-full gap-2  rounded-3xl`}
          >
            {nav.icon}
            <span>{nav.name}</span>
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default SideNavBar;
