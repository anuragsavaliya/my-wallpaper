const express = require("express");
const router = express.Router();

const likeController = require("./likeController");



router.post("/", likeController.store);


module.exports = router;