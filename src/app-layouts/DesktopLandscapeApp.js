import { useSelector } from "react-redux";
import DesktopBody from "../components/desktop-components/DesktopBody";
import DesktopHeader from "../components/desktop-components/DesktopHeader";
import KrokiBody from "../components/desktop-components/kroki/KrokiBody";
import { pages } from "../store/activePageSlice";
import styles from "./DesktopLandscapeApp.module.css";

const DesktopLandscapeApp = () => {
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
