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
import axios from "axios";
import { ScrollableChat } from "../ScrollableChat/ScrollableChat";
import InputEmoji from "react-input-emoji";

export const ChatArea = ({
  user,
  selectedChat,
  messages,
  setMessages,
  newMessage,
  setNewMessage,
  messageLoading,
  setMessageLoading,
  setSendMessage,
  receivedMessage,
}) => {
  //Sending Messages
  const handleSend = async () => {
    if (newMessage === "") return;
    const message = {
      senderId: user?.data._id,
      message: newMessage,
      chatId: selectedChat?._id,
    };

    const receiverId = selectedChat.members.find(
      (member) => member._id !== user?.data._id
    )?._id;

    //Send Message to socket server
    setSendMessage({ ...message, receiverId });
    //Send Message to database
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/message",
        message,
        config
      );

      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  //Receiving Messages
  React.useEffect(() => {
    console.log("Message received -", receivedMessage);
    if (
      receivedMessage !== null &&
      receivedMessage?.chatId === selectedChat._id
    ) {
      console.log(receivedMessage);
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);
  console.log("Receive Message - ", receivedMessage);

  //New Message on Change
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  //Fetch Messages
  React.useEffect(() => {
    const fetchMessages = async () => {
      console.log(selectedChat?._id);
      try {
        setMessageLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const { data } = await axios.get(
          `http://localhost:5000/api/message/${selectedChat?._id}`,
          config
        );
        setMessages(data);
        console.log(messages);
        setMessageLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedChat) fetchMessages();
  }, [selectedChat]);

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
        <ScrollableChat
          user={user}
          messages={messages}
          messageLoading={messageLoading}
          newMessage={newMessage}
          scroll={scroll}
          friendInfo={friendInfo}
          selectedChat={selectedChat}
        />
      </ChatContent>
      <TextRegion>
        {/* <IconButton onClick={() => image.current.click()}>
          <AttachFileIcon color="text" />
        </IconButton>
        <input
          type="file"
          name=""
          id=""
          ref={image}
          style={{ display: "none" }}
          accept="image/*"
        /> */}

        <InputEmoji
          value={newMessage}
          onChange={handleChange}
          cleanOnEnter
          theme="light"
          onEnter={handleSend}
        />
        <IconButton size="small" onClick={handleSend}>
          <SendIcon color="text" />
        </IconButton>
        {/* </InputAdornment> */}
      </TextRegion>
    </MainChatArea>
  );
};
