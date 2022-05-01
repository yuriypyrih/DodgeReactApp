import { RelicType } from "../../types/RelicType";
import { RELICS_NAME } from "../../enum/relics_name";
import { RELIC_TYPE } from "../../enum/relic_type";
import { LEVEL_STATUS } from "../../../Models/enum/LEVEL_STATUS";

export const relics: RelicType[] = [
  {
    name: RELICS_NAME.HEAL,
    type: RELIC_TYPE.ACTIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: 1,
  },
  {
    name: RELICS_NAME.REGENERATION,
    type: RELIC_TYPE.PASSIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: Number.POSITIVE_INFINITY,
  },
  {
    name: RELICS_NAME.IMMUNITY,
    type: RELIC_TYPE.ACTIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: 1,
  },
  {
    name: RELICS_NAME.POISON_CURE,
    type: RELIC_TYPE.ACTIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: 1,
  },
  {
    name: RELICS_NAME.FEAR,
    type: RELIC_TYPE.ACTIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: 3,
  },
  {
    name: RELICS_NAME.FEAR,
    type: RELIC_TYPE.ACTIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: 3,
  },
  {
    name: RELICS_NAME.NIGHT_VISION,
    type: RELIC_TYPE.PASSIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: Number.POSITIVE_INFINITY,
  },
  {
    name: RELICS_NAME.PORTAL,
    type: RELIC_TYPE.PASSIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: Number.POSITIVE_INFINITY,
  },
  {
    name: RELICS_NAME.BERSERK,
    type: RELIC_TYPE.PASSIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: 1,
  },
  {
    name: RELICS_NAME.GUARDIAN_ANGEL,
    type: RELIC_TYPE.PASSIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: 1,
  },
  {
    name: RELICS_NAME.STABILIZER,
    type: RELIC_TYPE.PASSIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: Number.POSITIVE_INFINITY,
  },
];
