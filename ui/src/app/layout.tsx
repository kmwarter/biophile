import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/shared/header/header";
import { MarketingHeader } from "@/components/shared/marketing-header/marketing-header";
import { DentalProvider } from "@/components/context/dental-context/dental-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thing - Your Health Data, Owned by You",
  description: "Track, visualize, and understand your health data. Private by design. For patients and healthcare providers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Thing - Your health data, owned by you. Private health tracking for patients, automation tools for providers."
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DentalProvider>
          <div className="h-dvh flex flex-col">
            <MarketingHeader />
            <Header />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </DentalProvider>
      </body>
    </html>
  );
}
