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

export const ChatArea = ({ user, selectedChat, setSelectedChat }) => {
  const defaultImage =
    "https://img.freepik.com/free-vector/cute-penguin-wearing-earmuff-cartoon_138676-3029.jpg";
  //Extracting friend from the chat member arrays
  const friendInfo = (chat) => {
    let friend = chat.members.filter((member) => member._id !== user.data._id);

    return friend;
  };
  console.log(selectedChat);
  return (
    <MainChatArea>
      <ChatTitle>
        <Avatar
          width={40}
          height={40}
          mx={1}
          src={
            selectedChat ? friendInfo(selectedChat)[0].profile : defaultImage
          }
          alt={selectedChat ? friendInfo(selectedChat)[0].username : "Username"}
          component="img"
        />
        <Typography
          variant="subtitle1"
          color="secondary"
          fontWeight="bolder"
          textTransform="uppercase"
          mx={2}
        >
          {selectedChat ? friendInfo(selectedChat)[0].username : "Username"}
        </Typography>
      </ChatTitle>
      <ChatContent></ChatContent>
      <TextRegion>
        <AttachMentIconWrapper>
          <AttachFileIcon color="text" />
        </AttachMentIconWrapper>
        <InputBase
          style={{ color: "white" }}
          // onKeyDown={(e) => sendMessageOnEnter(e)}
          // onChange={(e) => setNewMessage(e.target.value)}
          sx={{ ml: 2, flex: 1 }}
          multiline
          maxRows={2}
          placeholder="Hello..."
          inputProps={{ "aria-label": "send message" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton size="small">
                <EmojiEmotionsIcon color="text" />
              </IconButton>
              <IconButton size="small">
                <SendIcon color="text" />
              </IconButton>
            </InputAdornment>
          }
        />
      </TextRegion>
    </MainChatArea>
  );
};
