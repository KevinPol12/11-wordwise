import Logo from "./Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/*The <Outlet/> is used to display the elements' contents of 
      a nested route*/}
      <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default Sidebar;
