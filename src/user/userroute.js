const express = require("express");
const router = express.Router();
const storage = require('../utils/multer')
const multer = require("multer");
const userController = require("./userController");

const upload = multer({
    storage
})

router.get("/", userController.index);


router.post("/",upload.single("image"), userController.store);


module.exports = router;