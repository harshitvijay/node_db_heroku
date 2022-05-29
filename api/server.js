const express = require("express");
const lessonsRouter = require("../Routes/lessons-routes");
const messagesRouter = require("../Routes/messages-routes");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).send({ success: true, message: "App is running" });
  } catch (error) {}
});

app.use("/api/lessons", lessonsRouter);
app.use("/api/messages", messagesRouter);

module.exports = app;
