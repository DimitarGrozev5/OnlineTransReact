import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadPointsThunk from "../../store/thunks-kroki/loadPointsThunk";
import KrokiActions from "./actions-component/KrokiActions";
import KrokiCanvas from "./canvas/KrokiCanvas";
import styles from "./KrokiBody.module.css";
import KrokiPoints from "./points/KrokiPoints";

const KrokiBody = () => {
  const dispatch = useDispatch();

  // Get point data
  const currentPoints = useSelector((state) =>
    state.kroki.pointDataArr.map((id) => state.kroki.pointDataObj[id])
  );

  // Get action data
  const currentAction = useSelector((state) => state.kroki.actions);

  // Extract point actions
  const pointActions =
    currentAction &&
    currentAction.data.filter((action) => {
      switch (action.type) {
        case "DELETE_SINGLE_POINT":
        case "UPDATE_SINGLE_POINT":
        case "CREATE_SINGLE_POINT":
          return true;
        default:
          return false;
      }
    });

  // On load check if there are points
  // If no, load them from the output data
  useEffect(() => {
    if (!currentPoints.length) {
      dispatch(loadPointsThunk());
    }
  }, [currentPoints, dispatch]);

  return (
    <div className={styles.main}>
      <div className={styles["actions"]}>
        {/* <KrokiActions actions={currentActions} /> */}
      </div>
      <div className={styles["results"]}>results</div>
      <div className={styles["points-container"]}>
        <KrokiPoints points={currentPoints} actions={pointActions} />
      </div>
      <div className={styles["canvas"]}>
        {/* <KrokiCanvas points={currentPoints} pointActions={pointActions} /> */}
        <KrokiCanvas points={currentPoints} />
      </div>
    </div>
  );
};

export default KrokiBody;
