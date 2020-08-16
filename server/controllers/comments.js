const Comment = require('../models/Comment');
const Post = require('../models/Post');
const Profile = require('../models/Profile');

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
        const profile_id = req.profile._id;
        const { post_id, name, body } = req.body;
        const post = await Post.findById(post_id);
        const target_profile = await Profile.findOne({ name });
        if (!target_profile) {
            return res.status(404).json({ error: 'Target profile not found' });
        }
        const newComment = { post_id, from: profile_id, to: target_profile._id, body };
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
        const profile_id = req.profile._id;
        const target_profile = await Profile.findOne({ name });
        if (!target_profile) {
            return res.status(404).json({ error: 'Target profile not found' });
        }
        if (comment.from != profile_id) {
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
        const profile_id = req.profile._id;
        const comment = await Comment.findById(id);
        const post = await Post.findById(comment.post_id);
        if (comment.from != profile_id) {
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