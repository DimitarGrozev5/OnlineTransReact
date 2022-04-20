import { commandParser } from "../../desktop-components/kroki/command-parser/commandParser";
import { deleteMultiplePointsFromCommand } from "../../desktop-components/kroki/command-parser/deletePoints/delete-points-commands";
import { krokiActions } from "../kroki";

const executeActionsThunk = () => (dispatch, getState) => {
  let state = getState().kroki;

  // Get actions
  const actions = state.actions;

  // Calcualte new points
  const initState = [state.pointDataObj, state.pointDataArr, []];
  const reducer = (prevState, command) => {
    const newState = deleteMultiplePointsFromCommand(
      prevState[0],
      prevState[1],
      command
    );
    const reverseCommands = [...prevState[2], newState[2]];
    return [newState[0], newState[1], reverseCommands];
  };
  const newPoints = actions.reduce(reducer, initState);
  // console.log(newPoints);

  // Dispatch new points and reverse actions
  dispatch(krokiActions.updatePoints(newPoints));

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
