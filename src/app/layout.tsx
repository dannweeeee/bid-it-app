import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import ContextProvider from "@/context";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bid It",
  description: "Dutch Auction for Token ICOs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get("cookie");

  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden `}
        suppressHydrationWarning={true}
      >
        <ContextProvider cookies={cookies}>
          <main className="min-h-screen">
            <Navbar />
            {children}
            <Toaster />
          </main>
        </ContextProvider>
      </body>
    </html>
  );
}
