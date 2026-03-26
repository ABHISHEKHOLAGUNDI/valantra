import { MetadataRoute } from "next";
import { getAllCityRoutes } from "@/lib/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://valantra.studio";
  const cityRoutes = getAllCityRoutes();

  const dynamicRoutes = cityRoutes.map((route) => ({
    url: `${baseUrl}/website-making/${route.state}/${route.city}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...dynamicRoutes,
  ];
}
