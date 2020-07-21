export const healthBarReducer = (state = 100, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "RESET":
      return 100;
    default:
      return state;
  }
}


