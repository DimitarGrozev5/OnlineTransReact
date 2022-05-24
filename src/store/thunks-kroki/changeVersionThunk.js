import { applyPatches } from "@reduxjs/toolkit/node_modules/immer";
import { krokiActions } from "../krokiSlice";
import { testCommandThunk } from "./testCommandThunk";

const changeVersionThunk = (target) => (dispatch, getState) => {
  let state = getState().kroki;

  // Apply inverse patch to get new state
  const versionIndex = state.versionIndex;
  const versionStack = state.versionStack;

  let prop = "patch";
  let releventPatches = versionStack.slice(
    Math.max(versionIndex, 0),
    target + 1
  );
  if (target === versionIndex) {
    return;
  } else if (target < versionIndex) {
    prop = "reversePatch";
    releventPatches = versionStack
      .slice(target + 1, versionIndex + 1)
      .reverse();
  }

  const currState = { ...state };

  const newState = releventPatches.reduce((st, patches) => {
    return patches.reduce((s, patch) => {
      const p = patch[prop];
      return applyPatches(st, p);
    }, st);
  }, currState);

  // Update state
  dispatch(krokiActions.updateStateAndPointer([newState, target]));

  // Run next command
  dispatch(testCommandThunk());
};

export default changeVersionThunk;
