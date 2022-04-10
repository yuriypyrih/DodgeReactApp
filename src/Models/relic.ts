import { LEVEL_STATUS } from "./enum/LEVEL_STATUS";
import { RELICS_NAME } from "../game/enum/relics_name";

export type Relic = {
  name: RELICS_NAME;
  status: LEVEL_STATUS;
};
