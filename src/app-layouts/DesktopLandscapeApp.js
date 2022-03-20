import { useSelector } from "react-redux";
import DesktopBody from "../desktop-components/DesktopBody";
import DesktopHeader from "../desktop-components/DesktopHeader";
import styles from "./DesktopLandscapeApp.module.css";

const DesktopLandscapeApp = (props) => {
  const activePage = useSelector((state) => state.activePage);

  console.log(activePage);

  return (
    <div className={styles.app}>
      <DesktopHeader />
      <DesktopBody />
    </div>
  );
};

export default DesktopLandscapeApp;
