// import { current } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// import { modifyFieldProp } from "./helpers/field-prop";
// import { deconstructFieldId } from "./helpers/deconstruct-id";
import handleEnter from "./commands/handle-enter";
import handleDivider from "./commands/handle-divider";
import handleBackspace from "./commands/handle-backspace";
import handleDelete from "./commands/handle-delete";
import handleInput from "./commands/handle-input";
import { enablePatches } from "@reduxjs/toolkit/node_modules/immer";
import applyUndoableCommand, {
  redoCommand,
  undoCommand,
} from "./history-manages/history-manager";
import handlePaste from "./commands/handlePaste";
enablePatches();

const inputDataSlice = createSlice({
  name: "inputData",
  initialState: {
    range: {
      anchorNode: undefined,
      anchorOffset: undefined,
      focusNode: undefined,
      focusOffset: undefined,
      startContainer: undefined,
      startOffset: undefined,
      endContainer: undefined,
      endOffset: undefined,
      collapsed: undefined,
    },
    data: [[""]],
    undo: {
      undoStack: [],
      undoStackPointer: -1,
    },
  },
  reducers: {
    updateRange(state, action) {
      state.range = {
        ...state.range,
        ...action.payload,
        collapsed:
          action.payload.startContainer === action.payload.endContainer &&
          action.payload.startOffset === action.payload.endOffset,
      };
      // console.log(action.payload)
      // console.log(current(state))
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////// Undo/Redo
    undo(state) {
      return undoCommand(state);
    },
    redo(state) {
      return redoCommand(state);
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////// Reducers for handling user input
    newInput(state, action) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }
      //handleInput(state, action);
      const handleInputWithAction = handleInput(action);
      return applyUndoableCommand(state, handleInputWithAction);
    },
    newDivider(state) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }
      // handleDivider(state);
      return applyUndoableCommand(state, handleDivider);
    },
    newEnter(state) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }
      // handleEnter(state);
      return applyUndoableCommand(state, handleEnter);
    },
    newBackspace(state) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }
      // handleBackspace(state);
      return applyUndoableCommand(state, handleBackspace);
    },
    newDelete(state) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }
      // handleDelete(state);
      return applyUndoableCommand(state, handleDelete);
    },
    newPaste(state, action) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        if (!action.payload.fileInput) {
          return state;
        }
      }
      const handlePasteWithData = handlePaste(
        action.payload.parsedData,
        action.payload.fileInput
      );
      return applyUndoableCommand(state, handlePasteWithData);
    },
  },
});

export const inputDataActions = inputDataSlice.actions;
export const inputDataReducer = inputDataSlice.reducer;
