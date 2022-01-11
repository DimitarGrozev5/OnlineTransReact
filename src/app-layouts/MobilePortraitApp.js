import MobileHeader from "../components/mobile-components/MobileHeader";
import MobileBody from "../components/mobile-components/MobileBody";
import MobileNavigation from "../components/mobile-components/MobileNavigation";

import classes from "./MobilePortraitApp.module.css";
import { useContext, useState } from "react";
import SystemsContext from "../store/systems-context";

const MobilePortraitApp = (props) => {
  const [activePage, setActivePage] = useState("1");

  const changeActivePageHandler = (target) => {
    setActivePage(target);
  };

  const ctx = useContext(SystemsContext);

  const inputCs = classes[`i-${ctx.selectedInputCS}`];
  const outputCs = classes[`o-${ctx.selectedOutputCS}`];
  const inputHs = classes[`i-${ctx.selectedInputHS}`];
  const outputHs = classes[`o-${ctx.selectedOutputHS}`];
  const page = classes[`page-${activePage}`]

  return (
    <div
      className={`${classes.app} ${inputCs} ${outputCs} ${inputHs} ${outputHs} ${page}`}
    >
      <MobileHeader />
      <MobileBody activePage={activePage} />
      <MobileNavigation
        activePage={activePage}
        onChangeActivePage={changeActivePageHandler}
      />
    </div>
  );
};

export default MobilePortraitApp;
