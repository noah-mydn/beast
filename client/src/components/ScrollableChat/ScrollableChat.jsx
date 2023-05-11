import React from "react";
import { Box, CircularProgress, Tooltip, Typography } from "@mui/material";
import {
  BubbleText,
  BubbleTextContainer,
  BubbleTextImg,
  TimeStamp,
} from "../../styledComponents/chatArea";
import { format } from "timeago.js";

export const ScrollableChat = ({
  user,
  messageLoading,
  messages,
  scroll,
  friendInfo,
  selectedChat,
}) => {
  return (
    <Box>
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
              <Box display="flex">
                {msg.senderId._id !== user?.data._id && (
                  <Tooltip title={msg.senderId.username}>
                    <BubbleTextImg
                      component="img"
                      src={friendInfo(selectedChat)[0].profile}
                      alt={msg.senderId.username}
                    />
                  </Tooltip>
                )}
                <BubbleText
                  IsMeTheSender={msg.senderId._id === user?.data._id}
                  ref={scroll}
                >
                  <Typography variant="caption">{msg.message}</Typography>
                </BubbleText>
              </Box>
              <TimeStamp IsMeTheSender={msg.senderId._id === user?.data._id}>
                {format(msg.createdAt)}
              </TimeStamp>
            </BubbleTextContainer>
          );
        })}
    </Box>
  );
};
