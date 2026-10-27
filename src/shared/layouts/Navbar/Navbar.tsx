import { AnimatePresence, motion, type MotionProps } from "motion/react";
import { useLocation } from "react-router";

import type { FramerAnimatePositionProps } from "../../ui/Framer/framer.types";
import { Backdrop } from "../../ui/primitive/Backdrop";
import { FramerAnimatePosition } from "../../ui/Framer/components/FramerAnimatePosition";
import { cn } from "../../utils/cn";
import { type ComponentProps } from "react";
import { NAVLINKS } from "./constants";
import { Link, StyledDotLink } from "../../ui/primitive/Button/IconLink";
import { motionVariants } from "../../ui/Framer/utils/motion";
import { routes } from "../../routes/routes";

type MobileNavbarProps = {
  isMenuOpen: boolean;
  close: () => void;
  captureRef: (index?: number) => <T>(ref: T | null) => void;
} & Omit<FramerAnimatePositionProps, "children">;

const navVariants = motionVariants({
  hidden: { x: "100%" },
  show: {
    height: "fit-content",
    transition: { stiffness: 50, ease: "easeIn" },
  },
});

export function MobileNavbar({
  className,
  close,
  captureRef,
  isMenuOpen,
  ...props
}: MobileNavbarProps) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <Backdrop className="top-18 lg:hidden">
          <FramerAnimatePosition
            variants={navVariants}
            animate="show"
            className={cn(
              className,
              "fixed right-0 mx-auto flex h-screen w-screen max-w-6/10 justify-end overflow-hidden rounded-l-2xl text-center backdrop-blur-md",
            )}
            {...props}
          >
            <div
              ref={captureRef(1)}
              className="bg-muted border-muted-secondary grid h-[calc(100dvh-4.5rem)] w-full max-w-sm grid-rows-[1fr_auto] border-l px-4 py-5"
            >
              <div className="h-full">
                <ul className="grid h-fit gap-y-6">
                  {NAVLINKS.map((navlink) => (
                    <NavLink
                      key={navlink.path}
                      onClick={close}
                      className="bg-transparent py-2"
                      {...navlink}
                    />
                  ))}
                  <li>
                    <div className="w-full border border-white/5"></div>
                  </li>
                </ul>
              </div>
              <StyledDotLink
                href={routes.contact}
                onClick={close}
                className="bg-accent text-muted"
              >
                Contact
              </StyledDotLink>
            </div>
          </FramerAnimatePosition>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

export const DesktopNavbar = function ({
  className,
  ...props
}: MotionProps & ComponentProps<"ul">) {
  return (
    <motion.ul className={cn("hidden lg:flex lg:gap-1", className)} {...props}>
      {NAVLINKS.map((navlink) => (
        <NavLink key={navlink.path} {...navlink} />
      ))}
    </motion.ul>
  );
};

const NavLink = function ({
  className,
  title,
  path,
  ...props
}: { title: string; path: string } & MotionProps & ComponentProps<"li">) {
  const { pathname } = useLocation();

  const active = pathname === path;

  return (
    <li {...props}>
      <Link
        href={path}
        hover="accent"
        x="center"
        y="center"
        className={cn(active ? "bg-transparent outline-none" : "", className)}
        variant={active ? "accent-light" : "none"}
      >
        {title}
      </Link>
    </li>
  );
};
