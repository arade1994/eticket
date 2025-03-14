import Link from "next/link";
import cx from "classnames";

import { NAVIGATION_LINKS } from "../../utils/constants";

import classes from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <aside className={classes.navigationContainer}>
      <nav className={classes.navigation}>
        {NAVIGATION_LINKS.map(({ href, label }, index) => (
          <Link
            key={href}
            className={cx(
              index === NAVIGATION_LINKS.length - 1 ? classes.marginTopAuto : ""
            )}
            href={href}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Navigation;
