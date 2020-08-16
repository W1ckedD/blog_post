const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    profile_id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image_1: String,
    image_2: String,
    image_3: String,
    comments: [mongoose.Types.ObjectId],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Post', postSchema);
