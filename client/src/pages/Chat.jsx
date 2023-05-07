import { Grid } from "@mui/material";
import React from "react";
import { ChatList } from "../components/ChatList/ChatList";
import { Navbar } from "../components/Navigation/Navbar";
import { ChatArea } from "../components/ChatArea/ChatArea";
import { ToastContainer } from "react-toastify";

export const Chat = ({ IsTablet, user, chats, setChats, chatLoading }) => {
  const [selectedChat, setSelectedChat] = React.useState();
  return (
    <Grid
      container
      direction="row"
      p={1}
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#efefef",
      }}
    >
      <ToastContainer />
      <Grid item md={4} height="100%" display={{ md: "block", xs: "none" }}>
        <ChatList
          IsTablet={IsTablet}
          user={user}
          chats={chats}
          setChats={setChats}
          chatLoading={chatLoading}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      </Grid>

      <Grid item md={8} xs={12} height="100%">
        <Grid item xs={12} height="7%">
          <Navbar
            user={user}
            chats={chats}
            setChats={setChats}
            chatLoading={chatLoading}
          />
        </Grid>
        <Grid
          item
          xs={12}
          height="92%"
          sx={{
            background: "#efefef",
          }}
        >
          <ChatArea
            user={user}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
