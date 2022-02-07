import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { systemsActions } from "../../store/input-systems";
import setSystemThunk from "../../store/thunks-hint/set-system";

import classes from "./MobileNavigation.module.css";

const MobileNavigation = (props) => {
  const dispatch = useDispatch();

  const selected = useSelector((state) => state.systems.selectedSystems);
  const hints = useSelector((state) => state.hints);

  const setCSByHintHandler = (io, xy, variant, h) => () => {
    dispatch(
      setSystemThunk({
        inputOrOutput: io,
        system: "xy",
        newValue: xy,
      })
    );
    dispatch(
      setSystemThunk({
        inputOrOutput: io,
        system: "h",
        newValue: h,
      })
    );
  };

  // Setting up hints for the input cs
  const inputHintsDiv = (
    <div className={classes.hint}>
      {hints.input.map((hint, i) => (
        <button
          key={i}
          className={classes[hint.xy] + " " + classes[hint.h]}
          onClick={setCSByHintHandler("input", hint.xy, hint.variant, hint.h)}
        ></button>
      ))}
    </div>
  );

  // Setting up hints for the output CS

  const outputHintsDiv = (
    <div className={classes.hint}>
      {hints.output.map((hint, i) => (
        <button
          key={i}
          className={classes[hint.xy] + " " + classes[hint.h]}
          onClick={setCSByHintHandler("output", hint.xy, hint.variant, hint.h)}
        ></button>
      ))}
    </div>
  );

  const changeActivePageHandler = (event) => {
    props.onChangeActivePage(event.target.dataset.id);
  };

  return (
    <nav className={classes.nivigation}>
      <ul>
        <li className={props.activePage === "1" ? classes.active : ""}>
          {inputHintsDiv}
          <button data-id="1" onClick={changeActivePageHandler}>
            Входни параметри
            <div data-id="1" className={classes["data-bar"]}>
              <div
                data-id="1"
                className={classes[selected.input.variant && selected.input.xy]}
              ></div>
              <div data-id="1" className={classes[selected.input.h]}></div>
            </div>
          </button>
        </li>
        <li className={props.activePage === "2" ? classes.active : ""}>
          {outputHintsDiv}
          <button data-id="2" onClick={changeActivePageHandler}>
            Изходни параметри
            <div data-id="2" className={classes["data-bar"]}>
              <div
                data-id="2"
                className={
                  classes[selected.output.variant && selected.output.xy]
                }
              ></div>
              <div data-id="2" className={classes[selected.output.h]}></div>
            </div>
          </button>
        </li>
        <li className={props.activePage === "3" ? classes.active : ""}>
          <button data-id="3" onClick={changeActivePageHandler}>
            Входни координати
            <div data-id="3" className={classes["data-bar"]}>
              <div
                data-id="3"
                className={classes[selected.input.variant && selected.input.xy]}
              ></div>
              <div data-id="3" className={classes[selected.input.h]}></div>
            </div>
          </button>
        </li>
        <li className={props.activePage === "4" ? classes.active : ""}>
          <button data-id="4" onClick={changeActivePageHandler}>
            Изходни координати
            <div data-id="4" className={classes["data-bar"]}>
              <div
                data-id="4"
                className={
                  classes[selected.output.variant && selected.output.xy]
                }
              ></div>
              <div data-id="4" className={classes[selected.output.h]}></div>
            </div>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigation;
