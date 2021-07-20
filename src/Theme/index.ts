import { createMuiTheme } from "@material-ui/core";
import Baloo from "../assets/fonts/BalooChettan2-Medium.ttf";
import { CSSProperties } from "react";

const baloo = {
  fontFamily: "Baloo",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('Baloo'),
    url(${Baloo}) format('ttf')
  `,
};

const theme = createMuiTheme({
  palette: {
    primary: { main: "#2dd5c4" },
  },
  typography: {
    allVariants: {
      fontFamily: "Baloo, Arial",
    },
  },
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
    MuiCssBaseline: {
      "@global": {
        "@font-face": [baloo] as unknown as CSSProperties,
        body: {
          boxSizing: "border-box",
          backgroundColor: "#1a1a1d",
        },
      },
    },
  },
});

export default theme;
