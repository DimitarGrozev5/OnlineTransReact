import { commandExecutor } from "../../desktop-components/kroki/command-parser/commandExecutor";
import { commandParser } from "../../desktop-components/kroki/command-parser/commandParser";
import { krokiActions } from "../kroki";

const executeActionsThunk = () => (dispatch, getState) => {
  let state = getState().kroki;

  // Get actions
  const actions = state.actions;

  // Calcualte new points
  const initState = [
    {
      pointDataObj: state.pointDataObj,
      pointDataArr: state.pointDataArr,
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
  state = getState().kroki;
  const transformedData = state.pointDataArr.map(
    (id) => state.pointDataObj[id]
  );
  const newActions = commandParser(transformedData);

  // Add actions to store
  dispatch(krokiActions.updateActions(newActions));
};

export default executeActionsThunk;
