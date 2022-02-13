import React, { useState } from "react";
import { useSelector } from "react-redux";
import DataOutputControls from "./DataOutputControls";
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

  //Wrap setting: Makes a row of data wrap or no-wrap
  const [wrap, setWrap] = useState(true);
  const changeWrapHandler = () => {
    setWrap((prevState) => !prevState);
  };

  if (transformedData && !transformedData.error) {
    output = (
      <React.Fragment>
        <DataOutputControls
          data={transformedData}
          systems={selected}
          wrap={wrap}
          onChangeWrap={changeWrapHandler}
        />
        <TextAreaWraper cs={selected.xy} hs={selected.h}>
          <table>
            <thead>
              <TextAreaRow
                wrap={wrap}
                header
                dataSource="output"
                displayMode="mode-tab"
              />
            </thead>
            <TextArea
              wrap={wrap}
              // allowedDividers={allowedDividers.filter((div) => div.on)}
              dataSource="output"
              displayMode="mode-tab"
            />
          </table>
        </TextAreaWraper>
      </React.Fragment>
    );
  }

  return <React.Fragment>{output}</React.Fragment>;
};

export default DataOutput;
