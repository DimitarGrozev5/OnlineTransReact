//function for calculating the distance between two points
export const dist = (pt1, pt2) => {
  return Math.sqrt(
    (pt1[0] - pt2[0]) * (pt1[0] - pt2[0]) +
      (pt1[1] - pt2[1]) * (pt1[1] - pt2[1])
  );
};