import { reservedCodes } from "../reserved-codes";
import { createMultipleLinesCommand } from "./create-lines-commands";

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

function baseParser([pt, actionsSoFar]) {
  let nextParser = [baseParser, actionsSoFar];
  const lineCode = isAcceptedLineCode(pt.c);
  lineCode && console.log(lineCode);
  return nextParser;
}

// Execute command to generate actions
export const createLines = (points) => {
  const reducer = ([parser, actions], currPt) => parser([currPt, actions]);
  const createdActions = points.reduce(reducer, [baseParser, []]);
  return createdActions[1].length
    ? [createMultipleLinesCommand(createdActions[1])]
    : [];
};
