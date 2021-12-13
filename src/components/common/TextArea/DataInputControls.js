import classes from "./DataInputControls.module.css";

const DataInputControls = (props) => {
  return (
    <div>
      <button onClick={props.onChangeWrap}>
        {props.wrap ? "No-Wrap" : "Wrap"}
      </button>
    </div>
  );
};

export default DataInputControls;
