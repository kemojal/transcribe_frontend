import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transcribai",
  description: "Transcribe audio files and video to text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextTopLoader />
        <StoreProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
