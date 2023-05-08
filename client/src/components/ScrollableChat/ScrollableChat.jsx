import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { Box, CircularProgress, Tooltip, Typography } from "@mui/material";
import {
  BubbleText,
  BubbleTextContainer,
  BubbleTextImg,
} from "../../styledComponents/chatArea";
import { theme } from "../../theme/theme";

export const ScrollableChat = ({
  user,
  messageLoading,
  messages,
  newMessage,
}) => {
  console.log(theme.palette.primary.light);
  console.log(theme.palette.info.light);

  return (
    <ScrollableFeed>
      {messageLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {!messageLoading &&
        messages &&
        messages.map((msg) => {
          return (
            <BubbleTextContainer>
              {msg.senderId !== user?.data._id && (
                <Tooltip title={msg.senderId.username}>
                  <BubbleTextImg
                    component="img"
                    src={msg.senderId.profile}
                    alt={msg.senderId.username}
                  />
                </Tooltip>
              )}
              <BubbleText IsMeTheSender={msg.senderId === user?.data._id}>
                <Typography variant="caption" color="#000">
                  {msg.message}
                </Typography>
              </BubbleText>
            </BubbleTextContainer>
          );
        })}
    </ScrollableFeed>
  );
};
