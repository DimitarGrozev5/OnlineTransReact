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

  // Reformat the data to be sendable to the server
  const reformatedData = rawInputData.reduce((output, row) => {
    const headers = ["#", "X", "Y", "H", "Code"];

    const rowContents = row.fields.reduce((dataPoint, field, i) => {
      const key = headers.length ? headers.shift() : `var${i - 5}`;
      return { ...dataPoint, [key]: field.value };
    }, {});

    return [...output, rowContents];
  }, []);

  const postData = {
    systems: selectedSystems,
    data: reformatedData,
  };

  console.log(postData)

  // Fetch data
};

export default transformInputDataThunk;
