const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        }
    },

);


let Category = mongoose.model("category", categorySchema);

module.exports = { Category };