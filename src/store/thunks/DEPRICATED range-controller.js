import { deconstructFieldId } from "../helpers/deconstruct-id";

export const rangeControllerThunk = (fieldId, direction) => (dispatch, getState) => {
  const [rowIndex, fieldIndex] = deconstructFieldId(fieldId);
  
}


/*
const getCaretController = () => {
  let desiredPosition = null;
  //Variable to control the behavior of Shift + Arrow
  //When false it moves the start of the selection
  //When true it moves the end of the selection
  let shiftSelectionIsRightInternalVariable = true;

  //An event listener is setup in the clickController so when a new selection is made, the direction of the shif selector is set to right

  return {
    clearDesiredPosition: () => {
      desiredPosition = null;
    },
    findFieldByXCoordinate(row, xCoordinate) {
      return Array.from(row.children).find((element) => {
        let elementRect = element.getBoundingClientRect();
        if (
          elementRect.left <= xCoordinate &&
          elementRect.right >= xCoordinate
        ) {
          return true;
        }
      });
    },
    findBestFitCaretPositionInField(
      targetField,
      caretXCoordinate,
      traverseDirectioUp = true
    ) {
      //Helper object used in the search of the best fit position
      let min = {
        value: 1000000000000000,
        index: -1,
      };

      let startIndex = traverseDirectioUp ? 0 : targetField.innerText.length;
      let endIndex = traverseDirectioUp ? targetField.innerText.length : 0;
      let endCriteria = traverseDirectioUp
        ? (i, endIndex) => {
            return i < endIndex;
          }
        : (i, endIndex) => {
            return i >= endIndex;
          };
      let addToI = traverseDirectioUp ? 1 : -1;

      let i = startIndex;
      while (endCriteria(i, endIndex)) {
        placeCaret(targetField, i).execute();
        let targetRect = getActiveRange().getClientRects()[0];
        //If the target Field is empty, a simulated rectangle will be created
        if (!targetRect) {
          targetRect = targetField.getBoundingClientRect();
          targetRect = { left: (targetRect.right + targetRect.left) / 2 };
        }

        if (Math.abs(caretXCoordinate - targetRect.left) < min.value) {
          min.value = Math.abs(caretXCoordinate - targetRect.left);
          min.index = i;
        }
        i = i + addToI;
      }

      return {
        field: targetField,
        caretPosition: min.index,
      };
    },
    moveCaretToEndOfRow: (row) => {
      return {
        field: row.lastChild,
        caretPosition: row.lastChild.innerText.length,
      };
    },
    moveCaretToStartOfRow: (row) => {
      return {
        field: row.firstChild,
        caretPosition: 0,
      };
    },
    moveCaretLeft: (field, caretPosition) => {
      desiredPosition = null;

      if (caretPosition === 0) {
        let prevField = field.previousSibling;

        //If the previous field is null then we are at the begining of the row
        if (!prevField) {
          prevField = field.parentNode.previousSibling;
          //If the current row doesn't have a previous sibling, then the caret is at the begining of the first field, of the first row
          if (!prevField) {
            return null;
          }
          prevField = prevField.lastChild;
        }

        //Move the caret to the end of the previous field
        return {
          field: prevField,
          caretPosition: prevField.innerText.length,
        };

        //If the caret is not in the begining of the field, it will be moved left one position
      } else {
        return {
          field: field,
          caretPosition: caretPosition - 1,
        };
      }
    },
    moveCaretRight: (field, caretPosition) => {
      desiredPosition = null;

      //If the caret is at the end of the field, it will be moved to the next field
      if (caretPosition === field.innerText.length) {
        let nextField = field.nextSibling;

        //If the next field is null then we are at the end of the row
        if (!nextField) {
          nextField = field.parentNode.nextSibling;
          //If the current row doesn't have a next sibling, then the caret is at the end of the last field, of the last row
          if (!nextField) {
            return null;
          }
          nextField = nextField.firstChild;
        }

        //Move the caret to the end of the previous field
        return {
          field: nextField,
          caretPosition: 0,
        };

        //If the caret is not in the end of the field, it will be moved right one position
      } else {
        return {
          field: field,
          caretPosition: caretPosition + 1,
        };
      }
    },
    moveCaretDown(field, rightRect = null) {
      //If the caret is at the last row, it is send to the last field of the row
      if (!field.parentNode.nextSibling) {
        return this.moveCaretToEndOfRow(field.parentNode);
      }

      //Getting the Caret X coordinate, using the dom object rectangle
      let caretRect = getActiveRange().getClientRects()[0];

      //If the field is empty rect will be null
      //so a simulated rect object is created, that contains the midpoint X coordinate of the field
      if (!caretRect) {
        let targetRect = field.getBoundingClientRect();
        caretRect = { left: (targetRect.right + targetRect.left) / 2 };
      }

      //If there is a desired position saved from a previous caret movement, it will be used
      if (desiredPosition !== null) {
        caretRect = { left: desiredPosition };
      }

      //Finding the coresponding field on the lower row
      let targetField = this.findFieldByXCoordinate(
        field.parentNode.nextSibling,
        rightRect ? caretRect.right : caretRect.left
      );

      //If there is no coresponding field bellow the current one, the caret is send to the last field of the lower row
      if (!targetField) {
        desiredPosition = caretRect.left;

        targetField = field.parentNode.nextSibling.lastChild;
        return {
          field: targetField,
          caretPosition: targetField.innerText.length,
        };
      }

      let bestFitCaretPosition = this.findBestFitCaretPositionInField(
        targetField,
        rightRect ? caretRect.right : caretRect.left,
        true
      );

      desiredPosition = null;
      return bestFitCaretPosition;
    },
    moveCaretUp(field, caretPosition) {
      //If the caret is at the first row, it is send to the first field of the row
      if (!field.parentNode.previousSibling) {
        return {
          field: field.parentNode.firstChild,
          caretPosition: 0,
        };
      }

      //Getting the Caret X coordinate, using the dom object rectangle
      let caretRect = getActiveRange().getClientRects()[0];

      //If the field is empty rect will be null
      //so a simulated rect object is created, that contains the midpoint X coordinate of the field
      if (!caretRect) {
        let targetRect = field.getBoundingClientRect();
        caretRect = { left: (targetRect.right + targetRect.left) / 2 };
      }

      //If there is a desired position saved from a previous caret movement, it will be used
      if (desiredPosition !== null) {
        caretRect = { left: desiredPosition };
      }

      //Finding the coresponding field on the upper row
      let targetField = this.findFieldByXCoordinate(
        field.parentNode.previousSibling,
        caretRect.left
      );

      //If there is no coresponding field above the current one, the caret is send to the last field of the upper row
      if (!targetField) {
        desiredPosition = caretRect.left;

        targetField = field.parentNode.previousSibling.lastChild;
        return {
          field: targetField,
          caretPosition: targetField.innerText.length,
        };
      }

      let bestFitCaretPosition = this.findBestFitCaretPositionInField(
        targetField,
        caretRect.left,
        false
      );

      desiredPosition = null;
      return bestFitCaretPosition;
    },
    shiftSelectionIsRight() {
      return shiftSelectionIsRightInternalVariable;
    },
    makeShiftSelectRight() {
      shiftSelectionIsRightInternalVariable = true;
    },
    makeShiftSelectLeft() {
      shiftSelectionIsRightInternalVariable = false;
    },
    moveShiftSelectionLeft(rangeCopy) {
      //If the range is collapsed it will be converted to a left range
      if (rangeCopy.collapsedAtTimeOfCopy) {
        shiftSelectionIsRightInternalVariable = false;
      }
      if (shiftSelectionIsRightInternalVariable) {
        //The end of range will be moved
        let newEnd = this.moveCaretLeft(
          rangeCopy.endContainer,
          rangeCopy.endOffset
        );
        rangeCopy.endContainer = newEnd.field;
        rangeCopy.endOffset = newEnd.caretPosition;
        return rangeCopy;
      } else {
        //The beginning of range will be moved
        let newBeginning = this.moveCaretLeft(
          rangeCopy.startContainer,
          rangeCopy.startOffset
        );
        rangeCopy.startContainer = newBeginning.field;
        rangeCopy.startOffset = newBeginning.caretPosition;
        return rangeCopy;
      }
    },
    moveShiftSelectionRight(rangeCopy) {
      //If the range is collapsed it will be converted to a right range
      if (rangeCopy.collapsedAtTimeOfCopy) {
        shiftSelectionIsRightInternalVariable = true;
      }
      if (shiftSelectionIsRightInternalVariable) {
        //The end of range will be moved
        let newEnd = this.moveCaretRight(
          rangeCopy.endContainer,
          rangeCopy.endOffset
        );
        rangeCopy.endContainer = newEnd.field;
        rangeCopy.endOffset = newEnd.caretPosition;
        return rangeCopy;
      } else {
        //The beginning of range will be moved
        let newBeginning = this.moveCaretRight(
          rangeCopy.startContainer,
          rangeCopy.startOffset
        );
        rangeCopy.startContainer = newBeginning.field;
        rangeCopy.startOffset = newBeginning.caretPosition;
        return rangeCopy;
      }
    },
    moveShiftSelectionUp(rangeCopy) {
      //If the range lies on a single row, some adjustments need to be made
      if (
        rangeCopy.startContainer.parentNode ===
          rangeCopy.endContainer.parentNode &&
        shiftSelectionIsRightInternalVariable
      ) {
        shiftSelectionIsRightInternalVariable = false;
        let tmpStartContainer = rangeCopy.startContainer;
        let tmpStartOffset = rangeCopy.startOffset;
        rangeCopy.startContainer = rangeCopy.endContainer;
        rangeCopy.startOffset = rangeCopy.endOffset;
        rangeCopy.endContainer = tmpStartContainer;
        rangeCopy.endOffset = tmpStartOffset;
      }
      if (shiftSelectionIsRightInternalVariable) {
        //The end of range will be moved
        //Firstly the caret is placed at the end of the selection
        //The purpose of this is to avoid bugs with moveCaretDown()
        placeCaret(rangeCopy.endContainer, rangeCopy.endOffset).execute();

        let newEnd = this.moveCaretUp(rangeCopy.endContainer);
        rangeCopy.endContainer = newEnd.field;
        rangeCopy.endOffset = newEnd.caretPosition;

        //Check if the start container is after the end
        if (
          (rangeCopy.startContainer.parentNode ===
            rangeCopy.endContainer.parentNode &&
            rangeCopy.startContainer !== rangeCopy.endContainer) ||
          (rangeCopy.startContainer === rangeCopy.endContainer &&
            rangeCopy.startOffset > rangeCopy.endOffset)
        ) {
          let properOrder = false;
          let curNode = rangeCopy.startContainer;
          let nextNode = curNode.nextSibling;
          while (nextNode) {
            if (nextNode === rangeCopy.endContainer) {
              properOrder = true;
              break;
            }
            curNode = nextNode;
            nextNode = curNode.nextSibling;
          }

          if (!properOrder) {
            shiftSelectionIsRightInternalVariable = false;
            let tmpStartContainer = rangeCopy.startContainer;
            let tmpStartOffset = rangeCopy.startOffset;
            rangeCopy.startContainer = rangeCopy.endContainer;
            rangeCopy.startOffset = rangeCopy.endOffset;
            rangeCopy.endContainer = tmpStartContainer;
            rangeCopy.endOffset = tmpStartOffset;
          }
        }

        return rangeCopy;
      } else {
        //The beginning of range will be moved
        //Firstly the caret is placed at the end of the selection
        //The purpose of this is to avoid bugs with moveCaretDown()
        placeCaret(rangeCopy.startContainer, rangeCopy.startOffset).execute();

        let newBeginning = this.moveCaretUp(
          rangeCopy.startContainer,
          rangeCopy.startOffset
        );
        rangeCopy.startContainer = newBeginning.field;
        rangeCopy.startOffset = newBeginning.caretPosition;
        return rangeCopy;
      }
    },
    moveShiftSelectionDown(rangeCopy) {
      if (shiftSelectionIsRightInternalVariable) {
        //The end of range will be moved
        //Firstly the caret is placed at the end of the selection
        //The purpose of this is to avoid bugs with moveCaretDown()
        placeCaret(rangeCopy.endContainer, rangeCopy.endOffset).execute();

        let newEnd = this.moveCaretDown(rangeCopy.endContainer);
        rangeCopy.endContainer = newEnd.field;
        rangeCopy.endOffset = newEnd.caretPosition;

        return rangeCopy;
      } else {
        //The beginning of range will be moved
        let newBeginning = this.moveCaretDown(rangeCopy.startContainer);
        rangeCopy.startContainer = newBeginning.field;
        rangeCopy.startOffset = newBeginning.caretPosition;

        //Check if the start container is after the end
        if (
          (rangeCopy.startContainer.parentNode ===
            rangeCopy.endContainer.parentNode &&
            rangeCopy.startContainer !== rangeCopy.endContainer) ||
          (rangeCopy.startContainer === rangeCopy.endContainer &&
            rangeCopy.startOffset > rangeCopy.endOffset)
        ) {
          let properOrder = false;
          let curNode = rangeCopy.startContainer;
          let nextNode = curNode.nextSibling;
          while (nextNode) {
            if (nextNode === rangeCopy.endContainer) {
              properOrder = true;
              break;
            }
            curNode = nextNode;
            nextNode = curNode.nextSibling;
          }

          if (!properOrder) {
            shiftSelectionIsRightInternalVariable = true;
            let tmpStartContainer = rangeCopy.startContainer;
            let tmpStartOffset = rangeCopy.startOffset;
            rangeCopy.startContainer = rangeCopy.endContainer;
            rangeCopy.startOffset = rangeCopy.endOffset;
            rangeCopy.endContainer = tmpStartContainer;
            rangeCopy.endOffset = tmpStartOffset;
          }
        } else if (
          rangeCopy.endContainer.parentNode.nextSibling ===
          rangeCopy.startContainer.parentNode
        ) {
          shiftSelectionIsRightInternalVariable = true;
          let tmpStartContainer = rangeCopy.startContainer;
          let tmpStartOffset = rangeCopy.startOffset;
          rangeCopy.startContainer = rangeCopy.endContainer;
          rangeCopy.startOffset = rangeCopy.endOffset;
          rangeCopy.endContainer = tmpStartContainer;
          rangeCopy.endOffset = tmpStartOffset;
        }

        return rangeCopy;
      }
    },
  };
};*/