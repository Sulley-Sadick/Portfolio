import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import { AppLayout } from "./shared/layouts/AppLayout";
import { HomePage } from "./pages/home/HomePage";

const AboutPage = lazy(() =>
  import("./pages/about/AboutPage").then((module) => ({
    default: module.AboutPage,
  })),
);

const ContactPage = lazy(() =>
  import("./pages/contact/ContactPage").then((module) => ({
    default: module.ContactPage,
  })),
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
