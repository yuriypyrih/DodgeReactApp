import { RelicType } from "../../types/RelicType";
import { RELICS_NAME } from "../../enum/relics_name";
import { RELIC_TYPE } from "../../enum/relic_type";
import { LEVEL_STATUS } from "../../../Models/enum/LEVEL_STATUS";
import HealIcon from "@material-ui/icons/Favorite";
import { ReactComponent as ImmunityIcon } from "../../../assets/svg/relic_immunity.svg";
import RegenIcon from "@material-ui/icons/LocalHospital";
import { ReactComponent as CureIcon } from "../../../assets/svg/relic_cure.svg";
import { ReactComponent as FearIcon } from "../../../assets/svg/relic_fear.svg";
import { ReactComponent as VisionIcon } from "../../../assets/svg/relic_vision.svg";
import { ReactComponent as PortalIcon } from "../../../assets/svg/relic_portal.svg";
import { ReactComponent as BerserkIcon } from "../../../assets/svg/relic_berserk.svg";
import { ReactComponent as AngelIcon } from "../../../assets/svg/relic_angel.svg";
import { ReactComponent as StabilizerIcon } from "../../../assets/svg/relic_stabilizer.svg";
import CenterFocusWeakIcon from "@material-ui/icons/CenterFocusWeak";

export const relics: RelicType[] = [
  {
    id: RELICS_NAME.HEAL,
    name: "Heal",
    type: RELIC_TYPE.ACTIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: 1,
    cost: 1,
    Icon: HealIcon,
  },
  {
    id: RELICS_NAME.IMMUNITY,
    name: "Immunity",
    type: RELIC_TYPE.ACTIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: 1,
    cost: 2,
    Icon: ImmunityIcon,
  },
  {
    id: RELICS_NAME.REGENERATION,
    name: "Regeneration",
    type: RELIC_TYPE.PASSIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: Number.POSITIVE_INFINITY,
    cost: 2,
    Icon: RegenIcon,
  },
  {
    id: RELICS_NAME.POISON_CURE,
    name: "Poison Cure",
    type: RELIC_TYPE.ACTIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: 1,
    cost: 3,
    Icon: CureIcon,
  },
  {
    id: RELICS_NAME.FEAR,
    name: "Fear",
    type: RELIC_TYPE.ACTIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: 3,
    cost: 4,
    Icon: FearIcon,
  },
  {
    id: RELICS_NAME.NIGHT_VISION,
    name: "Night Vision",
    type: RELIC_TYPE.PASSIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: Number.POSITIVE_INFINITY,
    cost: 4,
    Icon: VisionIcon,
  },
  {
    id: RELICS_NAME.PORTAL,
    name: "Teleportation",
    type: RELIC_TYPE.PASSIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: Number.POSITIVE_INFINITY,
    cost: 4,
    Icon: PortalIcon,
  },
  {
    id: RELICS_NAME.BERSERK,
    name: "Berserk",
    type: RELIC_TYPE.PASSIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: 1,
    cost: 5,
    Icon: BerserkIcon,
  },
  {
    id: RELICS_NAME.GUARDIAN_ANGEL,
    name: "Guardian Angel",
    type: RELIC_TYPE.PASSIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: 1,
    cost: 5,
    Icon: AngelIcon,
  },
  {
    id: RELICS_NAME.STABILIZER,
    name: "Stabilizer",
    type: RELIC_TYPE.PASSIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: Number.POSITIVE_INFINITY,
    cost: 5,
    Icon: StabilizerIcon,
  },
  {
    id: RELICS_NAME.RECALL_BEACON,
    name: "Recall Beacon",
    type: RELIC_TYPE.ACTIVE,
    state: LEVEL_STATUS.UNLOCKED,
    max_uses: Number.POSITIVE_INFINITY,
    cost: 5,
    Icon: CenterFocusWeakIcon,
  },
];
