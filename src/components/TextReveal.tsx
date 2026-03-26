"use client";
import { motion } from "framer-motion";

export default function TextReveal({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "150%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
        style={{ transformOrigin: "bottom center" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
