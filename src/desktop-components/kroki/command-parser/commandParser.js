import { deletePoints } from "./deletePoints";

// Stub
const mergePoints = (points) => [];

export const commandParser = (points) => {
  // List of all commands
  // Each command is of type points -> actions
  const commands = [deletePoints, mergePoints];

  // The parser runs every command in sequence
  // If a command yealds a result, it skips the rest
  const newActions = commands.reduce(
    (a, command) => (a.length ? a : command(points)),
    []
  );

  return newActions;
};
