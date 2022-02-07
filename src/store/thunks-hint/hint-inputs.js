import { hintsActions } from "../hints";

const hintInputsThunk = () => (dispatch, getState) => {
  dispatch(hintsActions.setOutput());
  const selectedSystems = getState().systems.selectedSystems;

  let hints = [];
  if (selectedSystems.output.xy === "bgs") {
    switch (selectedSystems.output.h) {
      case "geo":
        hints = [
          { xy: "bgs", h: "evrs" },
          { xy: "cs70", h: "balt" },
        ];
        break;

      case "evrs":
        hints = [
          { xy: "cs70", h: "balt" },
          { xy: "bgs", h: "geo" },
        ];
        break;

      case "balt":
        hints = [{ xy: "bgs", h: "evrs" }];
        break;
    }
  } else if (selectedSystems.output.xy === "cs70") {
    switch (selectedSystems.output.h) {
      case "geo":
        hints = [{ xy: "cs70", h: "balt" }];
        break;

      case "evrs":
        hints = [{ xy: "cs70", h: "balt" }];
        break;

      case "balt":
        hints = [
          { xy: "bgs", h: "evrs" },
          { xy: "bgs", h: "geo" },
        ];
        break;
    }
  }
  dispatch(hintsActions.setHints({ input: [], output: hints }));
};

export default hintInputsThunk;
