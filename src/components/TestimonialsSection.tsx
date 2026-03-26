"use client";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  { quote: "Valantra completely obliterated our expectations.", author: "CEO, Nexus" },
  { quote: "Their brutalist approach and absolute obsession with 60fps scrolling is unmatched.", author: "CTO, Void Sys" },
  { quote: "We asked for a standard digital portfolio. They delivered a fully-weaponized digital presence.", author: "Founder, Hyperion" },
  { quote: "The customized AI integrations they built saved us 4,000 hours of manual labor.", author: "Lead Eng, QD" },
];

export default function TestimonialsSection() {
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative bg-[#000000] w-full min-h-[100dvh] pt-24 md:pt-48 pb-20 md:pb-32 overflow-clip flex flex-col justify-center border-t border-white/5">
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none"></div>

      <ScrollReveal className="mb-12 md:mb-24 px-6 md:px-20 z-10 text-center flex flex-col items-center">
         <h1 className="font-display text-4xl md:text-[8vw] lg:text-[7vw] font-black uppercase tracking-tighter mix-blend-difference leading-[0.85]">
           Don't take <br/>
           <span className="text-[#bf00ff]">Our Word For It.</span>
         </h1>
      </ScrollReveal>
      
      {/* Pure CSS infinite Marquee that pauses on hover (Art Director Overhaul) */}
      <div className="relative w-full py-10 md:py-16 flex items-center bg-[#050505] border-y border-white/5 overflow-hidden group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[200px] md:h-[300px] bg-[#bf00ff]/10 blur-[100px] md:blur-[150px] pointer-events-none" />
        
        {/* Left/Right fading masks */}
        <div className="absolute left-0 top-0 bottom-0 w-[15vw] bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[15vw] bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Seamless dual-track marquee */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-hover:scale-[0.98] transition-transform duration-1000">
          
          {/* Track 1 */}
          <div className="flex gap-4 md:gap-8 px-2 md:px-4 shrink-0">
            {duplicatedTestimonials.map((t, i) => (
              <div 
                key={`t1-${i}`} 
                className="w-[300px] md:w-[450px] shrink-0 p-8 md:p-12 bg-white/5 border border-white/10 hover:border-[#bf00ff]/50 hover:bg-white/10 rounded-[2rem] backdrop-blur-3xl transition-all duration-300 flex flex-col justify-between gap-8 md:gap-12 hover:-translate-y-2 cursor-pointer"
              >
                 <p className="font-display text-2xl md:text-3xl font-bold leading-[1.1] tracking-tight text-white/90">"{t.quote}"</p>
                 <div className="flex items-center gap-4 md:gap-6">
                   <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-black border border-[#bf00ff]/50 flex items-center justify-center shrink-0">
                     <span className="font-sans text-[#bf00ff] font-black text-lg md:text-xl">{t.author.charAt(0)}</span>
                   </div>
                   <div>
                      <p className="font-sans text-[10px] md:text-sm tracking-widest uppercase block text-white font-bold">{t.author}</p>
                      <p className="font-sans text-[9px] md:text-xs uppercase text-[#bf00ff] font-black mt-1">Verified Client</p>
                   </div>
                 </div>
              </div>
            ))}
          </div>

          {/* Track 2 (Duplicate for seamless loop) */}
          <div className="flex gap-4 md:gap-8 px-2 md:px-4 shrink-0">
            {duplicatedTestimonials.map((t, i) => (
              <div 
                key={`t2-${i}`} 
                className="w-[300px] md:w-[450px] shrink-0 p-8 md:p-12 bg-white/5 border border-white/10 hover:border-[#bf00ff]/50 hover:bg-white/10 rounded-[2rem] backdrop-blur-3xl transition-all duration-300 flex flex-col justify-between gap-8 md:gap-12 hover:-translate-y-2 cursor-pointer"
              >
                 <p className="font-display text-2xl md:text-3xl font-bold leading-[1.1] tracking-tight text-white/90">"{t.quote}"</p>
                 <div className="flex items-center gap-4 md:gap-6">
                   <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-black border border-[#bf00ff]/50 flex items-center justify-center shrink-0">
                     <span className="font-sans text-[#bf00ff] font-black text-lg md:text-xl">{t.author.charAt(0)}</span>
                   </div>
                   <div>
                      <p className="font-sans text-[10px] md:text-sm tracking-widest uppercase block text-white font-bold">{t.author}</p>
                      <p className="font-sans text-[9px] md:text-xs uppercase text-[#bf00ff] font-black mt-1">Verified Client</p>
                   </div>
                 </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
