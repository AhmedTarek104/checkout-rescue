import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteNavigation from "./components/site-navigation";
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
  title: "Checkout Rescue",
  description:
    "A product management portfolio case study for checkout payment recovery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#12100b] text-zinc-100">
        <SiteNavigation />
        {children}
        <footer className="border-t border-white/10 bg-[#12100b] px-6 py-8 sm:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="max-w-4xl text-sm leading-6 text-zinc-500">
              Portfolio case study. Not affiliated with Noon. Built to
              demonstrate product thinking, checkout recovery logic, analytics,
              and experimentation.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
