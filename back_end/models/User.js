const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max:255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ["student", "lecturer", "admin"]
    },
    resetToken: {
        type: String
    },
    newPassword: {
        type: String,
        max: 1024,
        min: 6
    }
});

module.exports = mongoose.model('User', userSchema);