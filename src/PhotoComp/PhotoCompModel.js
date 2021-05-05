const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
    {
        name: { type: String, require: true },
        Image1: String,
        Image2: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("PhotoComp", requestSchema);