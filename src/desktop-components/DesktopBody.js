import { useDispatch, useSelector } from "react-redux";
import PickSystem from "../components/common/PickSystem";
import DataInput from "../components/common/TextArea/DataInput";
import DataOutput from "../components/common/TextArea/DataOutput";
import WidgetContainer from "../components/common/WidgetContainer";
import setSystemThunk from "../store/thunks-hint/set-system";
import styles from "./DesktopBody.module.css";

const DesktopBody = (props) => {
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
      setSystemThunk({
        inputOrOutput: "input",
        system: "xy",
        newValue: targetCS,
      })
    );
  };

  const changeInputVariantHandler = (targetCS) => {
    dispatch(
      setSystemThunk({
        inputOrOutput: "input",
        system: "variant",
        newValue: targetCS,
      })
    );
  };

  const changeInputHSHandler = (targetCS) => {
    dispatch(
      setSystemThunk({
        inputOrOutput: "input",
        system: "h",
        newValue: targetCS,
      })
    );
  };

  const changeOutputCSHandler = (targetCS) => {
    dispatch(
      setSystemThunk({
        inputOrOutput: "output",
        system: "xy",
        newValue: targetCS,
      })
    );
  };

  const changeOutputVariantHandler = (targetCS) => {
    dispatch(
      setSystemThunk({
        inputOrOutput: "output",
        system: "variant",
        newValue: targetCS,
      })
    );
  };

  const changeOutputHSHandler = (targetCS) => {
    dispatch(
      setSystemThunk({
        inputOrOutput: "output",
        system: "h",
        newValue: targetCS,
      })
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles["xy-in"]}>
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
      </div>

      <div className={styles["h-in"]}>
        <WidgetContainer title="Входна Височинна Система">
          <PickSystem
            title="Входна КС"
            categories={systems.allHSystems}
            selectedCategory={selected.input.h}
            onChangeSystem={changeInputHSHandler}
          />
        </WidgetContainer>
      </div>

      <div className={styles["reverse-systems"]}>Reverse</div>

      <div className={styles["xy-out"]}>
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
      </div>

      <div className={styles["h-out"]}>
        <WidgetContainer title="Изходна Височинна Система">
          <PickSystem
            title="Изходна КС"
            categories={systems.allHSystems}
            selectedCategory={selected.output.h}
            onChangeSystem={changeOutputHSHandler}
          />
        </WidgetContainer>
      </div>

      <div className={styles["textarea-in"]}>
        <WidgetContainer title="Входни координати" expand>
          <DataInput />
        </WidgetContainer>
      </div>

      <div className={styles["transform-btn"]}>Transform</div>

      <div className={styles["textarea-out"]}>
        <WidgetContainer title="Трансформирани координати" expand>
          <DataOutput />
        </WidgetContainer>
      </div>
    </div>
  );
};

export default DesktopBody;
