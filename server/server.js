const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const connectToDB = require("./mongodb/database");

dotenv.config();
connectToDB();

//Routers
const userRouter = require("./routes/userRoute");
const chatRouter = require("./routes/chatRoute");
const messageRouter = require("./routes/messageRoute");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("listening on port 5000");
  console.log(PORT);
});
