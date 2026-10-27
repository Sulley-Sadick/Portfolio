import { ContactLinks } from "./sections/ContactLinks";
import { ContactSection } from "./sections/ContactSection";

export function ContactPage() {
  return (
    <main className="min-h-app-height mx-auto mt-15 grid max-w-6xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-[auto_1fr]">
      <ContactLinks />
      <ContactSection />
    </main>
  );
}
