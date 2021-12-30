import React, { /*useMemo,*/ useReducer } from "react";
//import { nanoid } from "nanoid";
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
  // const rows = useMemo(() => {
  //   return [
  //     {
  //       id: nanoid(),
  //       fields: [
  //         {
  //           id: nanoid(),
  //           value: "1",
  //         },
  //         {
  //           id: nanoid(),
  //           value: "4819022.273",
  //         },
  //         {
  //           id: nanoid(),
  //           value: "653885.519",
  //         },
  //         {
  //           id: nanoid(),
  //           value: "1324.391",
  //         },
  //         {
  //           id: nanoid(),
  //           value: "ograda",
  //         },
  //       ],
  //     },
  //     {
  //       id: nanoid(),
  //       fields: [
  //         {
  //           id: nanoid(),
  //           value: "1",
  //         },
  //         {
  //           id: nanoid(),
  //           value: "4819022.273",
  //         },
  //         {
  //           id: nanoid(),
  //           value: "653885.519",
  //         },
  //         {
  //           id: nanoid(),
  //           value: "1324.391",
  //         },
  //         {
  //           id: nanoid(),
  //           value: "ograda",
  //         },
  //       ],
  //     },
  //     {
  //       id: nanoid(),
  //       fields: [
  //         {
  //           id: nanoid(),
  //           value: "1",
  //         },
  //         {
  //           id: nanoid(),
  //           value: "4819022.273",
  //         },
  //         {
  //           id: nanoid(),
  //           value: "653885.519",
  //         },
  //         {
  //           id: nanoid(),
  //           value: "1324.391",
  //         },
  //         {
  //           id: nanoid(),
  //           value: "ograda",
  //         },
  //       ],
  //     },
  //   ];
  // }, []);
  const ind = null;

  const [appState, dispatch] = useReducer(appStateReducer, {
    selectedInputCS: "bgs",
    selectedInputVariantCS: "cad",
    selectedInputHS: "geo",
    selectedOutputCS: "cs70",
    selectedOutputVariantCS: null,
    selectedOutputHS: "balt",
    // inputData: new Map(),
    inputData: null,
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

        inputData: ind,
        updateRange: (rangeObject) => {
          dispatch({
            type: "UPDATE_SELECTION",
            value: rangeObject,
          });
        },
        makeFieldEditable: (targetFieldId) => {
          dispatch({
            type: "MAKE_FIELD_EDITABLE",
            value: targetFieldId,
          });
        },

        outputData: null,
      }}
    >
      {props.children}
    </SystemsContext.Provider>
  );
};

export default SystemsContext;
