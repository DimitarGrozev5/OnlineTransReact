import { createSlice } from "@reduxjs/toolkit";

const allXYSystems = [
  {
    handle: "bgs",
    caption: "БГС 2005",
    variants: [
      {
        handle: "cad",
        caption: "Кадастрална",
      },
    ],
  },
  {
    handle: "cs70",
    caption: "КС 1970",
    variants: [
      {
        handle: "k3",
        caption: "К3",
      },
      {
        handle: "k5",
        caption: "К5",
      },
      {
        handle: "k7",
        caption: "К7",
      },
      {
        handle: "k9",
        caption: "К9",
      },
    ],
  },
];

const allHSystems = [
  {
    handle: "geo",
    caption: "Геодезични височини",
  },
  {
    handle: "evrs",
    caption: "EVRS 2007",
  },
  {
    handle: "balt",
    caption: "Балтийска система",
  },
];

const systemsSlice = createSlice({
  name: "inputSystems",
  initialState: {
    allSystems: {
      allXYSystems,
      allHSystems,
    },
    selectedSystems: {
      input: {
        xy: "bgs",
        variant: 'cad',
        h: "geo",
      },
      output: {
        xy: "cs70",
        variant: null,
        h: "balt",
      },
    },
    transformedData: null,
  },
  reducers: {
    setSystem(state, action) {
      const { inputOrOutput, system, newValue } = action.payload;

      // If the user changes the system, remove the transformation data
      if (state.selectedSystems[inputOrOutput][system] !== newValue) {
        state.transformedData = null;
        if (system === 'xy') {
          state.selectedSystems[inputOrOutput].variant = newValue === 'bgs' ? 'cad' : null;
        }
      }

      state.selectedSystems[inputOrOutput] = {
        ...state.selectedSystems[inputOrOutput],
        [system]: newValue,
      };
    },
    setTransformedData(state, action) {
      if (action.payload.error) {
        state.transformedData = action.payload;
      } else {
        state.transformedData = action.payload;
      }
    },
  },
});

export const systemsActions = systemsSlice.actions;
export const systemsReducer = systemsSlice.reducer;
