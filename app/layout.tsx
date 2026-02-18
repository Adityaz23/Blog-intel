// app/layout.tsx
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";           // ← add this
import AppProviders from "./AppProviders";

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
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading session...</div>}>
            <AppProviders>{children}</AppProviders>
          </Suspense>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}