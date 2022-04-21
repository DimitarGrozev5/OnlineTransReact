// Creates a command that deletes a single point
export const createDeletePointCommand = (id) => ({
  type: "DELETE_SINGLE_POINT",
  data: id,
});

// Creates a command that updates a single point
export const createUpdatePointCommand = (id) => ({
  type: "DELETE_SINGLE_POINT",
  data: id,
});