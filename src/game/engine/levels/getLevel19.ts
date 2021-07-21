import { playText } from "../../../redux/slices/vfxSlice";
import store from "../../../redux/store";
import { sec } from "../../../utils/deltaTime";
import { Stars } from "../../types/Stars";
import Game from "../game";

export const level19Stars: Stars = [24, 42, 52];

export const getLevel19 = (game: Game): null => {
if (game.spawner.executionSequence === 0) {
if (game.spawner.roundTimer === sec(0.1)) {
store.dispatch(playText(["LEVEL 19", "-"]));
}
}
return null;
};
