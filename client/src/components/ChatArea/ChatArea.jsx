import React from "react";
import {
  AttachMentIconWrapper,
  Avatar,
  ChatContent,
  ChatTitle,
  MainChatArea,
  TextRegion,
} from "../../styledComponents/chatArea";
import { IconButton, Typography, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ScrollableChat } from "../ScrollableChat/ScrollableChat";
import InputEmoji from "react-input-emoji";

export const ChatArea = ({
  user,
  selectedChat,
  messages,
  newMessage,
  messageLoading,
  handleSend,
  handleChange,
  showError,
}) => {
  //Setting Scroll to last Message
  const scroll = React.useRef();
  React.useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const defaultImage =
    "https://img.freepik.com/free-vector/cute-penguin-wearing-earmuff-cartoon_138676-3029.jpg";
  //Extracting friend from the chat member arrays
  const friendInfo = (chat) => {
    let friend = chat.members.filter((member) => member._id !== user.data._id);

    return friend;
  };
  //console.log(selectedChat);
  const image = React.useRef();

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
      <ChatContent>
        {selectedChat && (
          <ScrollableChat
            user={user}
            messages={messages}
            messageLoading={messageLoading}
            newMessage={newMessage}
            scroll={scroll}
            friendInfo={friendInfo}
            selectedChat={selectedChat}
          />
        )}
        {!selectedChat && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h5" color="#dedede">
              Choose a user to start chatting!
            </Typography>
          </Box>
        )}
      </ChatContent>
      <TextRegion>
        <InputEmoji
          value={newMessage}
          onChange={handleChange}
          cleanOnEnter
          theme="light"
          onEnter={selectedChat ? handleSend : showError}
        />
        <IconButton
          size="small"
          onClick={selectedChat ? handleSend : showError}
        >
          <SendIcon color="text" />
        </IconButton>
      </TextRegion>
    </MainChatArea>
  );
};
