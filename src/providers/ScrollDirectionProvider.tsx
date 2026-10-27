import { createContext, useContext, useEffect, useRef, useState } from "react";
import { LuArrowUpToLine } from "react-icons/lu";

import { Visibility } from "../shared/ui/primitive/Visibility";
import { Button } from "../shared/ui/primitive/Button/components/Button";

type ScrollDirectionContextValue = {
  direction: "Top" | "Down";
  current: number;
  previous: number;
};

export const ScrollDirectionContext =
  createContext<ScrollDirectionContextValue | null>(null);

function GoToTop() {
  const { direction, current: currentScroll } = useScrollDirectionContext();

  return (
    <Visibility show={direction === "Top" && currentScroll > 300}>
      <div className="fixed right-0 bottom-2 border border-red-500 pr-5">
        <Button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <LuArrowUpToLine />
        </Button>
      </div>
    </Visibility>
  );
}

export function ScrollDirectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scroll, setScroll] = useState({ current: 0, previous: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const direction =
    scroll.current > scroll.previous ? ("Down" as const) : ("Top" as const);

  useEffect(() => {
    const timeoutId = timeoutRef.current;

    const handleScroll = function () {
      const docElement = document.documentElement;
      const body = document.body;

      if (!body) return;

      const scrollTop = docElement.scrollTop || body.scrollTop;

      timeoutRef.current = setTimeout(() => {
        setScroll((prev) => ({ previous: prev.current, current: scrollTop }));
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <ScrollDirectionContext.Provider
      value={{ direction, previous: scroll.previous, current: scroll.current }}
    >
      <GoToTop />
      {children}
    </ScrollDirectionContext.Provider>
  );
}

export const useScrollDirectionContext = function () {
  const ctx = useContext(ScrollDirectionContext);

  if (!ctx)
    throw new Error(
      "useScrollDirectionContext must be used within ScrollDirectionProvider",
    );

  return ctx;
};
