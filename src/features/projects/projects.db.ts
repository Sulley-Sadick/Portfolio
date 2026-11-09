import { projectImagePath } from "./projects.constants";
import type { ProjectType } from "./projects.contract.types";

/**
 * Add new portfolio entries here. Image files belong in `public/images/projects/`.
 */
export const PROJECTS: ProjectType[] = [
  {
    id: "whatsapp-product-catalog",
    sortOrder: 1,
    featured: true,
    imgSrc: projectImagePath("whatsapp-product-catalog.png"),
    title: "WhatsApp Product Catalog",
    link: "https://whatsapp-product-catalog.vercel.app",
    repo: "https://github.com/Sulley-Sadick/whatsapp-product-catalog",
    description:
      "A product catalog built for a mobile-phone retailer. Visitors browse device listings with images and specifications, then place orders through integrated WhatsApp messaging—streamlining discovery and purchase without a separate checkout flow.",
    categories: ["Web Development", "E-Commerce", "Mobile and Automation"],
    tags: ["JavaScript", "CSS", "HTML"],
  },
  {
    id: "weather-app",
    sortOrder: 2,
    featured: true,
    imgSrc: projectImagePath("weather-app.png"),
    title: "Weather App",
    link: "https://weather-app-kappa-dun-38.vercel.app",
    repo: "https://github.com/Sulley-Sadick/Weather-App",
    description:
      "A weather application that uses the browser geolocation API on load to show conditions for the user’s current area, with search for any location. Displays temperature, humidity, precipitation, wind, and related forecast details in a clear layout.",
    categories: ["Web Development"],
    tags: ["JavaScript", "CSS", "HTML"],
  },
];
