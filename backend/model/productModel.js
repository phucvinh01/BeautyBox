const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        reviews: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Review",
            },
        ],
    },
    { timestamps: true }

);


let Product = mongoose.model("product", productSchema);

module.exports = { Product };