import { cmds } from "../common/command-names";

// Create line
// segments: SEGMENT COMMAND[]
// -> CREATE_LINE
export const createLineCommand = (segmentCommands, pointCommands) => ({
  type: cmds.CREATE_LINE,
  segmentCommands,
  pointCommands,
});

// Create linear segment to add to a polyline
// pt1: Object {x, y}
// -> pt2: Object {x, y}
// -> LINEAR_SEGMENT
export const createLinearSegmentCommand = (pt1, pt2) => ({
  type: cmds.LINEAR_SEGMENT,
  data: { pt1, pt2 },
});

// Creates a command that bundles mulitple lines
export const createMultipleLinesCommand = (lineCommands) => ({
  type: "CREATE_MULTIPLE_LINES",
  meta: {
    caption: "Create multiple lines",
    desc: `${lineCommands.length} lines will be created on execution`,
  },
  group: [...lineCommands],
});

// Executes a command for merging multiple points11
// export const mergeMultiplePointsFromCommand = executeCommand(
//   (draft, command) => {
//     // Loop trough delete single point commands and execute them
//     const commands = command.data;

//     commands.forEach((cmd) => {
//       switch (cmd.type) {
//         case "DELETE_SINGLE_POINT":
//           deletePoint(draft, cmd);
//           break;
//         case "UPDATE_SINGLE_POINT":
//           updatePoint(draft, cmd);
//           break;
//         default:
//           break;
//       }
//       deletePoint(draft, cmd);
//     });
//   }
// );
