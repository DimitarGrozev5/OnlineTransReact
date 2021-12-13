import React, { useReducer } from "react";

import "./App.css";
import MobilePortraitApp from "./app-layouts/MobilePortraitApp";
import SystemsContext, {
  buildHardCodedContextData,
} from "./store/systems-context";
import useWindowSize from "./hooks/use-window-size";
import appStateReducer from "./reducers/app-state-reducer";

function App() {
  const windowSize = useWindowSize();

  const rows = new Map();
  rows.set("1", new Map());
  rows.set("2", new Map());
  rows.set("3", new Map());
  rows.get("1").set("1", 1);
  rows.get("1").set("2", 2);
  rows.get("1").set("3", 3);
  rows.get("1").set("4", 4);
  rows.get("1").set("5", 5);
  rows.get("2").set("1", 1);
  rows.get("2").set("2", 2);
  rows.get("2").set("3", 3);
  rows.get("2").set("4", 4);
  rows.get("2").set("5", 5);
  rows.get("3").set("1", 1);
  rows.get("3").set("2", 2);
  rows.get("3").set("3", 3);
  rows.get("3").set("4", 4);
  rows.get("3").set("5", 5);

  const [appState, dispatch] = useReducer(appStateReducer, {
    selectedInputCS: "bgs",
    selectedInputVariantCS: "cad",
    selectedInputHS: "geo",
    selectedOutputCS: "cs70",
    selectedOutputVariantCS: null,
    selectedOutputHS: "balt",
    // inputData: new Map(),
    inputData: rows,
    outputData: null,
  });

  //Mobile portrait app
  let content = <MobilePortraitApp />;

  return (
    <SystemsContext.Provider
      value={{
        ...buildHardCodedContextData(),
        selectedInputCS: appState.selectedInputCS,
        changeInputCS: (target) =>
          dispatch({ type: "UPDATE_INPUT_CS", value: target }),
        selectedInputVariantCS: appState.selectedInputVariantCS,
        changeInputVariantCS: (target) =>
          dispatch({ type: "UPDATE_INPUT_VARIANT_CS", value: target }),
        selectedInputHS: appState.selectedInputHS,
        changeInputHS: (target) =>
          dispatch({ type: "UPDATE_INPUT_HS", value: target }),

        selectedOutputCS: appState.selectedOutputCS,
        changeOutputCS: (target) =>
          dispatch({ type: "UPDATE_OUTPUT_CS", value: target }),
        selectedOutputVariantCS: appState.selectedOutputVariantCS,
        changeOutputVariantCS: (target) =>
          dispatch({ type: "UPDATE_OUTPUT_VARIANT_CS", value: target }),
        selectedOutputHS: appState.selectedOutputHS,
        changeOutputHS: (target) =>
          dispatch({ type: "UPDATE_OUTPUT_HS", value: target }),

        inputData: rows,
        outputData: null,
      }}
    >
      {content}
    </SystemsContext.Provider>
  );
}

export default App;
