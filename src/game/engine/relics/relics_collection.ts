import { RelicType } from "../../types/RelicType";
import { RELICS_NAME } from "../../enum/relics_name";
import { RELIC_TYPE } from "../../enum/relic_type";

export const relics: RelicType[] = [
  {
    name: RELICS_NAME.HP_GENERATOR,
    type: RELIC_TYPE.PASSIVE,
    max_uses: Number.POSITIVE_INFINITY,
  },
  {
    name: RELICS_NAME.IMMUNITY,
    type: RELIC_TYPE.ACTIVE,
    max_uses: 1,
  },
];
