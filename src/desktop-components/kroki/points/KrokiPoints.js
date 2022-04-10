import styles from "./KrokiPoints.module.css";

const KrokiPoints = ({ points }) => {
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
          {points.map(({ data }, index) => (
            <tr kry={index}>
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
