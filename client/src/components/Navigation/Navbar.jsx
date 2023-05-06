import { Box, Drawer, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import React from "react";
import { ChatList } from "../ChatList/ChatList";
import { Avatar } from "../../styledComponents/chatArea";
import { Account } from "../UserMenu/Account";

export const Navbar = ({ user }) => {
  //For Drawer(Mobile ChatList)
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const drawer = <ChatList IsTablet="true" />;

  //For User Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    setAnchorEl(null);
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <Box display="flex" justifyContent="end" m={1}>
      <IconButton
        onClick={toggleDrawer}
        size="small"
        sx={{
          display: { md: "none", xs: "block" },
          marginRight: "auto",
          marginLeft: 1,
        }}
      >
        <GroupIcon color="error" />
      </IconButton>
      <Drawer
        PaperProps={{
          sx: {
            background: "#d9e4f5",
            height: "100vh",
          },
        }}
        sx={{ maxWidth: 270 }}
        open={openDrawer}
        anchor="left"
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        {drawer}
      </Drawer>
      <IconButton mx={2} size="small">
        <NotificationsIcon color="error" />
      </IconButton>
      <IconButton mx={2} size="small">
        <PersonIcon color="error" />
      </IconButton>
      <Avatar
        sx={{ cursor: "pointer" }}
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        component="img"
        src={user?.data.profile}
        alt={user?.data.username}
        mx={2}
      />
      <Account
        anchorEl={anchorEl}
        open={open}
        logOut={logOut}
        handleClose={handleClose}
      />
    </Box>
  );
};
