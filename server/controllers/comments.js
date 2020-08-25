const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

exports.getCommentsByPost = async (req, res, next) => {
    try {
        const { post_id } = req.body;
        const comments = await Comment.find({ post_id });
        return res.status(200).json({
            success: true,
            comments
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

exports.getCommentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        return res.status(200).json({
            success: true,
            comment
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

exports.createComment = async (req, res, next) => {
    try {
        const user_id = req.user._id;
        const { post_id, name, body } = req.body;
        const post = await Post.findById(post_id);
        const target_user = await User.findOne({ name });
        if (!target_user) {
            return res.status(404).json({ error: 'Target profile not found' });
        }
        const newComment = { post_id, from: user_id, to: target_user._id, body };
        const comment = await Comment.create(newComment);
        post.comments.push(comment._id);
        await post.save();
        return res.status(200).json({
            success: true,
            comment,
            post,
            msg: 'Comment added successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

exports.editComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        const { body } = req.body;
        const user_id = req.user._id;
        const target_user = await User.findOne({ name });
        if (!target_user) {
            return res.status(404).json({ error: 'Target profile not found' });
        }
        if (comment.from != user_id) {
            return res.status(403).json({ error: 'You cannot edit comments from profiles other than yours' });
        }
        comment.body = body;
        comment.createdAt = Date.now();
        comment.updated = true;
        await comment.save();
        return res.status(200).json({
            success: true,
            comment,
            msg: 'Comment updated successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

exports.removeComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user_id = req.user._id;
        const comment = await Comment.findById(id);
        const post = await Post.findById(comment.post_id);
        if (comment.from != user_id) {
            return res.status(403).json({ error: 'You cannot remove comments from profiles other than yours' });
        }
        post.comments = post.comments.filter(comment_id => comment_id != comment._id);
        await post.save();
        const result = await comment.remove();
        return res.status(200).json({
            success: true,
            result,
            msg: 'Comment removed successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}