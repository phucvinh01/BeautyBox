const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Schema.Types;
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
        price: {
            type: Number,
            default: function () {
                return this.priceSale;
            }
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
            type: Number,
            default: 0
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