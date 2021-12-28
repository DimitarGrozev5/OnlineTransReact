import { useEffect } from "react";

const useGetInput = (callbackFn) => {
  //useEffect(() => {
  const events = {
    onBeforeInput: (event) => {
      event.preventDefault();
      callbackFn({
        type: "input",
        value: event.data,
      });
    },
    onKeyDown: (event) => {
      event.preventDefault();
      //Don't trigger a callback if the Shift key is the only one pressed
      if (event.shiftKey && event.key === "Shift") {
        return;
      }
      //Handle Enter
      if (event.key === "Enter") {
        callbackFn({
          type: "enter",
          value: event.key,
        });
      }
      if (event.ctrlKey && event.altKey) {
        callbackFn({
          type: "control",
          value: event.key,
        });
      } else {
        callbackFn({
          type: "input",
          value: event.key,
        });
      }
    },
    onCopy: (event) => {},
    onPaste: (event) => {},
    onCut: (event) => {},
  };

  return events;

  // const targetElement = fieldRef.current;
  // events.forEach((event) => {
  //   targetElement.addEventListener(event.name, event.handler);
  // });

  //   return () => {
  //     events.forEach((event) => {
  //       targetElement.removeEventListener(event.name, event.handler);
  //     });
  //   };
  // }, [fieldRef, callbackFn]);
};

export default useGetInput;
