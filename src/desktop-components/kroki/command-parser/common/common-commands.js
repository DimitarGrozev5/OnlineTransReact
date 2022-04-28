import { produceWithPatches } from "@reduxjs/toolkit/node_modules/immer";
import { cmds } from "./command-names";

////////////////////////////////////////////////////////////////////////////////////
// Creates a command that deletes a single point
export const createDeletePointCommand = (id) => ({
  type: cmds.DELETE_SINGLE_POINT,
  data: id,
});
// Execute delete point command on the state
// The function has to be executed within a immer produce
// because it mutates the input values
export const deletePoint = (draft, command) => {
  // Get point id and data from pts collection
  const ptId = command.data;

  // Find point position in pts array
  const ptIndex = draft.pointDataArr.indexOf(ptId); // Optional?: validate that the index is not -1

  // Mutate the draft state, to remove the point
  delete draft.pointDataObj[command.data];
  draft.pointDataArr.splice(ptIndex, 1);
};

////////////////////////////////////////////////////////////////////////////////////
// Creates a command that updates a single point
export const createUpdatePointCommand = (updatedPt) => ({
  type: cmds.UPDATE_SINGLE_POINT,
  data: updatedPt,
});
// Execute update point command on the state
export const updatePoint = (draft, command) => {
  // Get point data from command
  const ptData = command.data;

  // Mutate the draft state, to remove the point
  draft.pointDataObj[ptData.id] = { ...ptData };
};

////////////////////////////////////////////////////////////////////////////////////
// Command execution boiler plate
export const executeCommand = (cmdAction) => (state, command) => {
  // Settup base state for immer
  const reverseCommand = {
    caption: command.meta.caption,
    patch: null,
    reversePatch: null,
  };
  // Produce new state using immer
  const newStateAndPatches = produceWithPatches(state, (draft) => {
    cmdAction(draft, command);
  });

  reverseCommand.patch = newStateAndPatches[1];
  reverseCommand.reversePatch = newStateAndPatches[2];

  // Return new state
  return [newStateAndPatches[0], reverseCommand];
};
