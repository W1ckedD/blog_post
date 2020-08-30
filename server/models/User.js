const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verifyToken: String,
    verifyTokenExpiryDate: Date,
    isVerified: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
    },
    imgUrl: {
        type: String,
        default: '/api/uploads/defaultProfileImage.jpg'
    },
    birthday: Date,
    location: String,
    bio: String,
    posts: [mongoose.Types.ObjectId],
    friends: [mongoose.Types.ObjectId],
    pendingSentRequests: [mongoose.Types.ObjectId],
    pendingRecievedRequests: [mongoose.Types.ObjectId],
});

module.exports = mongoose.model('User', userSchema);
