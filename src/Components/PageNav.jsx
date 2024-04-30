import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../components/Logo";
import { useAuth } from "../context/FakeAuthContext";

export default function PageNav() {
  const { isAuthenticated } = useAuth();
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
          {isAuthenticated && (
            <NavLink to="/app" className={styles.ctaLink}>
              App
            </NavLink>
          )}
          {!isAuthenticated && (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
