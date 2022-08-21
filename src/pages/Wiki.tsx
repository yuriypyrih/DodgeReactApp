import React from "react";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import { useHistory } from "react-router-dom";
import HealIcon from "@material-ui/icons/Favorite";
import { ReactComponent as ImmunityIcon } from "../assets/svg/relic_immunity.svg";
import RegenIcon from "@material-ui/icons/LocalHospital";
import { ReactComponent as CureIcon } from "../assets/svg/relic_cure.svg";
import { ReactComponent as FearIcon } from "../assets/svg/relic_fear.svg";
import { ReactComponent as VisionIcon } from "../assets/svg/relic_vision.svg";
import { ReactComponent as PortalIcon } from "../assets/svg/relic_portal.svg";
import { ReactComponent as BerserkIcon } from "../assets/svg/relic_berserk.svg";
import { ReactComponent as AngelIcon } from "../assets/svg/relic_angel.svg";
import { ReactComponent as StabilizerIcon } from "../assets/svg/relic_stabilizer.svg";
import { ReactComponent as SkullIcon } from "../assets/svg/skull.svg";
import CenterFocusWeakIcon from "@material-ui/icons/CenterFocusWeak";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: "100%",

    background: "#2b2b2c",
  },
  tabs: {
    "& *": { textTransform: "none", ...theme.typography.h6 },
    color: "white",
  },
  mainContainer: {
    padding: theme.spacing(4, 2, 2, 2),
    maxHeight: 360,
    overflow: "auto",
  },
  backBtn: {
    padding: theme.spacing(1, 4),
    background: "#00AFA3",
    border: "2px solid #2DD5C4",
    borderRadius: 4,
    color: "white",
  },
}));

type ContentType = { Icon?: any; title?: string; description: string[] };

const generalContent: ContentType[] = [
  {
    title: "Basics",
    description: [
      "Dodge all the enemies in your path and collect the stars along the way to progress.",
      "- After surviving a boss, the next level will be automatically unlocked.",
      "- Alternatively you can unlock any level with your stars!",
    ],
  },
  {
    title: "Enemies",
    description: [
      "Each type of enemy is unique and color coded. Pay attention to each color since it has a specific behavioral pattern.",
      "- Only the head of the enemies do damage and apply effects, the tails are harmless.",
      "- Hop into the Enemies section to learn more about them individually.",
    ],
  },
  {
    Icon: BerserkIcon,
    title: "Relics",
    description: [
      "Relics are powerful upgrades that you can equip during the level selection.",
      "- To activate a relic press Q during the game.",
      "- Hop into the Relics section to learn more about them individually.",
    ],
  },
  {
    Icon: SkullIcon,
    title: "Chaos Dungeons",
    description: [
      "Once you get enough experience you can jump into the Chaos Dungeons!",
      "Is starts as a normal level but it doesn't have boss or an ending. " +
        "Instead at the last star you enter into a race to get the best score by surviving as long as possible.",
      "- You can compare the scores in the global leaderboards!",
      "- Your relic is your best friend so choose wisely..",
    ],
  },
];
const enemiesContent: ContentType[] = [
  { title: "Scout", description: ["The simplest enemy", "- Does 30 dmg"] },
  {
    title: "Bosses",
    description: [
      "Each Boss behavior will adapt to the color of the its child",
      "- Do 40 dmg, usually",
    ],
  },
  {
    title: "Bullet",
    description: ["Bullets are fired by Bosses", "- Do 10 dmg, usually"],
  },
  {
    title: "Speeder",
    description: ["A faster version of the Scout", "- Does 30 dmg"],
  },
  {
    title: "Tracer",
    description: ["An enemy that follows you", "- Does 30 dmg"],
  },
  {
    title: "Worm",
    description: ["Loops around the walls", "- Does 30 dmg"],
  },
  {
    title: "Slime",
    description: ["Bounces around", "- Does 30 dmg"],
  },
  {
    title: "Bomber",
    description: [
      "Upon hitting a wall it creates an Explosion",
      "- Head: 30 dmg",
      "- Explosion: 50 dmg",
    ],
  },
  {
    title: "Venom",
    description: [
      "Getting hit by it will apply Poison to you",
      "- Head: 15 dmg",
      "- Poison Effect: Deals 3 dmg per second until you die",
      "- During the Poison effects your healing is 50% less effective",
    ],
  },
  {
    title: "Titan",
    description: ["Grows in size steadily", "- Does 30 dmg"],
  },
  {
    title: "Ghost",
    description: ["Periodically becomes transparent", "- Does 30 dmg"],
  },
  {
    title: "Shadow",
    description: [
      "Carries around an Aura that Applies Darkness",
      "- When in a Darkness Aura the screen gets dimmer which makes it harder to see the Shadow Enemies. The presence of a Shadow Enemy makes the bottom corners of the screen to also apply Darkness Aura.",
      "- Head: 30 dmg",
    ],
  },
];

const relicsContent: ContentType[] = [
  {
    Icon: HealIcon,
    description: [
      "Heal (Active 1x)",
      "Heals for 25hp (Your total health is 100hp in general)",
    ],
  },
  {
    Icon: ImmunityIcon,
    description: [
      "Immunity (Active x1)",
      "Grants damage immunity for 2s",
      "- While immune you cannot get any negative effect such as Poison, Hacked, etc",
    ],
  },
  {
    Icon: RegenIcon,
    description: ["Regeneration (Passive ∞)", "Heals for 2hp every second"],
  },
  {
    Icon: CureIcon,
    description: [
      "Poison Cure (Active x1)",
      " Cures Poison and heals 5hp plus all the health you lost from poison until now",
    ],
  },
  {
    Icon: FearIcon,
    description: [
      "Fear (Active x3)",
      "Scare all enemies and bullets away from you",
      `- Does not work on Bosses`,
    ],
  },
  {
    Icon: VisionIcon,
    description: [
      "Night Vision (Passive ∞)",
      "Applies a night vision filter on screen",
      "- Ghost enemies become less effective at hiding",
      "- Shadow enemies become less effective at applying darkness",
    ],
  },
  {
    Icon: PortalIcon,
    description: [
      "Teleportation (Passive ∞)",
      "You can pass through the left and right wall",
    ],
  },
  {
    Icon: BerserkIcon,
    description: [
      "Berserk (Passive 1x)",
      "Instead of dying your health gets instantly refilled, you scare the enemies away, and you become Berserk",
      "- During Berserk your life burns fast for 10s",
      "- During Berserk you take 50% less damage from enemies",
      `- Damage reduction doesn't apply on Poison, Explosion and Burn effects`,
    ],
  },
  {
    Icon: AngelIcon,
    description: [
      "Guardian Angel (Passive x1)",
      "Instead of dying you get damage immunity for 1.5s and heal for 15hp",
    ],
  },
  {
    Icon: StabilizerIcon,
    description: [
      "Stabilizer (Passive ∞)",
      "You are immune to immobilizing effects and take 20% less damage",
      "- Immobilizing is any magnetic or slowing effect",
      `- Damage reduction doesn't apply on Poison, Explosion and Burn effects`,
    ],
  },
  {
    Icon: CenterFocusWeakIcon,
    description: [
      "Recall Beacon (Active ∞)",
      "Press once to place a beacon. Press again to recall back to it.",
    ],
  },
];

const Wiki: React.FC<unknown> = () => {
  const classes = useStyles();
  const history = useHistory();
  const [tab, setTab] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  const getListItem = (item: ContentType, index: number) => {
    return (
      <Grid
        container
        wrap={"nowrap"}
        key={index}
        style={{ color: "white", marginBottom: 22 }}
      >
        <Grid item style={{ marginRight: 16 }}>
          {item.Icon ? (
            <item.Icon style={{ width: 30, height: 30 }} />
          ) : (
            <DescriptionIcon style={{ width: 30, height: 30 }} />
          )}
        </Grid>
        {item.title && (
          <Grid item style={{ marginRight: 16, minWidth: 100, maxWidth: 100 }}>
            <Typography>{item.title}</Typography>
          </Grid>
        )}
        <Grid item>
          {item.description.map((d, index) => (
            <Typography
              key={index}
              style={{
                color:
                  (index !== 0 && !item.title) || !!item.title
                    ? "#00AFA3"
                    : "white",
              }}
            >
              {d}
            </Typography>
          ))}
        </Grid>
      </Grid>
    );
  };

  const getContent = () => {
    if (tab === 0)
      return generalContent.map((item, index) => getListItem(item, index));
    else if (tab === 1)
      return enemiesContent.map((item, index) => getListItem(item, index));
    else if (tab === 2)
      return relicsContent.map((item, index) => getListItem(item, index));
  };

  return (
    <Box className={classes.root}>
      <Grid
        container
        direction={"column"}
        justify={"space-between"}
        style={{ height: "100%" }}
      >
        <Grid item container>
          <Grid item xs={12}>
            <Tabs
              value={tab}
              onChange={handleChange}
              className={classes.tabs}
              indicatorColor="primary"
            >
              <Tab label="General" />
              <Tab label="Enemies" />
              <Tab label="Relics" />
            </Tabs>
          </Grid>
          <Grid item xs={12} className={classes.mainContainer}>
            {getContent()}
          </Grid>
        </Grid>

        <Grid item container justify={"flex-end"}>
          <Button
            className={classes.backBtn}
            onClick={() => history.push("/Selection")}
          >
            <Typography variant={"h6"}>BACK</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Wiki;
