import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Codex: React.FC<unknown> = ({}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography>Codex</Typography>
    </Box>
  );
};

export default Codex;
