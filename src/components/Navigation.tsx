"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import MagneticButton from "./MagneticButton";
import { playHoverSound, playClickSound } from "@/utils/audio";

const HomeIcon = () => (<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>);
const WorkIcon = () => (<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const StoreIcon = () => (<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>);
const ContactIcon = () => (<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>);
const AdvantageIcon = () => (<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>);

export default function Navigation() {
  const [activeHash, setActiveHash] = useState("#home");
  const lenis = useLenis();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveHash(`#${entry.target.id}`);
        }
      });
    }, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    });

    const sections = ["home", "edge", "advantage", "workfolio", "store", "testimonials", "contact"];
    sections.forEach(sect => {
      const el = document.getElementById(sect);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const links = [
    { name: "Home", path: "#home", icon: <HomeIcon /> },
    { name: "Advantage", path: "#advantage", icon: <AdvantageIcon /> },
    { name: "Work", path: "#workfolio", icon: <WorkIcon /> },
    { name: "Arsenal", path: "#store", icon: <StoreIcon /> },
    { name: "Call", path: "#contact", icon: <ContactIcon /> },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    playClickSound(); // Output tactical acoustic hook
    if (lenis) {
      lenis.scrollTo(hash, { duration: 1.5 });
    } else {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
    window.history.pushState(null, "", hash);
  };

  return (
    <nav aria-label="Main Navigation Matrix">
      {/* Desktop Main Header Bounds */}
      <div className="hidden md:flex fixed top-0 w-full p-8 z-[99999] justify-between items-center pointer-events-none">
        <div className="font-display font-black text-3xl tracking-tighter text-white uppercase pointer-events-auto mix-blend-exclusion hover:scale-105 transition-transform">
          <a href="#home" aria-label="Return to Hero Environment" onMouseEnter={playHoverSound} onClick={(e) => handleSmoothScroll(e, "#home")}>Valantra.</a>
        </div>
        <div className="flex items-center gap-10 pointer-events-auto">
          <ul className="flex gap-8 font-sans text-xs font-bold tracking-widest uppercase text-white bg-white/5 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10 shadow-2xl" role="menubar">
            {links.filter(l => l.name !== "Call").map((link) => (
              <li key={link.name} className="relative group" role="none">
                <a 
                  href={link.path} 
                  role="menuitem"
                  aria-label={`Navigate explicitly to ${link.name}`}
                  onClick={(e) => handleSmoothScroll(e, link.path)}
                  onMouseEnter={playHoverSound}
                  className={`relative z-10 block transition-colors ${activeHash === link.path ? 'text-[#ccff00]' : 'text-gray-400 hover:text-white'}`}
                >
                   {link.name}
                </a>
                {activeHash === link.path && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#ccff00] rounded-full shadow-[0_0_10px_#ccff00]" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
          
          <MagneticButton className="px-8 py-4 bg-[#ccff00] text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-colors shadow-[0_0_40px_rgba(204,255,0,0.3)]">
             <a href="#contact" aria-label="Initiate contact protocol sequence" onClick={(e) => handleSmoothScroll(e, "#contact")} className="block w-full h-full">Start a Project</a>
          </MagneticButton>
        </div>
      </div>

      {/* Mobile Sticky CTA Platform Edge Focus */}
      <div className="md:hidden fixed bottom-[90px] left-4 right-4 z-[99998] pointer-events-auto">
         <a href="#contact" aria-label="Trigger quick contact sequence" onClick={(e) => handleSmoothScroll(e, "#contact")} className="w-full py-4 bg-[#ccff00] text-black font-black uppercase tracking-widest text-sm rounded-2xl shadow-[0_0_30px_rgba(204,255,0,0.4)] flex items-center justify-center hover:scale-[1.02] transition-transform active:scale-95">
           Book a Discovery Call →
         </a>
      </div>

      {/* Mobile OS Bottom Framework Bounds */}
      <div 
        role="navigation"
        aria-label="Mobile Bottom App Context"
        className="md:hidden fixed bottom-0 left-0 w-full bg-[#000000]/40 backdrop-blur-3xl saturate-[1.5] border-t border-white/10 z-[99999] px-4 pt-4 flex justify-around items-center pointer-events-auto"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
         {links.map((link) => {
           const isActive = activeHash === link.path;
           return (
             <a 
               key={link.name} 
               href={link.path} 
               aria-label={`Slide rapidly to ${link.name}`}
               onClick={(e) => handleSmoothScroll(e, link.path)}
               className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${isActive ? 'text-[#ccff00]' : 'text-white/40'}`}
             >
               <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-[#ccff00]/10 shadow-[0_0_20px_rgba(204,255,0,0.2)] scale-110' : 'scale-100'}`}>
                 {link.icon}
               </div>
               <span className="text-[10px] uppercase font-bold tracking-wider">{link.name}</span>
             </a>
           );
         })}
      </div>
    </nav>
  );
}
