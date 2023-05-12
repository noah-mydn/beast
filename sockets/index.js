const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

const addUser = (userId, socketId) => {
  !activeUsers.some((user) => user.userId === userId) &&
    activeUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  activeUsers = activeUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return activeUsers.find((user) => user.userId === userId);
};

//Connecting user with socket
io.on("connection", (socket) => {
  console.log("a user connected");
  //Take userId and socketId when a user is connected
  socket.on("add-new-user", (userId) => {
    addUser(userId, socket.id);
    io.emit("get-online-users", activeUsers);
  });

  //Send and Receive Messages
  socket.on("send-message", ({ senderId, receiverId, message }) => {
    const user = getUser(receiverId);
    console.log(user);
    console.log("Send Text from socket - ", message);
    io.to(user.socketId).emit("get-message", message);
    console.log("Receive Message from Socket -", {
      message: message,
      senderId: senderId,
    });
  });

  //Disconnecting user with socket
  socket.on("disconnect", () => {
    console.log("A user is disconnected", socket.id);
    removeUser(socket.id);
    io.emit("get-online-users", activeUsers);
  });
});
