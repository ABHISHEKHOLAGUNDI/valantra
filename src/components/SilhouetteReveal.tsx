"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playClickSound, playHoverSound } from "@/utils/audio";

const faqs = [
  { q: "What defines your architecture?", a: "We strictly engineer Next.js Server Components bound to raw WebGL contexts. It results in brutal 60FPS fluid interactions with First Contentful Paints hovering near 0ms." },
  { q: "Do you use templates?", a: "Negative. Every structural component, GSAP math timeline, and GLSL fluid shader is coded entirely from scratch specifically mapped to your brand's aggressive aesthetic matrix." },
  { q: "What is your typical turnaround?", a: "Complete monolithic deployments average 4-6 weeks depending on WebGL complexity, 3D render limits, and backend serverless agentic integrations." },
  { q: "How do we initialize a project?", a: "Trigger the contact terminal sequence interface. We will execute a direct high-frequency discovery transmission with your stakeholders within 12 hours." }
];

export default function SilhouetteReveal() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (i: number) => {
    playClickSound();
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="relative bg-[#050505] w-full flex flex-col items-center justify-start border-t border-white/5 pb-32 overflow-hidden">
       {/* Background Atmospheric Noise */}
       <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none z-0" />
       
       {/* Typography Header */}
       <div className="relative w-full py-16 md:py-24 flex flex-col items-center justify-center z-10 overflow-hidden">
         <h1 
           className="font-display font-black text-[15vw] md:text-[10vw] leading-[0.85] tracking-tighter uppercase text-center 
                      text-transparent bg-clip-text bg-gradient-to-b from-[#ccff00] to-[#ccff00]/20
                      drop-shadow-[0_0_80px_rgba(204,255,0,0.3)]"
         >
           OPERATIONAL <br/> INTEL.
         </h1>
       </div>

       {/* FAQ Accordion Array */}
       <div className="relative z-40 w-full max-w-4xl mx-auto px-6 md:px-20">
          <div className="flex flex-col gap-0 border-t border-white/10 bg-[#050505]/80 backdrop-blur-md rounded-[2rem] p-4 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
             {faqs.map((faq, i) => {
               const isOpen = openIndex === i;
               return (
                 <div key={i} className="border-b border-white/10 flex flex-col group/faq last:border-b-0">
                   <button 
                     onClick={() => toggleAccordion(i)}
                     onMouseEnter={playHoverSound}
                     className="flex justify-between items-center w-full py-6 md:py-10 group text-left outline-none hover:bg-white/[0.02] transition-colors rounded-xl px-4"
                   >
                     <h3 className={`font-display font-bold text-lg md:text-2xl tracking-tight transition-all duration-300 ${isOpen ? 'text-white translate-x-2' : 'text-gray-400 group-hover:text-white'}`}>
                       {faq.q}
                     </h3>
                     
                     {/* Transforming Physical Crosshair Node */}
                     <div className="relative w-6 h-6 md:w-8 md:h-8 ml-4 shrink-0 flex items-center justify-center">
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
                         className="overflow-hidden bg-white/[0.02] rounded-xl mb-4"
                       >
                          <p className="font-sans text-gray-400 text-sm md:text-base leading-relaxed pb-8 pt-4 px-6 md:px-8 border-l-[3px] border-[#ccff00] bg-gradient-to-r from-white/5 to-transparent">
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
