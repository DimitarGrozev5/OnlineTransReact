import { useDispatch, useSelector } from "react-redux";
import executeActionsThunk from "../../../store/thunks-kroki/executeActionsThunk";

const KrokiActions = ({ actions }) => {
  const dispatch = useDispatch();

  const currentCommand = useSelector((state) => state.kroki.currentCommand);

  const executeActionsHandler = () => {
    dispatch(executeActionsThunk());
  };

  return (
    <>
      <div>
        {currentCommand}: {actions.length / 2} points to be deleted (not
        counting command points)
      </div>
      <div>
        <button onClick={executeActionsHandler}>Go</button>
      </div>
    </>
  );
};

export default KrokiActions;
