import Logo from "./Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List of cities</p>
      <Footer></Footer>
    </div>
  );
}

export default Sidebar;
