const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
        },
        timeStart: {
            type: String,
        },
        timeEnd: {
            type: String,
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

export default mongoose.model("event", eventSchema);