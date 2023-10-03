const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    address: {
        type: String,
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
        },
    ],
    role: {
        type: Number,
        default: 0
    }

},
    { timestamps: true }

)

let User = mongoose.model("user", userSchema);

module.exports = { User };