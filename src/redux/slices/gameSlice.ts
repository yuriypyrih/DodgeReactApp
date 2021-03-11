import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Game from "../../game/engine/game";
import { GAME_STATE } from "../../game/enum/game_state";

type gameSliceType = {
  game: Game | null;
  level: number;
  hp: number;
  gameState: GAME_STATE;
  progress: {
    max_stars: number;
    total_stars_collected: number;
    star_timers: number[];
  };
};

const initialState: gameSliceType = {
  game: null,
  level: 1,
  hp: 0,
  gameState: GAME_STATE.PLAYING,
  progress: {
    max_stars: 3,
    total_stars_collected: 0,
    star_timers: [],
  },
};

const gameSlice = createSlice({
  name: "gameData",
  initialState,

  reducers: {
    reset: (state) => {
      state.hp = 0;
      state.level = 1;
      state.progress = {
        max_stars: 3,
        total_stars_collected: 0,
        star_timers: [],
      };
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setHP: (state, action) => {
      state.hp = action.payload;
    },
    setGameState: (state, action) => {
      state.gameState = action.payload;
    },
    setProgress: (
      state,
      action: PayloadAction<{
        max_stars: number;
        total_stars_collected: number;
        star_timers: number[];
      }>
    ) => {
      state.progress = action.payload;
    },
    collectStar: (state) => {
      state.progress.total_stars_collected =
        state.progress.total_stars_collected + 1;
    },
  },
});

export const {
  setHP,
  setLevel,
  setGameState,
  setProgress,
  collectStar,
  reset,
} = gameSlice.actions;

export default gameSlice.reducer;
