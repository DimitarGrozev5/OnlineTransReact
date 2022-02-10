import { inputDataActions } from "../input-data";

const pasteThunk = (dividers, fileInput) => async (dispatch, getState) => {
  // Get clipboard contents
  const rawInput = fileInput || (await navigator.clipboard.readText());

  // Assuming that the clipboard contents will be of type <data><divider><data><divide>....<data><linebreak>
  // TODO: Consider not assuming the above

  // *.kpt files divide the fields with multiple spaces
  // If the space divider is swiched on, cllapse multiple spaces in to one
  const input = dividers.find((div) => div.regexAlt === " ")
    ? rawInput.replace(/ +/g, " ")
    : rawInput;

  // const inputIsDivider = dividers.reduce((result, divider) => {
  //   return divider.regex.test(event.key) || result;
  // }, false);
  const dividerRegex = new RegExp(
    dividers.map((div) => div.regexAlt).join("|"),
    "g"
  );

  // Parse clipboard data
  let parsedData = input
    .split(/\r?\n|\r/g)
    .map((line) => line.trim().split(dividerRegex));

  if (parsedData.length === 0) {
    return;
  }

  // Dispatch paste action
  dispatch(
    inputDataActions.newPaste({
      parsedData,
      fileInput: true,
    })
  );
};

export default pasteThunk;
