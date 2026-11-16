import { Suspense } from "react";
import { Route, Routes } from "react-router";

import { AppLayout } from "./shared/layouts/AppLayout";
import { lazyNamed } from "./shared/utils/lazyNamed";
import { HomePage } from "./pages/home/HomePage";

const AboutPage = lazyNamed(
  () => import("./pages/about/AboutPage"),
  "AboutPage",
);

const ContactPage = lazyNamed(
  () => import("./pages/contact/ContactPage"),
  "ContactPage",
);

export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="about"
          element={
            <Suspense fallback={null}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={null}>
              <ContactPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}