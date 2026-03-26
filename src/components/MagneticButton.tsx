"use client";
import { useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

import { playHoverSound, playClickSound } from "@/utils/audio";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function MagneticButton({ children, onClick, className = "", type = "button", ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const midX = (e.clientX - left) - width / 2;
    const midY = (e.clientY - top) - height / 2;
    x.set(midX * 0.3);
    y.set(midY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      role="button"
      aria-label="Interactive interactive physical button"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHoverSound}
      style={{ x: springX, y: springY }}
      className={`group relative inline-flex items-center justify-center isolation-auto will-change-transform overflow-hidden ${className}`}
      {...(props as any)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-all duration-1000 ease-in-out pointer-events-none mix-blend-overlay z-10" />
      {children}
    </motion.button>
  );
}
