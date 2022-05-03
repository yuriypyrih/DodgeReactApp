import { RELICS_NAME } from "../enum/relics_name";
import { RELIC_TYPE } from "../enum/relic_type";
import { LEVEL_STATUS } from "../../Models/enum/LEVEL_STATUS";

export type RelicType = {
  id: RELICS_NAME;
  name: string;
  type: RELIC_TYPE;
  state: LEVEL_STATUS;
  max_uses: number;
  cost: number;
  Icon: any;
};
