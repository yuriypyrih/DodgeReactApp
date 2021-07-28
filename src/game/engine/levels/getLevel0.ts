import { playText } from "../../../redux/slices/vfxSlice";
import store from "../../../redux/store";
import { sec } from "../../../utils/deltaTime";
import { Stars } from "../../types/Stars";
import Game from "../game";
import BasicEnemy from "../../entities/basic_enemy";
import BasicBoss from "../../entities/basic_boss";
import SpeederBoss from "../../entities/speeder_boss";
import SpeederEnemy from "../../entities/speeder_enemy";
import MagnetEnemy from "../../entities/magnet_enemy";
import TracerBoss from "../../entities/tracer_boss";
import WormBoss from "../../entities/worm_boss";
import SlimeBoss from "../../entities/slime_boss";
import BomberEnemy from "../../entities/bomber_enemy";
import SlimeEnemy from "../../entities/slime_enemy";
import VenomEnemy from "../../entities/venom_enemy";
import WormEnemy from "../../entities/worm_enemy";
import BomberBoss from "../../entities/bomber_boss";
import VenomBoss from "../../entities/venom_boss";
import TitanBoss from "../../entities/titan_boss";
import GhostEnemy from "../../entities/ghost_enemy";
import ShadowEnemy from "../../entities/shadow_enemy";
import GhostBoss from "../../entities/ghost_boss";
import ShadowBoss from "../../entities/shadow_boss";

export const level0Stars: Stars = [3, 15, 30];

export const getLevel0 = (game: Game): null => {
  if (game.spawner.executionSequence === 0) {
    if (game.spawner.roundTimer === sec(0.1)) {
      store.dispatch(playText(["LEVEL 0", "TESTING"]));
    } else if (game.spawner.roundTimer === sec(1)) {
      game.gameObjects.push(new ShadowBoss({ game }));
    }
  }
  return null;
};
