import { Level } from "../level";
import { LEVEL_STATUS } from "../enum/LEVEL_STATUS";
import Game from "../../game/engine/game";
import { RelicType } from "../../game/types/RelicType";
import { GAME_STATE } from "../../game/enum/game_state";
import { relics } from "../../game/engine/relics/relics_collection";

export const LocalLevels: Level[] = [
  {
    level: 1,
    levelId: "LVL_1",
    description: "Scout",
    status: LEVEL_STATUS.LOCKED,
  },
  {
    level: 2,
    levelId: "LVL_2",
    description: "Speeder",
    status: LEVEL_STATUS.LOCKED,
  },
  {
    level: 3,
    levelId: "LVL_3",
    description: "Tracer",
    status: LEVEL_STATUS.LOCKED,
  },
  {
    level: 4,
    levelId: "LVL_4",
    description: "Worm",
    status: LEVEL_STATUS.LOCKED,
  },
  {
    level: 5,
    levelId: "LVL_5",
    description: "Slime",
    status: LEVEL_STATUS.LOCKED,
  },
  {
    level: 6,
    levelId: "LVL_6",
    description: "Bomber",
    status: LEVEL_STATUS.LOCKED,
  },
  {
    level: 7,
    levelId: "LVL_7",
    description: "Venom",
    status: LEVEL_STATUS.LOCKED,
  },
  {
    level: 8,
    levelId: "LVL_8",
    description: "Marathon V1",
    status: LEVEL_STATUS.LOCKED,
  },
  {
    level: 9,
    levelId: "LVL_9",
    description: "Titan",
    status: LEVEL_STATUS.LOCKED,
  },
  {
    level: 10,
    levelId: "LVL_10",
    description: "Ghost",
    status: LEVEL_STATUS.LOCKED,
  },
  {
    level: 11,
    levelId: "LVL_11",
    description: "Shadow",
    status: LEVEL_STATUS.LOCKED,
  },
  {
    level: 12,
    levelId: "LVL_12",
    description: "Glitch",
    status: LEVEL_STATUS.UNLOCKED,
  },
  {
    level: 13,
    levelId: "LVL_13",
    description: "Marathon V2",
    status: LEVEL_STATUS.UNLOCKED,
  },
  {
    level: 14,
    levelId: "LVL_14",
    description: "Portal",
    status: LEVEL_STATUS.COMING_SOON,
  },
  {
    level: 15,
    levelId: "LVL_15",
    description: "Magnet",
    status: LEVEL_STATUS.COMING_SOON,
  },
  {
    level: 16,
    levelId: "LVL_16",
    description: "Hacker",
    status: LEVEL_STATUS.COMING_SOON,
  },
  {
    level: 17,
    levelId: "LVL_17",
    description: "Spark",
    status: LEVEL_STATUS.COMING_SOON,
  },
  {
    level: 18,
    levelId: "LVL_18",
    description: "Frosty",
    status: LEVEL_STATUS.COMING_SOON,
  },
  {
    level: 19,
    levelId: "LVL_19",
    description: "Dragonfly",
    status: LEVEL_STATUS.COMING_SOON,
  },
  {
    level: 20,
    levelId: "LVL_20",
    description: "Voidborn",
    status: LEVEL_STATUS.COMING_SOON,
  },
  {
    level: 21,
    levelId: "LVL_21",
    description: "Cybernetic",
    status: LEVEL_STATUS.COMING_SOON,
  },
  {
    level: 22,
    levelId: "LVL_22",
    description: "Scorpion",
    status: LEVEL_STATUS.COMING_SOON,
  },
  {
    level: 23,
    levelId: "LVL_23",
    description: "Marathon V3",
    status: LEVEL_STATUS.COMING_SOON,
  },
  {
    level: 24,
    levelId: "LVL_24",
    description: "Marathon V4",
    status: LEVEL_STATUS.COMING_SOON,
  },
  {
    level: 25,
    levelId: "LVL_25",
    description: "Symmetra",
    status: LEVEL_STATUS.LOCKED,
  },
  {
    level: 26,
    levelId: "LVL_26",
    description: "Viper",
    status: LEVEL_STATUS.LOCKED,
  },
  {
    level: 27,
    levelId: "LVL_27",
    description: "Anubis",
    status: LEVEL_STATUS.LOCKED,
  },
];

type gameSliceType = {
  game: Game | null;
  level: number;
  levels: Level[];
  relics: RelicType[];
  selectedRelic: RelicType;
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
  levels: LocalLevels,
  relics: relics,
  selectedRelic: relics[1],
  hp: 0,
  gameState: GAME_STATE.PLAYING,
  poisoned: false,
  progress: {
    max_stars: 3,
    total_stars_collected: 0,
    star_timers: [],
  },
};
