export const is404 = (location) => {
  const { state: { is404 = false } = {}} = location || {};
  return is404;
};
