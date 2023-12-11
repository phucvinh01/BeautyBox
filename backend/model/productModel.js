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
        brand: {
            type: String,
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
            number: {
                type: Number,
                default: 0
            },
            timeBegin: {
                type: Date
            },
            timeEnd: {
                type: Date
            }
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
        slug: {
            type: String
        },
        isDelete: {
            type: Boolean,
            default: false
        },
        collections: [
            {
                type: String,
            },
        ],

    },
    { timestamps: true }

);



let Product = mongoose.model("product", productSchema);

module.exports = { Product };