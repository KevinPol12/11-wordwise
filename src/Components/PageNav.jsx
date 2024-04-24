import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../components/Logo";

export default function PageNav() {
  /*Components go in a separate folder than pages for good practice*/
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        {/*NavLink return an "active" class for css formatting*/}
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
