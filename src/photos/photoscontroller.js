const PhotoModel = require("./photoModel");
const Category = require("../category/categoryModel")
const User = require("../user/userModel")
const Likes = require("../like/likeModel")
const fs = require("fs");
const ObjectId = require("mongoose").Types.ObjectId


exports.store = async (req, res, next) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ status: false, message: "Oops ! Invalid Details" });

    if (!req.body.category_id) {
      const isExist = await Category.exists({ _id: req.body.category });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! Category does not Exist",
        });
    }

    if (!req.body.name)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! name is required !" });

    if (!req.file)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! Image is Required" });

    const photo = new PhotoModel();
    photo.name = req.body.name;
    photo.image = req.file.path;
    photo.category = req.body.category_id;


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


exports.search = async (req, res) => {
  try {


    if (!req.query.keyword)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! keyword is required !" });



    const query = { $text: { $search: "trek" } };
    const projection = {
      _id: 0,
      name: 1,
    };

    //  var query = { name: req.query.keyword };
    // var query = { name: /^S/ };


    const photoData = await PhotoModel.find()
      .populate('category')
      .sort({ createdAt: -1 })
    //  photoData.index({ name: 'text' });

    // photoData.index()
    //  const cursor = PhotoModel.find(query);
    // for await (const doc of cursor) {
    //   console.log(doc);
    // }


    // adSchema.index({ name: 'text' });
    // const Ad = PhotoModel.model('PhotoModel', adSchema);
    // Ad.createIndexes();
    // let result = (await PhotoModel.lookup({
    //   path: 'tags',
    //   query: { 'tagName': { '$in': [ 'funny', 'politics' ] } }
    // })).pop();
    // log(result);


    if (!photoData) {
      throw new Error();
    }


    // const data = []
    // for (var i = 0; i < photoData.length; i++) {
    //   const photo_ = {
    //     _id: photoData[i]._id,
    //     likes: photoData[i].likes,
    //     name: photoData[i].name,
    //     image: photoData[i].image,
    //     categoryName: photoData[i].category.name,
    //     categoryId: photoData[i].category._id,
    //     isLiked: false
    //   }

    //   data.push(photo_)
    // }



    //     const finelData = []

    //     for (var i = 0; i < data.length; i++) {


    //         if (data[i].categoryName.toString().includes(req.query.keyword)) {
    // finelData.push(data[i]);

    //         }


    //     }



    return res
      .status(200)
      .json({ status: 200, message: "Success", data: photoData });

  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({ error: error.errors || error.message || "Server Error" });
  }
};


exports.index = async (req, res) => {
  try {

    const authKey = req.headers.authorization;
    if (!authKey) {
      return res.status(422).json({
        status: false,
        message: "Oops ! Enter Auth key first",
      });
    } else {
      console.log(authKey);
      if (authKey.toString() !== "ANURAG")
        return res.status(422).json({
          status: false,
          message: "Oops ! Auth key NOT VALID",
        });
    }

    const user = await User.findById(req.query.user_id);
    const start = req.query.start ? req.query.start : 0;
    const limit = req.query.limit ? req.query.limit : 5;
    console.log(start);
    console.log(limit);



    if (req.query.user_id) {
      if (!user)
        return res.status(422).json({
          status: false,
          message: "Oops ! user does not Exist",
        });
    }

    const photoData = await PhotoModel.find()
      .skip(parseInt(start)).limit(parseInt(limit))
      .populate("category")
      .sort({ createdAt: -1 })



    if (!photoData) {
      throw new Error();
    }


    const data = []
    for (var i = 0; i < photoData.length; i++) {
      const photo_ = {
        _id: photoData[i]._id,
        likes: photoData[i].likes,
        name: photoData[i].name,
        image: photoData[i].image,
        categoryName: photoData[i].category.name,
        categoryId: photoData[i].category._id,
        isLiked: false
      }

      data.push(photo_)
    }


    const likes = await Likes.find();

    for (var i = 0; i < data.length; i++) {
      await likes.map((like) => {

        if (data[i]._id.toString() == like.photoId.toString()) {
          return data[i].isLiked = true;
        }

      });
    }


    return res
      .status(200)
      .json({ status: 200, message: "Success", data: data });

  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({ error: error.errors || error.message || "Server Error" });
  }
};

exports.getPhotoByCategory = async (req, res) => {
  try {

    console.log("cat id " + req.query.category_id);
    if (!req.query.category_id) {
      const isExist = await Category.exists({ category_id: req.query.category_id });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! Category does not Exist",
        });
    }



    const photo = await PhotoModel.find().where({ category: req.query.category_id })
      .populate("Category")
      .sort({ createdAt: -1 });


    if (!photo) {
      throw new Error();
    }

    return res
      .status(200)
      .json({ status: 200, message: "Success", data: photo });

  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({ error: error.errors || error.message || "Server Error" });
  }
};

exports.delete = async (req, res) => {
  try {

    if (!req.query.id)
      return res
        .status(200)
        .json({ status: 401, message: "Enter photo id" });


    const data = ObjectId.isValid(req.query.id);

    if (!data)
      return res
        .status(200)
        .json({ status: 401, message: "Enter Valid photo id" });


    const photo = await PhotoModel.findById(req.query.id);
    if (!photo) {
      return res.status(200).json({ status: 404, message: "Not Found" });
    }

    photo.delete();
    return res
      .status(200)
      .json({ status: 200, message: "Deleted Successfully" });


  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ error: error.errors || error.message || "Server Error" });
  }
};
