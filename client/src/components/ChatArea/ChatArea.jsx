import React from "react";
import {
  AttachMentIconWrapper,
  Avatar,
  ChatContent,
  ChatTitle,
  MainChatArea,
  TextRegion,
} from "../../styledComponents/chatArea";
import {
  IconButton,
  InputAdornment,
  InputBase,
  Typography,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { theme } from "../../theme/theme";

export const ChatArea = () => {
  return (
    <MainChatArea>
      <ChatTitle>
        <Avatar width={40} height={40} mx={1} src="" component="img" />
        <Typography
          variant="subtitle1"
          color="#fff"
          fontWeight="bolder"
          textTransform="uppercase"
          mx={2}
        >
          Username
        </Typography>
      </ChatTitle>
      <ChatContent></ChatContent>
      <TextRegion>
        <AttachMentIconWrapper>
          <AttachFileIcon sx={{ color: theme.palette.primary.main }} />
        </AttachMentIconWrapper>
        <InputBase
          value=""
          // onKeyDown={(e) => sendMessageOnEnter(e)}
          // onChange={(e) => setNewMessage(e.target.value)}
          sx={{ ml: 6, flex: 1 }}
          multiline
          maxRows={2}
          placeholder="Hello..."
          inputProps={{ "aria-label": "send message" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton size="small">
                <EmojiEmotionsIcon color="primary" />
              </IconButton>
              <IconButton size="small">
                <SendIcon color="primary" />
              </IconButton>
            </InputAdornment>
          }
        />
      </TextRegion>
    </MainChatArea>
  );
};
