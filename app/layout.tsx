import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import { ConvexClientProvider } from "@/components/web/ConvexClientProvider";
import { getToken } from "@/lib/auth-server";
import { Toaster } from "@/components/ui/sonner";

const jetbrainsmono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "VeloraBlog",
  description:
    "A full-stack blog application powered by Next.js 16, designed for developers and creators who love speed and simplicity.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsmono.variable} antialiased`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
            <ConvexClientProvider initialToken={token}>
              {children}
            </ConvexClientProvider>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
