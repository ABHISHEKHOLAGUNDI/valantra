import Hero from "@/components/Hero";
import AdvantageSection from "@/components/AdvantageSection";
import WorkfolioSection from "@/components/WorkfolioSection";
import StoreSection from "@/components/StoreSection";
import TechStackSection from "@/components/TechStackSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SilhouetteReveal from "@/components/SilhouetteReveal";
import ContactSection from "@/components/ContactSection";

export default function SinglePage() {
  return (
    <main className="relative bg-[#000000] w-full text-white overflow-clip">
      <Hero />
      <AdvantageSection />
      <WorkfolioSection />
      <StoreSection />
      <TechStackSection />
      <TestimonialsSection />
      <SilhouetteReveal />
      <ContactSection />
    </main>
  );
}
