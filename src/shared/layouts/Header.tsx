import { useCallback, useEffect, useRef, useState } from "react";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";

import { cn } from "../utils/cn";
import { NavbarBrand } from "./Navbar/components/NavbarBrand";
import { useAutoHide } from "../hooks/useAutoHide";
import { DesktopNavbar, MobileNavbar } from "./Navbar/Navbar";
import { Button } from "../ui/primitive/Button/components/Button";
import { Link } from "../ui/primitive/Button/IconLink";
import { routes } from "../routes/routes";
import { useScrollDirectionContext } from "../../providers/ScrollDirectionProvider";

const MOBILE_NAV_ID = "mobile-navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenuAndReturnFocus = useCallback(() => {
    setIsMenuOpen(false);
    queueMicrotask(() => menuButtonRef.current?.focus());
  }, []);

  const { captureRef } = useAutoHide({
    close: closeMenuAndReturnFocus,
    isOpen: isMenuOpen,
    event: "click",
  });

  const { current: currentScroll } = useScrollDirectionContext();

  const ActionIcon = isMenuOpen ? IoCloseSharp : IoMenuSharp;

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeMenuAndReturnFocus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen, closeMenuAndReturnFocus]);

  return (
    <>
      <header
        className={cn(
          "border-muted-secondary bg-muted fixed top-0 z-2000 flex w-full items-center px-6 py-4",
          (isMenuOpen || currentScroll > 2) &&
            "border-muted-secondary border-b shadow-sm",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <NavbarBrand />
          <Button
            ref={(node) => {
              menuButtonRef.current = node;
              captureRef(0)(node);
            }}
            className="p-0 text-2xl *:stroke-2 lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_NAV_ID}
          >
            <ActionIcon aria-hidden="true" />
          </Button>
          <DesktopNavbar />

          <Link
            href={routes.contact}
            className="hidden rounded-full px-6 py-2 hover:shadow-md lg:flex lg:items-center"
            variant="accent"
            animation="enlargeX"
          >
            Contact Me
          </Link>
        </div>
      </header>

      <MobileNavbar
        id={MOBILE_NAV_ID}
        isMenuOpen={isMenuOpen}
        close={closeMenuAndReturnFocus}
        captureRef={captureRef}
      />
    </>
  );
}
