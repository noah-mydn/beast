const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected at ", conn.connection.host);
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = connectDB;
