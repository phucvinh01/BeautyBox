const { Schema, model } = require('mongoose')

const userSchema = Schema({
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
    role: {
        type: Number,
        required: false,
        default: 0
    }

},
    { timestamps: true }

)

let User = model("users", userSchema);

module.exports = { User };

