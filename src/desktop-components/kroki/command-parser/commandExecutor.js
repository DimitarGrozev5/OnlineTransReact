import { deleteMultiplePointsFromCommand } from "./deletePoints/delete-points-commands";

export const commandExecutor = (state, command) => {
  const commandType = command.type;
  switch (commandType) {
    case "DELETE_MULTIPLE_POINTS":
      return deleteMultiplePointsFromCommand(state, command);

    default:
      return [state, null];
  }
};
