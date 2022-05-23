import { cmds } from "../common/command-names";
import { executeCommand, executePointCommand } from "../common/common-commands";

// Create line
// segments: SEGMENT COMMAND[]
// -> CREATE_LINE
export const createLineCommand = (segmentCommands, pointCommands) => ({
  type: cmds.CREATE_LINE,
  segmentCommands,
  pointCommands,
});

// Create linear segment to add to a polyline
// pt1: Object {x, y}
// -> pt2: Object {x, y}
// -> LINEAR_SEGMENT
export const createLinearSegmentCommand = (pt1Id, pt2Id) => ({
  type: cmds.LINEAR_SEGMENT,
  data: { pt1: pt1Id, pt2: pt2Id },
});

// Creates a command that bundles mulitple lines
export const createMultipleLinesCommand = (lineCommands) => ({
  type: cmds.CREATE_MULTIPLE_LINES,
  meta: {
    caption: "Create multiple lines",
    desc: `${lineCommands.length} lines will be created on execution`,
  },
  group: [...lineCommands],
});

// Executes a command creating mulitple lines
export const createMultipleLinesFromCommand = executeCommand(
  (draft, command) => {
    // Loop extract CREATE_LINE commands from CREATE_MULTIPLE_LINES
    const lineCommands = command.group;

    // Update state with lines
    draft.lines = [...draft.lines, ...lineCommands];

    // Extract point commands
    const pointCommands = lineCommands.reduce(
      (cmds, cmd) => [...cmds, ...cmd.pointCommands],
      []
    );

    // Execute pointCommands and update the state
    pointCommands.forEach((cmdPt) => executePointCommand(draft, cmdPt));
  }
);
