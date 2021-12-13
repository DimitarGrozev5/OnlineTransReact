import React, { useReducer } from "react";

import "./App.css";
import MobilePortraitApp from "./app-layouts/MobilePortraitApp";
import { SystemsContextProvider } from "./store/systems-context";
import useWindowSize from "./hooks/use-window-size";

function App() {
  const windowSize = useWindowSize();

  //Mobile portrait app
  let content = <MobilePortraitApp />;

  return <SystemsContextProvider>{content}</SystemsContextProvider>;
}

export default App;
