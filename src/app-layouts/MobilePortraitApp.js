import MobileHeader from "../components/mobile-components/MobileHeader";
import MobileBody from "../components/mobile-components/MobileBody";
import MobileNavigation from "../components/mobile-components/MobileNavigation";

import classes from "./MobilePortraitApp.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import transformInputDataThunk from "../store/thunks/textarea-thunks/transform-input-data";

const MobilePortraitApp = () => {
  const dispatch = useDispatch();

  // The mobile app has 4 pages
  const [activePage, setActivePage] = useState("1");

  const changeActivePageHandler = (target) => {
    // When the user changes to the fourth page
    // the app automaticaly tries to transform the input data
    if (target === "4") {
      dispatch(transformInputDataThunk());
    }
    setActivePage(target);
  };

  // Setup css classes that reflect the selected cs and hs
  const selected = useSelector((state) => state.systems.selectedSystems);

  const inputCs = classes[`i-${selected.input.xy}`];
  const outputCs = classes[`o-${selected.output.xy}`];
  const inputHs = classes[`i-${selected.input.h}`];
  const outputHs = classes[`o-${selected.output.h}`];
  const page = classes[`page-${activePage}`];

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
