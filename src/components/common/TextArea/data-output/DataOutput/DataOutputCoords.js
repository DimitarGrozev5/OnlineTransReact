import TextArea from "../../text-area-common/TextArea/TextArea";
import TextAreaRow from "../../text-area-common/TextAreaRow/TextAreaRow";
import TextAreaWraper from "../../TextAreaWraper/TextAreaWraper";
import DataOutputControls from "../DataOutputControls/DataOutputControls";

const DataOutputCoords = ({transformedData, selected, wrap,changeWrapHandler}) => {
  return (
    <>
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
    </>
  );
};

export default DataOutputCoords;
