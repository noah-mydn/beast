import { Grid } from "@mui/material";
import React from "react";
import { ChatList } from "../components/ChatList/ChatList";
import { Navbar } from "../components/Navigation/Navbar";
import { ChatArea } from "../components/ChatArea/ChatArea";
import { ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
import axios from "axios";

export const Chat = ({ IsTablet, user, chats, setChats, chatLoading }) => {
  //For the chat
  const [selectedChat, setSelectedChat] = React.useState();

  //For Messaging
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const [messageLoading, setMessageLoading] = React.useState(false);

  //Connecting with socket
  const [onlineUsers, setOnlineUsers] = React.useState(null);
  const [getMessage, setGetMessage] = React.useState(null);
  const socket = React.useRef();

  //Socket Connection and arrival messages
  React.useEffect(() => {
    socket.current = io("ws://localhost:8080");
    socket.current.on("get-message", (data) => {
      setGetMessage({
        message: data.message,
        senderId: data.senderId,
      });
    });
  }, []);

  //Receiving Messages
  React.useEffect(() => {
    if (getMessage) {
      setMessages((prev) => {
        return [...prev, getMessage];
      });
    }
    console.log(getMessage);
    console.log(messages);
  }, [getMessage, selectedChat]);

  //Checking online users
  React.useEffect(() => {
    socket.current.emit("add-new-user", user?.data._id);
    socket.current.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
  });

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

    //Sending from socket
    socket.current.emit("send-message", {
      senderId: user?.data._id,
      receiverId: receiverId,
      message: message,
    });

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

  //New Message on Change
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  //Fetch Messages from api
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

  return (
    <Grid
      container
      direction="row"
      p={1}
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#efefef",
      }}
    >
      <ToastContainer />
      <Grid item md={4} height="100%" display={{ md: "block", xs: "none" }}>
        <ChatList
          IsTablet={IsTablet}
          user={user}
          chats={chats}
          setChats={setChats}
          chatLoading={chatLoading}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          messages={messages}
          messageLoading={messageLoading}
        />
      </Grid>

      <Grid item md={8} xs={12} height="100%">
        <Grid item xs={12} height="7%">
          <Navbar
            user={user}
            chats={chats}
            setChats={setChats}
            chatLoading={chatLoading}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            messages={messages}
          />
        </Grid>
        <Grid
          item
          xs={12}
          height="92%"
          sx={{
            background: "#efefef",
          }}
        >
          <ChatArea
            user={user}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            messages={messages}
            newMessage={newMessage}
            messageLoading={messageLoading}
            handleChange={handleChange}
            handleSend={handleSend}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
