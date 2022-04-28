import { deletePoint, executeCommand } from "../common/common-commands";
import { cmds } from "../common/command-names";

// Creates a command that deletes a command point and a target point
// cmdPt: DELETE_SINGLE_POINT
// -> targetPt: DELETE_SINGLE_POINT
// -> DELETE_COMMAND_AND_TARGET
export const createDeleteCommandAndTargetCommand = (cmdPt, targetPt) => ({
  type: cmds.DELETE_COMMAND_AND_TARGET,
  meta: {
    caption: "Delete command point and target point",
    desc: `Points ${cmdPt.n} & ${targetPt.n} will be deleted`,
    points: { cmdPt, targetPt },
  },
  pointCommands: [cmdPt, targetPt],
});

// Creates a command that deletes a command point
// It's used when the target point doesn't exist
// cmdPt: DELETE_SINGLE_POINT
// -> DELETE_COMMAND
export const createDeleteCommandCommand = (cmdPt) => ({
  type: cmds.DELETE_COMMAND,
  meta: {
    caption: "Delete command point",
    desc: `Point ${cmdPt.n} will be deleted. The command points to an unvalid point`,
  },
  pointCommands: [cmdPt],
});

// Creates a command that deletes multiple points
// commands: DELETE_COMMAND_AND_TARGET[]
// -> DELETE_MULTIPLE_POINTS
export const createDeleteMultiplePointsCommand = (commands) => ({
  type: cmds.DELETE_MULTIPLE_POINTS,
  meta: {
    caption: "Delete multiple points",
    desc: `${commands.length} points will be deleted on execution`,
  },
  group: [...commands],
});

// Executes a command for deleting multiple points
export const deleteMultiplePointsFromCommand = executeCommand(
  (draft, command) => {
    // Loop trough delete single point commands and execute them
    const commands = command.data;

    commands.forEach((cmd) => {
      deletePoint(draft, cmd);
    });
  }
);
