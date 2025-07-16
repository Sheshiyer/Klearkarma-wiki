import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WikiLayout from "@/components/WikiLayout";
import AnimatedBackground from "@/components/AnimatedBackground";
import { getAllDocuments } from "@/lib/markdown";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Klear Karma Wiki",
  description: "Comprehensive documentation and knowledge base for Klear Karma project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
