import { useSelector } from "react-redux";

const DataOutput = () => {
  const transformedData = useSelector((state) => state.systems.transformedData);

  let output = transformedData;

  // If the transformed data is null
  if (!transformedData) {
    output = "No data to show";
  }

  // If there was an error
  if (transformedData && transformedData.error) {
    output = transformedData.error;
  }

  if (transformedData && !transformedData.error) {
    output = (
      <table>
        <thead>
          <tr>
            <td>№</td>
            <td>X</td>
            <td>Y</td>
            <td>H</td>
            <td>Code</td>
          </tr>
        </thead>
        <tbody>
          {transformedData.map((row) => {
            const fields = [];
            if (row["#"]) {
              fields.push(row["#"]);
            }
            if (row["X"]) {
              fields.push(+row["X"].toFixed(3));
            }
            if (row["Y"]) {
              fields.push(+row["Y"].toFixed(3));
            }
            if (row["H"]) {
              fields.push(+row["H"].toFixed(3));
            }
            if (row["Code"]) {
              fields.push(row["Code"]);
            }
            if (row["var"]) {
              fields.push(...row["var"]);
            }

            return (
              <tr>
                {fields.map((field) => (
                  <td>{field}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return <div>{output}</div>;
};

export default DataOutput;
