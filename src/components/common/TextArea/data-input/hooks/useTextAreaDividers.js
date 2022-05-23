import { useEffect, useState } from "react";

export const useTextAreaDividers = (setTextareaDisplayMode) => {
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

  // The display mode changes automatically if only one divider is selected
  useEffect(() => {
    const dividersOn = allowedDividers
      .filter((div) => div.on)
      .map((div) => div.name);

    if (dividersOn.length === 1) {
      setTextareaDisplayMode(dividersOn[0]);
    } else {
      setTextareaDisplayMode("mode-tab");
    }

    // Save new dividers to localStorage if the user approved cookies
    // The timeout provides a buffer for multiple divider changes
    // before the state is saved to local storage
    // The Effect clears the timeout if the component is rebuild
    const saveDividers = setTimeout(() => {
      if (localStorage.getItem("Cookie confirmed") === "confirmed") {
        localStorage.setItem("Dividers", JSON.stringify(allowedDividers));
      }
    }, 1000);

    return () => clearTimeout(saveDividers);
  }, [allowedDividers]);

  return [allowedDividers, toggleDividerHandler];
};
