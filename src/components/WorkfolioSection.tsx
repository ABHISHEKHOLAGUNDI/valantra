"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import AdvancedCard from "./AdvancedCard";
import TextReveal from "./TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Phase 14: Extracted global color variables for active states.
const projects = [
  { id: "01", client: "Allolli Dental", role: "Clinic Management System", year: "2026", aesthetic: "clinical", color: "#00f0ff" },
  { id: "02", client: "Void Systems", role: "WebGL Narrative", year: "2025", aesthetic: "default", color: "#bf00ff" },
  { id: "03", client: "Hyperion Labs", role: "Agentic Interface", year: "2026", aesthetic: "default", color: "#ccff00" },
  { id: "04", client: "Quantum Dynamics", role: "E-Commerce", year: "2025", aesthetic: "default", color: "#ff0055" },
];

export default function WorkfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredColor, setHoveredColor] = useState("rgba(0,0,0,0)");

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    let ctx: gsap.Context;

    const timeout = setTimeout(() => {
      ctx = gsap.context(() => {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          const scrollWidth = scrollRef.current!.scrollWidth;
          const amountToScroll = scrollWidth - window.innerWidth;

          gsap.to(scrollRef.current, {
            x: -amountToScroll,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: `+=${amountToScroll}`,
              scrub: 1,
              pin: true,
            }
          });
        });
        
      }, containerRef);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section id="workfolio" ref={containerRef} className="h-[100dvh] w-full flex flex-col justify-center relative z-0 border-t border-white/5 transition-colors duration-1000 overflow-clip" style={{ backgroundColor: hoveredColor !== "rgba(0,0,0,0)" ? "transparent" : "#050505" }}>
      
       {/* Ambient Glow Extraction Phase 14 */}
       <motion.div 
         className="absolute inset-0 z-[-1] blur-[200px] opacity-20 transition-colors duration-1000 pointer-events-none"
         animate={{ backgroundColor: hoveredColor }}
       />

       <div className="absolute top-24 md:top-32 px-6 md:px-20 z-20 pointer-events-none mix-blend-exclusion">
          <TextReveal>
            <h1 className="font-display text-[15vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none text-white drop-shadow-lg">
              Our <br className="md:hidden" /><span className="text-white">Workfolio.</span>
            </h1>
          </TextReveal>
       </div>

       {/* CSS Noise Overlay */}
       <div className="absolute inset-0 bg-noise pointer-events-none mix-blend-overlay opacity-10"></div>
       <div className="hidden md:block absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)", backgroundSize: "20px 20px" }} />
       
       <div className="w-full h-full md:overflow-visible overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex items-center scrollbar-hide z-10">
         <div ref={scrollRef} className="flex gap-6 md:gap-20 px-6 md:px-[20vw] mt-24 md:mt-20 h-auto md:h-[60%] w-max md:w-fit items-center">
           {projects.map((project) => (
             <div 
               key={project.id} 
               className="w-[85vw] md:w-[85vw] max-w-[400px] md:max-w-[650px] h-[55vh] md:h-full shrink-0 snap-center"
               onMouseEnter={() => setHoveredColor(project.color)}
               onMouseLeave={() => setHoveredColor("rgba(0,0,0,0)")}
             >
               <AdvancedCard className={`w-full h-full p-8 md:p-12 flex flex-col justify-between shadow-2xl ${project.aesthetic === 'clinical' ? 'bg-white/10 backdrop-blur-3xl border-white/30 !shadow-[0_0_100px_rgba(255,255,255,0.05)]' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-0 opacity-20 transition-opacity" />
                  
                  <div className="flex justify-between items-start z-10" style={{ transform: "translateZ(30px)" }}>
                    <span className={`font-display font-bold text-5xl md:text-6xl opacity-50 transition-opacity duration-500 ${project.aesthetic === 'clinical' ? 'text-white' : 'text-[#ccff00]'}`}>{project.id}</span>
                    <span className={`font-sans text-[10px] md:text-xs tracking-widest uppercase py-2 px-4 border rounded-full bg-black/40 backdrop-blur-sm transition-colors ${project.aesthetic === 'clinical' ? 'border-white/50 text-white' : 'border-[#ccff00]/30 text-[#ccff00]'}`}>{project.year}</span>
                  </div>
                  
                  <div className="flex flex-col gap-3 md:gap-4 z-10" style={{ transform: "translateZ(50px)" }}>
                     <p className={`font-sans uppercase tracking-widest text-[10px] md:text-sm font-black ${project.aesthetic === 'clinical' ? 'text-blue-300' : 'text-[#ccff00]/70'}`}>{project.role}</p>
                     <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.9] drop-shadow-lg tracking-tight text-white">{project.client}</h2>
                     
                     {project.aesthetic === 'clinical' && (
                       <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3">
                         <span className="px-2 md:px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-md text-blue-200 text-[9px] md:text-xs tracking-wider uppercase">HIPAA Compliant</span>
                         <span className="px-2 md:px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-md text-emerald-200 text-[9px] md:text-xs tracking-wider uppercase">SaaS Dashboard</span>
                       </div>
                     )}
                  </div>
               </AdvancedCard>
             </div>
           ))}
         </div>
       </div>
    </section>
  );
}
