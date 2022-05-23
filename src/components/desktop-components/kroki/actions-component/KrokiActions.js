import { useDispatch } from "react-redux";
import executeActionsThunk from "../../../../store/thunks-kroki/executeActionsThunk";

const KrokiActions = ({ actions }) => {
  const dispatch = useDispatch();

  const executeActionsHandler = () => {
    dispatch(executeActionsThunk());
  };

  return (
    <>
      <div>
        <ul>
          {actions.map((action, index) => (
            <li key={index}>
              <h3>{action.meta.caption}</h3>
              {action.meta.desc}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={executeActionsHandler}>Go</button>
      </div>
    </>
  );
};

export default KrokiActions;
