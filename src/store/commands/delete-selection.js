import getFieldSignature from "../helpers/get-field-signature";
import splitField from "./split-field";
import mergeFields from "./merge-fields";
import { getFieldProp } from "../helpers/field-prop";

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
  const startContainerSignature = getFieldSignature(
    state,
    state.range.startContainer
  );
  const endContainerSignature = getFieldSignature(
    state,
    state.range.endContainer
  );

  const startOffset = state.range.startOffset;
  const endOffset = state.range.endOffset;

  splitField(state, state.range.endContainer, endOffset, endContainerSignature);
  splitField(
    state,
    state.range.startContainer,
    startOffset,
    startContainerSignature
  );

  const [, startRowIndex, startFieldIndex] = startContainerSignature;
  const [, endRowIndex, endFieldIndex] = endContainerSignature;

  if (startRowIndex !== endRowIndex) {
    //Delete rows between start row and end row
    state.rows.splice(startRowIndex + 1, endRowIndex - startRowIndex - 1);

    //Delete fields from start field to end of row
    state.rows[startRowIndex].fields.splice(startFieldIndex + 1);

    //Append fields from end field to end of row to the start row
    state.rows[startRowIndex].push(
      ...state.rows[endRowIndex].fields.slice(endFieldIndex)
    );

    //Delete end row
    state.rows.splice(endRowIndex, 1);
  } else {
    //Delete fields between start field and end field
    state.rows[startRowIndex].fields.splice(
      startFieldIndex + 1,
      endFieldIndex - startFieldIndex + 1
    );
  }

  //Save data for selection
  const fieldId = getFieldProp(state, startRowIndex, startFieldIndex, "id");
  const position = getFieldProp(
    state,
    startRowIndex,
    startFieldIndex,
    "value"
  ).length;

  //Merge fields
  mergeFields(state, fieldId, [, startRowIndex, startFieldIndex]);

  //Place range
  state.range = {
    startContainer: fieldId,
    endContainer: fieldId,
    startOffset: position,
    endOffset: position,
  };
};

export default deleteSelection;
