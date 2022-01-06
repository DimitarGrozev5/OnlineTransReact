import { useDispatch } from "react-redux";
import { inputDataActions } from "../store/input-data";
import moveCaretDownThunk from "../store/thunks/move-caret-down";
import moveCaretLeftThunk from "../store/thunks/move-caret-left";
import moveCaretRightThunk from "../store/thunks/move-caret-right";
import moveCaretUpThunk from "../store/thunks/move-caret-up";
import shiftSelectLeftThunk from "../store/thunks/shift-select-left";
import shiftSelectRightThunk from "../store/thunks/shift-select-right";

const useManageInput = (dividers) => {
  //useEffect(() => {
  const dispatch = useDispatch();

  //Events are sequenced by the order of their triggering
  const events = {
    onKeyDown: (event) => {
      //Allow F1 - F12 keys
      if (/^F([1-9]|10|11|12)$/.test(event.key)) {
        return;
      }
      //The KeyDown Event handler catches the following modification keys
      //Dividers
      const inputIsDivider = dividers.reduce((result, divider) => {
        return divider.regex.test(event.key) || result;
      }, false);
      if (inputIsDivider) {
        console.log("Divider");
        dispatch(inputDataActions.newDivider());
        event.preventDefault();
      }
      //Enter
      if (event.key === "Enter") {
        console.log("Enter");
        dispatch(inputDataActions.newEnter());
        event.preventDefault();
      }
      //Backspace
      if (event.key === "Backspace") {
        console.log("Backspace");
        dispatch(inputDataActions.newBackspace());
        event.preventDefault();
      }
      //Delete
      if (event.key === "Delete") {
        console.log("Delete");
        dispatch(inputDataActions.newDelete());
        event.preventDefault();
      }

      //The KeyDown Event handler catches the following navigation keys
      //Shift + ArrowLeft
      if (event.shiftKey && event.key === "ArrowLeft") {
        dispatch(shiftSelectLeftThunk());
        event.preventDefault();
        return;
      }
      //Shift + ArrowRight
      if (event.shiftKey && event.key === "ArrowRight") {
        console.log("Shift + ArrowRight");
        dispatch(shiftSelectRightThunk());
        event.preventDefault();
        return;
      }
      //Shift + ArrowUp
      if (event.shiftKey && event.key === "ArrowUp") {
        console.log("Shift + ArrowUp");
        event.preventDefault();
        return;
      }
      //Shift + ArrowDown
      if (event.shiftKey && event.key === "ArrowDown") {
        console.log("Shift + ArrowDown");
        event.preventDefault();
        return;
      }

      //ArrowLeft
      if (event.key === "ArrowLeft") {
        dispatch(moveCaretLeftThunk());
        event.preventDefault();
      }
      //ArrowRight
      if (event.key === "ArrowRight") {
        dispatch(moveCaretRightThunk());
        event.preventDefault();
      }
      //ArrowUp
      if (event.key === "ArrowUp") {
        console.log("ArrowUp");
        dispatch(moveCaretUpThunk());
        event.preventDefault();
      }
      //ArrowDown
      if (event.key === "ArrowDown") {
        console.log("ArrowDown");
        dispatch(moveCaretDownThunk());
        event.preventDefault();
      }

      //Home
      if (event.key === "Home") {
        console.log("Home");
        event.preventDefault();
      }
      //End
      if (event.key === "End") {
        console.log("End");
        event.preventDefault();
      }
      //PageUp
      if (event.key === "PageUp") {
        console.log("PageUp");
        event.preventDefault();
      }
      //PageDown
      if (event.key === "PageDown") {
        console.log("PageDown");
        event.preventDefault();
      }

      //The KeyDown Event handler catches the following shortcuts
      //Select All
      if (event.ctrlKey && /^(a|A|а|А)$/.test(event.key)) {
        console.log("Select All");
        event.preventDefault();
      }
      //Copy
      if (event.ctrlKey && /^(c|C|ц|Ц)$/.test(event.key)) {
        console.log("Copy");
        event.preventDefault();
      }
      //Cut
      if (event.ctrlKey && /^(x|X|ь|ѝ)$/.test(event.key)) {
        console.log("Cut");
        event.preventDefault();
      }
      //Paste
      if (event.ctrlKey && /^(v|V|ж|Ж)$/.test(event.key)) {
        console.log("Paste");
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
      console.log("copy");
    },
    onPaste: (event) => {
      console.log("paste");
    },
    onCut: (event) => {
      console.log("cut");
    },
    onBeforeInput: (event) => {
      event.preventDefault();
      dispatch(inputDataActions.newInput({ key: event.data }));
    },
  };

  return events;
};

export default useManageInput;
