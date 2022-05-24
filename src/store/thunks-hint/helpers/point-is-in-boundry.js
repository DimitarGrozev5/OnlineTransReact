import { dist } from "../../../utils/dist";

export const pointIsInBoundry = (x, y, boundry) => {
  //Check if a point is in a polygon

  //Loop trough all of the polygon segments

  //Intersection counter
  let intCounter = 0;

  for (let i = 0; i < boundry.length; i++) {
    //Get first point of polygon segment
    const x1 = boundry[i][0];
    const y1 = boundry[i][1];

    //Get second point of polygon segment
    //If i points at the last point, get the first point
    let x2;
    let y2;
    if (i + 1 === boundry.length) {
      x2 = boundry[0][0];
      y2 = boundry[0][1];
    } else {
      x2 = boundry[i + 1][0];
      y2 = boundry[i + 1][1];
    }

    //Calculate polygon face line equation
    //In the case the polugon segment is vertical there is a different procedure
    let yInt = y;
    let xInt = x1;
    if (x2 - x1 !== 0) {
      const k = (y2 - y1) / (x2 - x1);
      const m = y1 - k * x1;

      //Calculating the X and Y coordinates of the intersection point
      yInt = y;
      xInt = (y - m) / k;
    }

    //Check if the intersection point lies between the start and endpoints of the polygon face
    //Get the distances between the start point, end point and the intersecton point
    const d12 = dist([x1, y1], [x2, y2]);
    const d1i = dist([x1, y1], [xInt, yInt]);
    const d2i = dist([x2, y2], [xInt, yInt]);

    //If any of the distances is greather than the d12, then the intersection point lies on the line segment
    //If the intersection point coincides with the secont node, then it is couintint as a crossing
    //This applies only for the second node so as to not double count intersections.
    if (d1i < d12 && d2i <= d12 && xInt > x) {
      intCounter++;
    }
  }
  return intCounter % 2 === 1;
};