const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        reviewText: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
            default: 0,
        },
    },
    { timestamps: true }
);

let Review = mongoose.model("review", reviewSchema);

module.exports = { Review };