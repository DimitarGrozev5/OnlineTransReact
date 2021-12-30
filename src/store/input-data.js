import { createSlice, original } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { getFieldProp, modifyFieldProp } from "./helpers/field-prop";
import getFieldSignature from "./helpers/get-field-signature";
import modifyField from "./commands/modify-field";
import deleteSelection from "./commands/delete-selection";
import splitField from "./commands/split-field";
import { deconstructFieldId } from "./helpers/deconstruct-id";
import addRow from "./commands/add-row";
import mergeFields from "./commands/merge-fields";

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
      //const [rowId, rowIndex, fieldIndex] = getFieldSignature(state, action.payload.fieldId);
      const [rowIndex, fieldIndex] = deconstructFieldId(action.payload.fieldId);
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

      let targetFieldId = deconstructFieldId(state.range.startContainer);

      //If the Selection range is not collapsed delete the marked text
      if (!state.range.collapsed) {
        deleteSelection(state);
      }

      //Modify the value of the taret field
      modifyField(
        state,
        targetFieldId[0],
        targetFieldId[1],
        action.payload.key,
        state.range.startOffset
      );
    },
    newDivider(state) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }

      //If the Selection range is not collapsed delete the marked text
      if (!state.range.collapsed) {
        //deleteSelection(state);
      }

      const [rowIndex, fieldIndex] = deconstructFieldId(
        state.range.startContainer
      );
      const targetSplitIndex = state.range.startOffset;

      splitField(state, rowIndex, fieldIndex, targetSplitIndex);

      //Move caret
    },
    newEnter(state, action) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }

      //If the Selection range is not collapsed delete the marked text
      if (!state.range.collapsed) {
        //deleteSelection(state);
      }

      //Split the current field
      const [rowIndex, fieldIndex] = deconstructFieldId(
        state.range.startContainer
      );
      const targetSplitIndex = state.range.startOffset;
      splitField(state, rowIndex, fieldIndex, targetSplitIndex);

      //Add a new row and move all fields to it
      addRow(state, rowIndex + 1);
      state.rows[rowIndex + 1].fields = state.rows[rowIndex].fields.splice(
        fieldIndex + 1
      );

      //Move caret
    },
    newBackspace(state, action) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }

      //If the Selection range is not collapsed delete the marked text
      if (!state.range.collapsed) {
        //deleteSelection(state);
      } else {
        const [rowIndex, fieldIndex] = deconstructFieldId(
          state.range.startContainer
        );
        const caretPosition = state.range.startOffset;

        if (caretPosition === 0) {
          if (fieldIndex === 0) {
            if (rowIndex !== 0) {
              state.rows[rowIndex - 1].fields.push(
                ...state.rows[rowIndex].fields.splice(0)
              );
            }
          } else {
            const newCaretPosition = getFieldProp(
              state,
              rowIndex,
              fieldIndex - 1,
              "value"
            ).length;
            mergeFields(state, rowIndex, fieldIndex - 1);
          }
        } else {
          const fieldValue = getFieldProp(state, rowIndex, fieldIndex, "value");
          const newFieldValue =
            fieldValue.substring(0, caretPosition - 1) +
            fieldValue.substring(caretPosition);
          modifyFieldProp(state, rowIndex, fieldIndex, "value", newFieldValue);

          //Place caret
        }
      }
    },
    newDelete(state, action) {
      //If the Selection range is undefined, exit
      if (!state.range.startContainer || !state.range.endContainer) {
        return state;
      }

      //If the Selection range is not collapsed delete the marked text
      if (!state.range.collapsed) {
        //deleteSelection(state);
      } else {
        const [rowIndex, fieldIndex] = deconstructFieldId(
          state.range.startContainer
        );
        const caretPosition = state.range.startOffset;
        const fieldValue = getFieldProp(state, rowIndex, fieldIndex, "value");

        if (caretPosition === fieldValue.length) {
          if (fieldIndex === state.rows[rowIndex].fields.length - 1) {
            if (rowIndex < state.rows.length - 1) {
              state.rows[rowIndex].fields.push(
                ...state.rows[rowIndex + 1].fields.splice(0)
              );
            }
          } else {
            const newCaretPosition = getFieldProp(
              state,
              rowIndex,
              fieldIndex,
              "value"
            ).length;
            mergeFields(state, rowIndex, fieldIndex);
          }
        } else {
          const newFieldValue =
            fieldValue.substring(0, caretPosition) +
            fieldValue.substring(caretPosition + 1);
          modifyFieldProp(state, rowIndex, fieldIndex, "value", newFieldValue);

          //Place caret
        }
      }
    },
  },
});

export const inputDataActions = inputDataSlice.actions;
export const inputDataReducer = inputDataSlice.reducer;
