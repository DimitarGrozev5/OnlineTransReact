import { nanoid } from "nanoid";
import { createUpdatePointCommand } from "../common/common-commands";
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
const lineSegmentBuilder = (pt1Id) => (pt2Id) => {
  // Create new segment command and add it to the targetLine
  const newSegmentCmd = createLinearSegmentCommand(pt1Id, pt2Id);
  return newSegmentCmd;
};

// Create line object
const newLine = (cmdId) => [
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
      c: "" + lineLabel + nextCode,
    });
    targetLine[1].pointCommands.push(updatedPoint);

    // Run the segment builder for the line
    const segmentBuilderResult = targetLine[0](pt.id);
    if (segmentBuilderResult instanceof Function) {
      targetLine[0] = segmentBuilderResult;
    } else {
      targetLine[1].segmentCommands.push(segmentBuilderResult);

      //// Select next segment function based on point code
      // Case end of line
      const endRegex = /^e$|^e\..+$/;
      if (endRegex.test(code)) {
        targetLine[0] = () => {};
        targetLine[1].cmdId = null;

        const updatedPoint = createUpdatePointCommand({
          ...pt,
          c: "" + lineLabel + nextCode.substring(2),
        });
        targetLine[1].pointCommands.push(updatedPoint);

        return nextLines;
      }

      // Case new line segment
      targetLine[0] = lineSegmentBuilder(pt.id);

      // Case close line
      const closeRegex = /^c$|^c\..+$/;
      if (closeRegex.test(code)) {
        targetLine[0] = () => {};

        const firstPoint = targetLine[1].segmentCommands[0].data.pt1;
        const closingSegment = lineSegmentBuilder(pt.id)(firstPoint);
        targetLine[1].segmentCommands.push(closingSegment);
        targetLine[1].cmdId = null;

        const updatedPoint = createUpdatePointCommand({
          ...pt,
          c: "" + lineLabel + nextCode.substring(2),
        });
        targetLine[1].pointCommands.push(updatedPoint);

        return nextLines;
      }
    }

    // Update return value with the finish line segment parser
    returnValue = nextLines;
  }
  return returnValue;
};

// Execute command to generate actions
export const createLines = (points) => {
  // lines: [segmentBuilder, lineData][]
  const reducer = (lines, currPt) => baseParser(currPt, lines);
  const createdActions = points.reduce(reducer, []);
  const createdLines = createdActions.map((a) =>
    createLineCommand(a[1].segmentCommands, a[1].pointCommands)
  );

  return createdLines.length ? [createMultipleLinesCommand(createdLines)] : [];
};
