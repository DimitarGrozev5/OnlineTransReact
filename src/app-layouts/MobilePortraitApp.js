import MobileHeader from "../components/mobile-components/MobileHeader";
import MobileBody from "../components/mobile-components/MobileBody";
import MobileNavigation from "../components/mobile-components/MobileNavigation";

import classes from "./MobilePortraitApp.module.css";

const MobilePortraitApp = (props) => {
  return (
    <div className={classes.app}>
      <MobileHeader />
      <MobileBody activePage="1" />
      <MobileNavigation />
    </div>
  );
};

export default MobilePortraitApp;
