const UserModel = require("./userModel");
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

        if (!req.body.email)
        return res
          .status(200)
          .json({ status: false, message: "Oops ! email is required !" });

          
        if (!req.file)
        return res
          .status(200)
          .json({ status: false, message: "Oops ! Image is Required" });
  
        const user=new UserModel();
        user.name=req.body.name;
        user.email=req.body.email;
        user.image = req.file.path;

        await user.save((error, user) => {
            if (error) return res.status(200).json({ status: false, error });
            else
              return res.status(200).json({
                status: true,
                message: "User Add Successfully",
                user,
              });
          });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, error });
    }
  };

  
  exports.index =async(req,res)=>{
    try{
        const user=await UserModel.find();

        if(!user){
            throw new Error();
        }

        return  res
        .status(200)
        .json({ status: 200, message: "Success", data: user });

     } catch (error) {
  console.log(error);
  return res
    .status(error.status || 500)
    .json({ error: error.errors || error.message || "Server Error" });
}
};