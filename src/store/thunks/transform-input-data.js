import { systemsActions } from "../input-systems";

const transformInputDataThunk = () => (dispatch, getState) => {
  const transformedData = getState().systems.transformedData;

  // If the input data is transformed do nothing
  if (transformedData) {
    return;
  }

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
  const rawInputData = getState().inputData.rows;

  // If the input text is empty skip
  if (
    rawInputData.length === 1 &&
    rawInputData[0].fields.length === 1 &&
    rawInputData[0].fields[0].value === ""
  ) {
    dispatch(systemsActions.setTransformedData(null));
    return;
  }

  // Reformat the data to be sendable to the server
  const reformatedData = rawInputData.reduce((output, row) => {
    const headers = ["#", "X", "Y", "H", "Code"];

    const rowContents = row.fields.reduce((dataPoint, field, i) => {
      const key = headers.length ? headers.shift() : `var${i}`;
      return { ...dataPoint, [key]: field.value };
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
  // fetch("http://127.0.0.1/online-trans-api/transform.php", {
  fetch("online-trans-api/transform.php", {
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

        dispatch(systemsActions.setTransformedData(dataArr));
      }
    })
    .catch((err) => console.log(err));
};

export default transformInputDataThunk;
