"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import { playStepSound, playSubmitSound, playBackToTopSound, playTypeSound } from "@/utils/audio";

const questions = [
  { id: 1, text: "Let's start with your name.", type: "text", placeholder: "John Doe" },
  { id: 2, text: "What organization do you represent?", type: "text", placeholder: "Acme Corp" },
  { id: 3, text: "What are we building together?", type: "text", placeholder: "AI Agents, WebGL, etc." },
  { id: 4, text: "What is your anticipated budget?", type: "text", placeholder: "$10k - $50k" },
  { id: 5, text: "How can we reach you?", type: "email", placeholder: "john@acme.com" },
];

export default function ContactSection() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Footer Sys Time Engine
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " " + now.toLocaleDateString('en-US', { timeZoneName: 'short' }).split(' ')[1]);
    };
    updateTime();
    const int = setInterval(updateTime, 1000);
    return () => clearInterval(int);
  }, []);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData[step]) return;

    if (step < questions.length - 1) {
      playStepSound();
      setStep(s => s + 1);
    } else {
      playSubmitSound();
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  const handleTop = () => {
    playBackToTopSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative bg-[#000000] w-full h-[100dvh] flex flex-col pt-20 border-t border-white/5 overflow-clip z-50">
      <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none z-0"></div>

      {/* Form Sequence Bounds */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 w-full max-w-4xl mx-auto z-10 relative mt-20 md:mt-0">
        {/* Progress Indicator */}
        {!isSuccess && (
          <div className="flex gap-2 md:gap-3 z-20 mb-8 md:mb-12 w-full">
            {questions.map((_, i) => (
              <div key={i} className={`h-1 transition-all duration-500 rounded-full ${i <= step ? 'w-10 md:w-16 bg-[#ccff00]' : 'w-3 md:w-4 bg-white/10'}`} />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form 
              key={step}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              onSubmit={handleNext}
              className="w-full flex flex-col gap-4 md:gap-6"
            >
              <label className="font-display text-3xl md:text-5xl lg:text-[4vw] font-black uppercase tracking-tighter leading-tight drop-shadow-xl text-white">
                {questions[step].text}
              </label>
              
              <div className="relative mt-4 md:mt-8 w-full">
                <input 
                  autoFocus
                  type={questions[step].type}
                  placeholder={questions[step].placeholder}
                  value={formData[step] || ""}
                  onChange={(e) => { playTypeSound(); setFormData({...formData, [step]: e.target.value}); }}
                  className="w-full bg-transparent border-b border-white/20 text-2xl md:text-4xl lg:text-5xl font-sans py-3 focus:outline-none focus:border-[#ccff00] transition-colors placeholder:text-white/10 text-white shadow-none rounded-none"
                />
              </div>
              
              <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-6 md:mt-10 z-20 gap-4 w-full">
                 <button 
                   type="button" 
                   onClick={() => { playStepSound(); setStep(s => Math.max(0, s - 1)); }}
                   className={`text-white/50 hover:text-white py-3 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors w-full md:w-auto ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                 >
                   ← Back
                 </button>
                 
                 <MagneticButton 
                   type="submit"
                   disabled={!formData[step] || isSubmitting}
                   className="w-full md:w-auto px-8 md:px-12 py-4 md:py-5 bg-white text-black hover:bg-[#ccff00] transition-colors rounded-2xl md:rounded-full font-black uppercase tracking-widest text-[10px] md:text-sm shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(204,255,0,0.4)] disabled:opacity-30 disabled:hover:bg-white flex items-center justify-center shrink-0"
                 >
                   {isSubmitting ? "Processing..." : step === questions.length - 1 ? "Initialize Sequence" : "Continue →"}
                 </MagneticButton>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{type: "spring", damping: 20}}
              className="text-center flex flex-col items-center gap-6 md:gap-8 bg-white/5 p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-[#ccff00]/30 backdrop-blur-3xl shadow-[0_0_50px_rgba(204,255,0,0.1)] w-full"
            >
               <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#ccff00]/10 border border-[#ccff00] flex items-center justify-center text-[#ccff00] text-3xl md:text-4xl">✓</div>
               <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter mix-blend-exclusion text-white">Transmission <br/> <span className="text-[#ccff00]">Received.</span></h2>
               <p className="text-white/70 font-sans text-xs md:text-sm tracking-wide uppercase font-bold">Agents stand ready.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Repositioned Final Universal Footer Array */}
      <div className="w-full px-6 md:px-12 mt-auto pb-6 z-20 border-t border-white/5 pt-6 bg-[#000000] shrink-0">
         <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-6 w-full max-w-screen-2xl mx-auto">
            <MagneticButton onClick={handleTop} className="px-6 py-3 bg-[#bf00ff] text-white hover:bg-white hover:text-black rounded-full uppercase font-black tracking-widest text-[10px] md:text-xs transition-colors shadow-[0_0_20px_rgba(191,0,255,0.2)]">
               Back to Terminal ↑
            </MagneticButton>
             
            <div className="flex flex-col gap-4 text-center md:text-right w-full md:w-auto items-center md:items-end">
               <div className="font-mono text-[#00f0ff] text-[10px] md:text-xs tracking-[0.2em] bg-[#00f0ff]/10 px-4 py-2 border border-[#00f0ff]/30 rounded-lg inline-flex items-center justify-between shadow-[0_0_20px_rgba(0,240,255,0.05)] w-full md:w-auto">
                 <span className="opacity-50 tracking-widest mr-4">SYS.TIME</span>
                 <span className="text-white font-bold">{time || "INITIALIZING..."}</span>
               </div>
               
               <div className="flex gap-4 md:gap-6 font-sans font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[10px] text-white/40 justify-center flex-wrap">
                  <a href="#" className="hover:text-[#bf00ff] transition-colors hover:-translate-y-1 duration-300">Twitter</a>
                  <a href="#" className="hover:text-[#bf00ff] transition-colors hover:-translate-y-1 duration-300">LinkedIn</a>
                  <a href="#" className="hover:text-[#bf00ff] transition-colors hover:-translate-y-1 duration-300">Instagram</a>
                  <a href="#" className="hover:text-[#bf00ff] transition-colors hover:-translate-y-1 duration-300">Awwwards</a>
               </div>
            </div>
         </div>

         <div className="border-t border-white/10 w-full pt-4 flex flex-col md:flex-row justify-between items-center gap-4 max-w-screen-2xl mx-auto">
           <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse shadow-[0_0_10px_#ccff00]" />
              <span className="font-display font-black text-white/30 text-base tracking-tighter uppercase whitespace-nowrap">Valantra Studio.</span>
           </div>
           <span className="font-sans text-[7px] md:text-[8px] tracking-[0.3em] text-white/30 uppercase text-center md:text-right w-full md:w-auto">
             &copy; {new Date().getFullYear()} Aiventra Technologies. Global Execution Confirmed.
           </span>
         </div>
      </div>
    </footer>
  );
}
