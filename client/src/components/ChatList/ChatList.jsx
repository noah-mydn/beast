import React from "react";
import { Box, Typography } from "@mui/material";
import {
  ChatListContainer,
  ChatListItem,
} from "../../styledComponents/chatArea";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../styledComponents/searchBar";
import SearchIcon from "@mui/icons-material/Search";
import ScrollableFeed from "react-scrollable-feed";

export const ChatList = () => {
  return (
    <ChatListContainer>
      <Search>
        <SearchIconWrapper>
          <SearchIcon color="primary.light" />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <ScrollableFeed className="boxShadow">
        <ChatListItem>
          <Box
            component="img"
            src=""
            alt=""
            width={30}
            height={30}
            borderRadius="50%"
          />

          <Box
            display="flex"
            flexDirection="column"
            marginRight="auto"
            marginLeft={2}
          >
            <Typography
              variant="body1"
              color="#000"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              Username
            </Typography>
            <Typography
              variant="caption"
              color="#1c1c1c"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              Some text messages are shown here
            </Typography>
          </Box>
          <Typography
            variant="caption"
            color="#2d2d2d"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            3 mins ago
          </Typography>
        </ChatListItem>
      </ScrollableFeed>
    </ChatListContainer>
  );
};
