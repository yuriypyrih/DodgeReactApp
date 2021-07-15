import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#2dd5c4" },
  },
  typography: {},
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1115,
      lg: 1280,
      xl: 1920,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
  },
});

export default theme;
