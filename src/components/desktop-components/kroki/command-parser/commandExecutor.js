import { cmds } from "./common/command-names";
import { createMultipleLinesFromCommand } from "./create-lines/create-lines-commands";
import { deleteMultiplePointsFromCommand } from "./deletePoints/delete-points-commands";
import { mergeMultiplePointsFromCommand } from "./mergePoints/merge-points-commands";

export const commandExecutor = (state, command) => {
  const commandType = command.type;
  let executor = null;
  switch (commandType) {
    case cmds.DELETE_MULTIPLE_POINTS:
      executor = deleteMultiplePointsFromCommand;
      break;
    case cmds.MERGE_MULTIPLE_POINTS:
      executor = mergeMultiplePointsFromCommand;
      break;
    case cmds.CREATE_MULTIPLE_LINES:
      executor = createMultipleLinesFromCommand;
      break;

    default:
      executor = () => [state, null];
  }

  return executor(state, command);
};
