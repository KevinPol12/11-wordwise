import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink>Cities</NavLink>
        </li>
        <li>
          <NavLink>Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
