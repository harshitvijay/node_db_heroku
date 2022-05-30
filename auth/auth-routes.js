const express = require("express");
const Lessons = require("../models/deHelpers");
const bcrypt = require("bcryptjs");
const generateToken = require("../auth/generateToken");

const router = express.Router();

router.post("/register", (req, res) => {
  const credentials = req.body;
  let { username, password } = credentials;

  if (!(username && password)) {
    res.status(404).send({
      success: false,
      message: "Username and Password required",
    });
  }
  const hash = bcrypt.hashSync(credentials.password, 12);
  credentials.password = hash;
  Lessons.addUser(credentials)
    .then((user) => {
      res.status(200).send({
        success: true,
        message: "User added",
        data: user,
      });
    })
    .catch((error) => {
      if (error.errno == 19) {
        res.status(400).send({
          success: false,
          message: "username already taken",
        });
      } else {
        res.status(500).send({
          success: false,
          message: "Error in adding user",
          data: error,
        });
      }
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res.status(404).send({
      success: false,
      message: "Username and Password required",
    });
  }
  Lessons.findUserByUsername(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // req.session.user = {
        //   id: user.id,
        //   username: user.username,
        // };

        const token = generateToken(user);
        res.status(200).send({
          success: true,
          message: "Loigin sucessfull",
          token,
        });
      } else {
        res.status(401).send({
          success: false,
          message: "Invalid Credential",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "server error",
        data: error,
      });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).send({
          success: false,
          message: "You can checkout anytime but you can never leave",
        });
      } else {
        res.status(200).send({
          success: true,
          message: "Logout Successfull",
        });
      }
    });
  } else {
    res.status(200).send({
      success: true,
      message: "Not logged In",
    });
  }
});

module.exports = router;
