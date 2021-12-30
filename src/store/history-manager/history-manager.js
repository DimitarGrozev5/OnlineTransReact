import produce from "@reduxjs/toolkit/node_modules/immer";

const inputDataHystory = {};
let currentVersion = -1;
const noOfVersionsSupported = 1000;

const executeCommand =
  (state, action = null) =>
  (command) => {
    return produce(
      state,
      (draft) => {
        command(state, action);
      },
      (patches, inversePatches) => {
        currentVersion++;
        inputDataHystory[currentVersion] = {
          redo: patches,
          undo: inversePatches,
        };
        delete inputDataHystory[currentVersion + 1];
        delete inputDataHystory[currentVersion - noOfVersionsSupported];
      }
    );
  };
