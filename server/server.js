const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const { Server, Socket } = require("socket.io");
const connectToDB = require("./mongodb/database");

//Routers
const userRouter = require("./routes/userRoute");
const chatRouter = require("./routes/chatRoute");

dotenv.config();
connectToDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log("listening on port 5000");
  console.log(PORT);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

http.createServer(app);
