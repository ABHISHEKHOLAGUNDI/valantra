"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { playClickSound, playHoverSound } from "@/utils/audio";

const faqs = [
  { q: "What defines your architecture?", a: "We strictly engineer Next.js Server Components bound to raw WebGL contexts. It results in brutal 60FPS fluid interactions with First Contentful Paints hovering near 0ms." },
  { q: "Do you use templates?", a: "Negative. Every structural component, GSAP math timeline, and GLSL fluid shader is coded entirely from scratch specifically mapped to your brand’s aggressive aesthetic matrix." },
  { q: "What is your typical turnaround?", a: "Complete monolithic deployments average 4-6 weeks depending on WebGL complexity, 3D render limits, and backend serverless agentic integrations." },
  { q: "How do we initialize a project?", a: "Trigger the contact sequence interface. We will execute a direct high-frequency discovery transmission with your stakeholders within 12 hours." }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (i: number) => {
    playClickSound();
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="relative bg-[#000000] w-full pt-10 pb-32 px-6 md:px-20 z-40 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
         <ScrollReveal>
           <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-white drop-shadow-xl border-l-4 border-white pl-6">
             Operational <br/> <span className="text-white/50">Intel.</span>
           </h2>
         </ScrollReveal>

         <div className="flex flex-col gap-0 border-t border-white/10 mt-10">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="border-b border-white/10 flex flex-col group/faq">
                  <button 
                    onClick={() => toggleAccordion(i)}
                    onMouseEnter={playHoverSound}
                    className="flex justify-between items-center w-full py-8 md:py-12 group text-left outline-none hover:bg-white/[0.02] transition-colors"
                  >
                    <h3 className={`font-display font-bold text-xl md:text-3xl tracking-tight transition-all duration-300 px-4 ${isOpen ? 'text-white translate-x-3' : 'text-gray-400 group-hover:text-white'}`}>
                      {faq.q}
                    </h3>
                    
                    {/* Transforming Physical Crosshair Node */}
                    <div className="relative w-8 h-8 md:w-10 md:h-10 ml-6 shrink-0 flex items-center justify-center mr-4">
                       <motion.div 
                         initial={false}
                         animate={{ rotate: isOpen ? 135 : 0 }}
                         transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                         className="absolute inset-0 flex items-center justify-center pointer-events-none"
                       >
                          <span className={`absolute w-full h-[2px] transition-colors duration-300 ${isOpen ? 'bg-white' : 'bg-white/50 group-hover/faq:bg-white'}`} />
                          <span className={`absolute h-full w-[2px] transition-colors duration-300 ${isOpen ? 'bg-white' : 'bg-white/50 group-hover/faq:bg-white'}`} />
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
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden bg-white/[0.02]"
                      >
                         <p className="font-sans text-gray-400 text-sm md:text-lg leading-relaxed pb-12 pt-4 px-4 md:px-8 max-w-3xl border-l-[3px] border-[#ccff00] ml-4 md:ml-4 my-4 bg-gradient-to-r from-white/5 to-transparent">
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
    </section>
  );
}
