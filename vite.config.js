import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/Portfolio/" : "/",
  plugins: [tailwindcss()],
  build: {
    rolldownOptions: {
      input: {
        main: "index.html",
        about: "about.html",
        projects: "projects.html",
        contact: "contact.html",
      },
    },
  },
}));
