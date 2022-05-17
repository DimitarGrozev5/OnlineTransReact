import produce from "@reduxjs/toolkit/node_modules/immer";
import React, { useState } from "react";
import classes from "./AccordionViewer.module.css";

const AccordionViewer = (props) => {
  
  const [content, setContent] = useState(props.content);

  const viewQuestionHandler = (index) => () => {
    setContent(
      produce((draft) => {
        const prevVal = draft[index].show;
        draft.forEach((e) => (e.show = false));
        draft[index].show = !prevVal;
      })
    );
  };

  return (
    <div>
      {content.map((e, i) => {
        return (
          <div className={classes.question} key={i}>
            <button
              className={classes.question__heading}
              onClick={viewQuestionHandler(i)}
            >
              {e.heading}
            </button>
            {e.show && (
              <div className={classes.question__content}>{e.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AccordionViewer;
