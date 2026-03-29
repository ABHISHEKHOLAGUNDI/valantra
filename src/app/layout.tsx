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
  description: "Award-winning, hyper-modern digital agency specializing in best-in-class AI tools and elite web development.",
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
