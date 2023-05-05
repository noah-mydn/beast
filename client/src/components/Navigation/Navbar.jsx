import { Box, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import React from "react";

export const Navbar = () => {
  return (
    <Box display="flex" justifyContent="end" m={1}>
      <IconButton
        size="small"
        sx={{
          display: { md: "none", xs: "block" },
          marginRight: "auto",
          marginLeft: 1,
        }}
      >
        <GroupIcon color="primary" />
      </IconButton>
      <IconButton mx={2} size="small">
        <NotificationsIcon color="primary" />
      </IconButton>
      <IconButton mx={2} size="small">
        <PersonIcon color="primary" />
      </IconButton>
    </Box>
  );
};
