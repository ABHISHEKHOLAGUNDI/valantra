"use client";
import AdvancedCard from "./AdvancedCard";
import ScrollReveal from "./ScrollReveal";

export default function StoreClient() {
  const services = [
    { 
      id: "01", 
      name: "High-Performance Web Architecture", 
      label: "Infrastructure", 
      desc: "Award-winning brutalist UI driven by 60FPS fluid WebGL and React Server Components. First Contentful Paint approaching 0ms.",
      icon: <svg width="24" height="24" className="md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
    },
    { 
      id: "02", 
      name: "Custom AI Automation & Agents", 
      label: "Intelligence", 
      desc: "Autonomous agentic frameworks injected directly into your core operational matrix. Eliminate thousands of hours of global friction.",
      icon: <svg width="24" height="24" className="md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    },
    { 
      id: "03", 
      name: "Full-Stack Product Development", 
      label: "Platform", 
      desc: "End-to-end monolithic and microservice architecture. HIPAA-compliant SaaS dashboards, native wrappers, and secure database routing.",
      icon: <svg width="24" height="24" className="md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
    },
  ];

  return (
    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 pb-20 md:pb-32 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 md:px-0">
      {services.map((svc) => (
        <div key={svc.id} className="w-[85vw] md:w-auto shrink-0 snap-center">
          <ScrollReveal>
             {/* Phase 18: Holographic glowing borders via conic gradients */}
             <div className="relative p-[1px] md:p-[2px] overflow-hidden rounded-[2rem] md:rounded-[3rem] z-10 w-full h-[380px] md:h-[450px] lg:h-[500px] group/holo">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#00f0ff_360deg)] animate-[spin_4s_linear_infinite] opacity-[0.05] group-hover/holo:opacity-30 transition-opacity duration-700" />
               
               <AdvancedCard className="relative w-full h-full bg-[#050505] flex flex-col justify-between p-5 md:p-10 !rounded-[calc(2rem-2px)] md:!rounded-[calc(3rem-2px)]">
                  <div className="z-10 flex justify-between items-start" style={{ transform: "translateZ(30px)" }}>
                     <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                       {svc.icon}
                     </div>
                     <span className="font-sans text-[#00f0ff] px-3 md:px-4 py-1.5 md:py-2 border border-[#00f0ff]/30 rounded-full text-[9px] md:text-[10px] uppercase font-bold tracking-widest bg-black/50 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.2)] whitespace-nowrap">{svc.label}</span>
                  </div>

                  <div className="z-10 mt-auto" style={{ transform: "translateZ(60px)" }}>
                     <span className="font-display font-black text-4xl md:text-6xl text-white/5 mb-2 md:mb-4 block">{svc.id}</span>
                     <h2 className="font-display font-black text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight mb-3 md:mb-4 leading-[1.0] md:leading-[0.9] drop-shadow-lg">{svc.name}</h2>
                     <p className="font-sans text-gray-400 text-sm md:text-base font-medium leading-relaxed">{svc.desc}</p>
                  </div>
               </AdvancedCard>
             </div>
          </ScrollReveal>
        </div>
      ))}
    </div>
  );
}
