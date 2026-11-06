import { Link } from "react-router";

import { routes } from "../../../routes/routes";
import { aboutService } from "../../../../features/about/about.service";
import { Image } from "../../../ui/primitive/Image";

export function NavbarBrand() {
  const developer = aboutService.getDeveloper();

  return (
    <div className="flex items-center gap-3">
      <Image
        alt={developer.name}
        url={developer.avatar2}
        className="relative size-10 shrink-0 overflow-hidden rounded-full border border-muted-secondary p-0.5"
        imageClassName="object-cover object-[center_30%]"
      />
      <div>
        <Link to={routes.home}>
          <h1 className="text-xl font-bold uppercase">
            {developer.lastName.toUpperCase()}
          </h1>
        </Link>
      </div>
    </div>
  );
}

export default NavbarBrand;
