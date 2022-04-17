export const deletePointCommand = (id) => ({
  group: "POINT",
  type: "DELETE",
  target: id,
});

export const createPointCommand = ({ n, x, y, h, c }) => ({
  group: "POINT",
  type: "CREATE",
  data: { n, x, y, h, c },
});

// Reverse commands
export const reverseDeletePointCommand = (id, data) => ({
  group: "POINT",
  type: "REVERSE_DELETE",
  target: id,
  data,
});
