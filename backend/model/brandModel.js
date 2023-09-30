const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        logo: {
            type: String,
        }
    },

);


let Brand = mongoose.model("brand", brandSchema);

module.exports = { Brand };