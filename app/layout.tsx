import type { Metadata } from "next";
import localFont from "next/font/local";
import { Pacifico } from 'next/font/google';
import { Pangolin } from 'next/font/google';
import "./globals.css";

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
});
const pangolin = Pangolin({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pangolin',
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Trays — A tray for everyday mood",
  description: "Visual mood journaling with emojis, colors, music & more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${pangolin.className} relative min-h-screen bg-white`}>
        {/* Light background grid */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.07)_1px,transparent_1px)] bg-[length:32px_32px] pointer-events-none" />

        {/* Radial dark highlight grid — dynamic mask */}
        <div
          id="dark-grid"
          className="hidden md:block absolute inset-0 -z-10 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[length:32px_32px] mask-radial-highlight"
        />

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}
