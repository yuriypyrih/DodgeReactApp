import { RELICS_NAME } from "../enum/relics_name";
import { RELIC_TYPE } from "../enum/relic_type";
import { LEVEL_STATUS } from "../../Models/enum/LEVEL_STATUS";
import HealIcon from "@material-ui/icons/Favorite";

export type RelicType = {
  name: RELICS_NAME;
  type: RELIC_TYPE;
  max_uses: number;
};
