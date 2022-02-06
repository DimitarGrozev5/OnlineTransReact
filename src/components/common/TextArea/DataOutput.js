import React from "react";
import { useSelector } from "react-redux";
import TextArea from "./TextArea";
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
            <TextAreaRow wrap={false} header dataSource="output" />
          </thead>
          <TextArea
            wrap={"wrap"}
            // allowedDividers={allowedDividers.filter((div) => div.on)}
            dataSource="output"
          />
        </table>
      </TextAreaWraper>
    );
  }

  return <React.Fragment>{output}</React.Fragment>;
};

export default DataOutput;
