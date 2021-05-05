const PhotoCompModel = require("./PhotoCompModel");
const sharp = require('sharp');

var images = require("images");

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

        var Jimp = require('jimp');

        //User-Defined Function to read the images
        async function main() {
            const image1 = await Jimp.read
                //   ('https://media.geeksforgeeks.org/wp-content/uploads/20190328185307/gfg28.png');
                (req.files.Image1[0].path);
            const image2 = await Jimp.read
                //   ('https://media.geeksforgeeks.org/wp-content/uploads/20190328185333/gfg111.png');
                (req.files.Image2[0].path);

            //call to blit function
            image1.composite(image2, 50, 50)
                //write image
                .write('blit1.png');
            console.log("Image Processing Completed");
        }
        main();
        images(req.files.Image1[0].path).draw(images(req.files.Image2[0].path), 10, 10).save("output.jpg");

        sharp(req.files.Image1[0].path)
            .overlayWith(req.files.Image2[0].path, { gravity: sharp.gravity.southeast })
            .toFile(path + 'output1.png');




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
