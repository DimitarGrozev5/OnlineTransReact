import { systemsActions } from "../input-systems";

const transformInputDataThunk = () => (dispatch, getState) => {
  // const transformedData = getState().systems.transformedData;

  // If the input data is transformed do nothing
  // if (transformedData && !transformedData.error) {
  //   return;
  // }

  // If the input or output CSs are not set, display a message
  const selectedSystems = getState().systems.selectedSystems;
  if (!selectedSystems.input.variant) {
    dispatch(
      systemsActions.setTransformedData({
        error: "Please select a variant for the input CS",
      })
    );
    return;
  }
  if (!selectedSystems.output.variant) {
    dispatch(
      systemsActions.setTransformedData({
        error: "Please select a variant for the output CS",
      })
    );
    return;
  }

  // If the input data is not transformed get the input data
  const rawInputData = getState().inputData.data;

  // If the input text is empty skip
  if (
    rawInputData.length === 1 &&
    rawInputData[0].length === 1 &&
    rawInputData[0][0].value === ""
  ) {
    dispatch(systemsActions.setTransformedData(null));
    return;
  }

  // Reformat the data to be sendable to the server
  const reformatedData = rawInputData.reduce((output, row) => {
    const headers = ["#", "X", "Y", "H", "Code"];

    const rowContents = row.reduce((dataPoint, field, i) => {
      const key = headers.length ? headers.shift() : `var${i}`;
      return { ...dataPoint, [key]: field };
    }, {});

    return [...output, rowContents];
  }, []);

  const postData = {
    systems: selectedSystems,
    data: reformatedData,
  };

  // console.log(postData);

  dispatch(
    systemsActions.setTransformedData({
      error: "Loading...",
    })
  );
  // Fetch data
  fetch("http://127.0.0.1/online-trans-api/transform.php", {
    // fetch("online-trans-api/transform.php", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      // res
      //   .clone()
      //   .text()
      //   .then((t) => console.log(t));
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          throw new Error(data);
        });
      }
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      } else {
        return data;
      }
    })
    .then((data) => {
      if (data.error) {
        dispatch(
          systemsActions.setTransformedData({
            error: data.error,
          })
        );
      } else {
        const count = Object.values(data).length;

        const dataArr = [];
        for (let i = 1; i <= count; i++) {
          dataArr.push(data[i.toString()]);
        }

        const transformedData = dataArr.map((row) => {
          const fields = [];
          if (row["#"]) {
            fields.push(row["#"]);
          }
          if (row["X"]) {
            let x = +row["X"];
            if (isNaN(x)) {
              fields.push(row["X"]);
            } else {
              fields.push(x.toFixed(3));
            }
          }
          if (row["Y"]) {
            let y = +row["Y"];
            if (isNaN(y)) {
              fields.push(row["Y"]);
            } else {
              fields.push(y.toFixed(3));
            }
          }
          if (row["H"]) {
            let h = +row["H"];
            if (isNaN(h)) {
              fields.push(row["H"]);
            } else {
              fields.push(h.toFixed(3));
            }
          }
          if (row["Code"]) {
            fields.push(row["Code"]);
          }
          if (row["var"]) {
            fields.push(...row["var"]);
          }
          return fields;
        });

        dispatch(systemsActions.setTransformedData(transformedData));
      }
    })
    .catch((err) =>
      dispatch(systemsActions.setTransformedData({ error: err.toString() }))
    );
};

export default transformInputDataThunk;
