import React, { useContext } from "react";
import PickSystem from "../common/PickSystem";
import WidgetContainer from "../common/WidgetContainer";
import SystemsContext from "../store/systems-context";

import classes from "./MobileBody.module.css";

const MobileBody = (props) => {
  const ctx = useContext(SystemsContext);

  const changeInputCSHandler = (targetCS) => {
    ctx.changeInputCS(targetCS);
  };

  const changeInputVariantHandler = (targetCS) => {
    ctx.changeInputVariantCS(targetCS);
  };
  
  const changeInputHSHandler = (targetCS) => {
    ctx.changeInputHS(targetCS);
  };

  return (
    <main className={classes.main}>
      {props.activePage === "1" && (
        <React.Fragment>
          <WidgetContainer title="Входна Координатна Система">
            <PickSystem
              title="Входна КС"
              categories={ctx.coordinateSystems}
              selectedCategory={ctx.selectedInputCS}
              selectedVariant={ctx.selectedInputVariantCS}
              showVariants
              activeCategoryVariants={ctx.getVariants(ctx.selectedInputCS)}
              onChangeSystem={changeInputCSHandler}
              onChangeVariant={changeInputVariantHandler}
            />
          </WidgetContainer>

          <WidgetContainer title="Входна Височинна Система">
            <PickSystem
              title="Входна КС"
              categories={ctx.heightSystems}
              selectedCategory={ctx.selectedInputHS}
              onChangeSystem={changeInputHSHandler}
            />
          </WidgetContainer>
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
