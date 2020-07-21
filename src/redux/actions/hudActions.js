export function setHP(value) {
  return {
    type: "SET",
    payload: value,
  };
}

export function reset() {
  return {
    type: "RESET",
  };
}
