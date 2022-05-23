import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import TextAreaWraper from "../../TextAreaWraper/TextAreaWraper";
import { saveDxfToFile } from "../hooks/saveDxfToFile";
import styles from "./DataOutput.module.css";
import DataOutputCoords from "./DataOutputCoords";

const DataOutput = () => {
  const transformedData = useSelector((state) => state.systems.transformedData);
  const selected = useSelector((state) => state.systems.selectedSystems.output);

  const dxfData = useSelector((state) => state.inputData.dxfData);
  const saveHref = useRef();

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

  if (transformedData && !transformedData.error && !dxfData) {
    output = (
      <DataOutputCoords
        transformedData={transformedData}
        selected={selected}
        wrap={wrap}
        changeWrapHandler={changeWrapHandler}
      />
    );
  }

  // If there is a dxf file loaded
  if (transformedData && !transformedData.error && dxfData) {
    const data = saveDxfToFile(transformedData, dxfData);

    const saveToFile = () => {
      const blob = new Blob([data], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      saveHref.current.href = url;
      saveHref.current.download = `tr.dxf`;
      saveHref.current.click();
    };

    const classes = ["dxf-button", selected.xy, selected.h]
      .map((c) => styles[c])
      .join(" ");

    output = (
      <TextAreaWraper cs={selected.xy} hs={selected.h}>
        <div className={classes}>
          <button onClick={saveToFile}>Save DXF file</button>
          <a href="/" ref={saveHref} style={{ display: "none" }}>
            save
          </a>
        </div>
      </TextAreaWraper>
    );
  }

  return <React.Fragment>{output}</React.Fragment>;
};

export default DataOutput;
