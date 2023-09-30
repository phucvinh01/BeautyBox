const mongoose = require("mongoose");

const Address = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,

        },
        node: {
            type: String,
        },
    },
);
module.exports = mongoose.model("shippingInfor", Address);

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
        cart: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Cart",
            }
        ],
        status: {
            type: String,
            required: true,
            default: "Đang chuẩn bị",
        },
        shippingInfor: { Address },
    },
    { timestamps: true }

);


let Order = mongoose.model("order", orderSchema);

module.exports = { Order };