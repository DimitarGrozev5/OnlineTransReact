import MobileHeader from "../components/mobile-components/MobileHeader";
import MobileBody from "../components/mobile-components/MobileBody";
import MobileNavigation from "../components/mobile-components/MobileNavigation";

import classes from "./MobilePortraitApp.module.css";
import { useState } from "react";

const MobilePortraitApp = (props) => {
  const [activePage, setActivePage] = useState("3");

  const changeActivePageHandler = (target) => {
    setActivePage(target);
  }

  return (
    <div className={classes.app}>
      <MobileHeader />
      <MobileBody activePage={activePage} />
      <MobileNavigation activePage={activePage} onChangeActivePage={changeActivePageHandler} />
    </div>
  );
};

export default MobilePortraitApp;
