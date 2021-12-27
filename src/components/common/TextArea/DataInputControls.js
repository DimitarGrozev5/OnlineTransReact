import { useState } from "react/cjs/react.development";
//import classes from "./DataInputControls.module.css";

const DataInputControls = (props) => {
  const [showDividerSelect, setShowDividerSelect] = useState(false);

  const toggleDividersHandler = () => {
    setShowDividerSelect((state) => !state);
  };

  return (
    <div>
      <button onClick={props.onChangeWrap}>
        {props.wrap ? "No-Wrap" : "Wrap"}
      </button>
      <div>
        <button onClick={toggleDividersHandler}>Разделители</button>
        {showDividerSelect && (
          <div>
            {props.allowedDividers.map((divider, index) => {
              return (
                <div key={index}>
                  <div>
                    <input type="checkbox" checked={divider.on} onChange={props.onToggleDivider.bind(null, index)} />
                  </div>
                  <div>{divider.caption}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataInputControls;
