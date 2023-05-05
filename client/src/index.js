import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
//import ChatProvider from "./ContextProvider/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      {/* <ChatProvider> */}
      <App />
      {/* </ChatProvider> */}
    </BrowserRouter>
  </ThemeProvider>
);
