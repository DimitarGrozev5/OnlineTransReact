import { commandParser } from "../../components/desktop-components/kroki/command-parser/commandParser";
import { krokiActions } from "../krokiSlice";

export const testCommandThunk = () => (dispatch, getState) => {
  // Run command
  const state = getState().kroki;
  const transformedData = state.pointDataArr.map(
    (id) => state.pointDataObj[id]
  );
  const newActions = commandParser(transformedData);
  // console.log(newActions);

  // Add actions to store
  newActions && dispatch(krokiActions.updateActions(newActions));
};
