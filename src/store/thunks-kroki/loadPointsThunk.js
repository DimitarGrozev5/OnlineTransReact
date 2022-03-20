import { krokiActions } from "../kroki";

const loadPointsThunk = () => (dispatch, getState) => {
  const state = getState();
  const transformedData = state.systems.transformedData;

  dispatch(krokiActions.addPoints(transformedData));
};

export default loadPointsThunk;
