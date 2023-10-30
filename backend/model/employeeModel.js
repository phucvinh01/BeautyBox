const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    hireDay: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    account: {
        isActive: {
            type: Boolean,
            default: true
        },
        role: {
            type: String,
            required: true
        },
        lastLogin: {
            type: Date
        },
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;