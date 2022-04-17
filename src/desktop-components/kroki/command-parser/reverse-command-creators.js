import { reverseDeletePointCommand } from "./command-creators";

const reversePointDelete = (state, action) => {
  const ptData = state.pointData[action.target];
  return reverseDeletePointCommand(action.target, ptData);
};

export const reverseCommands = (state, actions) => {
  return actions.map((a) => {
    const name = a.group + "_" + a.type;
    switch (name) {
      case "POINT_DELETE":
        return reversePointDelete(state, a);
      default:
        throw new Error("Unrecognized action group or type");
    }
  });
};
