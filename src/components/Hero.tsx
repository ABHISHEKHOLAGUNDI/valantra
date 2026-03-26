"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Desktop strictly handles heavy 25x parallax scrolling. 
      // Mobile relies on default static mapping to prevent layout thrashing entirely.
      mm.add("(min-width: 768px)", () => {
        gsap.to(textRef.current, {
          scale: 25,
          opacity: 0,
          ease: "power3.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            scrub: 1,
            pin: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative h-[100dvh] min-h-[600px] w-full flex items-center justify-center overflow-clip bg-[#050505]">
      
      <div className="absolute inset-0 z-10 bg-noise opacity-[0.10] md:opacity-20 pointer-events-none mix-blend-overlay"></div>

      <h1 ref={textRef} className="absolute font-display text-[clamp(2.5rem,11vw,4rem)] md:text-[clamp(4rem,12vw,12rem)] font-black uppercase tracking-tighter text-white whitespace-nowrap z-20 origin-center leading-[0.85] text-center w-full px-4 md:px-0 mix-blend-exclusion pointer-events-none select-none drop-shadow-2xl">
        Valantra <br className="md:hidden" /> Studio
      </h1>
    </section>
  );
}
