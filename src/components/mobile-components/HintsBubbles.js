import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import setSystemThunk from "../../store/thunks-hint/set-system";
import classes from "./HintsBubbles.module.css";

const HintsBubbles = (props) => {
  const dispatch = useDispatch();

  const source = props.hints;

  const rawHints = useSelector((state) => state.hints[source]);
  const [hints, setHints] = useState(rawHints);

  useEffect(() => {
    setHints(rawHints);
  }, [rawHints]);

  const setCSByHintHandler = (xy, variant, h) => () => {
    if (xy === "cs70" && !variant) {
      const hint = { xy, h };
      setHints([
        {
          ...hint,
          variant: "k3",
        },
        {
          ...hint,
          variant: "k7",
        },
        {
          ...hint,
          variant: "k9",
        },
        {
          ...hint,
          variant: "k5",
        },
      ]);
    } else {
      dispatch(
        setSystemThunk({
          inputOrOutput: source,
          system: "xy",
          newValue: xy,
        })
      );
      variant &&
        dispatch(
          setSystemThunk({
            inputOrOutput: source,
            system: "variant",
            newValue: variant,
          })
        );
      dispatch(
        setSystemThunk({
          inputOrOutput: source,
          system: "h",
          newValue: h,
        })
      );
      setHints([]);
    }
  };

  return (
    <div className={classes.hint + " " + classes["size-" + hints.length]}>
      {hints.map((hint, i) => (
        <button
          key={i}
          className={classes[hint.xy] + " " + classes[hint.h]}
          onClick={setCSByHintHandler(hint.xy, hint.variant, hint.h)}
        >
          {hint.variant && hint.variant.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default HintsBubbles;
