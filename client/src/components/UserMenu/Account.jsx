import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { theme } from "../../theme/theme";

export const Account = ({ anchorEl, open, logOut, handleClose }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          paddingY: "0.5em",
          background: "#fff",
          color: theme.palette.secondary.main,
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "#fff",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={logOut}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" color="secondary" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};
