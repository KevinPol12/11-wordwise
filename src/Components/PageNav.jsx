import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

export default function PageNav() {
  /*Components go in a separate folder than pages for good practice*/
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          {/*NavLink return an "active" class for css formatting*/}
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}
