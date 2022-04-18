// Pipe value true the provided handlers
// If one handler returns a valid value, then skip all of the rest
export const pipeParsers =
  (...handlers) =>
  (reduced, pt, index) =>
    handlers.reduce((prev, curr) => {
      if (prev) {
        return prev;
      } else {
        return curr(reduced, pt, index);
      }
    }, null);