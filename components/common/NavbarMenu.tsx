'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { APP_DESC, APP_NAME } from '@/lib/contants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import * as React from 'react';

export function NavBarMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image
                      src="/bashschool.png"
                      alt="bash school logo"
                      width={50}
                      height={50}
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {APP_NAME}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {APP_DESC}
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {/* <ListItem href={COURSES_PAGE_LINK} title="Courses">
                                Explore a wide range of courses tailored to your interests and goals.
                            </ListItem>
                            <ListItem href="/team" title="Team">
                                Learn from the best. Our instructors are experts with years of practical experience.
                            </ListItem>
                            <ListItem href="/about" title="About">
                                Learn more about Bash School and our mission to make coding accessible to everyone.
                            </ListItem> */}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {Courses.map((course) => (
                                <ListItem
                                    key={course.title}
                                    title={course.title}
                                    href={course.href}
                                >
                                    {course.description}
                                </ListItem>
                            ))}
                        </ul> */}
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
                    <Link href={BLOG_PAGE_LINK} legacyBehavior passHref target="blank">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Blogs
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          target="blank"
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
