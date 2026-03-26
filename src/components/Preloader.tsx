"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cinematic loader: quickly ramps to 85%, then slowly to 100% to simulate WebGL asset mounting.
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 600);
          return 100;
        }
        // Logistics: Fast boot, slow tail logic for perceived performance.
        const increment = prev < 85 ? Math.random() * 20 : Math.random() * 5;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%", filter: "blur(20px)" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999999] bg-[#000000] flex flex-col items-center justify-center text-white origin-top"
        >
          {/* Subtle noise over loader */}
          <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full max-w-[80vw] md:max-w-md">
            
            <div className="overflow-hidden mb-6">
              <motion.div 
                 initial={{ opacity: 0, y: "100%" }}
                 animate={{ opacity: 1, y: "0%" }}
                 transition={{ duration: 0.8, ease: "circOut" }}
                 className="font-display font-black text-6xl md:text-8xl leading-none tracking-tighter text-white/10"
              >
                {Math.floor(progress).toString().padStart(3, '0')}%
              </motion.div>
            </div>

            {/* Glowing progress bar */}
            <div className="h-[2px] w-full bg-white/10 overflow-hidden relative shadow-[0_0_20px_rgba(204,255,0,0.1)]">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#ccff00]/20 to-[#ccff00]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            
            <div className="mt-8 flex justify-between w-full font-sans text-[9px] md:text-xs tracking-[0.3em] uppercase text-white/40">
              <span className="animate-pulse">Initializing WebGL</span>
              <span className="text-[#ccff00]/80">Phase 05</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
