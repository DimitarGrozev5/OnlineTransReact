import { hintsActions } from "../hintsSlice";
import { systemsActions } from "../systemsSlice";
import hintInputsThunk from "./hint-inputs";
import hintOutputsThunk from "./hint-outputs";

// Important!!!
// In the first version once the systems are set, the hints stop showing
// Currently I have disabled that and the hints will show indefinetly
// To return to the first version uncomment the lines below

const setSystemThunk = (data) => (dispatch, getState) => {
  // const hints = getState().hints;

  dispatch(systemsActions.setSystem(data));

  if (data.inputOrOutput === "input") {
    // dispatch(hintsActions.setInput());
    dispatch(hintsActions.setHints({ input: [] }));
  }

  if (data.inputOrOutput === "output") {
    // dispatch(hintsActions.setOutput());
    dispatch(hintsActions.setHints({ output: [] }));
  }

  if (data.inputOrOutput === "input" /* && !hints.outputIsSet */) {
    dispatch(hintOutputsThunk());
  } else if (data.inputOrOutput === "output" /* && !hints.inputIsSet */) {
    dispatch(hintInputsThunk());
  }
};

export default setSystemThunk;
