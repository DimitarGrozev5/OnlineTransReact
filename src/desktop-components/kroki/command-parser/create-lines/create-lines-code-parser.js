import { nanoid } from "nanoid";
import {
  createUpdatePointCommand,
  updatePoint,
} from "../common/common-commands";
import { reservedCodes } from "../reserved-codes";
import {
  createLinearSegmentCommand,
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

// Parser chain
const lineSegmentBuilder =
  (pt1) =>
  ([pt2, lines]) => {
    // Base case for the return value
    let nextParser = [lineSegmentBuilder(pt1), lines];

    const lineCode = isAcceptedLineCode(pt2.c); // [text, number, more] OR null
    if (lineCode) {
      let nextLines = [...lines];
      const [lineLabel, lineNum, code] = lineCode;
      let nextCode = code;
      const lineId = "" + lineLabel + lineNum;

      // Get the target line from the actionsSoFar
      // This parser is called only after the line is actually added
      // so it should be found
      let targetLine = lines.find((l) => l.cmdId === lineId);

      // Parse end of line flag
      if (code === "e") {
        targetLine.cmdId = null;
        nextCode = "";
      }

      // Create new segment command and add it to the targetLine
      const newSegmentCmd = createLinearSegmentCommand(pt1, pt2);
      targetLine.segmentCommands.push(newSegmentCmd);

      // Parse close line flag
      if (code === "c") {
        targetLine.cmdId = null;

        const firstPoint = targetLine.segmentCommands[0].data.pt1;
        const newSegmentCmd = createLinearSegmentCommand(pt2, firstPoint);
        targetLine.segmentCommands.push(newSegmentCmd);

        nextCode = "";
      }

      // Update the code of the point
      const updatedPoint = createUpdatePointCommand({
        ...pt2,
        code: "" + lineLabel + nextCode,
      });
      targetLine.pointCommands.push(updatedPoint);

      // Update the return value with the finish line segment parser
      nextParser = [lineSegmentBuilder(pt2), nextLines];
    }

    return nextParser;
  };

// Create line object
const newLine = (cmdId, pt) => [
  // Segment parser
  lineSegmentBuilder,

  // Line state object
  {
    id: nanoid(),
    cmdId,
    segmentCommands: [],
    pointCommands: [],
  },
];

const baseParser = (pt, lines) => {
  // Base case for the return value
  let returnValue = lines;

  const lineCode = isAcceptedLineCode(pt.c); // [text, number, more] OR null
  // If the current pt is representing a line vertex
  if (lineCode) {
    let nextLines = [...lines];
    const [lineLabel, lineNum, code] = lineCode;
    let nextCode = code;
    const lineId = "" + lineLabel + lineNum;

    // Check if the line is added to the Lines So Far
    let targetLine = lines.find((l) => l[1].cmdId === lineId);
    // If no add the line
    if (!targetLine) {
      targetLine = newLine(lineId);
      nextLines = [...lines, targetLine];
    }

    // Update the code of the point
    const updatedPoint = createUpdatePointCommand({
      ...pt,
      code: "" + lineLabel + nextCode,
    });
    targetLine[1].pointCommands.push(updatedPoint);

    // Rung the segment builder for the line
    const nextSegmentBuilder = targetLine[0](pt);
    targetLine[0] = nextSegmentBuilder;

    // Update return value with the finish line segment parser
    returnValue = nextLines;
  }
  return returnValue;
};

// Execute command to generate actions
export const createLines = (points) => {
  // lines: [segmentBuilder, lineData][]
  const reducer = (lines, currPt) => baseParser(currPt, lines);
  const createdActions = points.reduce(reducer, [baseParser, []]);

  const pointAndLineActions = createdActions.flatMap((line) => {
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
