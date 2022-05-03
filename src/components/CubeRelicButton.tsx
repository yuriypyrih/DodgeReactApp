import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { LEVEL_STATUS } from "../Models/enum/LEVEL_STATUS";
import clsx from "clsx";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Relic } from "../Models/relic";
import { RELIC_TYPE } from "../game/enum/relic_type";
import { RelicType } from "../game/types/RelicType";
import { COLOR } from "../game/enum/colors";
import { ReactComponent as StarIcon } from "../assets/svg/diamond.svg";
import { useDispatch } from "react-redux";
import { setSelectedRelic } from "../redux/slices/gameSlice";
import { setAuthSelectedRelic } from "../redux/slices/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    width: 160,
    zIndex: 1,
    // height: 72,
    background: "#00AFA3",
    border: "4px solid #2DD5C4",
    borderRadius: 4,
    color: "white",
  },
  locked: {
    background: "#808080",
    border: "4px solid #5A5A5A",
  },
  locker: {
    position: "absolute",
    width: 30,
    height: 30,
    color: "#BFBFBF",
    right: -12,
    top: -12,
  },
}));

type CubeRelicButtonProps = {
  relic: RelicType;
  selected: boolean;
};

const CubeRelicButton: React.FC<CubeRelicButtonProps> = ({
  relic,
  selected,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState<boolean>(false);

  const handleClick = () => {
    if (relic.state === LEVEL_STATUS.UNLOCKED) {
      dispatch(
        setSelectedRelic({
          relic: relic.id,
          relic_available_uses: relic.max_uses,
        })
      );
      dispatch(setAuthSelectedRelic(relic.id));
    } else if (relic.state === LEVEL_STATUS.LOCKED) {
      // Try to buy it
    }
  };

  const getTopLabel = () => {
    if (relic.state === LEVEL_STATUS.LOCKED) {
      return (
        <Box
          style={{
            backgroundColor: "#00AFA3",
            borderRadius: "4px",
            overflow: "hidden",
            position: "absolute",
            height: "26px",
            paddingInline: "4px",
            zIndex: 2,
            color: "white",
            left: "-4px",
            top: "-4px",
          }}
        >
          <Grid container wrap={"nowrap"} alignItems={"center"}>
            <Grid item>
              <Typography>{relic.cost}</Typography>
            </Grid>
            <StarIcon
              style={{
                width: 12,
                height: 12,
                fill: "yellow",
              }}
            />
          </Grid>
        </Box>
      );
    } else if (selected) {
      return (
        <Box
          style={{
            backgroundColor: COLOR.YELLOW,
            borderRadius: "4px 4px 0 0",
            overflow: "hidden",
            position: "absolute",
            height: "26px",
            paddingInline: "4px",
            left: "4px",
            top: "-24px",
          }}
        >
          <Typography
            style={{ textAlign: "center", color: "#1a1a1d" }}
          >{`Selected`}</Typography>
        </Box>
      );
    }
  };

  return (
    <Box style={{ position: "relative" }}>
      {getTopLabel()}
      <Button
        className={clsx(
          classes.root,
          (relic.state === LEVEL_STATUS.LOCKED ||
            relic.state === LEVEL_STATUS.COMING_SOON) &&
            classes.locked
        )}
        style={{
          borderColor: selected ? COLOR.YELLOW : undefined,
        }}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={
          relic.state !== LEVEL_STATUS.UNLOCKED &&
          relic.state !== LEVEL_STATUS.LOCKED
        }
      >
        <Grid container wrap={"nowrap"} justify={"space-evenly"}>
          <Grid item style={{ flex: 0 }} container alignItems={"center"}>
            <relic.Icon style={{ width: 30, height: 30 }} />
          </Grid>
          <Grid
            item
            container
            alignItems={"center"}
            style={{ textAlign: "center", flex: 0, minHeight: "50px" }}
          >
            <Grid item>
              {relic.state === LEVEL_STATUS.LOCKED &&
                (hovered ? (
                  <LockOpenIcon className={classes.locker} />
                ) : (
                  <LockIcon className={classes.locker} />
                ))}
              {relic.state !== LEVEL_STATUS.COMING_SOON ? (
                <Typography style={{ fontSize: 16 }}>{relic.name}</Typography>
              ) : (
                <Typography variant={"caption"}>Coming Soon!</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Button>
    </Box>
  );
};

export default CubeRelicButton;
