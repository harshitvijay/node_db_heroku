const express = require("express");
const Lessons = require("../models/deHelpers");

const router = express.Router();

router.get("/", async (req, res) => {
  Lessons.findAllUser()
    .then((users) => {
      res.status(200).send({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Error in fetching users",
        data: error,
      });
    });
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  Lessons.findUserByUsername(username)
    .then((user) => {
      res.status(200).send({
        success: true,
        message: "user fetched successfully",
        data: user,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Error in fetching user bu username",
        data: error,
      });
    });
});

module.exports = router;
