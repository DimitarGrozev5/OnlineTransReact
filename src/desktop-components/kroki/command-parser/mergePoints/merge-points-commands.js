import { produceWithPatches } from "@reduxjs/toolkit/node_modules/immer";

// Creates a command that merges multiple points
export const createMergeMultiplePointsCommand = (commands) => ({
  type: "MERGE_MULTIPLE_POINTS",
  meta: {
    caption: "Merge multiple points",
    desc: `${commands.length} points will be merged on execution`,
  },
  data: [...commands],
});