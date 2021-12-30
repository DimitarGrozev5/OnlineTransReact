import { createSlice, original } from "@reduxjs/toolkit";
import { modifyFieldProp } from "./helpers/field-prop";
import {  deconstructFieldId } from "./helpers/deconstruct-id";
import handleEnter from "./commands/handle-enter";
import handleDivider from "./commands/handle-divider";
import handleBackspace from "./commands/handle-backspace";
import handleDelete from "./commands/handle-delete";
import handleInput from "./commands/handle-input";
import getField from "./helpers/get-field";
import getRow from "./helpers/get-row";

//Get a row with an empty field
const getASingleEmptyField = () => {
  const rows = [getRow()];
  rows[0].fields.push(getField());
  return rows;
};

const initialEmptyField = getASingleEmptyField();

const inputDataSlice = createSlice({
  name: "inputData",
  initialState: {
    range: {
      startContainer: undefined,
      startOffset: undefined,
      endContainer: undefined,
      endOffset: undefined,
      collapsed: undefined,
    },
    rows: initialEmptyField,
  },
  reducers: {
    updateRange(state, action) {
      state.range = {
        startContainer: action.payload.startContainer,
        startOffset: action.payload.startOffset,
        endContainer: action.payload.endContainer,
        endOffset: action.payload.endOffset,
        collapsed:
          action.payload.startContainer === action.payload.endContainer &&
          action.payload.startOffset === action.payload.endOffset,
      };
    },
    makeFieldEditable(state, action) {
      //const [rowId, rowIndex, fieldIndex] = getFieldSignature(state, action.payload.fieldId);
      const [rowIndex, fieldIndex] = deconstructFieldId(action.payload.fieldId);
      modifyFieldProp(state, rowIndex, fieldIndex, "editable", true);
    },
    makeFieldsUneditable(state, action) {
      const [rowIndex, fieldIndex] = deconstructFieldId(action.payload.fieldId);
      modifyFieldProp(state, rowIndex, fieldIndex, "editable", false);
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////// Undo/Redo

    //////////////////////////////////////////////////////////////////////////////////////////////////////////// Reducers for handling user input
    newInput(state, action) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }
      handleInput(state, action);
    },
    newDivider(state) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }
      handleDivider(state);
    },
    newEnter(state) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }
      handleEnter(state);
    },
    newBackspace(state) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }
      handleBackspace(state);
    },
    newDelete(state) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }
      handleDelete(state);
    },
  },
});

export const inputDataActions = inputDataSlice.actions;
export const inputDataReducer = inputDataSlice.reducer;
