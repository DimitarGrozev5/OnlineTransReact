import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


//Probably useless
const commandQueue = [];

const useCommandQueue = (selectorFn) => {
  const stateUpdate = useSelector((state) => state.inputData);
  const dispatch = useDispatch();

  const addCommandToQueue = useCallback(
    (action) => {
      if (!commandQueue.length) {
        dispatch(action());
      } else {
        commandQueue.push(action);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (commandQueue.length) {
      const action = commandQueue.shift();
      dispatch(action());
    }
  }, [dispatch]);

  return addCommandToQueue;
};

export default useCommandQueue;
