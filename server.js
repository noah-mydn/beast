const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const path = require("path");
const connectToDB = require("./mongodb/database");

dotenv.config();
connectToDB();

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
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

// Connecting user with socket
io.on("connection", (socket) => {
  console.log("a user connected");

  // Take userId and socketId when a user is connected
  socket.on("add-new-user", (userId) => {
    addUser(userId, socket.id);
    io.emit("get-online-users", activeUsers);
  });

  // Send and Receive Messages
  socket.on("send-message", ({ senderId, receiverId, message }) => {
    const user = getUser(receiverId);
    console.log(user);
    console.log("Send Text from socket - ", message);
    io.to(user?.socketId).emit("get-message", message);
    console.log("Receive Message from Socket -", {
      message: message,
      senderId: senderId,
    });
  });

  // Disconnecting user with socket
  socket.on("disconnect", () => {
    console.log("A user is disconnected", socket.id);
    removeUser(socket.id);
    io.emit("get-online-users", activeUsers);
  });
});

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Routers
const userRouter = require("./routes/userRoute");
const chatRouter = require("./routes/chatRoute");
const messageRouter = require("./routes/messageRoute");

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

// // Deployment
// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   console.log(__dirname1);
//   app.use(express.static(path.join(__dirname1, "client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running");
//   });
// }

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("listening on port 8080");
  console.log(PORT);
});
