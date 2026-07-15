import type { Metadata, Viewport } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/atoms/ThemeProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hozzy",
  description: "App to manage your home budget",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // biome-ignore lint/a11y/useHtmlLang: <cache components issues>
    <html
      className={cn(
        "h-full",
        figtree.variable,
        geistSans.variable,
        geistMono.variable,
      )}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground font-sans">
        <Suspense
          fallback={<Skeleton className="h-dvh w-full bg-background" />}
        >
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}

async function Providers({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        {children}
        <Toaster richColors duration={2000} position="top-center" />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
