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
  
      if(!req.body.category_id){
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
  
        const photo=new PhotoModel();
        photo.name=req.body.name;
        photo.image = req.file.path;
        photo.category=req.body.category_id;

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


  exports.index =async(req,res)=>{
      try{

        const user = await User.findById(req.query.user_id);

        if (req.query.user_id) {
          if (!user)
            return res.status(422).json({
              status: false,
              message: "Oops ! user does not Exist",
            });
        }

          const photo=await PhotoModel.find()
          .populate("Category")
          .sort({ createdAt: -1 });



          if(!photo){
              throw new Error();
          }


          // const data = []
          // for (var i = 0; i < photo.length; i++) {
          //   const photo_ = {
          //     _id: photo[i]._id,
          //     isLiked: false
          //   }
        
          //   data.push(photo_)
          // }


          const likes = await Likes.find();
          console.log(" likess "+likes);
          console.log(" photods "+photo);
console.log(req.query.user_id);
          for (var i = 0; i < photo.length; i++) {
            debugger;
            await likes.map((like) => {


              if ( photo[i]._id === like.photoId) {
        
                return photo[i].isLiked = true;
              }
        
            });
          }


          return  res
          .status(200)
          .json({ status: 200, message: "Success", data: photo });

       } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({ error: error.errors || error.message || "Server Error" });
  }
  };

  exports.getPhotoByCategory =async(req,res)=>{
    try{

      console.log("cat id "+req.query.category_id);
      if(!req.query.category_id){
        const isExist = await Category.exists({ category_id: req.query.category_id });
        if (!isExist)
          return res.status(422).json({
            status: false,
            message: "Oops ! Category does not Exist",
          });
      }
     
    
      
        const photo=await PhotoModel.find().where({category:req.query.category_id})
        .populate("Category")
        .sort({ createdAt: -1 });


        if(!photo){
            throw new Error();
        }

        return  res
        .status(200)
        .json({ status: 200, message: "Success", data: photo });

     } catch (error) {
  console.log(error);
  return res
    .status(error.status || 500)
    .json({ error: error.errors || error.message || "Server Error" });
}
};

exports.delete =async(req,res)=>{
  try{

    if(!req.query.id)
    return  res
    .status(200)
    .json({ status: 401, message: "Enter photo id"});


    const data =ObjectId.isValid(req.query.id);

    if(!data)
    return  res
    .status(200)
    .json({ status: 401, message: "Enter Valid photo id"});


    const photo = await PhotoModel.findById(req.query.id);
    if(!photo){
      return res.status(200).json({ status: 404, message: "Not Found"});
    }

    photo.delete();
    return  res
    .status(200)
    .json({ status: 200, message: "Deleted Successfully"});

    
   } catch (error) {
return res
  .status(error.status || 500)
  .json({ error: error.errors || error.message || "Server Error" });
}
};
