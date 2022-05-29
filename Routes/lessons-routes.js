const express = require("express");
const Lessons = require("../models/deHelpers");

const router = express.Router();

router.post("/", (req, res) => {
  Lessons.add(req.body)
    .then((lesson) => {
      res.status(200).send({
        succes: true,
        message: "Lesson successfully added",
        data: lesson,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Error in adding lesson",
        data: error,
      });
    });
});

router.get("/", (req, res) => {
  Lessons.find()
    .then((lessons) => {
      res.status(200).send({
        success: true,
        message: "Lessons retrived successfully",
        data: lessons,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Error in fetching lesson",
        data: error,
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Lessons.findById(id)
    .then((lesson) => {
      if (lesson) {
        res.status(200).send({
          success: true,
          message: "Lessons retrived successfully",
          data: lesson,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "Lesson not found with this id",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Error in fetching lesson",
        data: error,
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Lessons.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).send({
          success: true,
          message: "Lessons deleted successfully",
          data: count,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "Lessons not exist with this id",
        });
      }
    })
    .catch((error) => {
      res.status(200).send({
        success: false,
        message: "Error in deletind lesson",
        data: error,
      });
    });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Lessons.update(id, changes)
    .then((lesson) => {
      if (lesson) {
        res
          .status(200)
          .send({ succes: true, message: "Update successful", data: lesson });
      } else {
        res.status(404).send({
          succes: false,
          message: "Record not exist with this id",
        });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ succes: false, message: "Update unsuccesfull", data: error });
    });
});

router.post("/:id/messages", (req, res) => {
  const { id } = req.params;
  const msg = req.body;
  if (!msg.lesson_id) {
    msg["lesson_id"] = parseInt(id, 10);
  }
  Lessons.findById(id)
    .then((lesson) => {
      if (!lesson) {
        res.status(404).send({ succes: false, message: "Invalid Id" });
      }
      // Check for all required field
      if (!msg.sender || !msg.text) {
        res.status(404).send({
          succes: false,
          message: "Must provide both sender and text",
        });
      }
      Lessons.addMessage(msg, id)
        .then((message) => {
          if (message) {
            res
              .status(200)
              .send({ succes: true, message: "Message Added", data: message });
          }
        })
        .catch((error) => {
          res.status(500).send({
            succes: false,
            message: "Error finding lesson",
            data: error,
          });
        });
    })
    .catch((error) => {
      res
        .status(500)
        .send({ succes: false, message: "Error Finding lesson", data: error });
    });
});

router.get("/:id/messages", (req, res) => {
  const { id } = req.params;
  Lessons.findLessonMessages(id)
    .then((lessons) => {
      res.status(200).send({
        success: true,
        message: "Retrived Successfull",
        data: lessons,
      });
    })
    .catch((error) => {
      res.status(500).send({
        succes: false,
        message: "Error Retriving message",
        data: error,
      });
    });
});

module.exports = router;
