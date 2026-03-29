import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import Preloader from "@/components/Preloader";
import WebGLBackground from "@/components/WebGLBackground";

export const metadata: Metadata = {
  title: "Valantra Studio | Premium AI Tools & Web Development",
  description: "Award-winning, hyper-modern digital agency specializing in best-in-class AI tools and elite web development. High-performance Next.js React Server Components and WebGL execution.",
  keywords: ["Valantra Studio", "Digital Agency", "Web Development", "AI Tools", "React", "Next.js", "WebGL", "GSAP", "Brutalist UX"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://valantra.studio"),
  openGraph: {
    title: "Valantra Studio | The Elite Digital Agency",
    description: "We don't build websites. We engineer digital weapons. High-performance web development and AI platforms.",
    url: "https://valantra.studio",
    siteName: "Valantra Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valantra Studio | Elite AI & Web Engineering",
    description: "Award-winning brutalist UX engineering. First Contentful Paint approaching 0ms.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} dark antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Valantra Studio",
              "url": "https://valantra.studio",
              "description": "Award-winning, hyper-modern digital agency specializing in best-in-class AI tools and elite web development.",
              "image": "https://valantra.studio/og-image.jpg",
              "priceRange": "$$$",
              "sameAs": [
                "https://github.com/valantrastudio"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Global",
                "addressCountry": "US"
              }
            })
          }}
        />
      </head>
      <body className="min-h-[100dvh] bg-[#000000] text-white selection:bg-[#ccff00] selection:text-black font-sans flex flex-col sm:cursor-none">
        <Preloader />
        <WebGLBackground />
        <PageTransition />
        <SmoothScroll>
          <div className="hidden md:block"><Cursor /></div>
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
