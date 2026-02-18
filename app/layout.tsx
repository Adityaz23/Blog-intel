// app/layout.tsx
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import AppProviders from "./AppProviders";
import { Suspense } from "react";
import Footer from "@/components/web/Footer";

const jetbrainsmono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "VeloraBlog – Write. Share. Connect.",
    template: "%s | VeloraBlog",
  },
  description:
    "VeloraBlog is a modern full-stack blogging platform built with Next.js. It features authentication, real-time live comments, presence tracking, and a powerful distraction-free editor designed for creators and developers.",
  keywords: [
    "VeloraBlog",
    "Next.js blog platform",
    "Full stack project",
    "Live comments",
    "Real-time presence system",
    "MERN alternative",
    "Portfolio project",
  ],
  metadataBase: new URL("https://blog-intel.vercel.app"),

  openGraph: {
    title: "VeloraBlog – Modern Blogging Platform",
    description:
      "A full-stack blogging platform built with Next.js featuring authentication, real-time comments, presence system, and a modern writing experience.",
    url: "https://blog-intel.vercel.app",
    siteName: "VeloraBlog",
    images: [
      {
        url: "/og-image.jpg", // Put this file inside /public
        width: 1200,
        height: 630,
        alt: "VeloraBlog – Modern Blogging Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VeloraBlog – Modern Blogging Platform",
    description:
      "A full-stack blog platform with live comments and real-time presence built using Next.js.",
    images: ["/og-image.jpg"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsmono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
            <Suspense fallback={<div>Loading...</div>}>
              <AppProviders>{children}</AppProviders>
            </Suspense>
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
