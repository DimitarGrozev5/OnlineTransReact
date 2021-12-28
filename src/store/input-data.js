import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

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
      };
    },
    makeFieldEditable(state, action) {
      state.rows.forEach((row) => {
        row.fields.forEach((field) => {
          if (field.id === action.payload.fieldId) {
            field.editable = true;
          }
        });
      });
    },
    makeFieldsUneditable(state) {
      state.rows.forEach((row) => {
        row.fields.forEach((field) => {
          field.editable = false;
        });
      });
    },
  },
});

export const inputDataActions = inputDataSlice.actions;
export const inputDataReducer = inputDataSlice.reducer;
