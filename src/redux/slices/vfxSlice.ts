import { createSlice } from "@reduxjs/toolkit";
import { VFX } from "../../game/enum/vfx";

type vfxSliceType = {
  run_animation: VFX | null;
  animation_counter: number;
  text_message: string[];
  play_text: boolean;
};

const initialState: vfxSliceType = {
  run_animation: null,
  text_message: ["Dodge", "Game"],
  play_text: false,
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
    playText: (state, action) => {
      state.text_message = action.payload;
      state.play_text = true;
    },
    finishedTextAnimation: (state) => {
      state.play_text = false;
    },
  },
});

export const {
  playAnimation,
  playText,
  finishedTextAnimation,
} = vfxSlice.actions;

export default vfxSlice.reducer;
