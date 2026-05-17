import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const eixampleVilla = localFont({
  src: "./fonts/fonnts.com-Eixample_Villa_Bold.otf",
  variable: "--font-eixample-villa",
  weight: "700",
  style: "normal",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MPLOT | MPL ID S17 Playoff Simulator",
  description:
    "Simulator klasemen dan probabilitas playoff MPL ID Season 17.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${eixampleVilla.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
