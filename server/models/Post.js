const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    profile_id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    comments: [mongoose.Types.ObjectId],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Post', postSchema);
