import P from "parsimmon";
import { deletePointCommand } from "./command-creators";

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

// Code handlers
const delPrevHandler = (parser) => (reduced, pt, index) => {
  const delPrevConfirmed = parser.parse(pt.code).status;
  if (delPrevConfirmed) {
    const action = [deletePointCommand(index)];

    const targetIndex = 2 * reduced.pointer - index - 1;
    if (targetIndex >= 0) {
      action.push(deletePointCommand(targetIndex));
    }
    const pointer = targetIndex;
    return createReduced(pointer, [...reduced.actions, ...action]);
  } else {
    return null;
  }
};
const delNearestHandler = (parser, pts) => (reduced, pt, index) => {
  const delNearConfirmed = parser.parse(pt.code).status;
  if (delNearConfirmed) {
    const action = [deletePointCommand(index)];

    const targetIndex = nearest(pts, pt);
    if (targetIndex[0] !== null && targetIndex[0] >= 0) {
      action.push(deletePointCommand(targetIndex[0]));
    }

    const pointer = reduced.pointer;
    return createReduced(pointer, [...reduced.actions, ...action]);
  } else {
    return null;
  }
};

// Actions reducer
const createActions = (pts) => (reduced, pt, index) => {
  // Init handlers
  const delPrevHandler_ = delPrevHandler(delPrevParser);
  const delNearestHandler_ = delNearestHandler(delNearestParser, pts);

  // If hr is not null, then one parser managed to detect a valid code
  let hr = pipeParsers(delPrevHandler_, delNearestHandler_)(reduced, pt, index);
  if (hr) {
    return createReduced(hr.pointer + 1, hr.actions);
  }

  // If hr was null then return the current actions and update the pointer
  return createReduced(index + 1, reduced.actions);
};
const createReduced = (pointer, actions) => ({ pointer, actions });
const initReduced = createReduced(0, []);

// Execute command to generate actions
export const deletePoints = (points) => {
  const createActions_ = createActions(points);
  const reduced = points.reduce(createActions_, initReduced);
  return reduced.actions;
};

/// Helper functions

// Find the nearest point
function nearest(points, point) {
  const dist = (pt1, pt2) =>
    Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2);

  const compare = (prev, curr, index) => {
    const cDist = dist(curr.data, point.data);
    if (prev[1] > cDist && curr.data.n !== point.data.n) {
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