import React from "react";

import "./App.css";
import MobilePortraitApp from "./app-layouts/MobilePortraitApp";
import useWindowSize from "./hooks/use-window-size";
import { Provider } from "react-redux";
import store from "./store/index";

function App() {
  // eslint-disable-next-line
  const windowSize = useWindowSize();

  //Mobile portrait app
  let content = <MobilePortraitApp />;

  return (
    <Provider store={store}>
      {content}
    </Provider>
  );
}

export default App;
