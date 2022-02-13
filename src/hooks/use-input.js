import { useDispatch } from "react-redux";
import { inputDataActions } from "../store/input-data";
import copyOutputSelectionThunk from "../store/thunks/textarea-thunks/copy-output";
import copySelectionThunk from "../store/thunks/textarea-thunks/copy-selection";
import getSelectionThunk from "../store/thunks/textarea-thunks/get-selection";
import goHomeThunk from "../store/thunks/textarea-thunks/go-home";
import goToEndThunk from "../store/thunks/textarea-thunks/go-to-end";
import moveCaretDownThunk from "../store/thunks/textarea-thunks/move-caret-down";
import moveCaretLeftThunk from "../store/thunks/textarea-thunks/move-caret-left";
import moveCaretRightThunk from "../store/thunks/textarea-thunks/move-caret-right";
import moveCaretUpThunk from "../store/thunks/textarea-thunks/move-caret-up";
import pasteThunk from "../store/thunks/textarea-thunks/paste";
import selectAllThunk from "../store/thunks/textarea-thunks/select-all";
import shiftSelectDownThunk from "../store/thunks/textarea-thunks/shift-select-down";
import shiftSelectLeftThunk from "../store/thunks/textarea-thunks/shift-select-left";
import shiftSelectRightThunk from "../store/thunks/textarea-thunks/shift-select-right";
import shiftSelectUpThunk from "../store/thunks/textarea-thunks/shift-select-up";

const useManageInput = (dataSource, dividers, textAreaRef) => {
  //useEffect(() => {
  const dispatch = useDispatch();
  const parsedDividers = dividers.map((div) => {
    return { ...div, regex: RegExp(div.regex) };
  });

  //Events are sequenced by the order of their triggering
  let events = {};
  if (dataSource === "input") {
    events = {
      onKeyDown: (event) => {
        //Allow F1 - F12 keys
        if (/^F([1-9]|10|11|12)$/.test(event.key)) {
          return;
        }
        //The KeyDown Event handler catches the following modification keys
        //Dividers
        const inputIsDivider = parsedDividers.reduce((result, divider) => {
          return divider.regex.test(event.key) || result;
        }, false);
        if (inputIsDivider) {
          dispatch(getSelectionThunk(textAreaRef, inputDataActions.newDivider));
          event.preventDefault();
        }
        //Enter
        if (event.key === "Enter") {
          dispatch(getSelectionThunk(textAreaRef, inputDataActions.newEnter));
          event.preventDefault();
        }
        //Backspace
        if (event.key === "Backspace") {
          dispatch(
            getSelectionThunk(textAreaRef, inputDataActions.newBackspace)
          );
          event.preventDefault();
        }
        //Delete
        if (event.key === "Delete") {
          dispatch(getSelectionThunk(textAreaRef, inputDataActions.newDelete));
          event.preventDefault();
        }

        //The KeyDown Event handler catches the following navigation keys
        //Shift + ArrowLeft
        if (event.shiftKey && event.key === "ArrowLeft") {
          dispatch(getSelectionThunk(textAreaRef, shiftSelectLeftThunk));
          event.preventDefault();
          return;
        }
        //Shift + ArrowRight
        if (event.shiftKey && event.key === "ArrowRight") {
          dispatch(getSelectionThunk(textAreaRef, shiftSelectRightThunk));
          event.preventDefault();
          return;
        }
        //Shift + ArrowUp
        if (event.shiftKey && event.key === "ArrowUp") {
          dispatch(getSelectionThunk(textAreaRef, shiftSelectUpThunk));
          event.preventDefault();
          return;
        }
        //Shift + ArrowDown
        if (event.shiftKey && event.key === "ArrowDown") {
          dispatch(getSelectionThunk(textAreaRef, shiftSelectDownThunk));
          event.preventDefault();
          return;
        }

        //ArrowLeft
        if (event.key === "ArrowLeft") {
          dispatch(getSelectionThunk(textAreaRef, moveCaretLeftThunk));
          event.preventDefault();
        }
        //ArrowRight
        if (event.key === "ArrowRight") {
          dispatch(getSelectionThunk(textAreaRef, moveCaretRightThunk));
          event.preventDefault();
        }
        //ArrowUp
        if (event.key === "ArrowUp") {
          dispatch(getSelectionThunk(textAreaRef, moveCaretUpThunk));
          event.preventDefault();
        }
        //ArrowDown
        if (event.key === "ArrowDown") {
          dispatch(getSelectionThunk(textAreaRef, moveCaretDownThunk));
          event.preventDefault();
        }

        //Home
        if (event.key === "Home") {
          dispatch(getSelectionThunk(textAreaRef, goHomeThunk));
          event.preventDefault();
        }
        //End
        if (event.key === "End") {
          dispatch(getSelectionThunk(textAreaRef, goToEndThunk));
          event.preventDefault();
        }
        //PageUp
        if (event.key === "PageUp") {
          // console.log("PageUp");
          // event.preventDefault();
        }
        //PageDown
        if (event.key === "PageDown") {
          // console.log("PageDown");
          // event.preventDefault();
        }

        //The KeyDown Event handler catches the following shortcuts
        //Select All
        if (event.ctrlKey && /^(a|A|а|А)$/.test(event.key)) {
          dispatch(selectAllThunk());
          event.preventDefault();
        }
        //Copy
        if (event.ctrlKey && /^(c|C|ц|Ц)$/.test(event.key)) {
          dispatch(
            getSelectionThunk(textAreaRef, copySelectionThunk.bind(null, null))
          );
          event.preventDefault();
        }
        //Cut
        if (event.ctrlKey && /^(x|X|ь|ѝ)$/.test(event.key)) {
          dispatch(
            getSelectionThunk(
              textAreaRef,
              copySelectionThunk.bind(null, inputDataActions.newDelete())
            )
          );
          event.preventDefault();
        }
        //Paste
        if (event.ctrlKey && /^(v|V|ж|Ж)$/.test(event.key)) {
          //There shall be a simple paste function just to keep things going
          dispatch(
            getSelectionThunk(
              textAreaRef,
              pasteThunk.bind(null, parsedDividers, null)
            )
          );
          event.preventDefault();
        }
        //Undo
        if (event.ctrlKey && /^(z|Z|з|З)$/.test(event.key)) {
          dispatch(inputDataActions.undo());
          event.preventDefault();
        }
        //Redo
        if (event.ctrlKey && /^(y|Y|ъ|Ъ)$/.test(event.key)) {
          dispatch(inputDataActions.redo());
          event.preventDefault();
        }
        //Save
        if (event.ctrlKey && /^(s|S|с|С)$/.test(event.key)) {
          console.log("Save");
          event.preventDefault();
        }

        //If any other key combination is entered, it will be left to go trough
      },
      onCopy: (event) => {
        dispatch(
          getSelectionThunk(textAreaRef, copySelectionThunk.bind(null, null))
        );
        event.preventDefault();
      },
      onPaste: (event) => {
        //There shall be a simple paste function just to keep things going
        dispatch(
          getSelectionThunk(
            textAreaRef,
            pasteThunk.bind(null, parsedDividers, null)
          )
        );
        event.preventDefault();
      },
      onCut: (event) => {
        dispatch(
          getSelectionThunk(
            textAreaRef,
            copySelectionThunk.bind(null, inputDataActions.newDelete())
          )
        );
        event.preventDefault();
      },
      onBeforeInput: (event) => {
        event.preventDefault();

        const inputIsDivider = parsedDividers.reduce((result, divider) => {
          return divider.regex.test(event.data) || result;
        }, false);
        if (inputIsDivider) {
          dispatch(getSelectionThunk(textAreaRef, inputDataActions.newDivider));
        } else {
          //dispatch(inputDataActions.newInput({ key: event.data }));
          dispatch(
            getSelectionThunk(
              textAreaRef,
              inputDataActions.newInput.bind(null, {
                key: event.data,
              })
            )
          );
        }
      },
    };
  } else if (dataSource === "output") {
    events = {
      onKeyDown: (event) => {
        //Allow F1 - F12 keys
        if (/^F([1-9]|10|11|12)$/.test(event.key)) {
          return;
        }
        //Enter
        if (event.key === "Enter") {
          event.preventDefault();
        }
        //Backspace
        if (event.key === "Backspace") {
          event.preventDefault();
        }
        //Delete
        if (event.key === "Delete") {
          event.preventDefault();
        }

        //Copy
        if (event.ctrlKey && /^(c|C|ц|Ц)$/.test(event.key)) {
          dispatch(copyOutputSelectionThunk());
          event.preventDefault();
        }
        //Cut
        if (event.ctrlKey && /^(x|X|ь|ѝ)$/.test(event.key)) {
          dispatch(copyOutputSelectionThunk());
          event.preventDefault();
        }
        //Paste
        if (event.ctrlKey && /^(v|V|ж|Ж)$/.test(event.key)) {
          event.preventDefault();
        }
        //Save
        if (event.ctrlKey && /^(s|S|с|С)$/.test(event.key)) {
          console.log("Save");
          event.preventDefault();
        }

        //If any other key combination is entered, it will be left to go trough
      },
      onCopy: (event) => {
        dispatch(copyOutputSelectionThunk());
        event.preventDefault();
      },
      onPaste: (event) => {
        event.preventDefault();
      },
      onCut: (event) => {
        dispatch(copyOutputSelectionThunk());
        event.preventDefault();
      },
      onBeforeInput: (event) => {
        event.preventDefault();
      },
    };
  }

  return events;
};

export default useManageInput;
