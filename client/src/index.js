import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Box, ThemeProvider, Typography } from "@mui/material";
import { theme } from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
//import ChatProvider from "./ContextProvider/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
      <Box py={2} display="flex" justifyContent="center">
        <Typography
          variant="caption"
          color={theme.palette.text.main}
          fontWeight="bolder"
        >
          Created and Developed by{" "}
          <a
            href="https://github.com/noah-mydn"
            style={{ textDecoration: "none", fontStyle: "italic" }}
          >
            May Yadanar
          </a>
        </Typography>
      </Box>
    </BrowserRouter>
  </ThemeProvider>
);
