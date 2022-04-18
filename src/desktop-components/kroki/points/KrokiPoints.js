import styles from "./KrokiPoints.module.css";

const KrokiPoints = ({ points, actions }) => {
  // const dActions = actions.filter((a) => a.type === "DELETE");
  // const intersection = points.map((pt, index) => {
  //   if (dActions.find((a) => a.target === index)) {
  //     return { ...pt, style: styles.delete };
  //   } else {
  //     return { ...pt, style: "" };
  //   }
  // });
  const intersection = points;
  const style = "none";
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
          {intersection.map((data, index) => (
            <tr className={style} key={index}>
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
