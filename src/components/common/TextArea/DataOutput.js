import { useSelector } from "react-redux";

const DataOutput = () => {
  const transformedData = useSelector((state) => state.systems.transformedData);

  let output = transformedData;

  // If the transformed data is null
  if (!transformedData) {
    output = "No data to show";
  }

  if (transformedData && transformedData.error) {
    output = transformedData.error;
  }

  return <div>{output}</div>;
};

export default DataOutput;
