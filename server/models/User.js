const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verifyToken: String,
    verifyTokenExpiryDate: Date,
    isVerified: {
        type: Boolean,
        default: false
    },
    hasProfile: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);