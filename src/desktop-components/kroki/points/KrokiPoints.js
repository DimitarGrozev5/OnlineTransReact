import styles from "./KrokiPoints.module.css";

const KrokiPoints = ({ points, actions }) => {
  const dActions =
    actions && actions.filter((a) => a.type === "DELETE_SINGLE_POINT");
  const intersection = points.map((pt) => {
    if (dActions?.find((a) => a.data === pt.id)) {
      return { ...pt, style: styles.delete };
    } else {
      return { ...pt, style: "" };
    }
  });
  return (
    <div>
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
