import type { ProfessionalJourneyType } from "./about.contract.types";
import { journeyImagePath } from "./journey.constants";

/**
 * Add career and learning milestones here. Logos belong in `public/images/journey/`.
 * Set `featured: true` on entries that should appear on the home page preview.
 */
export const PROFESSIONAL_JOURNEY: ProfessionalJourneyType[] = [
  {
    cardId: 1,
    featured: true,
    organization: "ALX Africa",
    role: "Frontend Development",
    logo: journeyImagePath("alx.png"),
    locationType: "Online",
    period: {
      start: "September 2025",
      end: "Feb 2026",
    },
    achievements: [
      "Completed ALX’s intensive frontend track with a focus on React, TypeScript, and production-style workflows.",
      "Practiced component design, routing, and state patterns that carry directly into this portfolio and featured apps.",
      "Applied peer review, sprint-style delivery, and documentation habits from the program to real project repos.",
      "Strengthened debugging, Git collaboration, and responsive UI work across varied screen sizes.",
    ],
  },
  {
    cardId: 2,
    featured: true,
    organization: "ALX Africa",
    role: "Professional Foundations",
    logo: journeyImagePath("alx.png"),
    locationType: "Online",
    period: {
      start: "June 2025",
      end: "September 2025",
    },
    achievements: [
      "Completed ALX Professional Foundations with emphasis on communication, accountability, and remote teamwork.",
      "Practiced structured problem-solving, feedback, and time management in a fast-paced learner cohort.",
      "Built habits around goal setting, presentation, and professional etiquette for tech workplaces.",
      "Prepared for technical programs by pairing soft skills with consistent, deadline-driven study.",
    ],
  },
  {
    cardId: 3,
    organization: "Udemy",
    role: "JavaScript — The Complete Guide (Jonas Schmedtmann)",
    logo: journeyImagePath("udemy.png"),
    locationType: "Online",
    period: {
      start: 2023,
      end: 2024,
    },
    achievements: [
      "Studied modern JavaScript fundamentals, ES6+ syntax, and browser APIs through Jonas Schmedtmann’s complete course.",
      "Practiced functions, objects, arrays, async patterns, and DOM manipulation as the base for later React work.",
      "Built small exercises and assignments that reinforced how scripts power interactive pages before framework study.",
      "Connected core JS concepts to portfolio projects such as the weather app and WhatsApp product catalog.",
    ],
  },
  {
    cardId: 4,
    featured: true,
    organization: "Personal projects",
    role: "Front-End Developer",
    locationType: "Remote",
    period: {
      start: 2024,
      end: "Present",
    },
    achievements: [
      "Shipped a WhatsApp product catalog for a mobile retailer—browse listings and order through integrated chat.",
      "Built a geolocation-aware weather app with search, forecast details, and a clear mobile-friendly layout.",
      "Deployed both apps on Vercel with public GitHub repos; stack aligns with HTML, CSS, and JavaScript in projects.",
    ],
  },
];
