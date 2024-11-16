const express = require("express");
const { sendComments, createComments } = require("../controller/commentController");
const router = express.Router();

router.get("/sendComments/:id",sendComments);

router.post("/createComments",createComments);

module.exports = router;