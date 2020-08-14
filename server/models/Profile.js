const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    imgBase64: String,
    birthDay: Date,
    location: String,
    bio: String,
    posts: [mongoose.Types.ObjectId],
    friends: [mongoose.Types.ObjectId],
    pendingSentRequests: [mongoose.Types.ObjectId],
    pendingRecievedRequests: [mongoose.Types.ObjectId]
});

module.exports = mongoose.model('Profile', profileSchema);