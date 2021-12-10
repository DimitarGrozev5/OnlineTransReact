import React from "react";
import PickCoordinateSystem from "../common/PickCoordinateSystem";

import classes from "./MobileBody.module.css";

const MobileBody = (props) => {
  return (
    <main className={classes.main}>
      {props.activePage === "1" && (
        <React.Fragment>
          <PickCoordinateSystem title="Входна КС" />
          <section>Входна ВС</section>
        </React.Fragment>
      )}
      {props.activePage === "2" && (
        <React.Fragment>
          <section>изходна КС</section>
          <section>изходна ВС</section>
        </React.Fragment>
      )}
      {props.activePage === "3" && (
        <React.Fragment>
          <section>Входни Координати</section>
        </React.Fragment>
      )}
      {props.activePage === "4" && (
        <React.Fragment>
          <section>Изходни Координати</section>
        </React.Fragment>
      )}
    </main>
  );
};

export default MobileBody;
