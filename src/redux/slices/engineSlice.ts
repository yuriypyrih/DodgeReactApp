import { createSlice } from "@reduxjs/toolkit";
import Game from "../../game/engine/game";

type engineSliceType = {
  game: Game | null;
};

const initialState: engineSliceType = {
  game: null,
};

const engineSlice = createSlice({
  name: "engine",
  initialState,

  reducers: {
    setEngine: (state, action) => {
      state.game = action.payload;
    },
  },
});

export const { setEngine } = engineSlice.actions;

export default engineSlice.reducer;
