"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero({ location }: { location?: { city: string; state: string } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const forestRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: -1000, y: -1000 });
  const currentRef = useRef({ x: -1000, y: -1000 });

  // Smooth lerp animation loop for the spotlight
  const animate = useCallback(() => {
    const lerp = 0.12;
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;

    if (forestRef.current) {
      forestRef.current.style.maskImage = `radial-gradient(circle 180px at ${currentRef.current.x}px ${currentRef.current.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)`;
      forestRef.current.style.webkitMaskImage = `radial-gradient(circle 180px at ${currentRef.current.x}px ${currentRef.current.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetRef.current = { x, y };
    if (!isHovering) setIsHovering(true);
  }, [isHovering]);

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { x: -1000, y: -1000 };
    setIsHovering(false);
  }, []);

  // GSAP entrance
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });

      tl.fromTo(badgeRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power4.inOut" }, 0.2);
      tl.fromTo(titleRef.current, { y: 80, opacity: 0, skewY: 6 }, { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "expo.out" }, 0.3);
      tl.fromTo(taglineRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.7);
      tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.9);
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, 1.1);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(overlayRef.current, {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[100dvh] min-h-[600px] w-full flex flex-col items-center justify-center overflow-clip bg-[#050505] cursor-crosshair"
    >
      {/* Layer 0: Deep black base */}
      <div className="absolute inset-0 z-0 bg-[#030303]" />

      {/* Layer 1: Forest background — hidden, revealed by spotlight */}
      <div
        ref={forestRef}
        className="absolute inset-0 z-[1] bg-cover bg-center bg-no-repeat transition-none"
        style={{
          backgroundImage: "url('/forest-bg.jpeg')",
          maskImage: "radial-gradient(circle 180px at -1000px -1000px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 180px at -1000px -1000px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)",
          filter: "saturate(1.3) contrast(1.1)",
        }}
      />

      {/* Layer 2: Subtle ambient glow from forest (always visible) */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#030803]/80 via-transparent to-transparent pointer-events-none" />

      {/* Layer 3: Film grain noise */}
      <div className="absolute inset-0 z-[3] bg-noise opacity-[0.06] pointer-events-none mix-blend-overlay" />

      {/* Layer 4: Grass/ground atmosphere at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 z-[4] bg-gradient-to-t from-[#0a1a05]/60 via-[#0a1a05]/20 to-transparent pointer-events-none" />

      {/* Spotlight glow ring (follows cursor) */}
      {isHovering && (
        <div
          className="absolute z-[5] rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            width: 400,
            height: 400,
            left: (currentRef.current.x || 0) - 200,
            top: (currentRef.current.y || 0) - 200,
            background: "radial-gradient(circle, rgba(100,180,50,0.06) 0%, transparent 70%)",
          }}
        />
      )}


      {/* Ambient firefly particles (CSS) */}
      <div className="absolute inset-0 z-[6] pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#ccff00]/40 animate-firefly"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Status badge */}
      <div
        ref={badgeRef}
        className="relative z-30 mb-8 md:mb-10 flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md opacity-0"
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
        <div
          ref={lineRef}
          className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-transparent via-[#ccff00] to-transparent mb-8 md:mb-10 origin-center"
          style={{ transform: "scaleX(0)" }}
        />

        <div className="overflow-hidden">
          {/* Ghost DOM for exact-match SEO targeting */}
          <h1 className="sr-only">
            {location
              ? `Premium Fullstack Website Design in ${location.city}, ${location.state}`
              : "Valantra Studio - Premium Fullstack Digital Agency"}
          </h1>
          
          <div
            ref={titleRef}
            role="presentation"
            className="font-display text-[clamp(3rem,13vw,10rem)] md:text-[clamp(5rem,11vw,13rem)] font-black uppercase tracking-[-0.04em] text-white leading-[0.85] text-center select-none opacity-0 drop-shadow-[0_4px_60px_rgba(0,0,0,0.8)]"
          >
            Valantra
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
              Studio
            </span>
          </div>
        </div>

        <div
          ref={taglineRef}
          className="mt-6 md:mt-10 flex flex-col items-center gap-3 opacity-0"
        >
          <h2 className="sr-only">
             {location 
               ? `Award-Winning Website Making Agency for ${location.city} Businesses | Custom React & Next.js Fullstack Websites`
               : "Award-Winning Website Making Agency | Custom React & Next.js Fullstack Websites"}
          </h2>
          <p className="font-sans text-white/50 text-sm md:text-lg tracking-[0.15em] uppercase text-center max-w-xl leading-relaxed drop-shadow-lg">
            We build <span className="text-white/90 font-semibold">AI-native</span> digital experiences that
            <span className="text-[#ccff00]/80 font-semibold"> outperform everything.</span>
          </p>
        </div>

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

      {/* Hover instruction */}
      <div className={`absolute bottom-28 md:bottom-32 z-30 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase transition-opacity duration-700 ${isHovering ? 'opacity-0' : 'opacity-40'} text-white/40`}>
        [ Hover to reveal the wild ]
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

      {/* Scroll fade overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-40 bg-black pointer-events-none opacity-0"
      />
    </section>
  );
}
