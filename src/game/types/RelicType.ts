import { RELICS_NAME } from "../enum/relics_name";
import { RELIC_TYPE } from "../enum/relic_type";

export type RelicType = {
  name: RELICS_NAME;
  type: RELIC_TYPE;
  max_uses: number;
};
