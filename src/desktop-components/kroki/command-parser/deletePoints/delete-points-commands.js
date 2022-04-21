import produce, {
  produceWithPatches,
} from "@reduxjs/toolkit/node_modules/immer";

// Creates a command that deletes a single point
export const createDeletePointCommand = (id) => ({
  type: "DELETE_SINGLE_POINT",
  data: id,
});

// Creates a reverse command that restores a single point
export const createRestorePointCommand = (id, index, data) => ({
  type: "RESTORE_SINGLE_POINT",
  data: {
    id,
    index,
    data,
  },
});

// Creates a command that deletes multiple points
export const createDeleteMultiplePointsCommand = (commands) => ({
  type: "DELETE_MULTIPLE_POINTS",
  meta: {
    caption: "Delete multiple points",
    desc: `${commands.length} points will be deleted on execution`,
  },
  data: [...commands],
});

// Creates a command that restores multiple points
export const createRestoreMultiplePointsCommand = (commands) => ({
  type: "RESTORE_MULTIPLE_POINTS",
  data: [...commands],
});

// Executes a command for deleting multiple points
export const deleteMultiplePointsFromCommand = (state, command) => {
  // Settup base state for immer
  const reverseCommand = {
    caption: command.meta.caption,
    patch: null,
    reversePatch: null,
  };
  // Produce new state using immer
  const newStateAndPatches = produceWithPatches(state, (draft) => {
    // Loop trough delete single point commands and execute them
    const data = command.data;

    data.forEach((cmd) => {
      // Get point id and data from pts collection
      const ptId = cmd.data;

      // Find point position in pts array
      const ptIndex = draft.pointDataArr.indexOf(ptId); // Optional?: validate that the index is not -1

      // Mutate the draft state, to remove the point
      delete draft.pointDataObj[cmd.data];
      draft.pointDataArr.splice(ptIndex, 1);
    });
  });

  reverseCommand.patch = newStateAndPatches[1];
  reverseCommand.reversePatch = newStateAndPatches[2];

  // Return new state
  return [newStateAndPatches[0], reverseCommand];
};

// Execute a reverse command that restores deleted points
export const restoreMultiplePointsFromCommand = (ptsObj, ptsArr, command) => {
  // Settup base state for immer
  const baseState = {
    ptsObj,
    ptsArr,
  };
  // Produce new state using immer
  const newState = produce(baseState, (draft) => {
    // Loop trough restore single point commands and execute them
    const commands = command.data;
    commands.forEach((cmd) => {
      const { ptId, ptIndex, ptData } = cmd.data;
      draft.ptsObj[ptId] = ptData;
      draft.ptsArr.splice(ptIndex, 0, ptId);
    });
  });

  // Return new state
  return [newState.ptsObj, newState.ptsArr];
};
