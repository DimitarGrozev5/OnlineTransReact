import { applyAction } from "../../desktop-components/kroki/command-parser/apply-action";
import { reverseCommands } from "../../desktop-components/kroki/command-parser/reverse-command-creators";

const executeActionsThunk = () => (dispatch, getState) => {
  const state = getState().kroki;

  // Get actions
  const actions = state.actions;

  // Create reverse actions
  const reverseActions = reverseCommands(state, actions);

  // Calcualte new points
  const newPoints = actions.reduce(applyAction, state.pointData);
  console.log(newPoints);

  // Dispatch new points and reverse actions

  // Run next command
};

export default executeActionsThunk;
