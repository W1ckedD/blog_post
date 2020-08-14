const Profile = require('../models/Profile');

exports.getAllProfiles = async (req, res, next) => {
    try {
        const profiles = await Profile.find();
        return res.status(200).json({
            success: true,
            profiles,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getProfileById = async (req, res, next) => {
    try {
        const { profile_id } = req.params;
        const profile = await Profile.findById(profile_id);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        return res.status(200).json({
            success: true,
            profile,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.createProfile = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const { name, imgBase64, birthDay, location, bio } = req.body;
        const newProfile = {
            user_id,
            name,
            imgBase64,
            birthDay,
            location,
            bio,
            posts: [],
            friends: [],
            pendingSentRequests: [],
            pendingRecievedRequests: [],
        };

        const profile = await Profile.create(newProfile);
        return res.status(200).json({
            success: true,
            profile,
            msg: 'Profile created successfully',
        });
    } catch (err) {
        if (err.code === 11000) {
            return res
                .status(409)
                .json({ error: 'You have already created your profile.' });
        }
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.editProfile = async (req, res, next) => {
    try {
        const { name, imgBase64, birthDay, location, bio } = req.body;
        const profile = req.profile;
        profile.name = name;
        profile.imgBase64 = imgBase64;
        profile.birthDay = birthDay;
        profile.location = location;
        profile.bio = bio;
        await profile.save();

        return res.status(200).json({
            success: true,
            profile,
            msg: 'Profile updated successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllMyFriends = async (req, res, next) => {
    try {
        profile = req.profile;
        const friends = await Promise.all(
            profile.friends.map(
                async friend_id => await Profile.findById(friend_id)
            )
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

exports.getProfileFriendsById = async (req, res, next) => {
    try {
        const { target_profile_id } = req.body;
        const profile = req.profile;
        const targetProfile = await Profile.findById(target_profile_id);
        if (!profile.friends.includes(target_profile_id)) {
            return res.status(403).json({
                error:
                    'You must have the target profile in your friends list to proceed',
            });
        }
        const targetProfileFriends = await Promise.all(
            targetProfile.friends.map(async id => await Profile.findById(id))
        );
        return res.status(200).json({
            success: true,
            targetProfileFriends,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.sendFriendRequrest = async (req, res, next) => {
    try {
        const { target_profile_id } = req.body;
        const targetProfile = await Profile.findById(target_profile_id);
        if (!targetProfile) {
            return res
                .status(404)
                .json({ error: 'Target profile does not exist' });
        }
        const profile = req.profile;
        if (target_profile_id == profile._id) {
            return res.status(422).json({
                error: 'You can not add yourself to your friend list',
            });
        }
        if (profile.friends.includes(target_profile_id)) {
            return res.status(409).json({
                error:
                    'You already have this target profile in your friend list',
            });
        }
        if (profile.pendingSentRequests.includes(target_profile_id)) {
            return res.status(409).json({
                error:
                    'You already have sent a friend request to the target profile',
            });
        }
        profile.pendingSentRequests.push(target_profile_id);
        await profile.save();
        targetProfile.pendingRecievedRequests.push(profile._id);
        await targetProfile.save();
        return res.status(200).json({
            success: true,
            profile,
            msg: 'Friend request sent successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.acceptRequest = async (req, res, next) => {
    try {
        const { target_profile_id } = req.body;
        const targetProfile = await Profile.findById(target_profile_id);
        const profile = req.profile;
        if (!targetProfile) {
            return res
                .status(404)
                .json({ error: 'Target profile does not exist' });
        }
        if (profile.friends.includes(target_profile_id)) {
            return res.status(409).json({
                error:
                    'You already have this target profile in your friend list',
            });
        }
        profile.friends.push(target_profile_id);
        profile.pendingRecievedRequests = profile.pendingRecievedRequests.filter(
            id => id != targetProfile
        );
        await profile.save();
        targetProfile.friends.push(profile._id);
        targetProfile.pendingSentRequests = targetProfile.pendingSentRequests.filter(
            id => id != profile._id
        );
        await targetProfile.save();

        return res.status(200).json({
            success: true,
            profile,
            msg: 'Friend request accepted successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.denyRequest = async (req, res, next) => {
    try {
        const { target_profile_id } = req.body;
        const targetProfile = await Profile.findById(target_profile_id);
        const profile = req.profile;
        if (!targetProfile) {
            return res
                .status(404)
                .json({ error: 'Target profile does not exist' });
        }
        if (profile.friends.includes(target_profile_id)) {
            return res.status(409).json({
                error:
                    'You already have this target profile in your friend list',
            });
        }
        profile.pendingRecievedRequests = profile.pendingRecievedRequests.filter(
            id => id != targetProfile
        );
        await profile.save();
        targetProfile.pendingSentRequests = targetProfile.pendingSentRequests.filter(
            id => id != profile._id
        );
        await targetProfile.save();

        return res.status(200).json({
            success: true,
            profile,
            msg: 'Friend request denied successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getPendingSentRequests = async (req, res, next) => {
    try {
        const profile = req.profile;
        const pendingSentRequests = Promise.all(
            profile.pendingSentRequests.map(
                async id => await Profile.findById(id)
            )
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
        const profile = req.profile;
        const pendingRecievedRequests = Promise.all(
            profile.pendingRecievedRequests.map(
                async id => await Profile.findById(id)
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
