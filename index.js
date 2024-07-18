const express = require("express");
const connection = require("./config/db");
require("dotenv").config();
const userRouter = require("./routes/user.route");
const noteRouter = require("./routes/note.route");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Health check server is running fine");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`server is running on ${port} and db is also connected`);
  } catch (error) {
    console.log("Error in connecting in db", error.message);
  }
});
