const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    post_id: mongoose.Types.ObjectId,
    from: mongoose.Types.ObjectId,
    to: mongoose.Types.ObjectId,
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Comment', commentSchema);