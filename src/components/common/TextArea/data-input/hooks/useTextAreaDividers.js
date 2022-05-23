import { useEffect, useState } from "react";

export const useTextAreaDividers = () => {
  // Initial dividers
  let initDividers = [
    {
      regex: " ",
      regexAlt: " ",
      caption: "Интервал",
      on: true,
      name: "mode-space",
    },
    {
      regex: "\\|",
      regexAlt: "\\|",
      caption: "Черта |",
      on: true,
      name: "mode-line",
    },
    {
      regex: ",",
      regexAlt: ",",
      caption: "Запетая",
      on: true,
      name: "mode-comma",
    },
    {
      regex: "Tab",
      regexAlt: "\\t",
      caption: "Таб",
      on: true,
      name: "mode-tab",
    },
  ];

  // Set dividers state
  const [allowedDividers, setAllowedDividers] = useState(initDividers);

  // Set handler
  const toggleDividerHandler = (index) => {
    setAllowedDividers((dividers) => {
      const divs = [...dividers];
      divs[index] = { ...divs[index], on: !dividers[index].on };
      return divs;
    });
  };

  // On first load get saved dividers from localStorige
  useEffect(() => {
    const cookieDividers = localStorage.getItem("Dividers");
    if (cookieDividers) {
      try {
        setAllowedDividers(JSON.parse(cookieDividers));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return [allowedDividers, toggleDividerHandler];
};
