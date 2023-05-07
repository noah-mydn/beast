import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#EB5353",
    },

    secondary: {
      main: "#676FA3",
    },

    error: {
      main: "#B91F1F",
    },

    info: {
      main: "#CDDEFF",
    },

    text: {
      main: "#EEF2FF",
    },
  },

  typography: {
    fontFamily: ["Blinker", "Dosis", "cursive", "sans-serif"].join(","),
  },
});
