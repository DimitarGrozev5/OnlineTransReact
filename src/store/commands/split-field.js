//////Split field
////Input: field, split position
////Output: new field
////
////Actions:
//Copy text from split position to end of field
//{Modify field}(field, "", split position, null)
//{Add field}{field.parentNode, field.nextSibling}
//{Modify field}(new field, copied text, 0, 0)
//Return new field
const splitField = (state, fieldId, splitIndex, fieldSignature = null) => {
  
}

export default splitField;