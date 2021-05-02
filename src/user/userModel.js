const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true },
        user_id: { type: Schema.Types.ObjectId, ref: "User" },
        image: String,
      },
      {
        timestamps: true,
      }
)

module.exports = mongoose.model("User", userSchema);