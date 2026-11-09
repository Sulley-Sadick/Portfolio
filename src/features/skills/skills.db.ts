import { BiLogoVisualStudio } from "react-icons/bi";
import {
  SiCss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNpm,
  SiPnpm,
  SiReact,
  SiReactrouter,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

import type { SkillType } from "./skills.contract.types";
import { skillImagePath } from "./skills.constants";

/**
 * Edit categories and items here. Set `featured: true` on categories
 * whose skills should appear on the home preview grid.
 */
export const SKILLS: SkillType[] = [
  {
    featured: true,
    category: "Languages",
    items: [
      {
        title: "JavaScript",
        icon: SiJavascript,
        color: "text-yellow-400",
        description:
          "Runtime language for app logic, DOM updates, events, and async flows in the browser and Node.",
      },
      {
        title: "TypeScript",
        icon: SiTypescript,
        color: "text-sky-600",
        description:
          "Static types on top of JavaScript for safer edits, clearer APIs, and fewer production surprises.",
      },
    ],
  },
  {
    featured: true,
    category: "Markup & Styling",
    items: [
      {
        title: "HTML5",
        icon: SiHtml5,
        color: "text-orange-400",
        description:
          "Semantic structure, forms, and accessibility primitives that every UI is built on.",
      },
      {
        title: "CSS3",
        icon: SiCss,
        color: "text-sky-700",
        description:
          "Layout, responsiveness, motion, and visual design with modern selectors and cascade.",
      },
      {
        title: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "text-sky-600",
        description:
          "Utility classes for rapid layout, spacing, and theme-consistent styling in components.",
      },
    ],
  },
  {
    featured: true,
    category: "Frontend Frameworks",
    items: [
      {
        title: "React",
        icon: SiReact,
        color: "text-sky-400",
        description:
          "Component-based UI library for building interactive pages with hooks, state, and a declarative rendering model.",
      },
      {
        title: "Vite",
        icon: SiVite,
        color: "text-violet-400",
        description:
          "Fast dev server and optimized production builds for modern front-end projects with TypeScript support.",
      },
      {
        title: "React Router",
        icon: SiReactrouter,
        color: "text-red-500",
        description:
          "Declarative routes, nested layouts, loaders, and URL-driven navigation for multi-page React experiences.",
      },
    ],
  },
  {
    featured: true,
    category: "Version Control",
    items: [
      {
        title: "Git",
        icon: SiGit,
        color: "text-red-400",
        description:
          "Branching, commits, and merges to track changes, experiment safely, and collaborate on code history.",
      },
      {
        title: "GitHub",
        icon: SiGithub,
        color: "text-white",
        description:
          "Remote repositories, pull requests, reviews, and CI hooks for team delivery and open-source workflow.",
      },
    ],
  },
  {
    featured: true,
    category: "Package Managers",
    items: [
      {
        title: "NPM",
        icon: SiNpm,
        color: "text-red-600",
        description:
          "Installing dependencies, running scripts, and publishing packages in the Node ecosystem.",
      },
      {
        title: "PNPM",
        icon: SiPnpm,
        color: "text-blue-600",
        description:
          "Fast, disk-efficient installs via content-addressed storage and strict dependency linking.",
      },
    ],
  },
  {
    featured: true,
    category: "Editors & AI Tools",
    items: [
      {
        title: "VS Code",
        icon: BiLogoVisualStudio,
        color: "text-blue-500",
        description:
          "Daily editor for IntelliSense, debugging, integrated terminal, extensions, and Git workflows in one workspace.",
      },
      {
        title: "Cursor",
        logo: skillImagePath("cursor.png"),
        color: "text-neutral",
        description:
          "AI-native IDE for everyday development—writing and refactoring code, tracing bugs with context, navigating large projects, and applying multi-file edits without leaving the editor.",
      },
    ],
  },
];
