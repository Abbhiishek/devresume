// app/providers.tsx
'use client'
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Toaster } from "sonner";
import { ThemeProvider } from './ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                variables: { colorPrimary: 'green' }
            }}
        >
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
            >
                <NextUIProvider navigate={router.push}>
                    <Toaster className="dark:hidden" />
                    <Toaster theme="dark" className="hidden dark:block" />
                    {children}
                </NextUIProvider>
            </ThemeProvider>
        </ClerkProvider>
    )
}