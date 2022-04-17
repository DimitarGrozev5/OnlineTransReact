import { deletePoints } from "./deletePoints";


const nextCommandName = (prevCmd) => {
  const queue = ["deletePoint", "mergePoints"];

  const indexOfPrev = queue.indexOf(prevCmd);
  if (indexOfPrev < 0) {
    return queue[0];
  }

  if (indexOfPrev === queue.length - 1) {
    return null;
  }

  return queue[indexOfPrev + 1];
};


const mergePoints = (points) => null;

export const commandParser = (prevCmd, points) => {
  const commands = {
    deletePoint: {
      name: "delete points",
      getActions: deletePoints,
    },
    mergePoints: {
      name: "merge points",
      getActions: mergePoints,
    },
  };

  const nextName = nextCommandName(prevCmd);
  const nextCommand = commands[nextName];
  return [nextCommand.name, nextCommand.getActions(points)];
};
