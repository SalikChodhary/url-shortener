const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const app = express();

connectDB();
app.use(cors());
app.use(express.json({ extended: false }));

//Routes

app.use("/sm", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => console.log(`server running on ${PORT}`));
