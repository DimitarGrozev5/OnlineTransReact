import { nanoid } from "nanoid";
import { commandParser } from "../../desktop-components/kroki/command-parser/commandParser";
import { krokiActions } from "../kroki";

const loadPointsThunk = () => (dispatch, getState) => {
  const state = getState();

  // Get transformed points and map them to a new format
  const transformedData = state.systems.transformedData.reduce((res, point) => {
    const id = nanoid();
    let fields = ["n", "x", "y", "h", "c"];
    const data = point
      .slice(0, 5)
      .reduce((obj, val) => ({ ...obj, [fields.shift()]: val }), {});

    // If the row is empty there will be no n prop, so skip the point
    if (data.n) {
      return [...res, { id, ...data }];
    }
    return res;
  }, []);

  // Add transformed points to store
  dispatch(krokiActions.addPoints(transformedData));

  // Apply command
  const newActions = commandParser(transformedData);
  // console.log(newActions);

  // Add actions to store
  newActions && dispatch(krokiActions.updateActions(newActions));
};

export default loadPointsThunk;
