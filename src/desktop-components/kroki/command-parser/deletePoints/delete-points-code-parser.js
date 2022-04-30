import P from "parsimmon";
import { createDeletePointCommand } from "../common/common-commands";
import {
  createDeleteCommandAndTargetCommand,
  createDeleteCommandCommand,
  createDeleteMultiplePointsCommand,
} from "./delete-points-commands";

//// Command that deletes a point
/// Syntax:
/// .del
///     .p - delete previous point
///     .n - delete nearest point
/// Ecpect .del to be the first and only command on the row
///
/// If the command is invoked multiple times with p, it deletes multiple previous points
/// e.g.
// pt1
// pt2
// pt3
// del.p
// del.p
/// This will delete pt1 and pt2 and yeald:
// pt1

// Code parsers
const delPrevParser = P.string(".del.p");
const delNearestParser = P.string(".del.n");

/////////////////////////// Code handlers
const delPrevHandler = (parser, pts) => (intermediate, pt, index) => {
  const delPrevConfirmed = parser.parse(pt.c).status;
  if (delPrevConfirmed) {
    const cmdPt = pt.id;
    let targetPt = null;

    const targetIndex = 2 * intermediate.pointer - index - 1;
    if (targetIndex >= 0) {
      const targetId = pts[targetIndex].id;
      targetPt = targetId;
    }

    let action = createDeleteCommandCommand(cmdPt);
    if (targetPt) {
      action = createDeleteCommandAndTargetCommand(cmdPt, targetPt);
    }

    const pointer = targetIndex;
    return createIntermediateValue(pointer, [...intermediate.actions, action]);
  } else {
    return null;
  }
};
const delNearestHandler = (parser, pts) => (intermediate, pt, index) => {
  const delNearConfirmed = parser.parse(pt.c).status;
  if (delNearConfirmed) {
    const cmdPt = pt.id;
    let targetPt = null;

    const targetIndex = nearest(pts, pt);
    if (targetIndex[0] !== null && targetIndex[0] >= 0) {
      const targetId = pts[targetIndex[0]].id;
      targetPt = targetId;
    }

    let action = createDeleteCommandCommand(cmdPt);
    if (targetPt) {
      action = createDeleteCommandAndTargetCommand(cmdPt, targetPt);
    }

    const pointer = intermediate.pointer;
    return createIntermediateValue(pointer, [...intermediate.actions, action]);
  } else {
    return null;
  }
};

// Actions reducer
const createActionsFromPoints = (pts) => (intermediateVal, pt, index) => {
  // Init handlers
  const delPrevHandler_ = delPrevHandler(delPrevParser, pts);
  const delNearestHandler_ = delNearestHandler(delNearestParser, pts);

  // If hr is not null, then one parser managed to detect a valid code
  let hr = pipeParsers(delPrevHandler_, delNearestHandler_)(
    intermediateVal,
    pt,
    index
  );
  if (hr) {
    return createIntermediateValue(hr.pointer + 1, hr.actions);
  }

  // If hr was null then return the current actions and update the pointer
  return createIntermediateValue(index + 1, intermediateVal.actions);
};
const createIntermediateValue = (pointer, actions) => ({ pointer, actions });
const initIntermediate = createIntermediateValue(0, []);

// Execute command to generate actions
export const deletePoints = (points) => {
  const createActions_ = createActionsFromPoints(points);
  const createdActions = points.reduce(createActions_, initIntermediate);
  return createdActions.actions.length
    ? [createDeleteMultiplePointsCommand(createdActions.actions)]
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
