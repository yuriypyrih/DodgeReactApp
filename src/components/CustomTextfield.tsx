import { fade, makeStyles, TextField } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputLabel-root": {
      color: theme.palette.primary.main + " !important",
    },
    "& .MuiOutlinedInput-root": {
      color: theme.palette.primary.main + " !important",
      background: "unset !important",
      "& fieldset": {
        borderRadius: "99px",
        borderColor: theme.palette.primary.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        boxShadow: `0 0 2rem ${fade("#2dd5c4", 0.2)}`,
      },
    },
  },
}));

type CustomTextfieldProps = {
  haha?: string;
  label?: string;
  type?: string;
  value: string;
  setValue: (s: string) => void;
};

const CustomTextfield: React.FC<CustomTextfieldProps> = ({
  label,
  type,
  value,
  setValue,
}) => {
  const classes = useStyles();

  return (
    <TextField
      fullWidth
      className={classes.root}
      label={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      variant="outlined"
      type={type}
    />
  );
};

export default CustomTextfield;
