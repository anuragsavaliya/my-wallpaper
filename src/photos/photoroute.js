const express = require("express");
const router = express.Router();
const storage = require('../utils/multer')
const multer = require("multer");
const photoController = require("./photoscontroller");

const upload = multer({
    storage
})

router.get("/getphotos", photoController.index);


router.delete   ("/deletephoto", photoController.delete);

router.get("/getphotosbyCategory", photoController.getPhotoByCategory);
router.get("/search", photoController.search);


router.post("/add",upload.single("image"), photoController.store);


module.exports = router;