import { useState } from "react/cjs/react.development";
import classes from "./DataInputControls.module.css";

const DataInputControls = (props) => {
  const [showDividerSelect, setShowDividerSelect] = useState(false);

  return (
    <div>
      <button onClick={props.onChangeWrap}>
        {props.wrap ? "No-Wrap" : "Wrap"}
      </button>
      <div>
        <button>Разделители</button>
        {showDividerSelect && <div>
          {props.allowedDividers.map(divider => {
            return <div>
              <div></div>
              <div></div>
            </div>
          })}
        </div>}
      </div>
    </div>
  );
};

export default DataInputControls;
