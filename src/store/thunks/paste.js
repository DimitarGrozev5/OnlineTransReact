import { inputDataActions } from "../input-data";

const pasteThunk = (dividers) => async (dispatch, getState) => {
  // Get clipboard contents
  const input = await navigator.clipboard.readText();

  // Assuming that the clipboard contents will be of type <data><divider><data><divide>....<data><linebreak>
  // TODO: Consider not assuming the above

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
    .map((line) => line.split(dividerRegex));

  if (parsedData.length === 0) {
    return;
  }

  // Dispatch paste action
  dispatch(
    inputDataActions.newPaste({
      parsedData,
    })
  );
};

export default pasteThunk;
