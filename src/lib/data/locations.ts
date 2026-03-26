export interface CityData {
  name: string;
  slug: string;
  modifiers: string[];
}

export interface StateData {
  name: string;
  slug: string;
  cities: CityData[];
}

export const locations: StateData[] = [
  {
    name: "Karnataka",
    slug: "karnataka",
    cities: [
      {
        name: "Bangalore",
        slug: "bangalore",
        modifiers: ["Silicon Valley of India", "Tech Startups", "IT Corridor"]
      },
      {
        name: "Mysore",
        slug: "mysore",
        modifiers: ["Heritage City", "Emerging Tech Hub", "Local Commerce"]
      },
      {
        name: "Hubli-Dharwad",
        slug: "hubli-dharwad",
        modifiers: ["Commercial Hub", "Twin City Businesses", "Industrial Sector"]
      },
      {
        name: "Gadag",
        slug: "gadag",
        modifiers: ["Growing Local Enterprises", "Regional Trade", "Textile & Agriculture Businesses"]
      },
      {
        name: "Mangalore",
        slug: "mangalore",
        modifiers: ["Port City Logistics", "Coastal High-Tech", "Healthcare & Education Hubs"]
      },
      {
        name: "Belagavi",
        slug: "belagavi",
        modifiers: ["Border State Industries", "Foundry & Manufacturing", "Fast-Paced Export Markets"]
      },
      {
        name: "Udupi",
        slug: "udupi",
        modifiers: ["Banking Sector", "Tourism Businesses", "Educational Institutes"]
      },
      {
        name: "Tumkur",
        slug: "tumkur",
        modifiers: ["Smart City Initiatives", "Industrial Manufacturing", "Educational Hubs"]
      }
    ]
  },
  {
    name: "Maharashtra",
    slug: "maharashtra",
    cities: [
      {
        name: "Mumbai",
        slug: "mumbai",
        modifiers: ["Financial Capital", "Corporate Enterprises", "Entertainment Industry"]
      },
      {
        name: "Pune",
        slug: "pune",
        modifiers: ["IT Parks", "Automobile Manufacturing", "Education Hubs"]
      }
    ]
  },
  {
    name: "Delhi",
    slug: "delhi",
    cities: [
      {
        name: "New Delhi",
        slug: "new-delhi",
        modifiers: ["National Capital Tech", "Government & Corporate", "Startup Ecosystem"]
      }
    ]
  },
  {
    name: "Tamil Nadu",
    slug: "tamil-nadu",
    cities: [
      {
        name: "Chennai",
        slug: "chennai",
        modifiers: ["SaaS Capital", "Automobile Hub", "Healthcare Sector"]
      },
      {
        name: "Coimbatore",
        slug: "coimbatore",
        modifiers: ["Textile Industry", "Manufacturing Excellence", "Emerging IT"]
      }
    ]
  },
  {
    name: "Telangana",
    slug: "telangana",
    cities: [
      {
        name: "Hyderabad",
        slug: "hyderabad",
        modifiers: ["Cyberabad IT Hub", "Pharmaceuticals", "Global AI Startups"]
      }
    ]
  }
];

// Helper functions for dynamic routing
export const getAllCityRoutes = () => {
  const routes: { state: string; city: string }[] = [];
  locations.forEach((state) => {
    state.cities.forEach((city) => {
      routes.push({ state: state.slug, city: city.slug });
    });
  });
  return routes;
};

export const getLocationData = (stateSlug: string, citySlug: string) => {
  const state = locations.find((s) => s.slug === stateSlug);
  if (!state) return null;
  const city = state.cities.find((c) => c.slug === citySlug);
  if (!city) return null;
  return { state, city };
};
