// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Pacifico, Pangolin } from "next/font/google";
import "./globals.css";
import GridBackground from "./components/GridBackground";
import Providers from "./providers";
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});
const pangolin = Pangolin({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pangolin",
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
        <Providers>
          <GridBackground />
          <div className="relative z-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
