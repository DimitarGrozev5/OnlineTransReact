import {
  createDeletePointCommand,
  createUpdatePointCommand,
} from "../common/common-commands";
import {
  createMergeMultiplePointsCommand,
  createMergeTwoPointsCommand,
  createRemoveHCommand,
} from "./merge-points-commands";

//// Command that merges coordinates and height from two points
/// Syntax:
/// [code?].xy - remove h from the current point
///
/// On two consecutive rows
/// Takes xy from the first and h from the second
/// If the second row is missing, the first is parsed as .xy
/// [code?].xyh
/// |> [code?].xyh
///
/// On two consecutive rows
/// Takes h from the first and xy from the second
/// If the second row is missing, the command is parsed as .xy
/// [code?].hxy
/// |> [code?].hxy

// Parser chain
const hIgnore = ([pt, actionsSoFar]) => {
  const newCode = pt.c.substring(0, pt.c.length - 3);
  const updatedPoint = { ...pt, h: -1000, c: newCode };
  const updateCommand = createRemoveHCommand(updatedPoint);
  return [baseParser, [...actionsSoFar, updateCommand]];
};

const thenH =
  (pt1) =>
  ([pt2, actionsSoFar]) => {
    if (pt2.c.endsWith(".xyh")) {
      const newCode = pt1.c.substring(0, pt1.c.length - 4);
      const updatedPoint = { ...pt1, x: pt1.x, y: pt1.y, h: pt2.h, c: newCode };
      const updateCommand = createMergeTwoPointsCommand(updatedPoint, pt2.id);
      return [baseParser, [...actionsSoFar, updateCommand]];
    } else {
      return hIgnore([pt1, actionsSoFar]);
    }
  };
const xyThenH = ([pt1, actionsSoFar]) => [thenH(pt1), actionsSoFar];

const thenXY =
  (pt1) =>
  ([pt2, actionsSoFar]) => {
    if (pt2.c.endsWith(".hxy")) {
      const newCode = pt1.c.substring(0, pt1.c.length - 4);
      const updatedPoint = { ...pt1, x: pt2.x, y: pt2.y, h: pt1.h, c: newCode };
      const updateCommand = createMergeTwoPointsCommand(updatedPoint, pt2.id);
      return [baseParser, [...actionsSoFar, updateCommand]];
    } else {
      const newCode = pt1.c.substring(0, pt1.c.length - 4);
      const updatedPoint = { ...pt1, x: pt1.x, y: pt1.y, h: -1000, c: newCode };
      const updateCommand = createRemoveHCommand(updatedPoint);
      return baseParser([pt2, [...actionsSoFar, updateCommand]]);
    }
  };
const hThenXY = ([pt1, actionsSoFar]) => [thenXY(pt1), actionsSoFar];

function baseParser([pt, actionsSoFar]) {
  let nextParser = [baseParser, actionsSoFar];
  if (pt.c.endsWith(".xy")) nextParser = hIgnore([pt, actionsSoFar]);
  if (pt.c.endsWith(".xyh")) nextParser = xyThenH([pt, actionsSoFar]);
  if (pt.c.endsWith(".hxy")) nextParser = hThenXY([pt, actionsSoFar]);
  return nextParser;
}

// Execute command to generate actions
export const mergePoints = (points) => {
  const reducer = (prev, curr) => prev[0]([curr, prev[1]]);
  const createdActions = points.reduce(reducer, [baseParser, []]);
  return createdActions[1].length
    ? [createMergeMultiplePointsCommand(createdActions[1])]
    : null;
};
