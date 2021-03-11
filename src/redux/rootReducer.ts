import { combineReducers } from "@reduxjs/toolkit";
import layoutSlice from "./slices/layoutSlice";
import gameSlice from "./slices/gameSlice";
import vfxSlice from "./slices/vfxSlice";
import engineSlice from "./slices/engineSlice";

const rootReducer = combineReducers({
  engineSlice,
  layoutSlice,
  gameSlice,
  vfxSlice,
});

export default rootReducer;
