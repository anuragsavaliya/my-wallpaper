const mongoose = require("mongoose");
var textSearch = require('mongoose-text-search');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const requestSchema = new Schema(
    {
        name: { type: String, require: true },
        tag: { type: String, require: true },
        label: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);
requestSchema.plugin(textSearch);
module.exports = mongoose.model("Frame", requestSchema);