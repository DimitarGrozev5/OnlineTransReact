import { hintsActions } from "../hints";
import { systemsActions } from "../input-systems";

const setSystemThunk = (data) => (dispatch, getState) => {
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
          { xy: "bgs", vaiant: 'cad', h: "evrs" },
          { xy: "cs70", h: "balt" },
        ];
      } else if (h === "evrs") {
        hints = [
          { xy: "bgs", vaiant: 'cad', h: "geo" },
          { xy: "cs70", h: "balt" },
        ];
      }
    } else if (xy === "cs70") {
      hints = [
        { xy: "bgs",  vaiant: 'cad', h: "evrs" },
        { xy: "bgs",  vaiant: 'cad', h: "geo" },
      ];
    }

    // dispatch(
    //   hintsActions.setHints({
    //     ["output"]: hints,
    //   })
    // );
  }

  dispatch(systemsActions.setSystem(data));
};

export default setSystemThunk;
