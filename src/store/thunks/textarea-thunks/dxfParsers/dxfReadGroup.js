// Group object
const createGroup = (lines, pointer, group) => ({
  lines,
  pointer,
  group,
});

// Read group
// Group consists of two lines
export const readGroup = (lines, pointer) => {
  if (pointer >= lines.length - 2) {
    return createGroup(lines, pointer, null);
  }
};
