import { deletePoint, executeCommand } from "../common/common-commands";

// Creates a command that deletes multiple points
export const createDeleteMultiplePointsCommand = (commands) => ({
  type: "DELETE_MULTIPLE_POINTS",
  meta: {
    caption: "Delete multiple points",
    desc: `${commands.length} points will be deleted on execution`,
  },
  data: [...commands],
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
