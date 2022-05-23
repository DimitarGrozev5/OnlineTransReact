import TextAreaField from "../TextAreaField/TextAreaField";
import classes from "./TextAreaRow.module.css";

const TextAreaRowHeader = (props) => {
  return (
    <tr
      className={
        classes.row +
        " " +
        classes.header +
        " " +
        (props.wrap ? classes.wrap : "")
      }
    >
      <TextAreaField
        header={props.header}
        value="№"
        dataSource={props.dataSource}
        displayMode={props.displayMode}
      />
      <TextAreaField
        header={props.header}
        value="X"
        dataSource={props.dataSource}
        displayMode={props.displayMode}
      />
      <TextAreaField
        header={props.header}
        value="Y"
        dataSource={props.dataSource}
        displayMode={props.displayMode}
      />
      <TextAreaField
        header={props.header}
        value="H"
        dataSource={props.dataSource}
        displayMode={props.displayMode}
      />
      <TextAreaField
        header={props.header}
        value="Code"
        dataSource={props.dataSource}
        displayMode={props.displayMode}
      />
    </tr>
  );
};

export default TextAreaRowHeader;
