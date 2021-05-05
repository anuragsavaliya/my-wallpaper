const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    name: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", requestSchema);