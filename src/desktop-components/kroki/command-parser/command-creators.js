export const deletePointCommand = (id) => ({
  group: "POINT",
  type: "DELETE",
  target: id,
});
