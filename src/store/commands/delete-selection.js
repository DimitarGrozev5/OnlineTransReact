import {
  constructFieldId,
  deconstructFieldId,
} from "../helpers/deconstruct-id";
import { getFieldProp } from "../helpers/field-prop";
import splitField from "./split-field";
import mergeFields from "./merge-fields";

//////Delete marked text
////Input: null
////Output: field and caret postion or Range object
////
////Actions:
//Split Range End Field
//Split Range Start Field
//Remove rows from start row to end row
//Remove fields from start field to end of row (stop if it reaches end field)
//Remove fields from end field to begining of row(stop if it reaches begining field)
//Move fields {move field} from end field to end of row, to start field row
//{Merge fields}(start field, end field)
//Place caret at position
const deleteSelection = (state) => {
  const [startRow, startField] = deconstructFieldId(state.range.startContainer);
  const [endRow, endField] = deconstructFieldId(state.range.endContainer);

  const startOffset = state.range.startOffset;
  const endOffset = state.range.endOffset;

  splitField(state, endRow, endField, endOffset);
  splitField(state, startRow, startField, startOffset);

  if (startRow !== endRow) {
    //Delete rows between start row and end row
    state.data.splice(startRow + 1, endRow - startRow - 1);

    //Delete fields from start field to end of row
    state.data[startRow].splice(startField + 1);

    //Append fields from end field to end of row to the start row
    state.data[startRow].push(...state.data[startRow + 1].slice(endField + 1));

    //Delete end row
    state.data.splice(startRow + 1, 1);
  } else {
    //Delete fields between start field and end field
    state.data[startRow].splice(
      startField + 1,
      endField - startField + 1
    );
  }

  //Save data for selection
  const position = getFieldProp(state, startRow, startField).length;

  //Merge fields
  mergeFields(state, startRow, startField);

  const startContainer = constructFieldId(startRow, startField);

  //Place range
  state.range = {
    anchorNode: startContainer,
    anchorOffset: position,
    startContainer: startContainer,
    endContainer: startContainer,
    startOffset: position,
    endOffset: position,
  };
};

export default deleteSelection;
