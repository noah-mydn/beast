import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { theme } from "./theme/theme";
import { Auth } from "./pages/Auth";
import { Chat } from "./pages/Chat";
import React from "react";
import axios from "axios";

function App() {
  const [user, setUser] = React.useState();
  const [chats, setChats] = React.useState([]);
  const [chatLoading, setChatLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser(userInfo);

    if (!userInfo) navigate("/");
  }, [navigate]);

  React.useEffect(() => {
    const getAllChats = async () => {
      const userId = user?.data._id;
      const token = user?.token;
      try {
        setChatLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `http://localhost:5000/api/chat/${userId}`,
          config
        );
        setChats(data);
        setChatLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getAllChats();
    }
  }, [user]);

  console.log(chats);
  // console.log(user?.data._id);

  const IsMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const IsTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Routes>
      <Route path="/" element={<Auth IsMobile={IsMobile} />} />
      <Route
        path="/chat"
        element={
          <Chat
            user={user}
            chats={chats}
            setChats={setChats}
            IsTablet={IsTablet}
            chatLoading={chatLoading}
          />
        }
      />
    </Routes>
  );
}
export default App;
