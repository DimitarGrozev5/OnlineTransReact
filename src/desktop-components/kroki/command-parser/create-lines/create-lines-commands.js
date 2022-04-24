import {
  deletePoint,
  executeCommand,
  updatePoint,
} from "../common/common-commands";

// Creates a command that merges multiple points
export const createMultipleLinesCommand = (commands) => ({
  type: "CREATE_MULTIPLE_LINES",
  meta: {
    caption: "Create multiple lines",
    desc: `${commands.length} lines will be created on execution`,
  },
  data: [...commands],
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
