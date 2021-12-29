import { createSlice, original } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { modifyFieldProp } from "./helpers/field-prop";
import getFieldSignature from "./helpers/get-field-signature";
import modifyField from "./commands/modify-field";
import deleteSelection from "./commands/delete-selection";
import splitField from "./commands/split-field";

export const getField = () => {
  return {
    id: nanoid(),
    value: "",
    editable: false,
  };
};

export const getRow = () => {
  return {
    id: nanoid(),
    fields: [],
  };
};

export const getInputData = () => {
  const range = {
    startContainer: undefined,
    startOffset: undefined,
    endContainer: undefined,
    endOffset: undefined,
  };

  return {
    range,
    rows: [],
  };
};

export const editField = (inputData, targetFieldId = null, prop, newValue) => {
  const data = inputData.map(({ range, rows }) => {
    const newRows = rows.map(({ id, fields }) => {
      const newFields = fields.map((field) => {
        let newField = { ...field };
        if (field.id === targetFieldId || !targetFieldId) {
          newField[prop] = newValue;
        }
        return newField;
      });
      return { id, newFields };
    });
    return { range, newRows };
  });
  return data;
};

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
      const [rowId, rowIndex, fieldIndex] = getFieldSignature(state, action.payload.fieldId);
      modifyFieldProp(state, rowIndex, fieldIndex, "editable", true);
    },
    makeFieldsUneditable(state) {
      state.rows.forEach((row) => {
        row.fields.forEach((field) => {
          field.editable = false;
        });
      });
    },
    //Reducers for handling user input
    newInput(state, action) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }

      //If the Selection range is not collapsed delete the marked text
      let targetFieldId = state.range.startContainer;
      if (!state.range.collapsed) {
        deleteSelection(state);
      }

      //Modify the value of the taret field
      modifyField(state, null, targetFieldId, action.payload.key, state.range.startOffset);
    },
    newDivider(state, action) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }

      //If the Selection range is not collapsed delete the marked text
      if (!state.range.collapsed) {
        deleteSelection(state);
      }

      const targetFieldId = state.range.startContainer;
      const targetSplitIndex = state.range.startOffset

      splitField(state, targetFieldId, targetSplitIndex);
    },
    newEnter(state, action) {},
    newBackspace(state, action) {},
    newDelete(state, action) {},
  },
});

export const inputDataActions = inputDataSlice.actions;
export const inputDataReducer = inputDataSlice.reducer;
