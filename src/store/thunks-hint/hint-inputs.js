import { hintsActions } from "../hintsSlice";

const hintInputsThunk = () => (dispatch, getState) => {
  // dispatch(hintsActions.setOutput());
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

      default:
        hints = [];
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
        
      default:
        hints = [];
    }
  }
  dispatch(hintsActions.setHints({ input: hints, output: [] }));
};

export default hintInputsThunk;
