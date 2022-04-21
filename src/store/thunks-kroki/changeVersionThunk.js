import { applyPatches } from "@reduxjs/toolkit/node_modules/immer";
import { commandParser } from "../../desktop-components/kroki/command-parser/commandParser";
import { krokiActions } from "../kroki";

const changeVersionThunk = (target) => (dispatch, getState) => {
  let state = getState().kroki;

  // Apply inverse patch to get new state
  const versionIndex = state.versionIndex;
  const versionStack = state.versionStack.slice(
    Math.min(target, versionIndex),
    Math.max(target, versionIndex) + 1
  );

  let prop = "patch";
  let releventPatches = versionStack.slice(versionIndex, target + 1);
  if (target === versionIndex) {
    return;
  } else if (target < versionIndex) {
    prop = "reversePatch";
    releventPatches = versionStack.slice(target, versionIndex + 1);
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

  // Run command
  state = getState().kroki;
  const transformedData = state.pointDataArr.map(
    (id) => state.pointDataObj[id]
  );
  const newActions = commandParser(transformedData);

  // Add actions to store
  dispatch(krokiActions.updateActions(newActions));
};

export default changeVersionThunk;
