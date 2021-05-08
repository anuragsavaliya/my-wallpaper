const PhotoCompModel = require("./PhotoCompModel");
const sharp = require('sharp');
//const mergeImages = require('merge-images');
var sizeOf = require('image-size');
var images = require("images");
const fs = require("fs");


exports.store = async (req, res, next) => {
    try {
        if (!req.body)
            return res
                .status(400)
                .json({ status: false, message: "Oops ! Invalid Details" });


        if (!req.body.name)
            return res
                .status(200)
                .json({ status: false, message: "Oops ! name is required !" });

        if (!req.files)
            return res
                .status(200)
                .json({ status: false, message: "Oops ! Image is Required" });

        const photo = new PhotoCompModel();
        photo.name = req.body.name;
        photo.Image1 = req.files.Image1[0].path;
        photo.Image2 = req.files.Image2[0].path;


        var dimensions = sizeOf(photo.Image2);
        var Jimp = require('jimp');


        var w = dimensions.width;
        var h = dimensions.height;
        console.log(" image size     " + w + "  " + h);
        //User-Defined Function to read the images
        async function main() {
            const image1 = await Jimp.read
                //   ('https://media.geeksforgeeks.org/wp-content/uploads/20190328185307/gfg28.png');
                (req.files.Image1[0].path);
            const image2 = await Jimp.read
                //   ('https://media.geeksforgeeks.org/wp-content/uploads/20190328185333/gfg111.png');
                (req.files.Image2[0].path);

            //call to blit function
            image1.composite(image2, 0, 0)
                //write image
                .write('blit1.png');
            console.log("Image Processing Completed");
        }
        main();
        images(req.files.Image1[0].path).draw(images(req.files.Image2[0].path), 0, 0).save("output.jpg");

        // sharp(req.files.Image1[0].path)
        //     .overlayWith(req.files.Image2[0].path, { gravity: sharp.gravity.southeast })
        //     .toFile(path + 'output1.png');

        let originalImage = 'blit1.png';
        let outputImage2 = 'croppedImage2.jpg';






        let outputImage = 'croppedImage.jpg';



        sharp(originalImage)
            //   .extract({ width: w, height: h, left: 0, top: 0 })
            //  .resize(w, h)
            .extract({ width: w, height: h, left: 0, top: 0 })
            .toFile(outputImage)
            .then(function (new_file_info) {
                console.log("Image cropped and saved");
            })
            .catch(function (err) {
                console.log("An error occured" + err);
            });


        await photo.save((error, photo) => {
            if (error) return res.status(200).json({ status: false, error });
            else
                return res.status(200).json({
                    status: true,
                    message: "Photo Add Successfully",
                    photo,
                });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error });
    }
};
