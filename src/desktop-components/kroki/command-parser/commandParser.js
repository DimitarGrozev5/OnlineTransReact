import { createLines } from "./create-lines/create-lines-code-parser";
import { deletePoints } from "./deletePoints/delete-points-code-parser";
import { mergePoints } from "./mergePoints/merge-points-code-parser";

export const commandParser = (points) => {
  // List of all commands
  // Each command is of type points -> actions
  const commands = [createLines];
  // const commands = [deletePoints, mergePoints, createLines];

  // The parser runs every command in sequence
  // If a command yealds a result, it skips the rest
  const newActions = commands.reduce((a, command) => {
    return a ? a : command(points);
  }, null);

  return newActions;
};
