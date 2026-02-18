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
  title: "VeloraBlog",
  description: "...",
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
