import { inputDataActions } from "../input-data";

const pasteThunk = () => async (dispatch, getState) => {
  // Get clipboard contents
  const input = await navigator.clipboard.readText();

  // Assuming that the clipboard contents will be of type <data><divider><data><divide>....<data><linebreak>
  // TODO: Consider not assuming the above

  // Parse clipboard data
  let parsedData = input.split(/\r?\n|\r/g).map((line) => line.split(/\t/g));

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
