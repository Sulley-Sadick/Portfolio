import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

type UseHashScrollToSectionOptions = {
  sectionId: string;
  maxAttempts?: number;
};

export function useHashScrollToSection({
  sectionId,
  maxAttempts = 24,
}: UseHashScrollToSectionOptions) {
  const { hash } = useLocation();

  useLayoutEffect(() => {
    const targetId = hash.replace(/^#/, "");
    if (targetId !== sectionId) return;

    const scrollToSection = () => {
      const target = document.getElementById(targetId);
      if (!target) return false;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (scrollToSection()) return;

    let attempts = 0;

    const tryScroll = () => {
      if (scrollToSection()) return;
      if (attempts >= maxAttempts) return;
      attempts += 1;
      requestAnimationFrame(tryScroll);
    };

    tryScroll();
  }, [hash, sectionId, maxAttempts]);
}
