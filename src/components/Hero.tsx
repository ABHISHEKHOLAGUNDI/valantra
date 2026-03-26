"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // === ENTRANCE SEQUENCE ===
      const tl = gsap.timeline({ delay: 0.8 });

      // Badge slides down
      tl.fromTo(badgeRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0
      );

      // Accent line draws from center
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power4.inOut" },
        0.2
      );

      // Title letters slam in
      tl.fromTo(titleRef.current,
        { y: 80, opacity: 0, skewY: 6 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "expo.out" },
        0.3
      );

      // Tagline fades up
      tl.fromTo(taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.7
      );

      // CTA appears
      tl.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0.9
      );

      // Scroll indicator pulses in
      tl.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        1.1
      );

      // === SCROLL ZOOM-OUT (Desktop) ===
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(overlayRef.current, {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-[100dvh] min-h-[600px] w-full flex flex-col items-center justify-center overflow-clip bg-[#050505]"
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 z-10 bg-noise opacity-[0.10] md:opacity-20 pointer-events-none mix-blend-overlay" />

      {/* Radial glow behind title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-[radial-gradient(circle,rgba(204,255,0,0.06)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Corner decorative elements */}
      <div className="absolute top-8 left-8 md:top-16 md:left-20 flex flex-col gap-1 z-20">
        <div className="w-8 h-[2px] bg-[#ccff00]/40" />
        <div className="w-4 h-[2px] bg-[#ccff00]/20" />
      </div>
      <div className="absolute top-8 right-8 md:top-16 md:right-20 flex flex-col gap-1 items-end z-20">
        <div className="w-8 h-[2px] bg-[#ccff00]/40" />
        <div className="w-4 h-[2px] bg-[#ccff00]/20" />
      </div>

      {/* Status badge */}
      <div
        ref={badgeRef}
        className="relative z-30 mb-8 md:mb-10 flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md opacity-0"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ccff00]" />
        </span>
        <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-white/60 uppercase">
          Available for Projects — 2026
        </span>
      </div>

      {/* Main title block */}
      <div className="relative z-30 flex flex-col items-center gap-0 px-4">
        {/* Accent line */}
        <div
          ref={lineRef}
          className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-transparent via-[#ccff00] to-transparent mb-8 md:mb-10 origin-center"
          style={{ transform: "scaleX(0)" }}
        />

        {/* Title */}
        <div className="overflow-hidden">
          <h1
            ref={titleRef}
            className="font-display text-[clamp(3rem,13vw,10rem)] md:text-[clamp(5rem,11vw,13rem)] font-black uppercase tracking-[-0.04em] text-white leading-[0.85] text-center mix-blend-exclusion select-none opacity-0"
          >
            Valantra
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
              Studio
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <div
          ref={taglineRef}
          className="mt-6 md:mt-10 flex flex-col items-center gap-3 opacity-0"
        >
          <p className="font-sans text-white/50 text-sm md:text-lg tracking-[0.15em] uppercase text-center max-w-xl leading-relaxed">
            We build <span className="text-white/90 font-semibold">AI-native</span> digital experiences that
            <span className="text-[#ccff00]/80 font-semibold"> outperform everything.</span>
          </p>
        </div>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          className="mt-10 md:mt-14 flex flex-col md:flex-row items-center gap-4 opacity-0"
        >
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-[#ccff00] text-black font-black uppercase tracking-[0.2em] text-xs md:text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(204,255,0,0.3)] hover:scale-105"
          >
            <span className="relative z-10">Start a Project</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#work"
            className="px-8 py-4 border border-white/15 text-white/70 hover:text-white hover:border-white/40 font-bold uppercase tracking-[0.2em] text-xs md:text-sm rounded-full transition-all duration-300"
          >
            View Work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-white/30 uppercase">Scroll</span>
        <div className="w-[1px] h-12 md:h-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#ccff00] to-transparent animate-scroll-line" />
        </div>
      </div>

      {/* Scroll fade overlay — pinned on desktop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-40 bg-black pointer-events-none opacity-0"
      />
    </section>
  );
}
