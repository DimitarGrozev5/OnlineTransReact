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

}

export default deleteSelection;