import React from "react";

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
    outputData: null
  };
};
const SystemsContext = React.createContext(buildHardCodedContextData());

export default SystemsContext;
