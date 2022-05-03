import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Game from "../../game/engine/game";
import { GAME_STATE } from "../../game/enum/game_state";
import { Level } from "../../Models/level";
import { LocalLevels } from "../../Models/data/LocalLevels";
import { RELICS_NAME } from "../../game/enum/relics_name";

type gameSliceType = {
  game: Game | null;
  level: Level;
  levels: Level[];
  selectedRelic: {
    relic: RELICS_NAME;
    relic_available_uses: number;
  } | null;
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
  level: LocalLevels[0],
  levels: LocalLevels,
  selectedRelic: null,
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
    setLevels: (state, action) => {
      state.levels = action.payload;
    },
    setSelectedRelic: (state, action) => {
      state.selectedRelic = action.payload;
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
  setSelectedRelic,
  setPoisoned,
  setLevel,
  setLevels,
  setGameState,
  setProgress,
  collectStar,
  reset,
} = gameSlice.actions;

export default gameSlice.reducer;
