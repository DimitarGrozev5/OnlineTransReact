import { hintsActions } from "../hints";

const boundries = {
  cad: [
    [4903765.932, 238889.022],
    [4901503.797, 308690.716],
    [4861829.291, 307646.295],
    [4860016.835, 379286.413],
    [4857468.741, 480003.728],
    [4851170.60078719, 479857.095501247],
    [4851370.39, 514703.789],
    [4881076.479, 515251.539],
    [4881624.057, 545104.502],
    [4901685.9, 544979.088],
    [4902234.25, 651890.512],
    [4891380.98, 652130.425],
    [4893059.722, 714697.603],
    [4863170.292, 715432.846],
    [4863127.587, 754931.398],
    [4800865.23, 755448.831],
    [4800055.533, 715570.014],
    [4750321.164, 716099.264],
    [4750213.33494862, 701911.905045574],
    [4729316.022, 703407.739],
    [4728495.251, 685344.852],
    [4707333.327, 685316.651],
    [4707557.168, 693750.963],
    [4676964.988, 694124.168],
    [4676964.988, 703603.444],
    [4669885.639, 703753.854],
    [4650108.885, 717790.618],
    [4641068.089, 718167.427],
    [4635845.142, 590498.071],
    [4630496.189, 590779.698],
    [4629933.143, 573507.114],
    [4596238.805, 574250.674],
    [4596072.332, 567173.461],
    [4568771.688, 567339.981],
    [4564209.237, 464369.513],
    [4584390.967, 463543.09],
    [4586188.406, 376634.138],
    [4576279.241, 376501.956],
    [4576344.79, 374251.494],
    [4579110.716, 279291.18],
    [4631435.513, 279913.203],
    [4631608.52, 270048.779],
    [4651940.337, 270692.842],
    [4651980.707, 260836.4],
    [4669384.71, 261007.32],
    [4669270.182, 251155.383],
    [4672763.022, 250868.979],
    [4672304.942, 231508.769],
    [4710305.761, 231953.292],
    [4710305.761, 234345.32],
    [4730066.112, 234985.905],
    [4730066.112, 242411.957],
    [4770717.48, 243660.862],
    [4771125.628, 235174.319],
  ],
  k3: [
    [4810171.27, 8419756.069],
    [4809805.959, 8489578.02],
    [4770124.823, 8489614.716],
    [4770270.167, 8561268.191],
    [4770493.1, 8662004.376],
    [4685147.618, 8662374.315],
    [4685569.592, 8696473.991],
    [4682824.948, 8696655.813],
    [4682971.378, 8701943.089],
    [4637910.375, 8701994.654],
    [4637663.422, 8567264.12],
    [4642879.512, 8567264.794],
    [4642849.951, 8564440.393],
    [4677596.545, 8564404.233],
    [4677594.542, 8562162.487],
    [4677311.542, 8428130.728],
    [4677489.642, 8419635.691],
  ],
  k5: [
    [4499126.955, 9386841.76],
    [4502608.928, 9489852.649],
    [4529909.575, 9489973.208],
    [4530001.596, 9497051.784],
    [4563702.162, 9496662.667],
    [4564083.405, 9513940.548],
    [4569435.13, 9513715.24],
    [4573309.317, 9641435.897],
    [4582353.852, 9641154.887],
    [4602278.905, 9627327.833],
    [4609359.756, 9627252.378],
    [4609460.112, 9617773.183],
    [4640056.163, 9617723.717],
    [4639921.57, 9609286.972],
    [4661083.438, 9609539.019],
    [4661713.044, 9627610.941],
    [4692137.147, 9625756.67],
    [4693222.983, 9459386.99],
    [4690308.191, 9459122.839],
    [4690643.234, 9426816.835],
    [4673019.515, 9426982.503],
    [4677908.743, 9387061.489],
    [4519315.909, 9386226.506],
  ],
  k7: [
    [4660097.989, 9416869.197],
    [4659998.15, 9439246.418],
    [4647588.428, 9439625.832],
    [4647382.654, 9660076.192],
    [4697123.644, 9659957.999],
    [4697605.689, 9699842.993],
    [4759866.846, 9699833.84],
    [4760233.765, 9660342.154],
    [4790123.142, 9659853.808],
    [4788966.103, 9597287.873],
    [4799818.592, 9597139.282],
    [4800183.399, 9490252.763],
    [4780125.568, 9490204.158],
    [4779838.107, 9460353.348],
    [4750142.565, 9459545.844],
    [4750272.602, 9417165.006],
  ],
  k9: [
    [4580268.383, 8409408.902],
    [4580327.497, 8411800.334],
    [4600098.944, 8411952.317],
    [4600282.438, 8419376.676],
    [4640956.229, 8419620.72],
    [4640575.056, 8449637.095],
    [4652673.62, 8449797.458],
    [4653017.941, 8553577.507],
    [4653037.023, 8559471.529],
    [4640209.589, 8559695.583],
    [4640177.256, 8562114.408],
    [4612883.265, 8562373.239],
    [4613127.673, 8659063.435],
    [4603180.592, 8659432.119],
    [4602844.866, 8652109.38],
    [4460601.657, 8652107.922],
    [4460088.07, 8644025.02],
    [4459754.105, 8557103.865],
    [4449845.399, 8557215.127],
    [4449855.436, 8554963.689],
    [4450283.233, 8459971.11],
    [4502604.882, 8459302.485],
    [4502534.523, 8449437.014],
    [4522875.786, 8449579.194],
    [4522672.925, 8439724.776],
    [4540075.953, 8439466.01],
    [4539718.244, 8429619.751],
    [4543203.003, 8429247.167],
    [4542266.826, 8409903.84],
  ],
};

const pointIsInBoundry = (x, y, boundry) => {
  //function for calculating the distance between two points
  const dist = (pt1, pt2) => {
    return Math.sqrt(
      (pt1[0] - pt2[0]) * (pt1[0] - pt2[0]) +
        (pt1[1] - pt2[1]) * (pt1[1] - pt2[1])
    );
  };

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

    //Check weater the intersection point lies between the start and endpoints of the polygon face
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

const guessCsThunk = (firstLine) => (dispatch, getState) => {
  const hintsSlice = getState().hints;
  const inputSystem = getState().systems.selectedSystems.input;

  if (firstLine.length === 1 && firstLine[0] === "") {
    dispatch(hintsActions.clearTyping());
    return;
  }

  if (hintsSlice.typingHintIsSet) {
    return;
  }

  // If there less that two fields then do nothing because there are no coorinates
  if (firstLine.length < 2) {
    if (hintsSlice.inputIsSet && hintsSlice.outputIsSet) {
      dispatch(hintsActions.setHints({ input: [], output: [] }));
    }
    return;
  }

  // Get the X and Y coordinates
  let x = firstLine[1];
  let y = firstLine[2];

  // If there are only two fields, they may be X and Y
  if (firstLine.length === 2) {
    x = firstLine[0];
    y = firstLine[1];
  }

  // Check if X && Y are numbers
  const numRegEx = /^[0-9]+\.{0,1}[0-9]*/;
  if (!numRegEx.test(x) || !numRegEx.test(y)) {
    return;
  }

  // Coherese X and Y
  x = +x;
  y = +y;

  // Check if the point is one of the Variant boundries
  // If so add it to the rawHints array
  const rawHints = Array.from(Object.entries(boundries)).reduce(
    (hints, [system, boundry]) => {
      if (pointIsInBoundry(x, y, boundry)) {
        return [...hints, system];
      }
      return hints;
    },
    []
  );

  // Create an array of hint objects for the dispatch function
  const hints = rawHints.reduce((allHints, hint) => {
    // If the selected input system matches the entered coordinates, do not show hints

    if (hint === "cad" && inputSystem.xy !== "bgs") {
      return [
        ...allHints,
        {
          xy: "bgs",
          h: "geo",
        },
        {
          xy: "bgs",
          h: "evrs",
        },
      ];
    } else if (
      ["k3", "k5", "k7", "k9"].includes(hint) &&
      inputSystem.variant !== hint
    ) {
      return [
        ...allHints,
        {
          xy: "cs70",
          variant: hint,
          h: "balt",
        },
      ];
    }
    return allHints;
  }, []);

  // If the hints array is empty do not dispatch an action
  hints.length && dispatch(hintsActions.setTyping());
  hints.length && dispatch(hintsActions.setHints({ input: hints, output: [] }));
};

export default guessCsThunk;
