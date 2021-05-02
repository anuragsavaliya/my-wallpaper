const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    name: { type: String, require: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    image: String,
    photo_id: { type: Schema.Types.ObjectId, ref: "Photo" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Photo", requestSchema);