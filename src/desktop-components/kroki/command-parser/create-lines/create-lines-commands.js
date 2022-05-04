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
export const createLinearSegmentCommand = (pt1, pt2) => ({
  type: cmds.LINEAR_SEGMENT,
  data: { pt1, pt2 },
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

// Executes a command creating a single line
// The function is executed in a produceWithPatches and it mutates the draft object
const createSingleLineFromCommand = (draft, cmd) => {
  const pointCommands = cmd.pointCommands;
  const segmentCommands = cmd.segmentCommands;

  // Execute pointCommands and update the state
  pointCommands.forEach((cmdPt) => executePointCommand(draft, cmdPt));

  // Create new line
  return segmentCommands;
};

// Executes a command creating mulitple lines
export const createMultipleLinesFromCommand = executeCommand(
  (draft, command) => {
    // Loop trough create line commands
    const commands = command.group;

    const lines = commands.reduce(
      (newLines, lineCmd) => [
        ...newLines,
        createSingleLineFromCommand(draft, lineCmd),
      ],
      []
    );

    // Update state
    draft.lines = [...draft.lines, ...lines];
  }
);
