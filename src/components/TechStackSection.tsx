"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./ScrollReveal";
import { playHoverSound } from "@/utils/audio";
import { AnimatePresence, motion } from "framer-motion";

const orbData = [
  // Ring 1 (Inner) - Web Core
  { name: "Next.js", category: "Framework", initials: "NX", icon: "https://cdn.simpleicons.org/nextdotjs/white", ring: 1, color: "#ffffff" },
  { name: "React", category: "Library", initials: "RE", icon: "https://cdn.simpleicons.org/react/61DAFB", ring: 1, color: "#61dafb" },
  { name: "Tailwind", category: "Styling", initials: "TW", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", ring: 1, color: "#38bdf8" },
  { name: "TypeScript", category: "Language", initials: "TS", icon: "https://cdn.simpleicons.org/typescript/3178C6", ring: 1, color: "#3178c6" },
  { name: "Vercel", category: "Edge", initials: "VC", icon: "https://cdn.simpleicons.org/vercel/white", ring: 1, color: "#ffffff" },

  // Ring 2 (Middle) - Animation & Backend
  { name: "Node.js", category: "Runtime", initials: "NO", icon: "https://cdn.simpleicons.org/nodedotjs/339933", ring: 2, color: "#339933" },
  { name: "GSAP", category: "Physics", initials: "GS", icon: "https://cdn.simpleicons.org/greensock/88CE02", ring: 2, color: "#88ce02" },
  { name: "Framer", category: "Motion", initials: "FM", icon: "https://cdn.simpleicons.org/framer/0055FF", ring: 2, color: "#0055FF" },
  { name: "Three.js", category: "WebGL", initials: "T3", icon: "https://cdn.simpleicons.org/threedotjs/white", ring: 2, color: "#ffffff" },
  { name: "Supabase", category: "Database", initials: "SB", icon: "https://cdn.simpleicons.org/supabase/3ECF8E", ring: 2, color: "#3ecf8e" },
  { name: "Prisma", category: "ORM", initials: "PR", icon: "https://cdn.simpleicons.org/prisma/white", ring: 2, color: "#ffffff" },

  // Ring 3 (Outer) - AI/ML
  { name: "Python", category: "AI Logic", initials: "PY", icon: "https://cdn.simpleicons.org/python/3776AB", ring: 3, color: "#3776ab" },
  { name: "OpenAI", category: "LLM", initials: "OA", icon: "https://cdn.simpleicons.org/openai/white", ring: 3, color: "#ffffff" },
  { name: "TensorFlow", category: "Machine Learning", initials: "TF", icon: "https://cdn.simpleicons.org/tensorflow/FF6F00", ring: 3, color: "#ff6f00" },
  { name: "PyTorch", category: "Neural Nets", initials: "PT", icon: "https://cdn.simpleicons.org/pytorch/EE4C2C", ring: 3, color: "#ee4c2c" },
  { name: "Hugging Face", category: "AI Models", initials: "HF", icon: "https://cdn.simpleicons.org/huggingface/FFD21E", ring: 3, color: "#ffd21e" },
  { name: "LangChain", category: "Orchestration", initials: "LC", icon: "https://cdn.simpleicons.org/chainlink/2A5ADA", ring: 3, color: "#2a5ada" },
];

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopTimelines = useRef<gsap.core.Timeline[]>([]);
  const hoverTimelines = useRef<gsap.core.Tween[]>([]);
  const [activeNode, setActiveNode] = useState<typeof orbData[0] | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const nodes = gsap.utils.toArray('.mobile-node');
      nodes.forEach((node: any) => {
        gsap.to(node, {
          y: `random(-30, 30)`,
          x: `random(-10, 10)`,
          duration: `random(2, 4)`,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      });
      return;
    }

    const rings = [
      { id: 1, duration: 30, direction: 1 },
      { id: 2, duration: 40, direction: -1 },
      { id: 3, duration: 50, direction: 1 },
    ];

    desktopTimelines.current.forEach(tl => tl.kill());
    desktopTimelines.current = [];

    rings.forEach((ring) => {
      const ringEl = document.querySelector(`.orbit-ring-${ring.id}`);
      const contents = document.querySelectorAll(`.orbit-content-${ring.id}`);

      if (ringEl && contents.length) {
        const tlRing = gsap.to(ringEl, {
          rotation: 360 * ring.direction,
          duration: ring.duration,
          repeat: -1,
          ease: "none"
        });

        const tlContents = gsap.to(contents, {
          rotation: -360 * ring.direction,
          duration: ring.duration,
          repeat: -1,
          ease: "none"
        });

        // @ts-ignore
        desktopTimelines.current.push(tlRing, tlContents);
      }
    });

    return () => {
      desktopTimelines.current.forEach(tl => tl.kill());
    };
  }, [isMobile]);

  const handleOrbitalEnter = () => {
    if (isMobile) return;
    hoverTimelines.current.forEach(tw => tw.kill());
    hoverTimelines.current = desktopTimelines.current.map(tl => 
      gsap.to(tl, { timeScale: 0.1, duration: 1.5, ease: "power2.out" })
    );
  };

  const handleOrbitalLeave = () => {
    if (isMobile) return;
    setActiveNode(null);
    hoverTimelines.current.forEach(tw => tw.kill());
    hoverTimelines.current = desktopTimelines.current.map(tl => 
      gsap.to(tl, { timeScale: 1, duration: 1.5, ease: "power2.in" })
    );
  };

  const handleNodeHover = (node: typeof orbData[0]) => {
    if (isMobile) return;
    playHoverSound();
    setActiveNode(node);
  };

  return (
    <section ref={containerRef} className="relative bg-[#000000] w-full min-h-[100dvh] flex items-center justify-center border-t border-white/5 overflow-hidden z-40">
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none z-0" />

      {/* Massive 3D Background Typography Matrix */}
      <ScrollReveal className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <h2 className="font-display text-[22vw] md:text-[16vw] font-black uppercase tracking-tighter leading-[0.8] will-change-transform text-center select-none">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white/40 via-white/10 to-transparent block mb-10" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.05)' }}>
            WE ARE <br/> GOOD AT.
          </span>
        </h2>
      </ScrollReveal>

      {/* Mobile Vertical Floating Cloud */}
      {isMobile && (
        <div className="relative z-30 w-full flex flex-wrap content-center justify-center gap-6 px-6 py-20 mt-10">
          {orbData.map((node, i) => (
            <div 
              key={i} 
              className="mobile-node relative w-20 h-20 rounded-full bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.02)] overflow-hidden"
              style={{ boxShadow: `0 0 20px ${node.color}20` }}
            >
               {imgErrors[node.name] ? (
                  <span className="font-display font-black text-lg text-white" style={{ textShadow: `0 0 10px ${node.color}` }}>{node.initials}</span>
               ) : (
                  <img src={node.icon} alt={node.name} className="w-10 h-10 object-contain drop-shadow-md" onError={() => setImgErrors(p => ({...p, [node.name]: true}))} />
               )}
            </div>
          ))}
        </div>
      )}

      {/* Desktop Orbital System */}
      {!isMobile && (
        <div 
          className="relative z-30 w-full flex items-center justify-center py-20"
          onMouseEnter={handleOrbitalEnter}
          onMouseLeave={handleOrbitalLeave}
        >
          {/* Dynamic Core Orb */}
          <motion.div 
             animate={{ 
               borderColor: activeNode ? `${activeNode.color}60` : "#ccff0050",
               boxShadow: activeNode ? `0 0 120px ${activeNode.color}50` : "0 0 120px rgba(204,255,0,0.3)"
             }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-48 md:h-48 rounded-full bg-black/80 border z-20 flex flex-col items-center justify-center backdrop-blur-3xl overflow-hidden"
          >
             <AnimatePresence mode="wait">
               {activeNode ? (
                 <motion.div
                   key={activeNode.name}
                   initial={{ opacity: 0, scale: 0.8, y: 10 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.8, y: -10 }}
                   transition={{ duration: 0.3 }}
                   className="flex flex-col items-center text-center px-4 z-10"
                 >
                   <span className="font-display font-black text-xl md:text-2xl uppercase tracking-tighter" style={{ color: activeNode.color, textShadow: `0 0 15px ${activeNode.color}` }}>
                     {activeNode.name}
                   </span>
                   <span className="font-sans text-[8px] md:text-[10px] tracking-[0.3em] font-bold text-gray-400 uppercase mt-2">
                     {activeNode.category}
                   </span>
                 </motion.div>
               ) : (
                 <motion.div
                   key="core"
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.8 }}
                   transition={{ duration: 0.3 }}
                   className="flex flex-col items-center justify-center z-10"
                 >
                   <span className="font-display font-black text-[#ccff00] text-lg md:text-xl tracking-[0.4em] uppercase drop-shadow-[0_0_15px_#ccff00] ml-2">VALANTRA</span>
                 </motion.div>
               )}
             </AnimatePresence>

             {/* Echo Ring emitting from inner core */}
             <motion.div 
               animate={{ borderColor: activeNode ? activeNode.color : "#ccff00", opacity: activeNode ? 0.4 : 0.2 }}
               transition={{ duration: 0.6 }}
               className="absolute inset-0 rounded-full border animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" 
             />
          </motion.div>

          {/* Render 3 Concentric Rings */}
          {[1, 2, 3].map((ringLevel) => {
            const nodesInRing = orbData.filter(n => n.ring === ringLevel);
            // Drastically reduced radii to lock the entire system violently into standard 1080p viewports
            const radius = ringLevel === 1 ? 160 : ringLevel === 2 ? 260 : 360;

            return (
              <div 
                key={ringLevel}
                className={`orbit-ring-${ringLevel} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 pointer-events-none`}
                style={{ width: radius * 2, height: radius * 2 }}
              >
                {nodesInRing.map((node, i) => {
                  const angle = (i / nodesInRing.length) * 360;
                  const rad = angle * (Math.PI / 180);
                  const x = radius * Math.cos(rad);
                  const y = radius * Math.sin(rad);

                  return (
                    <div 
                      key={node.name}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                    >
                      <motion.div 
                        onMouseEnter={() => handleNodeHover(node)}
                        whileHover={{ scale: 1.3, zIndex: 50, borderColor: node.color, backgroundColor: "rgba(255,255,255,0.1)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className={`orbit-content-${ringLevel} relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center cursor-pointer backdrop-blur-xl will-change-transform shadow-xl`}
                        style={{ boxShadow: activeNode?.name === node.name ? `0 0 30px ${node.color}50` : `0 0 10px rgba(255,255,255,0.02)` }}
                      >
                         {imgErrors[node.name] ? (
                            <span className="font-display font-black text-xs text-gray-300 uppercase tracking-tighter" style={{ textShadow: `0 0 8px ${node.color}` }}>
                              {node.initials}
                            </span>
                         ) : (
                            <img src={node.icon} alt={node.name} className="w-7 h-7 md:w-8 md:h-8 object-contain drop-shadow-md" onError={() => setImgErrors(p => ({...p, [node.name]: true}))} />
                         )}
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
