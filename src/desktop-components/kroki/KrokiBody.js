import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadPointsThunk from "../../store/thunks-kroki/loadPointsThunk";
import KrokiCanvas from "./canvas/KrokiCanvas";
import styles from "./KrokiBody.module.css";
import KrokiPoints from "./points/KrokiPoints";

const KrokiBody = () => {
  const dispatch = useDispatch();

  // Get point data
  const currentPoints = useSelector(
    (state) =>
      // state.kroki.pointsOrder.map((id) => state.kroki.pointData[id])
      state.kroki.pointData
  );
  const currentActions = useSelector((state) => state.kroki.actions);
  const pointActions = currentActions.filter(
    (action) => action.group === "POINT"
  );

  // On load check if there are points
  // If no, load them from the output data
  useEffect(() => {
    if (!currentPoints.length) {
      dispatch(loadPointsThunk());
    }
  }, [currentPoints, dispatch]);

  return (
    <div className={styles.main}>
      <div className={styles["actions"]}>actions</div>
      <div className={styles["results"]}>results</div>
      <div className={styles["points-container"]}>
        <KrokiPoints points={currentPoints} actions={pointActions} />
      </div>
      <div className={styles["canvas"]}>
        <KrokiCanvas points={currentPoints} pointActions={pointActions} />
      </div>
    </div>
  );
};

export default KrokiBody;
