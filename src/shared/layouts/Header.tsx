import { useState } from "react";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";

import { cn } from "../utils/cn";
import { NavbarBrand } from "./Navbar/components/NavbarBrand";
import { useAutoHide } from "../hooks/useAutoHide";
import { DesktopNavbar, MobileNavbar } from "./Navbar/Navbar";
import { Button } from "../ui/primitive/Button/components/Button";
import { Link } from "../ui/primitive/Button/IconLink";
import { routes } from "../routes/routes";
import { useScrollDirectionContext } from "../../providers/ScrollDirectionProvider";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { captureRef } = useAutoHide({
    close: () => setIsMenuOpen(false),
    isOpen: isMenuOpen,
    event: "click",
  });

  const { current: currentScroll } = useScrollDirectionContext();

  const ActionIcon = isMenuOpen ? IoCloseSharp : IoMenuSharp;

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
            className="p-0 text-2xl *:stroke-2 lg:hidden"
            onClick={() => setIsMenuOpen((a) => !a)}
            ref={captureRef(0)}
          >
            <ActionIcon />
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
        isMenuOpen={isMenuOpen}
        close={() => setIsMenuOpen(false)}
        captureRef={captureRef}
      />
    </>
  );
}
