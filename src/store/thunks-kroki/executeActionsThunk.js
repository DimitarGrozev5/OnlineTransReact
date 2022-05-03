import { commandExecutor } from "../../desktop-components/kroki/command-parser/commandExecutor";
import { krokiActions } from "../kroki";
import { testCommandThunk } from "./testCommandThunk";

const executeActionsThunk = () => (dispatch, getState) => {
  let state = getState().kroki;

  // Get actions
  const actions = state.actions;

  // Calcualte new points
  const initState = [
    {
      pointDataObj: state.pointDataObj,
      pointDataArr: state.pointDataArr,
      lines: state.lines,
    },
    [],
  ];
  const reducer = (prev, cmd) => {
    const newSnP = commandExecutor(prev[0], cmd);
    return [newSnP[0], [...prev[1], newSnP[1]]];
  };
  const newStateAndPatches = actions.reduce(reducer, initState);

  // Dispatch new points and reverse actions
  dispatch(krokiActions.updateStateAndPatches(newStateAndPatches));

  // Run next command
  dispatch(testCommandThunk());
};

export default executeActionsThunk;
