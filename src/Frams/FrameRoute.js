const express = require("express");
const router = express.Router();
const FrameController = require("./FrameController");



router.post("/add",
    FrameController.store);

router.get("/search", FrameController.search);
module.exports = router;