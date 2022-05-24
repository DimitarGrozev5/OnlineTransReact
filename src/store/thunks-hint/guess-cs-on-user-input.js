import { hintsActions } from "../hintsSlice";
import { pointIsInBoundry } from "./helpers/point-is-in-boundry";
import { boundries } from "./helpers/systems-boundries";

const guessCsThunk = (firstLine) => (dispatch, getState) => {
  const hintsSlice = getState().hints;
  const inputSystem = getState().systems.selectedSystems.input;

  if (firstLine.length === 1 && firstLine[0] === "") {
    dispatch(hintsActions.clearTyping());
    return;
  }

  if (hintsSlice.typingHintIsSet) {
    return;
  }

  // If there less that two fields then do nothing because there are no coorinates
  if (firstLine.length < 2) {
    if (hintsSlice.inputIsSet && hintsSlice.outputIsSet) {
      dispatch(hintsActions.setHints({ input: [], output: [] }));
    }
    return;
  }

  // Get the X and Y coordinates
  let x = firstLine[1];
  let y = firstLine[2];

  // If there are only two fields, they may be X and Y
  if (firstLine.length === 2) {
    x = firstLine[0];
    y = firstLine[1];
  }

  // Check if X && Y are numbers
  const numRegEx = /^[0-9]+\.{0,1}[0-9]*/;
  if (!numRegEx.test(x) || !numRegEx.test(y)) {
    return;
  }

  // Coherese X and Y
  x = +x;
  y = +y;

  // Check if the point is one of the Variant boundries
  // If so add it to the rawHints array
  const boundriesArr = Array.from(Object.entries(boundries));
  const rawHints = boundriesArr.reduce((hints, [system, boundry]) => {
    if (pointIsInBoundry(x, y, boundry)) {
      return [...hints, system];
    }
    return hints;
  }, []);

  // Create an array of hint objects for the dispatch function
  const hints = rawHints.reduce((allHints, hint) => {
    // If the selected input system matches the entered coordinates, do not show hints

    if (hint === "cad" && inputSystem.xy !== "bgs") {
      return [
        ...allHints,
        {
          xy: "bgs",
          h: "geo",
        },
        {
          xy: "bgs",
          h: "evrs",
        },
      ];
    } else if (
      ["k3", "k5", "k7", "k9"].includes(hint) &&
      inputSystem.variant !== hint
    ) {
      return [
        ...allHints,
        {
          xy: "cs70",
          variant: hint,
          h: "balt",
        },
      ];
    }
    return allHints;
  }, []);

  // If the hints array is empty do not dispatch an action
  hints.length && dispatch(hintsActions.setTyping());
  hints.length && dispatch(hintsActions.setHints({ input: hints, output: [] }));
};

export default guessCsThunk;
