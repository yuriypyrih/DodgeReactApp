import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Game from "../../game/engine/game";
import { GAME_STATE } from "../../game/enum/game_state";
import { Level } from "../../Models/level";
import { LEVEL_STATUS } from "../../Models/enum/LEVEL_STATUS";

type gameSliceType = {
  game: Game | null;
  level: number;
  levels: Level[];
  hp: number;
  gameState: GAME_STATE;
  poisoned: boolean;
  progress: {
    max_stars: number;
    total_stars_collected: number;
    star_timers: number[];
  };
};

const initialState: gameSliceType = {
  game: null,
  level: 1,
  levels: [
    { level: 1, description: "Scout", status: LEVEL_STATUS.UNLOCKED },
    { level: 2, description: "Speeder", status: LEVEL_STATUS.UNLOCKED },
    { level: 3, description: "Tracer", status: LEVEL_STATUS.UNLOCKED },
    { level: 4, description: "Worm", status: LEVEL_STATUS.UNLOCKED },
    { level: 5, description: "Slime", status: LEVEL_STATUS.UNLOCKED },
    { level: 6, description: "Bomber", status: LEVEL_STATUS.UNLOCKED },
    { level: 7, description: "Venom", status: LEVEL_STATUS.UNLOCKED },
    { level: 8, description: "Marathon.v01", status: LEVEL_STATUS.UNLOCKED },
    { level: 9, description: "Titan", status: LEVEL_STATUS.UNLOCKED },
    { level: 10, description: "Ghost", status: LEVEL_STATUS.UNLOCKED },
    { level: 11, description: "Shadow", status: LEVEL_STATUS.UNLOCKED },
    { level: 12, description: "Mimic", status: LEVEL_STATUS.COMING_SOON },
    {
      level: 13,
      description: "Marathon.v02",
      status: LEVEL_STATUS.COMING_SOON,
    },
    { level: 14, description: "Portal", status: LEVEL_STATUS.COMING_SOON },
    { level: 15, description: "Magnet", status: LEVEL_STATUS.COMING_SOON },
    { level: 16, description: "Hacker", status: LEVEL_STATUS.COMING_SOON },
    { level: 17, description: "Frosty", status: LEVEL_STATUS.COMING_SOON },
    { level: 18, description: "Flamy", status: LEVEL_STATUS.COMING_SOON },
    {
      level: 19,
      description: "Marathon.v03",
      status: LEVEL_STATUS.COMING_SOON,
    },
    { level: 20, description: "Final BOss", status: LEVEL_STATUS.COMING_SOON },
  ],
  hp: 0,
  gameState: GAME_STATE.PLAYING,
  poisoned: false,
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
      state.poisoned = false;
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
    setPoisoned: (state, action) => {
      state.poisoned = action.payload;
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
  setPoisoned,
  setLevel,
  setGameState,
  setProgress,
  collectStar,
  reset,
} = gameSlice.actions;

export default gameSlice.reducer;
