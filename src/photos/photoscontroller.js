const PhotoModel = require("./photoModel");
const Category = require("../category/categoryModel")
const fs = require("fs");


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
          const photo=await PhotoModel.find()
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