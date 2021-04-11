export const sec = (seconds: number) => {
  // Throu calculations 1 sec of real Time is about roundTimer = 60
  // It returns roundTimer value
  return Math.trunc(seconds * 60);
};

export const getSec = (deltaTimer: number) => {
  // reverse predecuder
  return Math.trunc(deltaTimer / 60);
};
