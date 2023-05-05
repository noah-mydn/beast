import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF3533",
    },

    secondary: {
      main: "#FFE475",
      dark: "#FFD529",
    },

    error: {
      main: "#B91F1F",
    },

    info: {
      main: "#28CACC",
    },
  },

  typography: {
    fontFamily: ["Blinker", "Dosis", "Bruno Ace", "cursive", "sans-serif"].join(
      ","
    ),
  },
});
