const mongoose = require("mongoose");

const receiptModel = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "product",
        },
        employeeId:
        {
            type: mongoose.Types.ObjectId,
            ref: "Employee",
        },
        date: {
            type: String,
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
        }
    },
    { timestamps: true }
);

let Receipt = mongoose.model("receipt", receiptModel);

module.exports = { Receipt };