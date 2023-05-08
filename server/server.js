const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
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
    origin: "http://localhost:3000",
  })
);

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("listening on port 5000");
  console.log(PORT);
});
