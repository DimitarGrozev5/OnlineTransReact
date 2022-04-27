import { nanoid } from "nanoid";
import {
  createUpdatePointCommand,
  updatePoint,
} from "../common/common-commands";
import { reservedCodes } from "../reserved-codes";
import {
  addPointToLineCommand,
  closeLineCommand,
  createLineCommand,
  createMultipleLinesCommand,
} from "./create-lines-commands";

//// Command that creates lines from point codes
/// Syntax:
/// [code][number] - line point
// ex:
// asf1
///
/// [code][number].e - end the current line
// ex:
// asf4.e
///
/// [code][number].c - end the current line and connect the last point to the last point
// ex:
// sgr1.c

/// Helper functions
const isLineCode = (reservedCodes) => (code) => {
  // Pattern [text][number].[more]
  const ptrn = /^([a-zA-Z]+)([1-9]+[0-9]*)\.{0,1}(.*)/;
  const result = code.match(ptrn);

  if (!result) return null;
  if (reservedCodes.includes(result[1])) return null;

  return [result[1], result[2], result[3]];
};
const isAcceptedLineCode = isLineCode(reservedCodes);

// Create line object
const newLine = (cmdId) => ({
  id: nanoid(),
  cmdId,
  commands: [],
});

// Parser chain

function baseParser([pt, lines]) {
  let nextParser = [baseParser, lines];

  const lineCode = isAcceptedLineCode(pt.c);
  if (lineCode) {
    let nextLines = [...lines];
    const [lineLabel, lineNum, code] = lineCode;
    let nextCode = code;
    const lineId = "" + lineLabel + lineNum;

    // Check if the line is added to the actionsSoFar
    let targetLine = lines.find((l) => l.cmdId === lineId);

    // If no add the line
    if (!targetLine) {
      targetLine = newLine(lineId);
      nextLines = [...lines, targetLine];
    }

    // Add the new point to the line
    const newPoint = addPointToLineCommand(pt.id, targetLine.id);
    targetLine.commands.push(newPoint);

    // Parse the rest of the code and continue
    if (code === "e") {
      targetLine.cmdId = null;
      nextCode = "";
    }
    if (code === "c") {
      targetLine.cmdId = null;
      targetLine.commands.push(closeLineCommand(targetLine.id));
      nextCode = "";
    }

    // Update code of points
    const updatedPoint = createUpdatePointCommand({
      ...pt,
      code: "" + lineLabel + nextCode,
    });
    targetLine.commands.push(updatedPoint);

    // Update return value
    nextParser = [baseParser, nextLines];
  }

  return nextParser;
}

// Execute command to generate actions
export const createLines = (points) => {
  const reducer = ([parser, lines], currPt) => parser([currPt, lines]);
  const createdActions = points.reduce(reducer, [baseParser, []]);

  const pointAndLineActions = createdActions[1].flatMap((line) => {
    const [ptActions, linActions] = line.commands.reduce(
      ([pt, lin], cmd) => {
        switch (cmd.type) {
          case "UPDATE_SINGLE_POINT":
          case "CREATE_SINGLE_POINT":
          case "DELETE_SINGLE_POINT":
            return [[...pt, cmd], lin];
          case "ADD_POINT_TO_LINE":
          case "CLOSE_LINE":
            return [pt, [...lin, cmd]];
          default:
            return [pt, lin];
        }
      },
      [[], []]
    );
    return [...ptActions, createLineCommand(line.id, linActions)];
  });

  return pointAndLineActions.length ? pointAndLineActions : [];
};
