const express = require("express");
const Lessons = require("../models/deHelpers");

const router = express.Router();

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Lessons.removeMessage(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).send({
          succes: true,
          message: `Message with id ${id} sucessfully deleted`,
        });
      } else {
        res.status(404).send({ success: false, message: `Invalid Id` });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "Error Deleting Message",
        data: error,
      });
    });
});

module.exports = router;
