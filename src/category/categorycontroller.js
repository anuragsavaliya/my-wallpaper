const Category = require("./categoryModel");


exports.store = async (req, res, next) => {
    try {
      if (!req.body)
        return res
          .status(400)
          .json({ status: false, message: "Oops ! Invalid Details" });
  
      if (!req.body.name)
        return res
          .status(400)
          .json({ status: false, message: "Oops ! categoryName is required !" });
  
      const category = new Category();
      category.name = req.body.name;
  
      await category.save((error, category) => {
        if (error) return res.status(400).json({ status: false, error });
        else
          return res.status(200).json({
            status: true,
            message: "category Add Successfully",
            category,
          });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, error });
    }
  };


  exports.index =async(req,res)=>{
    try{
        const category=await Category.find();

        if(!category){
            throw new Error();
        }

        return  res
        .status(200)
        .json({ status: 200, message: "Success", data: category });

     } catch (error) {
  console.log(error);
  return res
    .status(error.status || 500)
    .json({ error: error.errors || error.message || "Server Error" });
}
};