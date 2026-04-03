import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdullah | AI Product Engineer",
  description: "Full-Stack Engineer. AI Pipeline Architect. SaaS Builder. Building software that thinks.",
  keywords: ["AI", "Product Engineer", "Full-Stack", "Next.js", "SaaS", "LLM"],
  authors: [{ name: "Abdullah" }],
  openGraph: {
    title: "Abdullah | AI Product Engineer",
    description: "Full-Stack Engineer. AI Pipeline Architect. SaaS Builder.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdullah | AI Product Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah | AI Product Engineer",
    description: "Building software that thinks. Full-Stack Engineer & AI Architect.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
