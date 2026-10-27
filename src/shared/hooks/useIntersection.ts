import { useEffect, useState } from "react";

import { useElRef } from "./useElRef";

export function useIntersection({
  rootMargin = "0px",
  threshold = 0.5,
  once,
}: {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
} = {}) {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const { refObject, ref } = useElRef();

  useEffect(() => {
    let observer: IntersectionObserver;

    requestAnimationFrame(() => {
      const currentRef = refObject.current;

      if (!(currentRef instanceof HTMLElement)) return;

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;

          setIsIntersecting(entry.isIntersecting);

          if (entry.isIntersecting && once) observer.unobserve(entry.target);
        },
        { threshold, rootMargin },
      );

      observer.observe(currentRef);
    });

    return () => {
      if (observer) observer.disconnect();
    };
  }, [refObject, rootMargin, threshold, once]);

  return { isIntersecting, ref };
}
