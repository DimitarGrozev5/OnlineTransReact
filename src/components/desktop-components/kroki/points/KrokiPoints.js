import { useDispatch } from "react-redux";
import { krokiActions } from "../../../../store/kroki";
import changeVersionThunk from "../../../../store/thunks-kroki/changeVersionThunk";
import styles from "./KrokiPoints.module.css";

const KrokiPoints = ({ points, actions, versionStack, versionIndex }) => {
  const dispatch = useDispatch();

  // Display versioning of points
  const versions = versionStack.length;
  // console.log(versions)
  const changeVersionHandler = (target) => () => {
    dispatch(changeVersionThunk(target));
  };

  // Modify points to visualize active actions
  const dActions = actions.filter((a) => a.type === "DELETE_SINGLE_POINT");
  const uActions = actions.filter((a) => a.type === "UPDATE_SINGLE_POINT");
  const intersection = points.map((pt) => {
    if (dActions?.find((a) => a.data === pt.id)) {
      return { ...pt, style: styles.delete };
    } else if (uActions?.find((a) => a.data.id === pt.id)) {
      return { ...pt, style: styles.update };
    } else {
      return { ...pt, style: "" };
    }
  });

  const copyPointsHandler = () => {
    const output = points
      .map((pt) => [pt.n, pt.x, pt.y, pt.h, pt.c].join("\t"))
      .join("\n");

    navigator.clipboard.writeText(output);
  };
  const renamePointsHandler = () => {
    dispatch(krokiActions.renamePoints());
  };

  return (
    <div>
      <div>
        <button onClick={copyPointsHandler}>Copy current points</button>
        <button onClick={renamePointsHandler}>Rename points 1,2...n</button>
        <h4>Rollback</h4>
        <ul>
          <li>
            {versionIndex === -1 ? (
              "Initial state"
            ) : (
              <button onClick={changeVersionHandler(-1)}>Initial state</button>
            )}
          </li>
          {[...Array(versions).keys()].map((i) => (
            <li key={i}>
              {i === versionIndex ? (
                versionStack[i].map((c) => c.caption).join(" & ")
              ) : (
                <button onClick={changeVersionHandler(i)}>
                  {versionStack[i].map((c) => c.caption).join(" & ")}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>X</th>
            <th>Y</th>
            <th>H</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {intersection.map((data) => (
            <tr className={data.style} key={data.id}>
              <td>{data.n}</td>
              <td>{data.x}</td>
              <td>{data.y}</td>
              <td>{data.h}</td>
              <td>{data.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KrokiPoints;
