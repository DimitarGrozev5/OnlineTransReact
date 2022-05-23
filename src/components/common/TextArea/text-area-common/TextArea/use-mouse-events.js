import { useEffect } from "react";

export let dragHasHappened = {};
let latestClickCoordinates = {
  X: -100,
  Y: -100,
};

export const useMouseEvents = (
  elementRef,
  componentName,
  precisionInPixels = 0
) => {
  useEffect(() => {
    const refElement = elementRef.current;
    const mousedownHandler = (event) => {
      dragHasHappened[componentName] = false;
      latestClickCoordinates = {
        X: event.clientX,
        Y: event.clientY,
      };
    };
    const mousemoveHandler = (event) => {
      if (
        Math.abs(latestClickCoordinates.X - event.clientX) >
          precisionInPixels ||
        Math.abs(latestClickCoordinates.Y - event.clientY) > precisionInPixels
      ) {
        dragHasHappened[componentName] = true;
      }
    };

    dragHasHappened = { ...dragHasHappened, componentName: false };
    refElement && refElement.addEventListener("mousedown", mousedownHandler);
    refElement && refElement.addEventListener("mousemove", mousemoveHandler);

    return () => {
      refElement &&
        refElement.removeEventListener("mousedown", mousedownHandler);
      refElement &&
        refElement.removeEventListener("mousemove", mousemoveHandler);
    };
  }, [elementRef, precisionInPixels, componentName]);
};