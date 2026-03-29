"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playExpandSound, playCollapseSound } from "@/utils/audio";

const faqs = [
  { q: "What defines your architecture?", a: "We strictly engineer Next.js Server Components bound to raw WebGL contexts. It results in brutal 60FPS fluid interactions with First Contentful Paints hovering near 0ms." },
  { q: "Do you use templates?", a: "Negative. Every structural component, GSAP math timeline, and GLSL fluid shader is coded entirely from scratch — specifically mapped to your brand's aggressive aesthetic matrix." },
  { q: "What is your typical turnaround?", a: "Complete monolithic deployments average 4-6 weeks depending on WebGL complexity, 3D render limits, and backend serverless agentic integrations." },
  { q: "How do we initialize a project?", a: "Trigger the contact terminal sequence interface. We will execute a direct high-frequency discovery transmission with your stakeholders within 12 hours." },
  { q: "What makes you different from other agencies?", a: "We don't build websites — we engineer digital weapons. Every pixel is GPU-accelerated, every animation is physics-based, and every interaction is designed to dominate attention." },
  { q: "Do you offer ongoing maintenance?", a: "Affirmative. Post-launch we provide dedicated performance monitoring, zero-downtime deployments, and continuous A/B optimization cycles to ensure your platform evolves." },
  { q: "What technologies do you specialize in?", a: "Next.js 15, React 19, Three.js, GSAP, Framer Motion, GLSL shaders, Lenis, and custom WebGL pipelines. We also build custom AI agents using LangChain, OpenAI, and proprietary inference stacks." },
  { q: "Can you handle enterprise-scale projects?", a: "We've deployed systems processing millions of requests per second. Our architecture is built on edge-first serverless infrastructure with global CDN distribution and sub-100ms response times." },
  { q: "What is your pricing structure?", a: "We operate on project-based pricing calibrated to scope complexity. Entry-level builds start at $10K, with full-stack AI-integrated platforms ranging $50K-$150K+." },
  { q: "Do you work with startups?", a: "Yes — we selectively partner with high-velocity startups that demand elite execution. We've helped early-stage companies launch products that secured Series A rounds within months." },
  { q: "How do you handle revisions?", a: "Each project includes structured revision cycles built into the timeline. We use async Loom walkthroughs and real-time Figma collaboration to ensure alignment before any code ships." },
  { q: "What happens after launch?", a: "We monitor Core Web Vitals, run synthetic load tests, and provide 30-day post-launch support included in every engagement. Extended retainers are available for continuous iteration." },
];

export default function SilhouetteReveal() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const toggleAccordion = (i: number) => {
    if (openIndex === i) {
      playCollapseSound();
      setOpenIndex(null);
    } else {
      playExpandSound();
      setOpenIndex(i);
    }
  };


  // Prevent page scroll when cursor is inside the FAQ scroll container
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;

      // Only prevent default if we're NOT at the boundaries
      if (!atTop && !atBottom) {
        e.stopPropagation();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section id="faq" className="relative bg-[#050505] w-full flex flex-col items-center justify-start border-t border-white/5 pb-12 md:pb-32 overflow-hidden">
       {/* Background Atmospheric Noise */}
       <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none z-0" />
       
       {/* Typography Header */}
       <div className="relative w-full py-8 md:py-20 flex flex-col items-center justify-center z-10 overflow-hidden">
         <h1 
           className="font-display font-black text-[15vw] md:text-[10vw] leading-[0.85] tracking-tighter uppercase text-center 
                      text-transparent bg-clip-text bg-gradient-to-b from-[#ccff00] to-[#ccff00]/20
                      drop-shadow-[0_0_80px_rgba(204,255,0,0.3)]"
         >
           OPERATIONAL <br/> INTEL.
         </h1>
       </div>

       {/* FAQ Scrollable Container */}
       <div className="relative z-40 w-full max-w-4xl mx-auto px-4 md:px-20">
          <div 
            className="border border-white/10 bg-[#050505]/80 backdrop-blur-md rounded-[1.5rem] md:rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Scroll hint */}
            <div className="flex items-center justify-between px-6 md:px-8 pt-5 pb-3 border-b border-white/5">
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-white/25 uppercase">
                {faqs.length} Questions
              </span>
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-white/25 uppercase flex items-center gap-2">
                Scroll ↕
                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isHovering ? 'bg-[#ccff00]' : 'bg-white/20'}`} />
              </span>
            </div>

            {/* Inner scrollable area restored — separate window scroll */}
            <div 
              ref={scrollContainerRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="max-h-[55vh] md:max-h-[50vh] overflow-y-auto scrollbar-hide overscroll-contain"
              data-lenis-prevent
            >
              <div className="flex flex-col gap-0 p-3 md:p-6">
                {faqs.map((faq, i) => {
                  const isOpen = openIndex === i;
                  return (
                    <div key={i} className="border-b border-white/[0.06] flex flex-col group/faq last:border-b-0">
                      <button 
                        onClick={() => toggleAccordion(i)}
                        className="flex justify-between items-center w-full py-4 md:py-7 group text-left outline-none hover:bg-white/[0.02] transition-colors rounded-xl px-4"
                      >
                        <div className="flex items-center gap-4">
                          <span className={`font-mono text-[10px] md:text-xs transition-colors duration-300 ${isOpen ? 'text-[#ccff00]' : 'text-white/15'}`}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <h3 className={`font-display font-bold text-base md:text-xl tracking-tight transition-all duration-300 ${isOpen ? 'text-white translate-x-1' : 'text-gray-400 group-hover:text-white'}`}>
                            {faq.q}
                          </h3>
                        </div>
                        
                        {/* Transforming Physical Crosshair Node */}
                        <div className="relative w-5 h-5 md:w-7 md:h-7 ml-3 shrink-0 flex items-center justify-center">
                           <motion.div 
                             initial={false}
                             animate={{ rotate: isOpen ? 135 : 0 }}
                             transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                             className="absolute inset-0 flex items-center justify-center pointer-events-none"
                           >
                              <span className={`absolute w-full h-[1.5px] transition-colors duration-300 ${isOpen ? 'bg-[#ccff00]' : 'bg-white/30 group-hover/faq:bg-white'}`} />
                              <span className={`absolute h-full w-[1.5px] transition-colors duration-300 ${isOpen ? 'bg-[#ccff00]' : 'bg-white/30 group-hover/faq:bg-white'}`} />
                           </motion.div>
                        </div>
                      </button>
                      
                      {/* Liquid DOM Tension Hooks */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                             <p className="font-sans text-gray-400 text-sm md:text-[15px] leading-relaxed pb-6 pt-2 px-4 md:px-8 ml-8 md:ml-10 border-l-[2px] border-[#ccff00]/60 bg-gradient-to-r from-white/[0.02] to-transparent">
                               {faq.a}
                             </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom fade */}
            <div className="h-8 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none -mt-8 relative z-10" />
          </div>
       </div>
    </section>
  );
}
