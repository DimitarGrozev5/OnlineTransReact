import { hintsActions } from "../hints";
import { systemsActions } from "../input-systems";

const hintOnSystemChangeThunk = (data) => (dispatch, getState) => {
  const selectedSystems = getState().systems.selectedSystems;

  if (data.system !== "variant") {
    let xy;
    let h;
    if (data.system === "xy") {
      xy = data.newValue;
      h = selectedSystems[data.inputOrOutput].h;
    } else {
      xy = selectedSystems[data.inputOrOutput].xy;
      h = data.newValue;
    }

    let hints = [];
    if (xy === "bgs") {
      if (h === "geo") {
        hints = [
          { xy: "bgs", h: "evrs" },
          { xy: "cs70", h: "balt" },
        ];
      } else if (h === "evrs") {
        hints = [{ xy: "cs70", h: "balt" }];
      }
    } else if (xy === "cs70") {
      hints = [
        { xy: "bgs", h: "evrs" },
        { xy: "bgs", h: "geo" },
      ];
    }

    dispatch(
      hintsActions.setHints({
        [data.inputOrOutput === 'input' ? 'output' : 'input']: hints,
      })
    );
  }

  dispatch(systemsActions.setSystem(data));
};

export default hintOnSystemChangeThunk;
