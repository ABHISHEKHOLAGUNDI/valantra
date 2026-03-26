import StoreClient from "./StoreClient";
import ScrollReveal from "./ScrollReveal";

export default function StoreSection() {
  return (
    <section id="store" className="relative bg-[#000000] w-full min-h-[100dvh] pt-48 px-6 md:px-20 overflow-clip border-t border-white/5">
      <div className="absolute inset-0 bg-noise opacity-15 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal className="mb-24">
           <h1 className="font-display text-6xl md:text-[8vw] font-black uppercase tracking-tighter mix-blend-difference leading-[0.9]">
             The <br/><span className="text-[#00f0ff]">Arsenal.</span>
           </h1>
           <p className="mt-8 text-gray-400 font-sans max-w-xl text-lg md:text-xl border-l-[3px] border-[#00f0ff]/50 pl-6 bg-gradient-to-r from-white/5 to-transparent p-4">
             We don't build brochures. We engineer scalable, hyper-optimized digital platforms customized strictly for your organizational matrix.
           </p>
        </ScrollReveal>

        <StoreClient />
      </div>
    </section>
  );
}
