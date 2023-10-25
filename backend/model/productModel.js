const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        priceIn: {
            type: Number,
            required: true,
        },
        priceSale: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        discount: {
            type: Number
        },
        in_stock: {
            type: Number
        },
        origin: {
            type: String
        },
        distributor: {
            type: String
        },
        category: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        },
        collections: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Review",
            },
        ],
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