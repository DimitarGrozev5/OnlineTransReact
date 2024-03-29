export const pipe =
  (val) =>
  (...fns) =>
    fns.reduce((a, fn) => fn(a), fns.shift()(val));
