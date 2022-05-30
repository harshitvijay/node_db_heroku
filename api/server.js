const express = require("express");
// const session = require("express-session");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("../auth/auth-routes");
const lessonsRouter = require("../Routes/lessons-routes");
const messagesRouter = require("../Routes/messages-routes");
const userRouter = require("../Routes/users-routes");
const restricted = require("../auth/restricted-middleware");

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// const sessionConfig = {
//   name: "monster", //name of cookie
//   secret: process.env.SECRET, // secret key that makes cookie effective
//   cookie: {
//     maxAge: 1000 * 60 * 60, // time span of cookie
//     secure: false, // for prod set to true fot http access only
//     httpOnly: true, // true means no access to javascript
//   },
//   resave: false,
//   saveUninitialized: true, // for prod set to false
// };

app.use(express.json());
// app.use(session(sessionConfig));

app.get("/", (req, res) => {
  try {
    res.status(200).send({ success: true, message: "App is running" });
  } catch (error) {}
});

app.use("/api/auth", authRouter);

app.use("/api/lessons", restricted, lessonsRouter);
app.use("/api/messages", restricted, messagesRouter);
app.use("/api/users", restricted, userRouter);

module.exports = app;
