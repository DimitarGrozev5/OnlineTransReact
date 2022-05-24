import { hintsActions } from "../hintsSlice";

const hintOutputsThunk = () => (dispatch, getState) => {
  const selectedSystems = getState().systems.selectedSystems;

  let hints = [];
  if (selectedSystems.input.xy === "bgs") {
    switch (selectedSystems.input.h) {
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
  } else if (selectedSystems.input.xy === "cs70") {
    switch (selectedSystems.input.h) {
      case "geo":
        hints = [
          /* { xy: "cs70", h: "balt" } */
        ];
        break;

      case "evrs":
        hints = [
          /* { xy: "cs70", h: "balt" } */
        ];
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
  dispatch(hintsActions.setHints({ output: hints }));
};

export default hintOutputsThunk;
