const LikeModel = require("./likeModel");
const PhotoModel = require("../photos/photoModel");

exports.store= async(req,res)=>{
    try {
          
        
  
      if(req.body.photo_id&&req.body.user_id){

          
          const likes=await LikeModel.exists({photoId:req.body.photo_id,userId:req.body.user_id});
          console.log(likes);
          if(likes){


            await LikeModel.findOneAndDelete({photoId:req.body.photo_id,userId:req.body.user_id});

            await PhotoModel.update({_id:req.body.photo_id},{$inc:{isLike:-1}});
            return res.status(200).json({
                status: true,
                message: "UnLike Successfully",
              });
        }else{
            

              const like=new LikeModel();
like.userId=req.body.user_id;
like.photoId=req.body.photo_id;

await like.save();

await PhotoModel.update({_id:req.body.photo_id},{$inc:{isLike:1}});
return res.status(200).json({
    status: true,
    message: "Like Successfully",
  });

        }






      }
      else{
        return res
        .status(400)
        .json({ status: false, message: "Oops ! Invalid Details" });

      }

      

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error:error.message });
    }
}
