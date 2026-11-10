import { Outlet, useLocation } from "react-router";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollDirectionProvider } from "../../providers/ScrollDirectionProvider";
import { useSmoothScroll } from "../hooks/useSmoothScroll/useSmoothScroll";
import { SeoHead } from "../seo/SeoHead";
import { StructuredData } from "../seo/StructuredData";

export function AppLayout() {
  const { pathname } = useLocation();
  useSmoothScroll({ syncHashOnMount: true });

  return (
    <ScrollDirectionProvider>
      <SeoHead pathname={pathname} />
      <StructuredData />
      <div className="min-h-screen w-full">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </ScrollDirectionProvider>
  );
}
