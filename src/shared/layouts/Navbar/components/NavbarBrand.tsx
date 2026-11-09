import { type MouseEvent } from "react";
import { Link, useLocation } from "react-router";

import { routes } from "../../../routes/routes";
import { aboutService } from "../../../../features/about/about.service";
import { useSmoothScroll } from "../../../hooks/useSmoothScroll/useSmoothScroll";
import { Image } from "../../../ui/primitive/Image";

export function NavbarBrand() {
  const developer = aboutService.getDeveloper();
  const { pathname } = useLocation();
  const { goToHomeTop } = useSmoothScroll();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === routes.home) {
      event.preventDefault();
      goToHomeTop();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Image
        alt={developer.name}
        url={developer.avatar2}
        className="border-muted-secondary relative size-10 shrink-0 overflow-hidden rounded-full border p-0.5"
        imageClassName="object-cover object-[center_30%]"
      />
      <div>
        <Link to={routes.home} onClick={handleClick}>
          <h1 className="text-xl font-bold uppercase">
            {developer.lastName.toUpperCase()}
          </h1>
        </Link>
      </div>
    </div>
  );
}

export default NavbarBrand;
