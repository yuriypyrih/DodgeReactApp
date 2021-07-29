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

type ContentType = { image?: string; title: string; description: string };

const generalContent: ContentType[] = [
  { title: "Basics", description: "Dodge the enemies" },
];
const enemiesContent: ContentType[] = [
  { title: "Scout", description: "Basic enemy" },
  { title: "Speeder", description: "A faster enemy" },
];

const relicsContent: ContentType[] = [
  {
    title: "Healthpack Generator",
    description: "(Passive ∞) Periodically generates healthpacks",
  },
];

const Wiki: React.FC<unknown> = ({}) => {
  const classes = useStyles();
  const history = useHistory();
  const [tab, setTab] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  const getListItem = (item: ContentType, index: number) => {
    return (
      <Grid
        container
        wrap={"nowrap"}
        key={index}
        style={{ color: "white", marginBottom: 16 }}
      >
        <Grid item style={{ marginRight: 16 }}>
          {item.image ? (
            <img
              src={item.image}
              alt={"image"}
              style={{ width: 30, height: 30 }}
            />
          ) : (
            <DescriptionIcon style={{ width: 30, height: 30 }} />
          )}
        </Grid>
        <Grid item xs={2}>
          <Typography>{item.title}</Typography>
        </Grid>
        <Grid item>
          <Typography>{item.description}</Typography>
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
