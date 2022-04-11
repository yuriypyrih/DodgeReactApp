import { Button, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1),
    background: "#00AFA3",
    width: "100%",
    border: "2px solid #2DD5C4",
    borderRadius: 99,
    fontSize: 18,
    color: "white",
  },
}));

type CustomButtonProps = {
  text: string;
  onClick: () => void;
  loading?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  loading = false,
}) => {
  const classes = useStyles();

  return (
    <Button className={classes.root} onClick={onClick}>
      <Grid container justify={"center"}>
        <Grid item style={{ position: "relative" }}>
          {loading && (
            <CircularProgress
              style={{
                color: "#FFFFCC",
                position: "absolute",
                left: "-36px",
                top: 6,
                width: 22,
                height: 22,
              }}
            />
          )}
          {text}
        </Grid>
      </Grid>
    </Button>
  );
};

export default CustomButton;
