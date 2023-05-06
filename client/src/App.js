import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { theme } from "./theme/theme";
import { Auth } from "./pages/Auth";
import { Chat } from "./pages/Chat";
import React from "react";

function App() {
  const [user, setUser] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser(userInfo);

    if (!userInfo) navigate("/");
  }, [navigate]);

  const IsMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const IsTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Routes>
      <Route path="/" element={<Auth IsMobile={IsMobile} />} />
      <Route path="/chat" element={<Chat user={user} IsTablet={IsTablet} />} />
    </Routes>
  );
}
export default App;
