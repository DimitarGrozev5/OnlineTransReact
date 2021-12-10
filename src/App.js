import React, { useState, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";
import MobilePortraitApp from "./app-layouts/MobilePortraitApp";

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

  //Mobile portrait app
  let content = <MobilePortraitApp />;

  return content;
}

export default App;
