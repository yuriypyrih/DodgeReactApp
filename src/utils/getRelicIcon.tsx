import React from "react";
import { RELICS_NAME } from "../game/enum/relics_name";
import { Relic } from "../Models/relic";
import DefaultIcon from "@material-ui/icons/Description";

export const getRelicIcon = (relic: Relic) => {
  if (relic.name === RELICS_NAME.HEAL) return;
  else return <DefaultIcon />;
};
