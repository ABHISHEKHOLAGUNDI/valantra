"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageTransition() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Only mount dimensions after hydration to prevent sever-mismatch SVG render faults.
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (dimensions.width === 0) return null;

  // Phase 20: Perfected Awwwards-style SVG bezier sweeping masks.
  const w = dimensions.width;
  const h = dimensions.height;
  
  // Start flat at the bottom, curving heavily downwards during the sweep up.
  const initialPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + (h * 0.5)} 0 ${h} L0 0`;
  // Target flat at the absolute top (zero coordinates).
  const targetPath = `M0 0 L${w} 0 L${w} 0 Q${w / 2} 0 0 0 L0 0`;

  return (
    <motion.div className="fixed inset-0 z-[999999] pointer-events-none flex items-center justify-center overflow-hidden">
      <svg className="absolute w-full h-[150vh] top-0" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <motion.path 
          initial={{ d: initialPath }}
          animate={{ d: targetPath }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          fill="#ccff00"
        />
      </svg>
      
      {/* Brand Identity masking sequence */}
      <motion.div 
         initial={{ opacity: 1, y: 0 }}
         animate={{ opacity: 0, y: -100 }}
         transition={{ delay: 0.1, duration: 0.8, ease: "circOut" }}
         className="font-display font-black text-6xl md:text-9xl uppercase tracking-tighter text-black mix-blend-exclusion absolute drop-shadow-2xl"
       >
          Valantra.
      </motion.div>
    </motion.div>
  );
}
