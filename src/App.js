import React, { useState, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";
import MobilePortraitApp from "./app-layouts/MobilePortraitApp";
import SystemsContext, {
  buildHardCodedContextData,
} from "./components/store/systems-context";

function App() {
  const [windowSize, setWindowSize] = useState(getDeviceTypeObject());

  function getDeviceTypeObject() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation =
      window.innerHeight > window.innerWidth ? "portrait" : "landscape";
    const minDimention = Math.min(width, height);
    const deviceType = "mobile";
    if (minDimention > 767) {
      deviceType = "tablet";
    }
    if (width > 1024) {
      deviceType = "desktop";
    }

    return {
      isMobile: deviceType === "mobile",
      isTablet: deviceType === "tablet",
      isDesktop: deviceType === "desktop",
      isInPortrait: orientation === "portrait",
      isInLandscape: deviceType === "landscape",
    };
  }
  function handleWindowSizeChange() {
    return setWindowSize(getDeviceTypeObject());
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const [selectedInputCS, setSelectedInputCS] = useState("bgs");
  const [selectedInputVariantCS, setSelectedVariantInputCS] = useState(null);
  const [selectedInputHS, setSelectedInputHS] = useState("geo");

  //Mobile portrait app
  let content = <MobilePortraitApp />;

  return (
    <SystemsContext.Provider
      value={{
        ...buildHardCodedContextData(),
        selectedInputCS: selectedInputCS,
        changeInputCS: setSelectedInputCS,
        selectedInputVariantCS: selectedInputVariantCS,
        changeInputVariantCS: setSelectedVariantInputCS,
        selectedInputHS: selectedInputHS,
        changeInputHS: setSelectedInputHS
      }}
    >
      {content}
    </SystemsContext.Provider>
  );
}

export default App;
