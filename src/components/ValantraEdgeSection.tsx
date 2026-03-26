"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AdvancedCard from "./AdvancedCard";
import TextReveal from "./TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ValantraEdgeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !leftPanelRef.current) return;

    let ctx: gsap.Context;
    const timeout = setTimeout(() => {
      ctx = gsap.context(() => {
        let mm = gsap.matchMedia();
        // Desktop Phase 13: 3D Reeling Scroll-Teller Timeline
        mm.add("(min-width: 768px)", () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              pin: leftPanelRef.current,
              pinSpacing: false,
              scrub: 1,
            }
          });
          
          tl.from(".edge-card", {
            y: 250,
            opacity: 0,
            rotateX: 45,
            scale: 0.9,
            transformPerspective: 1500,
            stagger: 0.3,
            duration: 1.5,
            ease: "power4.out"
          });
        });
        // Mobile acts as standard flow container.
      }, containerRef);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="edge" className="relative w-full bg-[#000000] text-white flex flex-col md:flex-row items-start min-h-[100dvh] md:min-h-[300vh] py-24 md:py-0">
      <div className="absolute inset-0 bg-noise opacity-[0.10] md:opacity-[0.15] pointer-events-none mix-blend-overlay"></div>

      {/* Left Pinned Panel (Desktop) / Standard Flow Block (Mobile) */}
      <div className="w-full md:w-1/2 h-auto md:h-screen md:sticky top-0 flex flex-col justify-center px-6 md:px-20 z-10 md:border-r border-white/5 pointer-events-none mb-12 md:mb-0">
        <div ref={leftPanelRef}>
          <TextReveal>
            <h2 className="font-display text-5xl md:text-7xl lg:text-[7vw] font-black uppercase tracking-tighter leading-[0.85]">
              The <br/> <span className="text-[#bf00ff]">Valantra</span> <br/> Edge.
            </h2>
          </TextReveal>
        </div>
      </div>

      {/* Right Scrollable Panel with 3D Bento Grid staggered reeling */}
      <div ref={rightPanelRef} className="w-full md:w-1/2 flex flex-col gap-8 md:gap-32 px-5 md:px-20 py-0 md:py-[40vh] z-10">
        
        <div className="edge-card w-full">
          <AdvancedCard className="h-auto md:h-[50vh] min-h-[300px] md:min-h-[400px] p-8 md:p-12 flex flex-col justify-between group rounded-[2rem] md:rounded-[3rem]">
             <h3 className="font-display font-black text-3xl md:text-5xl uppercase text-white/50 group-hover:text-white transition-colors duration-500 transform md:group-hover:translate-y-2">Autonomous Ai Workflows</h3>
             <p className="font-sans text-gray-400 text-sm md:text-lg transform md:group-hover:-translate-y-2 transition-transform duration-500 mt-6 md:mt-0">We inject customized Large Language Models deep into your core operations, eliminating thousands of hours of manual labor with sub-second execution speeds.</p>
          </AdvancedCard>
        </div>

        <div className="edge-card w-full">
          <AdvancedCard className="h-auto md:h-[50vh] min-h-[300px] md:min-h-[400px] p-8 md:p-12 flex flex-col justify-between group border-[#bf00ff]/20 bg-gradient-to-tr from-[#bf00ff]/5 to-transparent rounded-[2rem] md:rounded-[3rem] ml-0 md:-ml-10">
             <h3 className="font-display font-black text-3xl md:text-5xl uppercase text-[#bf00ff]/50 group-hover:text-[#bf00ff] transition-colors duration-500 transform md:group-hover:translate-y-2">Sub-Second Latency</h3>
             <p className="font-sans text-[#bf00ff]/70 text-sm md:text-lg transform md:group-hover:-translate-y-2 transition-transform duration-500 mt-6 md:mt-0">Our Edge-rendered React Server Components guarantee a First Contentful Paint approaching 0ms. We don't just optimize code; we manipulate the compilation timeline itself.</p>
          </AdvancedCard>
        </div>

        <div className="edge-card w-full">
          <AdvancedCard className="h-auto md:h-[50vh] min-h-[300px] md:min-h-[400px] p-8 md:p-12 flex flex-col justify-between group border-[#ccff00]/20 bg-gradient-to-tr from-[#ccff00]/5 to-transparent rounded-[2rem] md:rounded-[3rem] ml-0 md:ml-10">
             <h3 className="font-display font-black text-3xl md:text-5xl uppercase text-[#ccff00]/50 group-hover:text-[#ccff00] transition-colors duration-500 transform md:group-hover:translate-y-2">Award-Winning UI</h3>
             <p className="font-sans text-[#ccff00]/70 text-sm md:text-lg transform md:group-hover:-translate-y-2 transition-transform duration-500 mt-6 md:mt-0">We eschew conventional grid systems. Fluid GSAP physics, WebGL parallax overlays, and strict brutalist design principles fuse into a breathtakingly immersive digital experience.</p>
          </AdvancedCard>
        </div>

      </div>
    </section>
  );
}
