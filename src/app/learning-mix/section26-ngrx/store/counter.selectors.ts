export const selectCount = (state: { counterKey: number }) => state.counterKey;
export const selectTripleCount = (state: { counterKey: number }) =>
  state.counterKey * 3;
