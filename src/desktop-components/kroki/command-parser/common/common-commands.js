// Creates a command that deletes a single point
export const createDeletePointCommand = (id) => ({
  type: "DELETE_SINGLE_POINT",
  data: id,
});

// Creates a command that updates a single point
export const createUpdatePointCommand = (updatedPt) => ({
  type: "UPDATE_SINGLE_POINT",
  data: updatedPt,
});