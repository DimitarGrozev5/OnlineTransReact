import { useState, useEffect, useCallback } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getDeviceTypeObject());

  function getDeviceTypeObject() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation =
      window.innerHeight > window.innerWidth ? "portrait" : "landscape";
    const minDimention = Math.min(width, height);
    let deviceType = "mobile";
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
  const handleWindowSizeChange = useCallback(() => {
    return setWindowSize(getDeviceTypeObject());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  return windowSize;
};

export default useWindowSize;
