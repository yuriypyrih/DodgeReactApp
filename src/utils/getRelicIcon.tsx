import React from "react";
import { RELICS_NAME } from "../game/enum/relics_name";
import DefaultIcon from "@material-ui/icons/Description";
import { RelicType } from "../game/types/RelicType";

export const getRelicIcon = (relic: RelicType) => {
  if (relic.id === RELICS_NAME.HEAL) return;
  else return <DefaultIcon />;
};
