const express = require("express");
const router = express.Router();
const storage = require('../utils/multer')
const multer = require("multer");
const PhotoCompController = require("./PhotoCompController");



const upload = multer({
    storage
})

// router.get("/getphotos", PhotoCompController.index);


// router.delete   ("/deletephoto", PhotoCompController.delete);

// router.get("/getphotosbyCategory", PhotoCompController.getPhotoByCategory);


router.post("/add",
    upload.fields([{ name: "Image1" }, { name: "Image2" }]),
    PhotoCompController.store);


module.exports = router;