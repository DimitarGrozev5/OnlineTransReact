import React, { useReducer } from "react";
import appStateReducer from "../reducers/app-state-reducer";

export const buildHardCodedContextData = () => {
  const coordinateSystemsObj = new Map();
  coordinateSystemsObj.set("bgs", {
    name: "bgs",
    caption: "БГС 2005",
    variants: [
      {
        name: "cad",
        caption: "Кадастрална",
      },
    ],
  });
  coordinateSystemsObj.set("cs70", {
    name: "cs70",
    caption: "КС 1970",
    variants: [
      {
        name: "k3",
        caption: "К3",
      },
      {
        name: "k5",
        caption: "К5",
      },
      {
        name: "k7",
        caption: "К7",
      },
      {
        name: "k9",
        caption: "К9",
      },
    ],
  });

  const heightSystems = new Map();
  heightSystems.set("geo", {
    name: "geo",
    caption: "Геодезични височини",
  });
  heightSystems.set("evrs", {
    name: "evrs",
    caption: "EVRS 2007",
  });
  heightSystems.set("balt", {
    name: "balt",
    caption: "Балтийска",
  });

  const coordinateSystems = Array.from(coordinateSystemsObj.values());

  return {
    heightSystems: Array.from(heightSystems.values()),
    coordinateSystems,
    getVariants: (system) => coordinateSystemsObj.get(system).variants,
    selectedInputCS: "bgs",
    changeInputCS: () => {},
    selectedInputVariantCS: null,
    changeInputVarinatCS: () => {},
    selectedInputHS: "geo",
    changeInputHS: () => {},

    selectedOutputCS: "bgs",
    changeOutputCS: () => {},
    selectedOutputVariantCS: null,
    changeOutputVarinatCS: () => {},
    selectedOutputHS: "geo",
    changeOutputHS: () => {},

    inputData: null,
    outputData: null,
  };
};
const SystemsContext = React.createContext(buildHardCodedContextData());

export const SystemsContextProvider = (props) => {
  const rows = new Map();
  rows.set("1", new Map());
  rows.set("2", new Map());
  rows.set("3", new Map());
  rows.get("1").set("1", "1");
  rows.get("1").set("2", "4819022.273");
  rows.get("1").set("3", "653885.519");
  rows.get("1").set("4", "324.391");
  rows.get("1").set("5", "ograda");
  rows.get("2").set("1", "1");
  rows.get("2").set("2", "4819022.273");
  rows.get("2").set("3", "653885.519");
  rows.get("2").set("4", "324.391");
  rows.get("2").set("5", "ograda");
  rows.get("3").set("1", "1");
  rows.get("3").set("2", "4819022.273");
  rows.get("3").set("3", "653885.519");
  rows.get("3").set("4", "324.391");
  rows.get("3").set("5", "ograda");

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
      {props.children}
    </SystemsContext.Provider>
  );
};

export default SystemsContext;
