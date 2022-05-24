import produce, { applyPatches } from "@reduxjs/toolkit/node_modules/immer";
import { original } from "@reduxjs/toolkit";
import { produceWithPatches } from "@reduxjs/toolkit/node_modules/immer";

const UNDO_LIMIT = 100000;

const applyUndoableCommand = (state, command) => {
  const [nextState, patches, inversePatches] = produceWithPatches(
    original(state),
    (draft) => {
      command(draft);
    }
  );

  return produce(nextState, (draft) => {
    if (draft.undo.undoStackPointer < draft.undo.undoStack.length - 1) {
      draft.undo.undoStack = draft.undo.undoStack.slice(
        0,
        draft.undo.undoStackPointer + 1
      );
    }

    draft.undo.undoStack.push({
      redo: patches,
      undo: inversePatches,
    });

    if (draft.undo.undoStack.length > UNDO_LIMIT) {
      draft.undo.undoStack.shift();
    }

    draft.undo.undoStackPointer = draft.undo.undoStack.length - 1;
  });
};

export const undoCommand = (state) => {
  // console.log(original(state))
  if (state.undo.undoStackPointer >= 0) {
    const undoPatch = state.undo.undoStack[state.undo.undoStackPointer].undo;
    const patchedState = applyPatches(original(state), undoPatch);
    return produce(patchedState, (draft) => {
      draft.undo.undoStackPointer -= 1;
    });
  }
  return original(state);
};

export const redoCommand = (state) => {
  if (state.undo.undoStackPointer < state.undo.undoStack.length - 1) {
    const redoPatch =
      state.undo.undoStack[state.undo.undoStackPointer + 1].redo;
    const patchedState = applyPatches(original(state), redoPatch);
    return produce(patchedState, (draft) => {
      draft.undo.undoStackPointer += 1;
    });
  }
  return original(state);
};

export default applyUndoableCommand;
