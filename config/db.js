const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Mongo connected"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connectDB;
