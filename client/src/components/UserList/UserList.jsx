import { Box, Typography } from "@mui/material";
import React from "react";
import { theme } from "../../theme/theme";

export const UserList = ({ keyword, AccessChat }) => {
  //console.log(keyword);
  return (
    <Box
      onClick={() => AccessChat(keyword._id)}
      display="flex"
      alignItems="center"
      borderRadius={2}
      bgcolor={theme.palette.secondary.light}
      p={1}
      my={2}
      sx={{
        cursor: "pointer",
        "&:hover": {
          background: theme.palette.secondary.main,
        },
      }}
    >
      <Box
        component="img"
        mx={1}
        src={keyword.profile}
        alt={keyword.username}
        width={45}
        height={45}
        borderRadius="50%"
        sx={{ objectFit: "cover" }}
      />

      <Box display="flex" flexDirection="column" mx={1}>
        <Typography
          variant="body1"
          fontWeight="bold"
          textTransform="uppercase"
          sx={{ color: theme.palette.info.main }}
        >
          {keyword.username}
        </Typography>

        <Typography
          variant="caption"
          fontWeight="bold"
          sx={{
            lineClamp: 1,
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            display: "block",
            color: theme.palette.text.main,
          }}
        >
          Email : {keyword.email}
        </Typography>
      </Box>
    </Box>
  );
};
