import P from "parsimmon";
import { createDeletePointCommand } from "../common/common-commands";
import { createMergeMultiplePointsCommand } from "./merge-points-commands";

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
/// If the second row is missing, the command is ignored
/// [code?].hxy
/// |> [code?].hxy

// Code parsers
const randomCodeParser = P.regexp(/.*/);
const xyParser = P.string(".xy");
const hParser = P.string(".h");
const xyhParser = P.string(".xyh");
const hxyParser = P.string(".hxy");

/////////////////////////// Code handlers
const hIgnoreHandler = (pts) => (intermediate, pt, index) => {
  // const hIgnoreConfimed = P.seq(randomCodeParser, xyParser).parse(pt.c);
  const hIgnoreConfimed = pt.c.endsWith(".xy");
  if (hIgnoreConfimed) {
    // const action = [createDeletePointCommand(pt.id)];

    // const targetIndex = 2 * intermediate.pointer - index - 1;
    // if (targetIndex >= 0) {
    //   const targetId = pts[targetIndex].id;
    //   action.push(createDeletePointCommand(targetId));
    // }
    // const pointer = targetIndex;
    // return createIntermediateValue(pointer, [
    //   ...intermediate.actions,
    //   ...action,
    // ]);
    return null;
  } else {
    return null;
  }
};

// Actions reducer
const createActionsFromPoints = (pts) => (intermediateVal, pt, index) => {
  // Init handlers
  const hIgnoreHandler_ = hIgnoreHandler(pts);

  // If hr is not null, then one parser managed to detect a valid code
  let hr = pipeParsers(hIgnoreHandler_)(intermediateVal, pt, index);
  if (hr) {
    return createIntermediateValue(hr.pointer + 1, hr.actions);
  }

  // If hr was null then return the current actions and update the pointer
  return createIntermediateValue(index + 1, intermediateVal.actions);
};
const createIntermediateValue = (pointer, actions) => ({ pointer, actions });
const initIntermediate = createIntermediateValue(0, []);

// Execute command to generate actions
export const mergePoints = (points) => {
  const createActions_ = createActionsFromPoints(points);
  const createdActions = points.reduce(createActions_, initIntermediate);
  return createdActions.actions.length
    ? [createMergeMultiplePointsCommand(createdActions.actions)]
    : null;
};

/// Helper functions

// Find the nearest point
function nearest(points, point) {
  const dist = (pt1, pt2) =>
    Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2);

  const compare = (prev, curr, index) => {
    const cDist = dist(curr, point);
    if (prev[1] > cDist && curr.id !== point.id) {
      return [index, cDist];
    } else {
      return prev;
    }
  };

  return points.reduce(compare, [null, 1000000]);
}

// Pipe value true the provided handlers
// If one handler returns a valid value, then skip all of the rest
function pipeParsers(...handlers) {
  return (reduced, pt, index) =>
    handlers.reduce((prev, curr) => {
      if (prev) {
        return prev;
      } else {
        return curr(reduced, pt, index);
      }
    }, null);
}
