const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const requestSchema = new Schema(
  {
    name: { type: String, require: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    image: String,
    likes: { type: Number, default: 0 },
    isLiked: { type: Boolean, require: true, default: false },
    photo_id: { type: Schema.Types.ObjectId, ref: "Photo" },
  },
  {
    timestamps: true,
  }
);

requestSchema.index({
  name: 'text'
  //  image: 'text',
});
module.exports = mongoose.model("Photo", requestSchema);