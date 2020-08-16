const Post = require('../models/Post');

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ createdAt: 'desc' });
        return res.status(200).json({
            success: true,
            posts,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getProfilePosts = async (req, res, next) => {
    try {
        const profile_id = req.profile._id;
        const posts = await Post.find({ profile_id }).sort({
            createdAt: 'desc',
        });
        return res.status(200).json({
            success: true,
            posts,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(200).json({
            success: true,
            post,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getPostsByProfileId = async (req, res, next) => {
    try {
        const { profile_id } = req.body;
        const posts = await Post.find({ profile_id }).sort({
            createdAt: 'desc',
        });
        return res.status(200).json({
            success: true,
            posts,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const profile_id = req.profile._id;
        const { title, body, image_1, image_2, image_3 } = req.body;
        const newPost = {
            profile_id,
            title,
            body,
            image_1,
            image_2,
            image_3,
            comments: [],
        };
        const post = await Post.create(newPost);
        return res.status(200).json({
            success: true,
            post,
            msg: 'Post created successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.editPost = async (req, res, next) => {
    try {
        const { id } = req.prams;
        const { title, body, image_1, image_2, image_3 } = req.params;
        const profile_id = req.profile._id;
        const post = await Post.findById(id);
        if (post.profile_id != profile_id) {
            return res.status(403).json({
                error: 'You cannot edit posts from profiles other than yours',
            });
        }
        post.title = title;
        post.body = body;
        post.image_1 = image_1;
        post.image_2 = image_2;
        post.image_3 = image_3;
        post.createdAt = Date.now();
        post.updated = true;
        await post.save();
        return res.status(200).json({
            success: true,
            post,
            msg: 'Post updated successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.removePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const profile_id = req.profile._id;
        const post = await Post.findById(id);
        if (post.profile_id != profile_id) {
            return res
                .status(403)
                .json({
                    error:
                        'You cannot remove posts of profiles other than yours',
                });
        }
        const result = await post.remove();
        return res.status(200).json({
            success: true,
            result,
            msg: 'Post removed successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};
