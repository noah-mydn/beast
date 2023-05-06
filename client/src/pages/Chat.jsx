import { Grid } from "@mui/material";
import React from "react";
import { ChatList } from "../components/ChatList/ChatList";
import { Navbar } from "../components/Navigation/Navbar";
import { ChatArea } from "../components/ChatArea/ChatArea";

export const Chat = ({ IsTablet, user }) => {
  return (
    <Grid
      container
      direction="row"
      p={1}
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%)",
      }}
    >
      <Grid item md={4} height="100%" display={{ md: "block", xs: "none" }}>
        <ChatList IsTablet={IsTablet} />
      </Grid>

      <Grid item md={8} xs={12} height="100%">
        <Grid item xs={12} height="7%">
          <Navbar user={user} />
        </Grid>
        <Grid
          item
          xs={12}
          height="92%"
          sx={{
            background: "linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%)",
          }}
        >
          <ChatArea />
        </Grid>
      </Grid>
    </Grid>
  );
};
