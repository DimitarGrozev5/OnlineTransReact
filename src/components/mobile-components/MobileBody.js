import React from "react";
import PickSystem from "../common/PickSystem";
import WidgetContainer from "../common/WidgetContainer";

import classes from "./MobileBody.module.css";
import DataInput from "../common/TextArea/DataInput";
import { useDispatch, useSelector } from "react-redux";
import { systemsActions } from "../../store/input-systems";
import DataOutput from "../common/TextArea/DataOutput";
import hintOnSystemChangeThunk from "../../store/thunks-hint/hint-on-system-change";

const MobileBody = (props) => {
  const dispatch = useDispatch();

  const systems = useSelector((state) => state.systems.allSystems);
  const selected = useSelector((state) => state.systems.selectedSystems);
  const selectedInputSystemVariants = useSelector(
    (state) =>
      state.systems.allSystems.allXYSystems.find(
        (system) => system.handle === state.systems.selectedSystems.input.xy
      ).variants
  );
  const selectedOutputSystemVariants = useSelector(
    (state) =>
      state.systems.allSystems.allXYSystems.find(
        (system) => system.handle === state.systems.selectedSystems.output.xy
      ).variants
  );

  const changeInputCSHandler = (targetCS) => {
    dispatch(
      hintOnSystemChangeThunk({
        inputOrOutput: "input",
        system: "xy",
        newValue: targetCS,
      })
    );
  };

  const changeInputVariantHandler = (targetCS) => {
    dispatch(
      hintOnSystemChangeThunk({
        inputOrOutput: "input",
        system: "variant",
        newValue: targetCS,
      })
    );
  };

  const changeInputHSHandler = (targetCS) => {
    dispatch(
      hintOnSystemChangeThunk({
        inputOrOutput: "input",
        system: "h",
        newValue: targetCS,
      })
    );
  };

  const changeOutputCSHandler = (targetCS) => {
    dispatch(
      hintOnSystemChangeThunk({
        inputOrOutput: "output",
        system: "xy",
        newValue: targetCS,
      })
    );
  };

  const changeOutputVariantHandler = (targetCS) => {
    dispatch(
      hintOnSystemChangeThunk({
        inputOrOutput: "output",
        system: "variant",
        newValue: targetCS,
      })
    );
  };

  const changeOutputHSHandler = (targetCS) => {
    dispatch(
      hintOnSystemChangeThunk({
        inputOrOutput: "output",
        system: "h",
        newValue: targetCS,
      })
    );
  };

  return (
    <main className={classes.main}>
      {props.activePage === "1" && (
        <React.Fragment>
          <WidgetContainer title="Входна Координатна Система">
            <PickSystem
              title="Входна КС"
              categories={systems.allXYSystems}
              selectedCategory={selected.input.xy}
              selectedVariant={selected.input.variant}
              showVariants
              activeCategoryVariants={selectedInputSystemVariants}
              onChangeSystem={changeInputCSHandler}
              onChangeVariant={changeInputVariantHandler}
            />
          </WidgetContainer>

          <WidgetContainer title="Входна Височинна Система">
            <PickSystem
              title="Входна КС"
              categories={systems.allHSystems}
              selectedCategory={selected.input.h}
              onChangeSystem={changeInputHSHandler}
            />
          </WidgetContainer>
        </React.Fragment>
      )}
      {props.activePage === "2" && (
        <React.Fragment>
          <WidgetContainer title="Изходна Координатна Система">
            <PickSystem
              title="Изходна КС"
              categories={systems.allXYSystems}
              selectedCategory={selected.output.xy}
              selectedVariant={selected.output.variant}
              showVariants
              activeCategoryVariants={selectedOutputSystemVariants}
              onChangeSystem={changeOutputCSHandler}
              onChangeVariant={changeOutputVariantHandler}
            />
          </WidgetContainer>

          <WidgetContainer title="Изходна Височинна Система">
            <PickSystem
              title="Изходна КС"
              categories={systems.allHSystems}
              selectedCategory={selected.output.h}
              onChangeSystem={changeOutputHSHandler}
            />
          </WidgetContainer>
        </React.Fragment>
      )}
      {props.activePage === "3" && (
        <React.Fragment>
          <WidgetContainer title="Входни координати" expand>
            <DataInput />
          </WidgetContainer>
        </React.Fragment>
      )}
      {props.activePage === "4" && (
        <React.Fragment>
         <WidgetContainer title="Трансформирани координати" expand>
           <DataOutput />
          </WidgetContainer>
        </React.Fragment>
      )}
    </main>
  );
};

export default MobileBody;
