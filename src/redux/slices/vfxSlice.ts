import { createSlice } from "@reduxjs/toolkit";
import { VFX } from "../../game/enum/vfx";

type vfxSliceType = {
  run_animation: VFX | null;
  animation_counter: number;
};

const initialState: vfxSliceType = {
  run_animation: null,
  animation_counter: 0,
};

const vfxSlice = createSlice({
  name: "vfxData",
  initialState,

  reducers: {
    playAnimation: (state, action) => {
      state.run_animation = action.payload;
      state.animation_counter = state.animation_counter + 1;
    },
  },
});

export const { playAnimation } = vfxSlice.actions;

export default vfxSlice.reducer;
