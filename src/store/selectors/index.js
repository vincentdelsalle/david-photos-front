export const getCurrentColorInState = (state, color) => {
  return Object.keys(state.collection).find((c) => c === color);
};
