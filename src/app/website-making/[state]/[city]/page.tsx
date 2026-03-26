import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCityRoutes, getLocationData } from "@/lib/data/locations";

import Hero from "@/components/Hero";
import AdvantageSection from "@/components/AdvantageSection";
import WorkfolioSection from "@/components/WorkfolioSection";
import StoreSection from "@/components/StoreSection";
import TechStackSection from "@/components/TechStackSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SilhouetteReveal from "@/components/SilhouetteReveal";
import ContactSection from "@/components/ContactSection";

interface Props {
  params: Promise<{
    state: string;
    city: string;
  }>;
}

export async function generateStaticParams() {
  const routes = getAllCityRoutes();
  return routes.map((route) => ({
    state: route.state,
    city: route.city,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city } = await params;
  const locationData = getLocationData(state, city);

  if (!locationData) {
    return {
      title: "Not Found",
    };
  }

  const cityName = locationData.city.name;
  const stateName = locationData.state.name;
  
  return {
    title: `Best Website Making Agency in ${cityName}, ${stateName} | Valantra Studio`,
    description: `Looking for the best website making agency in ${cityName}? Valantra Studio engineers high-performance, fullstack websites and SEO-optimized digital platforms to dominate your market.`,
    alternates: {
      canonical: `/website-making/${state}/${city}`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { state, city } = await params;
  const locationData = getLocationData(state, city);

  if (!locationData) {
    notFound();
  }

  const locationProp = {
    city: locationData.city.name,
    state: locationData.state.name,
  };

  return (
    <main className="relative bg-[#000000] w-full text-white overflow-clip">
      <Hero location={locationProp} />
      <AdvantageSection location={locationProp} />
      <WorkfolioSection />
      <StoreSection />
      <TechStackSection />
      <TestimonialsSection />
      <SilhouetteReveal />
      <ContactSection />
    </main>
  );
}
