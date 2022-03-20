import { useSelector } from "react-redux";
import DesktopBody from "../desktop-components/DesktopBody";
import DesktopHeader from "../desktop-components/DesktopHeader";
import KrokiBody from "../desktop-components/kroki/KrokiBody";
import { pages } from "../store/page";
import styles from "./DesktopLandscapeApp.module.css";

const DesktopLandscapeApp = (props) => {
  const activePage = useSelector((state) => state.activePage.name);

  let content = <DesktopBody />;
  if (activePage === pages.KROKI) {
    content = <KrokiBody />;
  }

  return (
    <div className={styles.app}>
      <DesktopHeader />
      {content}
    </div>
  );
};

export default DesktopLandscapeApp;
