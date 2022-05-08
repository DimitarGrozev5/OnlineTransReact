import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import DataOutputControls from "./DataOutputControls";
import TextArea from "./TextArea";
import TextAreaRow from "./TextAreaRow";
import TextAreaWraper from "./TextAreaWraper";

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

  // If there is a dxf file loaded
  if (transformedData && !transformedData.error && dxfData) {
    // Map transformed data to dxfData Points Map
    const tranformedEntityPoints = dxfData.entityPointsMap.map((dxfPt, i) => {
      const trPt = {};
      if ("xLineIndex" in dxfPt) {
        trPt.xLineIndex = dxfPt.xLineIndex;
      }
      if ("zLineIndex" in dxfPt) {
        trPt.zLineIndex = dxfPt.zLineIndex;
      }
      trPt.x = transformedData[i][2];
      trPt.y = transformedData[i][1];
      if ("h" in dxfPt) {
        trPt.h = transformedData[i][3];
      }
      return trPt;
    });

    const trDxfFileArr = [...dxfData.dxfFileArr];
    tranformedEntityPoints.forEach((pt) => {
      if ("xLineIndex" in pt) {
        trDxfFileArr[pt.xLineIndex] = pt.x;
        trDxfFileArr[pt.xLineIndex + 2] = pt.y;
        if ("h" in pt) {
          trDxfFileArr[pt.xLineIndex + 4] = pt.h;
        }
      }
      if ("zLineIndex" in pt) {
        trDxfFileArr[pt.zLineIndex] = pt.h;
      }
    });

    const saveToFile = () => {
      const data = trDxfFileArr.join("\n");
      const blob = new Blob([data], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      saveHref.current.href = url;
      saveHref.current.download = `tr.dxf`;
      saveHref.current.click();
    };

    output = (
      <>
        <button onClick={saveToFile}>Save DXF file</button>
        <a
          href="/"
          ref={saveHref}
          style={{ display: "none" }}
          // className={style["save-link"]}
        >
          save
        </a>
      </>
    );
  }

  return <React.Fragment>{output}</React.Fragment>;
};

export default DataOutput;
