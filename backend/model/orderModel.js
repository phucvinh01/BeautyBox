const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        cart: {
            type: Object,
            required: true,

        },
        status: {
            type: Number,
            default: 1,
        },
        methodShip: {
            type: String,
            required: true,

        },
        note: {
            type: String,
        },
        shippingInfor: {
            type: String,
            required: true,

        },
    },
    { timestamps: true }

);


let Order = mongoose.model("order", orderSchema);

module.exports = { Order };