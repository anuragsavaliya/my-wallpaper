const express = require("express");
const router = express.Router();
const storage = require('../utils/multer')
const multer = require("multer");
const photoController = require("./photoscontroller");

const upload = multer({
    storage
})

router.get("/", photoController.index);


router.post("/",upload.single("image"), photoController.store);


module.exports = router;