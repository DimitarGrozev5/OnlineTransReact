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
