import { Link } from "react-router";

import { routes } from "../../../routes/routes";
import { aboutService } from "../../../../features/about/about.service";

export function NavbarBrand() {
  const developer = aboutService.getDeveloper();

  return (
    <div className="flex items-center gap-5">
      <div>
        <p>IMAGE</p>
      </div>
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
