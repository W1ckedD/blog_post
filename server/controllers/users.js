const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({
            success: true,
            user,
            token,
            msg: 'User registered successfully',
        });
    } catch (err) {
        if (err.code === 11000) {
            return res
                .status(409)
                .json({ error: 'This email is already registered' });
        }
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            console.log('not user')
            return res.status(422).json({ error: 'Invalid credentials' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(422).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({
            success: true,
            user,
            token,
            msg: 'User logged in successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.currentUser = (req, res, next) => {
    try {
        const user = req.user;
        return res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

exports.edituser = async (req, res, next) => {
    try {
        const { name, birthday, location, bio } = req.body;
        const user = req.user;
        user.name = name;
        user.birthday = birthday;
        user.location = location;
        user.bio = bio;
        await user.save();
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            users,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllMyFriends = async (req, res, next) => {
    try {
        const user = req.user;
        const friends = await Promise.all(
            user.friends.map(async friend_id => await User.findById(findById))
        );
        return res.status(200).json({
            success: true,
            friends,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getUserFriendsById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const targetUser = await User.findById(id);
        if (!user.friends.includes(id)) {
            return res.status(403).json({
                error:
                    'You must have the target user in your friends list to proceed',
            });
        }

        const targetUserFriends = await Promise.all(
            targetUser.friends.map(async id => await User.findById(id))
        );
        return res.status(200).json({
            success: true,
            targetUserFriends,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.sendFriendRequrest = async (req, res, next) => {
    try {
        const { target_id } = req.body;
        const targetUser = await User.findById(target_id);
        if (!targetUser) {
            return res
                .status(404)
                .json({ error: 'Target user does not exist' });
        }
        const user = req.user;
        if (target_id == user._id) {
            return res.status(422).json({
                error: 'You can not add yourself to your friend list',
            });
        }
        if (user.friends.includes(target_id)) {
            return res.status(409).json({
                error: 'You already have this target user in your friend list',
            });
        }
        if (user.pendingSentRequests.includes(target_id)) {
            return res.status(409).json({
                error:
                    'You already have sent a friend request to the target user',
            });
        }
        user.pendingSentRequests.push(target_id);
        await user.save();
        targetUser.pendingRecievedRequests.push(user._id);
        await targetUser.save();
        return res.status(200).json({
            success: true,
            user,
            msg: 'Friend request sent successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.acceptRequest = async (req, res, next) => {
    try {
        const { target_id } = req.body;
        const targetUser = await User.findById(target_id);
        const user = req.user;
        if (!targetUser) {
            return res
                .status(404)
                .json({ error: 'Target user does not exist' });
        }
        if (user.friends.includes(target_id)) {
            return res.status(409).json({
                error: 'You already have this target user in your friend list',
            });
        }
        user.friends.push(target_id);
        user.pendingRecievedRequests = user.pendingRecievedRequests.filter(
            id => id != target_id
        );
        await user.save();
        targetUser.friends.push(user._id);
        targetUser.pendingSentRequests = targetUser.pendingSentRequests.filter(
            id => id != user._id
        );
        await targetUser.save();

        return res.status(200).json({
            success: true,
            user,
            msg: 'Friend request accepted successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.denyRequest = async (req, res, next) => {
    try {
        const { target_id } = req.body;
        const targetUser = await User.findById(target_id);
        const user = req.user;
        if (!targetUser) {
            return res
                .status(404)
                .json({ error: 'Target user does not exist' });
        }
        if (user.friends.includes(target_id)) {
            return res.status(409).json({
                error: 'You already have this target user in your friend list',
            });
        }
        user.pendingRecievedRequests = user.pendingRecievedRequests.filter(
            id => id != target_id
        );
        await user.save();
        targetUser.pendingSentRequests = targetUser.pendingSentRequests.filter(
            id => id != user._id
        );
        await targetUser.save();

        return res.status(200).json({
            success: true,
            user,
            msg: 'Friend request denied successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.removeFriend = async (req, res, next) => {
    try {
        const { id } = req.body;
        const user = req.user;
        const targetUser = await User.findById(id);
        if (!targetUser) {
            return res.status(404).json({ error: 'The target user not found' });
        }
        if (!user.friends.includes(id)) {
            return res.status(404).json({
                error: 'The target user not found in your friend list',
            });
        }
        user.friends = user.friends.filter(friend_id => friend_id != id);
        targetUser.friends = targetUser.friends.file(
            friend_id => friend_id != user._id
        );
        await user.save();
        await targetUser.save();
        return res.status(200).json({
            success: true,
            friends: user.friends,
            msg: 'Friend removed successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getPendingSentRequests = async (req, res, next) => {
    try {
        const user = req.user;
        const pendingSentRequests = Promise.all(
            user.pendingSentRequests.map(async id => await User.findById(id))
        );
        return res.status(200).json({
            success: true,
            pendingSentRequests,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getPendingReceivedRequests = async (req, res, next) => {
    try {
        const user = req.user;
        const pendingRecievedRequests = Promise.all(
            user.pendingRecievedRequests.map(
                async id => await User.findById(id)
            )
        );
        return res.status(200).json({
            success: true,
            pendingRecievedRequests,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const path = require('path');

exports.getProfileImageUpload = (req, res, next) => {
    return res.sendFile(
        path.join(__dirname, '../', 'views', 'profile-image-upload.html')
    );
};

exports.postProfileImageUpload = async (req, res, next) => {
    try {
        const file = req.file;
        const user = req.user;
        user.imgUrl = file.path;
        await user.save();
        return res.status(200).json({
            success: true,
            imgUrl: file.path,
        });
    } catch (err) {}
};
