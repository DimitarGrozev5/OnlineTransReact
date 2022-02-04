import React from "react";
import { useSelector } from "react-redux";
import TextAreaRow from "./TextAreaRow";
import TextAreaWraper from "./TextAreaWraper";

const DataOutput = () => {
  const transformedData = useSelector((state) => state.systems.transformedData);
  const selected = useSelector((state) => state.systems.selectedSystems.output);

  let output = transformedData;

  // If the transformed data is null
  if (!transformedData) {
    output = <div>{"No data to show"}</div>;
  }

  // If there was an error
  if (transformedData && transformedData.error) {
    output = <div>{transformedData.error}</div>;
  }

  if (transformedData && !transformedData.error) {
    output = (
      <TextAreaWraper cs={selected.xy} hs={selected.h}>
        <table>
          <thead>
            <TextAreaRow wrap={false} header />
          </thead>
          <tbody>
            {transformedData.map((row, i) => {
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
                <tr key={i}>
                  {fields.map((field) => (
                    <td>{field}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </TextAreaWraper>
    );
  }

  return <React.Fragment>{output}</React.Fragment>;
};

export default DataOutput;
