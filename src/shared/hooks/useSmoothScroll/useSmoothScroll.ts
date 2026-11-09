import { useCallback, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { routes } from "../../routes/routes";

type UseSmoothScrollOptions = {
  /** When true, scrolls to the URL hash after landing on the home page. */
  syncHashOnMount?: boolean;
  homePath?: string;
};

export function useSmoothScroll({
  syncHashOnMount = false,
  homePath = routes.home,
}: UseSmoothScrollOptions = {}) {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return false;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }, []);

  const goToHomeTop = useCallback(() => {
    if (pathname === homePath) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate({ pathname: homePath }, { replace: true });
      return;
    }

    navigate(homePath);
  }, [homePath, navigate, pathname]);

  const goToHomeSection = useCallback(
    (sectionId: string) => {
      if (pathname === homePath) {
        scrollToSection(sectionId);
        navigate({ pathname: homePath, hash: sectionId }, { replace: true });
        return;
      }

      navigate({ pathname: homePath, hash: sectionId });
    },
    [homePath, navigate, pathname, scrollToSection],
  );

  useLayoutEffect(() => {
    if (!syncHashOnMount || pathname !== homePath || !hash) return;

    const sectionId = hash.replace(/^#/, "");
    if (!sectionId) return;

    let attempts = 0;
    const maxAttempts = 24;

    const tryScroll = () => {
      if (scrollToSection(sectionId)) return;
      if (attempts >= maxAttempts) return;
      attempts += 1;
      requestAnimationFrame(tryScroll);
    };

    tryScroll();
  }, [syncHashOnMount, pathname, hash, homePath, scrollToSection]);

  return { scrollToSection, goToHomeSection, goToHomeTop };
}

export function isHomeTopActive(
  pathname: string,
  hash: string,
  homePath: string = routes.home,
): boolean {
  return pathname === homePath && !hash;
}

export function isHomeSectionActive(
  pathname: string,
  hash: string,
  sectionId: string,
  homePath: string = routes.home,
): boolean {
  return pathname === homePath && hash === `#${sectionId}`;
}
