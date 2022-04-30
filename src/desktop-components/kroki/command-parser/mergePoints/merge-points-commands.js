import { cmds } from "../common/command-names";
import {
  deletePoint,
  executeCommand,
  updatePoint,
} from "../common/common-commands";

// Creates a command that removes the Height of a point
export const createRemoveHCommand = (ptData) => ({
  type: cmds.REMOVE_INVALID_H,
  meta: {
    caption: "One point has only coordinate data",
    desc: `Point ${ptData.n} has only coordinate data`,
  },
  pointCommands: [ptData],
});

// Creates a command that combines coordinates from one point and height from another
export const createMergeTwoPointsCommand = (updateFirstPoint, deleteSecondPoint) => ({
  type: cmds.MERGE_TWO_POINTS,
  meta: {
    caption: "Merge two points",
    desc: `Point ${updateFirstPoint.n} will be updated. The next point will be removed`,
  },
  pointCommands: [updateFirstPoint, deleteSecondPoint],
});

// Creates a command that merges multiple points
export const createMergeMultiplePointsCommand = (commands) => ({
  type: cmds.MERGE_MULTIPLE_POINTS,
  meta: {
    caption: "Merge multiple points",
    desc: `${commands.length} points will be merged on execution`,
  },
  group: [...commands],
});

// Executes a command for merging multiple points11
export const mergeMultiplePointsFromCommand = executeCommand(
  (draft, command) => {
    // Loop trough delete single point commands and execute them
    const commands = command.data;

    commands.forEach((cmd) => {
      switch (cmd.type) {
        case "DELETE_SINGLE_POINT":
          deletePoint(draft, cmd);
          break;
        case "UPDATE_SINGLE_POINT":
          updatePoint(draft, cmd);
          break;
        default:
          break;
      }
      deletePoint(draft, cmd);
    });
  }
);
