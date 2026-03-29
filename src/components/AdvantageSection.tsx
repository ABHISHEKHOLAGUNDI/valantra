"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";

export default function AdvantageSection({ location }: { location?: { city: string; state: string } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const valantraCardRef = useRef<HTMLDivElement>(null);
  const otherCardRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (otherCardRef.current && valantraCardRef.current && containerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });

      // Other agencies fade in slowly and apathy-like
      tl.fromTo(otherCardRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
      );

      // Valantra slams in with elastic ease from the bottom
      tl.fromTo(valantraCardRef.current,
        { opacity: 0, y: 150, scale: 0.95 },
        { 
          opacity: 1, y: 0, scale: 1, 
          duration: 1.8, 
          ease: "elastic.out(1, 0.6)",
        },
        "-=1.0" // Overlap aggressively
      );

      // Flash the neon border shadow on the Valantra card once it lands
      tl.fromTo(valantraCardRef.current,
         { boxShadow: "0 0 0px rgba(204,255,0,0)" },
         { boxShadow: "0 0 40px rgba(204,255,0,0.15)", duration: 0.6, yoyo: true, repeat: 1 },
         "-=0.8"
      );
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!valantraCardRef.current) return;
    const rect = valantraCardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section ref={containerRef} id="advantage" className="relative bg-[#000000] w-full py-10 md:py-32 px-5 md:px-20 overflow-clip border-t border-white/5 z-40">
       <div className="absolute inset-0 bg-noise opacity-15 mix-blend-overlay pointer-events-none z-0"></div>

       <div className="max-w-7xl mx-auto relative z-10">
          <TextReveal className="mb-8 md:mb-20">
             <h2 className="font-display text-4xl md:text-[7vw] font-black uppercase tracking-tighter leading-none text-white drop-shadow-xl text-center md:text-left">
               The <span className="text-white md:mix-blend-exclusion">Valantra</span> <br className="hidden md:block" /> <span className="text-[#ccff00] mix-blend-screen md:drop-shadow-[0_0_20px_#ccff00]">Advantage.</span>
             </h2>
          </TextReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-16">
             {/* "Them" Column - Muted Brutalist */}
             <div 
               ref={otherCardRef}
               className="bg-[#050505] border border-white/5 rounded-[2rem] p-6 md:p-14 flex flex-col items-start opacity-0"
             >
               <h3 className="font-display font-black text-xl md:text-2xl uppercase tracking-widest mb-10 text-white/40 text-left">
                 {location ? `Average ${location.city} Agencies` : "Other Agencies"}
               </h3>
               <ul className="flex flex-col gap-4 md:gap-6 font-mono text-sm md:text-[15px] text-white/30 w-full leading-relaxed">
                 <li className="flex items-start gap-4"><span className="text-red-900/80 font-bold mt-[2px] text-lg shrink-0 leading-none">×</span> Generic WordPress Templates</li>
                 <li className="flex items-start gap-4"><span className="text-red-900/80 font-bold mt-[2px] text-lg shrink-0 leading-none">×</span> Single-threaded slow load times</li>
                 <li className="flex items-start gap-4"><span className="text-red-900/80 font-bold mt-[2px] text-lg shrink-0 leading-none">×</span> Basic UI Component copy-pasting</li>
                 <li className="flex items-start gap-4"><span className="text-red-900/80 font-bold mt-[2px] text-lg shrink-0 leading-none">×</span> Reliant on 3rd party bloated plugins</li>
                 <li className="flex items-start gap-4"><span className="text-red-900/80 font-bold mt-[2px] text-lg shrink-0 leading-none">×</span> Weeks to resolve simple architecture bugs</li>
                 <li className="flex items-start gap-4"><span className="text-red-900/80 font-bold mt-[2px] text-lg shrink-0 leading-none">×</span> Outdated SEO metadata practices</li>
                 <li className="flex items-start gap-4"><span className="text-red-900/80 font-bold mt-[2px] text-lg shrink-0 leading-none">×</span> Fragmented team communication</li>
                 <li className="flex items-start gap-4"><span className="text-red-900/80 font-bold mt-[2px] text-lg shrink-0 leading-none">×</span> Unpredictable pricing and scope creep</li>
               </ul>
             </div>

             {/* "Us" Column - High-End Premium Valantra Card */}
             <div 
               ref={valantraCardRef}
               onMouseMove={handleMouseMove}
               className="relative bg-[#050505] border border-white/10 rounded-[2rem] p-6 md:p-14 flex flex-col items-start overflow-hidden group opacity-0 shadow-[0_0_30px_rgba(204,255,0,0.03)] transform-gpu"
             >
               {/* Hover Spotlight Gradient */}
               <div 
                 className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0"
                 style={{
                   background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(204, 255, 0, 0.08), transparent 40%)`
                 }}
               />
               
               {/* Subtle Noise Texture on Valantra Side */}
               <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none z-0" />
               
               <h3 className="relative z-10 font-display font-black text-3xl md:text-4xl uppercase tracking-tighter mb-10 text-white text-left drop-shadow-md">Valantra Studio</h3>
               
               <ul className="relative z-10 flex flex-col gap-4 md:gap-8 font-sans text-[15px] md:text-lg text-white/90 font-bold w-full leading-relaxed tracking-wide">
                 <li className="flex items-start gap-4">
                   <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 shadow-[0_0_15px_rgba(204,255,0,0.3)] shrink-0 mt-[2px]">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                   Bespoke Automated SaaS Platforms
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 shadow-[0_0_15px_rgba(204,255,0,0.3)] shrink-0 mt-[2px]">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                   Hyper-Accelerated Edge Runtimes
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 shadow-[0_0_15px_rgba(204,255,0,0.3)] shrink-0 mt-[2px]">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                   Awwwards-Level Custom Shader UI
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 shadow-[0_0_15px_rgba(204,255,0,0.3)] shrink-0 mt-[2px]">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                   Proprietary Web3 AI Frameworks
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 shadow-[0_0_15px_rgba(204,255,0,0.3)] shrink-0 mt-[2px]">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                   Sub-Second Global Architecture
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 shadow-[0_0_15px_rgba(204,255,0,0.3)] shrink-0 mt-[2px]">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                   Algorithmic SEO Optimization Engine
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 shadow-[0_0_15px_rgba(204,255,0,0.3)] shrink-0 mt-[2px]">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                   Real-Time Synchronous Collaboration
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 shadow-[0_0_15px_rgba(204,255,0,0.3)] shrink-0 mt-[2px]">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                   Transparent Fixed-Scope Deployments
                 </li>
               </ul>
             </div>
          </div>
       </div>
    </section>
  );
}
