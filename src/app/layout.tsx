import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AnimationSettingsProvider } from "@/hooks/useAnimationSettings";

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
  metadataBase: new URL("https://abdlx.com"), // Setting a default base URL for metadata
  title: {
    default: "Abdullah | AI Product Engineer",
    template: "%s | Abdullah"
  },
  description: "Full-Stack Engineer & AI Pipeline Architect. building production-grade AI systems, SaaS platforms, and software that thinks. Expertise in Next.js, LLMs, and scalable infrastructure.",
  keywords: [
    "AI Product Engineer",
    "Full-Stack Engineer",
    "AI Pipeline Architect",
    "SaaS Builder",
    "Next.js AI Development",
    "LLM Integration Specialist",
    "Abdullah Baig",
    "AI TrustScore",
    "RAG Implementation"
  ],
  authors: [{ name: "Abdullah", url: "https://abdlx.com" }],
  creator: "Abdullah",
  openGraph: {
    title: "Abdullah | AI Product Engineer",
    description: "Building production-grade AI systems and software that thinks.",
    url: "https://abdlx.com",
    siteName: "Abdullah Portfolio",
    locale: "en_US",
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
    creator: "@mirzaabdullah", // Replace with actual handle if known
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Abdullah",
  "image": "https://abdlx.com/photo.jpg", // Update if available
  "jobTitle": "AI Product Engineer",
  "url": "https://abdlx.com",
  "sameAs": [
    "https://www.linkedin.com/in/mirza-abdullah-baig-ai-dev/",
    "https://github.com/abdlx" // Assuming from CorpusName
  ],
  "knowsAbout": [
    "Artificial Intelligence",
    "Full-Stack Web Development",
    "SaaS Architecture",
    "Natural Language Processing",
    "Next.js",
    "Python",
    "LLMs",
    "RAG",
    "Cloud Infrastructure"
  ],
  "description": "Full-Stack Engineer and AI Pipeline Architect specializing in building SaaS and software that thinks."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://abdlx.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased bg-black text-white`}
      >
        <AnimationSettingsProvider>
          {children}
        </AnimationSettingsProvider>
      </body>
    </html>
  );
}
