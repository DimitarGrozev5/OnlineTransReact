import { deleteMultiplePointsFromCommand } from "./deletePoints/delete-points-commands";
import { mergeMultiplePointsFromCommand } from "./mergePoints/merge-points-commands";

export const commandExecutor = (state, command) => {
  const commandType = command.type;
  switch (commandType) {
    case "DELETE_MULTIPLE_POINTS":
      return deleteMultiplePointsFromCommand(state, command);
    case "MERGE_MULTIPLE_POINTS":
      return mergeMultiplePointsFromCommand(state, command);

    default:
      return [state, null];
  }
};
