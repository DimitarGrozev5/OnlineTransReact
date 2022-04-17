const deletePoint = (points, action) => {
  return [
    ...points.slice(0, action.target),
    ...points.slice(action.target + 1),
  ];
};

export const applyAction = (points, action) => {
  const name = action.group + "_" + action.type;
  switch (name) {
    case "POINT_DELETE":
      return deletePoint(points, action);
    default:
      break;
  }
};
