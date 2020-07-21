import { combineReducers } from "redux";
import { healthBarReducer } from "./hudReducer";


export const rootReducer = combineReducers({
    healthBarValue: healthBarReducer
    // progressBarValue: disinfection.disinfectionReducer,
});

