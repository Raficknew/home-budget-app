import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { LanguageSelect } from "@/components/LanguageSelect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Buget App",
  description: "App to manage your home budget",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <ClerkProvider>
      <html lang={locale}>
        <body className={`${geistSans.variable} antialiased bg-background`}>
          <NextIntlClientProvider>
            {children}
            <LanguageSelect currentLocale={locale} />
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
